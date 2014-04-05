# BasicS3Uploader

### What is it?

BasicS3Uploader is a generic Javascript S3 uploader that provides you with the means necessary
to send files from your machine to an AWS S3 bucket all from the client side. It was designed
to be very generic, providing only a simple library that can be wrapped in order to facilitate
chunked uploads from a web browser to the cloud. There is no UI and no additional plugins
required. You simply instantiate it, give it a file and some settings, then tell
it to start uploading when you want.

### Why no UI?

There are many great Javascript uploaders out there already, and several of them
include fancy UI or behaviors such as progress bars and automatic file uploads
on file selection. While these features may be interesting, they tend to make
assumptions about how you're supposed to use them. In some cases, these assumptions
may make it more difficult to use these tools in different ways.

Rather than make decisions for you, BasicS3Uploader provides you with the functionality
to upload a file to the cloud, but you get to make all the decisions about UI and
behavior.

### How does it work?

BasicS3Uploader is based off of the [Mule Uploader](https://github.com/cinely/mule-uploader)
and uses a similar method for gathering the required upload signatures for S3's multipart API.
Because generating signatures requires the use of your AWS secret access key, this uploader
requires that you set up a server-side web application that can generate the proper signatures
for each request.

Similar to Mule, BasicS3Uploader requires you to provide it with the path to your signature
backend application. You must also configure the backend application so that it defines two different
routes to access the necessary signatures. These specific paths can be configured for the uploader,
but default to the following paths:

- /get_init_signature
- /get_remaining_signatures

The process for uploading a file to S3 is as follows:

- Step 1: Get an "upload init" signature from the user-defined backend

- Step 2: Using the init signature, call to S3 API to initiate a multipart upload request.
If successful, an UploadId is returned.

- Step 3: Using the UploadId, get the remaining signatures from the user-defined
backend in a single call. The signatures returned include all chunk/part signatures,
the "list parts" signature, and the "complete upload" signature.

- Step 4: Start uploading each chunk to S3, using the appropriate signature for each chunk.

- Step 5: Once all chunk uploads have completed, check to make sure that S3 has all the
correct chunks that it was sent.

- Step 6: Call the S3 API to complete the upload using the "complete" signature once all
chunks have been verified.

For more information about how to generate signatures or how to use the uploader,
please check out the documentation page (coming soon).

## Features

BasicS3Uploader has a few notable features:

- __Very configurable__: There are many options you can specify when using the uploader.
These include things like your ACL (Access Control List) or whether you'd like your uploads
to be encrypted or not.

- __Chunked uploads__: Uploading files in multiple chunks is much more efficient and results
in more reliable complete uploads.

- __Parallel chunk uploads__: Instead of uploading chunks of a file synchronously,
BasicS3Uploader uploads the chunks simultaneously. This can result in much faster
uploads.

- __Automatic retries__: Should an upload fail in the process, this uploader will
automatically attempt to retry the upload again, provided it hasn't exceeded the
maximum number of retries.

- __Event driven__: There are many events for you to hook into that allow you to
do things like calculate upload progress or report upload failures/retries.

- __Extensible__: The code was written to be easy to understand and modify, should
you find the need for a feature that BasicS3Uploader does not currently provide.

## Requirements

There are three requirements in order to get BasicS3Uploader working:

- A modern browser
- Proper CORS configuration for your S3 bucket
- A server-side application used for generating signatures

### A modern browser

The following browsers have been known to work with this uploader:

- Updated Firefox
- Updated Chrome
- Safari 6+
- Internet Explorer 10+

BasicS3Uploader relies on the HTML5 File, Blob, and FileReader APIs. As a result,
this uploader will not work in browsers that do not fully support them. Unlike some
uploaders that gracefully degrade and use iframe hacks for older browsers, there's
no fallback strategy with BasicS3Uploader.

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
and use any framework. The only requirement is that it responds to the necessary routes,
accepts the required data, and can properly generate and return a signature.

Check out the sample app and documentation for more info.

## The sample app

This project comes with a sample application that contains everything you need to start
uploading. You will need to set up this application and make some minor configuration
changes in order for it to work.

### The files

First, here is the list of files and description of each file used for the sample app:

    - sample_app/
      - app.rb: Simple Sinatra app that provides routes for both the front end and signature backend
      - s3_upload_request.rb: A simple class used to generate signatures
      - Gemfile 
      - Gemfile.lock
      - public/
        - javascripts/
          - src/
            - basic_s3_uploader.js: The uploader
            - basic_s3_uploader_mock.js: A mock uploader that can be used for testing
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

You need to modify the sample app by providing it with your AWS secret access key. This can
be accomplished by changing the value of `AWS_SECRET_KEY` found in the `s3_upload_request.rb`
file.

    AWS_SECRET_KEY = "YOUR_SECRET_KEY"

Next, you will need to edit `public/javascripts/main.js` and provide the uploader settings with
your bucket name, AWS access key, and a key for your upload (the key is going to be used for the
file name when it is uploaded, and may also include subfolders).
Example:

    $("#fileinput").on("change", function(element) {
      file = element.target.files[0];

      settings = {
        bucket: "your-bucket-name",
        awsAccessKey: "your-aws-access-key",
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


## Contributing

Want to help make this better? Please perform the following steps to contribute:

- Fork the project
- Create a new branch with your changes
- Be sure if adding/removing/changing logic to update the tests in spec/basic_s3_uploader_spec.js
- Make sure all specs are passing. You can run the tests in two ways:
  * Open the standalone HTML file found in spec/SpecRunner.html.
  * Run them through grunt and karma:
      * npm install
      * grunt test
- Send me a pull request
