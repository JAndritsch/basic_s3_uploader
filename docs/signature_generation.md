In order to use this uploader, you will need a server-side application that
can handle generating the proper AWS S3 headers for each type of request. The
AWS multipart upload API has several different operations you can use, however this
uploader only relies on the following:

- [POST] Initiate Multipart Upload
- [PUT] Upload a single part
- [GET] List uploaded parts 
- [POST] Complete Multipart Upload

## Your signature backend

You'll need to provide your own signature API for this uploader. The main reason
for this is security; you do not want to expose your AWS secret access key to the front end (which is used for part of the signing process). To work around this limitation, a server-side application needs to fill that position.

This API should take care of signing each request and returning the proper headers
required for the request. The uploader will then use these headers you give it
when calling the S3 APIs.

BasicS3Uploader will ask for the headers it needs for each specific request, however you
need to handle responding to these requests. The uploader expects the response 
type to be in JSON format. 

An example response might look something like this:

    {
      "Authorization": "AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request, SignedHeaders=host;range;x-amz-date, Signature=fe5f80f77d5fa3beca038a248ff027d0445342fe2855ddc963176630326f1024",
      "x-amz-date": "20140708T220855Z",
      "x-amz-content-sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b785",
      "content-type": "video/quicktime",
    }

In order to give the headers to BasicS3Uploader, you'll need to create a separate
endpoint for each API.

How you define these endpoints is up to you, but BasicS3Uploader will, by default,
attempt to get this information from the following URLs:

- `GET /get_init_headers`: Can be configured via `initHeadersPath`.
- `GET /get_chunk_headers`: Can be configured via `chunkHeadersPath`.
- `GET /get_list_headers`: Can be configured via `listHeadersPath`.
- `GET /get_complete_headers`: Can be configured via `completeHeadersPath`.

Check out the [configuration page](https://github.com/jandritsch/basic_s3_uploader/wiki/Configuration) for more
information on this.

## How to generate headers

There are several pieces of data you'll need in order to generate an Authorization
header. When BasicS3Uploader sends a request to retrieve headers from your API, it
will send along the following information for you to use:

- __host__: The full host URL to the S3 bucket
- __payload__: The SHA256 encrypted content of the request payload.
- __upload_id__: The upload id. This is used for every call except "Initiate Multipart Upload".
- __key__: The upload key chosen for the file.
- __part_number__: The specific chunk/part number. This is only used in the "Upload Part" call.
- __content_type__: The type of the file.
- __acl__: The Access Control List. Only used for "Initiate Multipart Upload".
- __region__: The region where the bucket is located.
- __encrypted__: Whether or not the upload should be encrypted. Only used for "Initiate Multipart Upload".

The process for creating and signing a request is pretty complicated. More information on that can be
found here: [Sig V4](http://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html).

Fortunately, Amazon has an SDK in various languages that does the dirty work for you. All you'll have
to do is use their library. Below is an example of how one might do that in Ruby using their [aws-sdk-core-ruby
gem](https://github.com/aws/aws-sdk-core-ruby).

    module Aws

      # Patching until it can be fixed. See more info at:
      #  https://github.com/JAndritsch/aws-sdk-core-ruby/commit/4a538708a01f73be1ae859136f5d80fe6d36afa8
      module Signers
        class V4
          def signed_headers(request)
            headers = request.headers.keys.map(&:downcase)
            headers.delete('authorization')
            headers.sort.join(';')
          end
        end
      end

      class S3UploadRequest

        attr_reader :signer, :headers, :endpoint, :http_method

        def initialize(params)
          @host          = params[:host]
          @upload_id     = params[:upload_id]
          @key           = URI.encode(params[:key])
          @content_type  = params[:content_type]
          @encrypted     = params[:encrypted]
          @acl           = params[:acl]
          @payload       = params[:payload] # sha256 encrypted
          @part_number   = params[:part_number]
          @headers       = default_headers
          region         = params[:region]

          credentials    = Aws::Credentials.new(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
          @signer        = Aws::Signers::V4.new(credentials, 's3', region)
        end

        def init
          @http_method = "POST"
          @endpoint = URI("#{@host}/#{@key}?uploads")
          @headers["x-amz-acl"] = @acl
          @headers["x-amz-server-side-encryption"] = "AES256" if encrypted_upload?
          signed_headers
        end

        def part
          @http_method = "PUT"
          @endpoint = URI("#{@host}/#{@key}?partNumber=#{@part_number}&uploadId=#{@upload_id}")
          signed_headers
        end

        def complete
          @http_method = "POST"
          @endpoint = URI("#{@host}/#{@key}?uploadId=#{@upload_id}")
          signed_headers
        end

        def list
          @http_method = "GET"
          @endpoint = URI("#{@host}/#{@key}?uploadId=#{@upload_id}")
          signed_headers
        end

        private

        def default_headers
          {
            "X-Amz-Content-Sha256" => @payload,
            "content-type" => @content_type
          }
        end

        def encrypted_upload?
          @encrypted == "true"
        end

        def signed_headers
          headers = @signer.sign(self).headers
          headers.delete("Host") # The 'host' header cannot be set in Javascript. The browser does it for you automatically.
          headers
        end

      end
    end

Once that logic is in place, you'll need to expose it to the uploader. Here is 
an example of doing that as a controller in Rails:


    class UploadSignaturesController < ApplicationController

      respond_to :json

      def get_init_headers
        render :json => upload_request.init
      end

      def get_list_headers
        render :json => upload_request.list
      end

      def get_complete_headers
        render :json => upload_request.complete
      end

      def get_chunk_headers
        render :json => upload_request.part
      end

      private

      def upload_request
        Aws::S3UploadRequest.new(params)
      end

    end

And here are the necessary additions to the `routes.rb` file:

    resources :upload_signatures do
      collection do
        get 'get_init_headers'
        get 'get_list_headers'
        get 'get_complete_headers'
        get 'get_chunk_headers'
      end
    end

