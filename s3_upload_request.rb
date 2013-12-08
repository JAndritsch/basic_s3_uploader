class S3UploadRequest

  AWS_SECRET_KEY = "YOUR_SECRET_KEY"

  require 'base64'
  require 'digest'

  attr_accessor :date, :upload_id, :key, :chunk, :mime_type,
    :bucket, :signature

  def initialize(data)
    params          = data[:params] # any data sent up from the client side
    type            = data[:type]   # the type of the signature requeset
    @bucket         = params[:bucket]
    @date           = Time.now.strftime("%a, %d %b %Y %X %Z") # the date format that AWS requires
    @upload_id      = params[:upload_id]
    @key            = params[:key]
    @chunk          = params[:chunk]
    @mime_type      = params[:mime_type]
    @acl            = params[:acl]
    @encrypted      = params[:encrypted]

    # figure out what type of signature is being requested, then get it
    if type == :init
      @signature = upload_init_signature
    elsif type == :part
      @signature = upload_part_signature
    elsif type == :complete
      @signature = upload_complete_signature
    elsif type == :list
      @signature = upload_list_signature
    else
      @signature = nil
    end
  end

  def to_h
    {
      :date      => @date,
      :bucket    => @bucket,
      :upload_id => @upload_id,
      :chunk     => @chunk,
      :mime_type => @mime_type,
      :signature => @signature
    }
  end

  def encrypted_upload?
    @encrypted == "true"
  end

  private

  def upload_init_signature
    if encrypted_upload?
      encode("POST\n\n\n\nx-amz-acl:#{@acl}\nx-amz-date:#{@date}\nx-amz-server-side-encryption:AES256\n/#{@bucket}/#{@key}?uploads")
    else
      encode("POST\n\n\n\nx-amz-acl:#{@acl}\nx-amz-date:#{@date}\n/#{@bucket}/#{@key}?uploads")
    end
  end

  def upload_part_signature
    encode("PUT\n\n#{@mime_type}\n\nx-amz-date:#{@date}\n/#{@bucket}/#{@key}?partNumber=#{@chunk}&uploadId=#{@upload_id}")
  end

  def upload_complete_signature
    encode("POST\n\n#{@mime_type}\n\nx-amz-date:#{@date}\n/#{@bucket}/#{@key}?uploadId=#{@upload_id}")
  end

  def upload_list_signature
    encode("GET\n\n\n\nx-amz-date:#{@date}\n/#{@bucket}/#{@key}?uploadId=#{@upload_id}")
  end

  def encode(data)
    sha1      = OpenSSL::Digest::Digest.new('sha1')
    hmac      = OpenSSL::HMAC.digest(sha1, AWS_SECRET_KEY, data)
    Base64.encode64(hmac).gsub("\n", "")
  end
end
