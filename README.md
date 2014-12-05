# BasicS3Uploader

BasicS3Uploader is a Javascript uploader that uploads files to an S3 bucket directly
from the client side. It was designed to be very generic and easily customizable.
You simply configure it, give it a file, and then tell it to start uploading.

## Features

- __Very configurable__: There are many options you can specify when using the uploader.
These include things like your ACL (Access Control List) or whether you'd like your uploads
to be encrypted or not.

- __Parallel chunk uploads__: Instead of uploading the entire file in a single request,
this uploader sends the bits in chunks. Up to 5 chunks can be sent at the same time, which
can result in much faster uploads.

- __Automatic retries__: Should an upload fail in the process, this uploader will
automatically attempt to retry the upload again, provided it hasn't exceeded the
maximum number of retries.

- __Event driven__: There are many events for you to hook into that allow you to
do things like calculate upload progress or report upload failures/retries.

- __Extensible__: The code was written to be easy to understand and modify, should
you find the need for a feature that BasicS3Uploader does not currently provide.

## How does it work?

BasicS3Uploader uses [Amazon's REST API for multipart uploads](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingRESTAPImpUpload.html).
Specifically, it only requires these 4 APIs:

- Initiate Multipart Upload
- Upload Part
- List Parts
- Complete Multipart Upload

Each of these APIs require authorization. BasicS3Uploader uses [AWS Signature Version 4](http://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html) to authorize each request.

In order to generate signatures in a secure manner, a server-side application is required. For more information
about how to generate signatures or how to use the uploader, check out the [documentation page](https://github.com/jandritsch/basic_s3_uploader/wiki/Documentation).

## Requirements

There are three requirements in order to get BasicS3Uploader working:

- A modern browser
- Proper CORS configuration for your S3 bucket
- A server-side application used for generating signatures

### A modern browser

The following browsers have been known to work with this uploader:

- Firefox 13+
- Chrome 20+
- Safari 6+
- Internet Explorer 10+

BasicS3Uploader relies on the HTML5 File, Blob, and FileReader APIs. As a result,
this uploader will not work in browsers that do not fully support them.

### S3 Bucket CORS config

In order for BasicS3Uploader to upload to your S3 bucket, you must have the proper
CORS config in place for that bucket. Below is a sample of what that configuration
should look like.

    <CORSConfiguration>
      <CORSRule>
        <AllowedOrigin>[your domain]</AllowedOrigin>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>DELETE</AllowedMethod>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>HEAD</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
        <ExposeHeader>ETag</ExposeHeader>
      </CORSRule>
    </CORSConfiguration>

The only thing that should be modified is the `<AllowedOrigin>` configuration. Everything
else should be the way you see it.

### A server-side app

As previously stated, BasicS3Uploader needs to communicate with a server-side application
in order to retrieve upload signatures. This application can be written in any language
and use any framework.

Check out the sample app and [documentation](https://github.com/JAndritsch/basic_s3_uploader/wiki/Documentation) for more info.

## The sample app

This project comes with a sample application that contains everything you need to start
uploading. You will need to set up this application and make some minor configuration
changes in order for it to work.

### The files

First, here is the list of files and description of each file used for the sample app:

    - sample_app/
      - app.rb: Simple Sinatra app that provides routes for both the front end and signature backend
      - s3_upload_request.rb: A simple class used to generate headers
      - Gemfile 
      - Gemfile.lock
      - public/
        - javascripts/
          - dist/
            - basic_s3_uploader.js: The uploader
          - main.js: An example of how one might use the uploader
          - jquery-2.0.3.min.js: Not necessary for the uploader, but nice to use for main.js
        - stylesheets/
          - main.css
      - views/
        - layout.erb: The application layout
        - index.erb: The index view

### How to start it

The sample app provided runs on [Sinatra](http://www.sinatrarb.com/), a lightweight Rack application.
In order to run the application, you must have Ruby installed.

#### Step 1: Set up the application

    cd basic_s3_uploader/sample_app
    gem install bundler
    bundle install

#### Step 2: Configure the app

You need to modify the sample app by providing it with your AWS keys. This can
be accomplished by defining the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
constants found in the `s3_upload_request.rb` file.

Next, you will need to edit `public/javascripts/main.js` and provide the uploader settings with
your bucket name, region, and a key for your upload (the key is going to be used for the
file name when it is uploaded, and may also include subfolders).
Example:

    $("#fileinput").on("change", function(element) {
      file = element.target.files[0];

      settings = {
        bucket: "your-bucket-name",
        region: "us-east-1",
        key: "a-key-for-the-upload",
        ...

#### Step 3: Start the Sinatra app

Once you have the application set up and configured, you should be able to start it like so:

    ruby app.rb

If you are running the app on your system ruby, you might need to prefix the command with
`sudo`.  This generally is not necessary unless you change the port to one that needs root
access.  The sample ruby app is setup to use port 8080, which does not need root access.

#### Step 4: Verify it's up

Open a web browser and navigate to http://localhost:8080

## Documentation

All links to documentation for this uploader can be found [on this page](https://github.com/jandritsch/basic_s3_uploader/wiki/Documentation).

## Contributing

Want to help make this better? Please perform the following steps to contribute:

- Fork the project
- Create a new branch with your changes
- Be sure if adding/removing/changing logic to update the appropriate tests found in spec/
- Make sure all specs are passing. You can run them through grunt and karma:
      * `npm install`
      * `grunt`, `grunt test`, or even `grunt watch`
- Make sure you update the distributed copy by running the 'build' task
  * `grunt build` (merges the src files together and copies it to dist/. Also copies the
  built file into the sample app).
- Use the sample app provided to "smoke test" your changes.
- Send me a pull request
