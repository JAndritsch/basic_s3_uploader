In order to make use of this uploader, you will need a server-side application that
can handle generating the proper AWS S3 signature for each type of request. The
AWS multipart upload API has several different operations you can use, however this
uploader only relies on the following:

- [POST] Initiate Multipart Upload
- [PUT] Upload a single part
- [GET] List uploaded parts 
- [POST] Complete Upload

For more information on the different types of operations AWS exposes, check out
[this link](http://docs.aws.amazon.com/AmazonS3/latest/dev/auth-request-sig-v2.html)
and [this link too](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).

* Note: At this time, BasicS3Uploader only supports v2 signtures, but will eventually
be upgraded to use v4.

## Your signature backend

As stated before, you need to provide your own signature API for this uploader. 
The main reason for this is security; you do not want to expose your AWS secret
access key to the front end (which is used for part of the signing process). To
work around this limitation, a server-side application needs to fill that position.

BasicS3Uploader will request each signature it needs at the right time, however you
need to handle the response to these requests. The uploader expects the response 
type to be in JSON format. 

There are only two actions that you'll need to implement:

- One to handle returning the "init" signature. The response should look something like this:

        { 
          "signature": "some signature",
          "date": "some date"
        }

- And one more to handle returning the remaining signatures (list, each chunk, and complete).
The response should look something like this:

        // Note that each key in "chunk_signatures" refers to a single part/chunk number (1-based).
        {
          chunk_signatures: {
            1: { signature: "signature", date: "date" },
            2: { signature: "signature", date: "date" },
            3: { signature: "signature", date: "date" },
          },
          complete_signature: { signature: "signature", date: "date" },
          list_signature: { signature: "signature", date: "date" }
        }

How you define these endpoints is up to you, but BasicS3Uploader will, by default,
attempt to get this information from the following URLs:

- /get_init_signature
- /get_remaining_signatures

You can configure this data through the `signatureBackend`, `initSignaturePath`,
and `remainingSignaturesPath` settings. Check out the [configuration page](https://github.com/jandritsch/basic_s3_uploader/wiki/Configuration) for more
information on this.

## How to generate signatures

Generating the actual signatures isn't too complicated, but will require a couple
pieces of data.  When BasicS3Uploader sends a request to retrieve a signature from your API, it
will send along the following information:

- __bucket__: The name of the S3 bucket
- __upload_id__: The upload id. This is only used in the "remaining signatures" call.
- __key__: The upload key chosen for the file.
- __chunk__: The specific chunk/part number. This is only used in the "remaining signatures" call.
- __total_chunks__: The number of chunks that will be uploaded. This is only used in the "remaining signatures" call.
- __mime_type__: The type of the file.
- __acl__: The Access Control List.
- __encrypted__: Whether or not the upload should be encrypted.

Using this information, you can generate the proper signature by the following sample
logic (Ruby): 

    class SignatureGenerator
    
      AWS_SECRET_KEY = "YOUR_SECRET_KEY"
    
      require 'base64'
      require 'digest'
    
      def initialize(params)
        @bucket     = params[:bucket]
        @date       = Time.now.strftime("%a, %d %b %Y %X %Z") # the date format that AWS requires
        @upload_id  = params[:upload_id]
        @key        = params[:key]
        @chunk      = params[:chunk]
        @mime_type  = params[:mime_type]
        @acl        = params[:acl]
        @encrypted  = params[:encrypted]
      end
    
    
      def encrypted_upload?
        @encrypted == "true"
      end
    
      def init_signature
        if encrypted_upload?
          encode("POST\n\n\n\nx-amz-acl:#{@acl}\nx-amz-date:#{@date}\nx-amz-server-side-encryption:AES256\n/#{@bucket}/#{@key}?uploads")
        else
          encode("POST\n\n\n\nx-amz-acl:#{@acl}\nx-amz-date:#{@date}\n/#{@bucket}/#{@key}?uploads")
        end
      end
    
      def part_signature
        encode("PUT\n\n#{@mime_type}\n\nx-amz-date:#{@date}\n/#{@bucket}/#{@key}?partNumber=#{@chunk}&uploadId=#{@upload_id}")
      end
    
      def list_signature
        encode("GET\n\n\n\nx-amz-date:#{@date}\n/#{@bucket}/#{@key}?uploadId=#{@upload_id}")
      end
    
      def complete_signature
        encode("POST\n\n#{@mime_type}\n\nx-amz-date:#{@date}\n/#{@bucket}/#{@key}?uploadId=#{@upload_id}")
      end
    
      def encode(data)
        sha1      = OpenSSL::Digest::Digest.new('sha1')
        hmac      = OpenSSL::HMAC.digest(sha1, AWS_SECRET_KEY, data)
        Base64.encode64(hmac).gsub("\n", "")
      end
    
    end

Check out the sample app provided to see an example of how make use of this logic
in an API/controller. 
