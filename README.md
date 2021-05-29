![](https://fleetweb-pt.cartrack.com/assets/cartrack-menu-logo-black.svg)

### The following information is completely confidential and should not be shared by any means neither should be used for purposes other than the Cartrack Technologies Tech Challenge.

### This API is organized around REST. Our API accepts form-encoded request bodies and query strings for some cases; returns JSON-encoded responses, and uses standard HTTP response codes, and verbs.

# The Project

For this project you will need (at least) to install an extra library, and that would be:
[google-map-react](https://github.com/google-map-react/google-map-react)
You can install it by doing: `yarn add google-map-react`

And use our private development API key for google maps:
Google Maps API Key -> `AIzaSyCOlDs0H56Q6YH1ZeNwqTU7CT7g-CMGsWY`

This project consists of only 2 screens.

The **first** screen is a full screen map view (or not, up to you) that loads all the flights positions that you can get from `GET /allFlights`. (For API docs refer to the `APIDocumentation.md` file present on this project)
Make sure that you update the positions of the airplanes every N number of seconds so that the airplanes keep their position updated on the map. (Just don't make the update every second, choose something between 10 to 20 seconds)

For the airplane map marker you will need to use the image that is located on `src/images/airplane.png`.
On this API endpoint `GET /allFlights` you have a property called `true_track` that you can use to point that image according to what that value (`true_track`) represents.

### Take flightradar24.com as an example

![](https://cld.pt/dl/download/f136098f-f559-4a21-9518-4ff0e3062a86/readme-example.png)

The **second** screen (let's assume that you clicked on an airplane marker on the map) is a detailed view of that airplane with all the information that you got from `GET /allFlights`.

To get all the images of all the airplanes present in our DB you should call `GET /jetPhotos` and check if the airplane ICAO is present in any of the images present in what was returned from that endpoint.

If there is no image matching that airplane's icao code you will need to create one (in our DB).
Call `GET /airplaneImages/:icao` and then you can upload any of the returned images to `POST /jetPhotos` after that you will be able to get the recently uploaded image from `GET /jetPhotos`.

### The FLOW of the **second** screen calls:

Call `GET /jetPhotos` and check if there is any entry that matches your airplane ICAO code

- If so, use that image.

If not, ask our API for 5 images of that airplane with:

- Call `GET /airplaneImages/:icao`

If you get any image from that endpoint you need to send it to our DB:

- `POST /jetPhotos`
- `{username: '<your real name>', airplane_icao: '<the airplane icao>', airplane_image: '<the image URL>'}`

After that, and if the response from the endpoint is OK, you should be able to get all the images from `GET /jetPhotos`.
You should always load the images in the front-end with `GET /jetPhotos` and **NOT** from `GET /airplaneImages/:icao`
...
`GET /airplaneImages/:icao` acts just as an "external API" to get images from the internet.

On the second screen you should also be able to:

- Update the current airplane image (in our DB) with another one from `GET /airplaneImages/:icao`
- Delete an existing image with `DELETE /jetPhotos/:imageId`

Both screens shoud have different URL pahts.
EG:

- Screen1: `localhost:3000/`
- Screen2: `localhost:3000/airplaneDetail`

The project boilerplate that was sent to you has a file called `api-interfaces.ts`, that you will need to make use of that to type API responses accordingly.

Using TypeScript is highly recommended for this project.
Design wise we would recoment using StyledComponents but you are free to use any other lib.
Make sure you don't upload the whole project in one commit, we want to see your GIT skills!

If you are uploading your project to bitbucket make sure you add:

- `mario.bento@cartrack.com`
- `rodrigo.faria@cartrack.com`
- `tiago.sousa@cartrack.com`

with `READ` permissions.

If you're not uploading to BitBucket, add the same emails to your desired GIT provider.
