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

  get '/get_init_headers' do
    content_type :json
    upload_request.init.to_json
  end

  get '/get_list_headers' do
    content_type :json
    upload_request.list.to_json
  end

  get '/get_complete_headers' do
    content_type :json
    upload_request.complete.to_json
  end

  get '/get_chunk_headers' do
    content_type :json
    upload_request.part.to_json
  end

  get '/' do
    erb :index
  end

  # serve everything else as static variables
  get %r{/(.*)} do |path|
    send_file "../" + path
  end

  private

  def upload_request
    Aws::S3UploadRequest.new(params)
  end

end


if __FILE__ == $0
  MyApp.run! :port => 8080
end
