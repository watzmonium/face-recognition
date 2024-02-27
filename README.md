# documentation
## about
This app was built with:
- node v20.6.1
- express v4.18.2
- postgresql

This app was tested on a 2015 macbook pro OSXv12.7.1

This is an app that exposes an API that can be used to upload images to scan for the number of faces in an image. Note that I was unable to successfully integrate facial recognition into this app, and as such it finds a random number of faces (0-10).

## setting up the environment
This app assumes that there is a `.env` file in the root directory with the following properties:
- PORT (defaults to 3000 if not included)
- API_KEYS (an array of accepted API keys as strings)
- PSQL_DB="face_recognition"
- PSQL_USERNAME set this value equal to the name of the psql user you wish to use ("postgres" is the default user)
- PSQL_PASSWORD set this value equal to the password for the psql user you have chosen
- PSQL_HOST="localhost"

### PSQL setup
run the following commands from your terminal:

createdb face_recognition

psql -d face_recognition < schema.sql

This creates a new database that face-recognition will use to store webhook information, then it sets up the schema for the database

## running the app locally
Per specification, the app can be run with `docker compose up`
It can also be run with `npm start`

## running tests
The app was tested using the openAPI UI. Please visit `http://localhost:<yourport>/api-docs` to test the endpoints
I did not have time to integrate a testing suite for basic methods

## further work
If I had more time I would
1) integrate basic tests
2) attempt several other facial recognition projects
3) add santization of data into the DB
4) add more robust api authentication

## assumptions/notes
- I used branch-based development, so to see all commits, you will have to examine specific branches as I develop features.
- I've never worked with swagger before, and it seems like there are many patterns in creating an API with swagger. I ended up deciding to use the `swagger-ui-express` package to help develop and test the API. I think development will be slower by writing the spec before I develop the endpoint rather than just using it as documentation, but I decided to use it as I go rather than tacking it on to the end to ensure the API adheres to the spec. I can also see how defining the spec before the API is written could be useful when working with other teams asynchronously.
- One of the biggest things that I put some thought into before starting development was what the pattern for the callback for the create new detection route should look like. Ultimately I decided to use a webhook endpoint as the callback URL because I'm not really concerned with how the end-user will use the data, and just want to ensure that it works as intended. I will use requestbin for my webhook callback URLs.
- I decided to use postgres rather than sqlite just because of comfort and ease. I have used sqlite before, but ultimately I don't think it's that significant of a decision for the scope of this app.
- By far the hardest part of this entire project was getting a facial recognition package to even run on my computer. I first spent a few hours wrestling with the facial recognition package that the suggested one recommends (`face-api.js`) only to find some weird compatitbility issues after writing a utility for it. Then, I attempted to use the deprecated `face-recognition` package suggested only to find compatibility issues with the C++ compiler in node-gyp. I found that had to do with the python runtime required to install the bundled sqlite installation, so i had to downgrade my system's python installation. Ultimately I was unable to get that to install. I have used a placeholder random number generator and will revisit if I have time.
- I agonized a bit about the `Content-Type` for the create detection endpoint, and ultimately decided to go with multipart/form-data because it is easier to work with multiple file extensions and seems appropriate based on RFC 2388.
- I decided to preserve the images uploaded because in a real application, I would assume one would want the images for various reasons, and also one would probably use something like an S3 to store them. If I were developing this at scale, I would probably have the db table reference the URL of the image, but given the scope of this project, I will just store them on disk and keep the file name in the db.
- I did not add validation for file size of images. That could be a bit of an issue if this were a production app because I'm keeping the images in memory before saving them to ensure I have control over how files are saved.
- I realized there's a potential edge-case race condition if there's a pending callback and a request is deleted. I decided to just cancel the callback rather than return "deleted" or something to the webhook.
- I'm just using a really basic API key for authentication for testing purposes.

## TODOs
- basic server setup - folders, middleware, babelrc, gitignore, env ✔
- figure out and setup openAPI YAML ✔
- configure post route to accept images, rename them a random string, and save them to disk   ✔
- create basic testing/swagger routes as i go  ✔
- configure the other routes  ✔
- implement postgres with a seed table ✔
- implement authentication ✔
- dockerize solution ✔
