require 'sinatra'
require 'json'
require './s3_upload_request'

# the app views
class MyApp < Sinatra::Base

  get '/get_init_signature' do
    content_type :json
    hash = S3UploadRequest.new(:type => :init, :params => params).to_h
    hash.to_json
  end

  # Returns a hash of multiple signatures, including one for the "list parts"
  # call, the "complete upload" call, and a signature for every chunk in the upload.
  
  # To calculate the chunk signatures, BasicS3Uploader sends the "total_chunks"
  # value to this method. From there, we can iterate of each value within the
  # range of 0..total_chunks and generate a signature for each chunk.
  get '/get_remaining_signatures' do
    content_type :json
    # get the "list parts" signature
    list     = S3UploadRequest.new(:type => :list, :params => params)
    # get the "complete upload" signature
    complete = S3UploadRequest.new(:type => :complete, :params => params)

    chunk_signatures = {}
    # loop over the range of 0..total_chunks
    params[:total_chunks].to_i.times do |chunk|
      # chunk numbers must be 1-indexed
      chunk_number = chunk + 1
      # assign the chunk number to the params hash
      params[:chunk] = chunk_number
      # generate the signature for this speicifc chunk
      request = S3UploadRequesjkt.new(:type => :part, :params => params)
      # store the signature in a hash that will be returned later
      chunk_signatures[chunk_number] = {:signature => request.signature, :date => request.date}
    end

    # Each signature requires two parts, the date for the request and the actual signature.
    # BasicS3Uploader expects the response for any signature to be a hash that has a
    # signature and date key.
    hash = {
      :list_signature     => {:signature => list.signature, :date => list.date},
      :complete_signature => {:signature => complete.signature, :date => complete.date},
      :chunk_signatures   => chunk_signatures
    }
    hash.to_json
  end

  get '/' do
    erb :index
  end

  # serve everything else as static variables
  get %r{/(.*)} do |path|
    send_file "../" + path
  end

end


if __FILE__ == $0
  MyApp.run! :port => 80
end
