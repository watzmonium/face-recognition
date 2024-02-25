# documentation
## about
This app was built with:
- node v 20.6.1

## setting up the environment
This app assumes that there is a `.env` file in the root directory with the following properties:
- PORT
- API_KEYS

## running the app locally

## running tests

## further work

## assumptions/notes
- I used branch-based development, so to see all commits, you will have to examine specific branches as I develop features.
- I've never worked with swagger before, and it seems like there are many patterns in creating an API with swagger. I ended up deciding to use the `swagger-ui-express` package to help develop and test the API. I think development will be slower by writing the spec before I develop the endpoint rather than just using it as documentation, but I decided to use it as I go rather than tacking it on to the end to ensure the API adheres to the spec. I can also see how defining the spec before the API is written could be useful when working with other teams asynchronously.
- One of the biggest things that I put some thought into before starting development was what the pattern for the callback for the create new detection route should look like. Ultimately I decided to use a webhook endpoint as the callback URL because I'm not really concerned with how the end-user will use the data, and just want to ensure that it works as intended. I will use requestbin for my webhook callback URLs.
- I decided to use postgres rather than sqlite just because of comfort and ease. I have used sqlite before, but ultimately I don't think it's that significant of a decision for the scope of this app.
- I decided to use `face-api.js` rather than the `face-recognition` npm package because the documentation for the latter points you to the former, specifically saying that `face-recognition` is outdated.
- I agonized a bit about the `Content-Type` for the create detection endpoint, and ultimately decided to go with multipart/form-data because it is easier to work with multiple file extensions and seems appropriate based on RFC 2388.
- I decided to preserve the images uploaded because in a real application, I would assume one would want the images for various reasons, and also one would probably use something like an S3 to store them. If I were developing this at scale, I would probably have the db table reference the URL of the image, but given the scope of this project, I will just store them on disk and keep the file name in the db.
- I'm just using a really basic API key for authentication for testing purposes.

## TODOs
- basic server setup - folders, middleware, babelrc, gitignore, env
- figure out and setup openAPI YAML
- configure post route to accept images, rename them a random string, and save them to disk
- create basic testing/swagger routes as i go
- configure the other routes
- implement postgres with a seed table
- implement authentication
- dockerize solution