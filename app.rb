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

  get '/get_all_signatures' do
    content_type :json
    list     = S3UploadRequest.new(:type => :list, :params => params)
    complete = S3UploadRequest.new(:type => :complete, :params => params)

    chunk_signatures = {}
    params[:total_chunks].to_i.times do |chunk|
      chunk_number = chunk + 1
      params[:chunk] = chunk_number
      request = S3UploadRequest.new(:type => :part, :params => params)
      chunk_signatures[chunk_number] = {:signature => request.signature, :date => request.date}
    end

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
