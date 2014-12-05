require 'aws-sdk'

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
      headers.delete("Host")
      headers
    end

  end
end
