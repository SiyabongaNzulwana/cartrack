![](https://fleetweb-pt.cartrack.com/assets/cartrack-menu-logo-black.svg)
<br/><br/><br/><br/>

### The following information is completely confidential and should not be shared by any means neither should be used for purposes other than the Cartrack Technologies Tech Challenge.

### This API is organized around REST. Our API accepts form-encoded request bodies and query strings for some cases; returns JSON-encoded responses, and uses standard HTTP response codes, and verbs.



#### MAIN URL

`https://gentle-temple-27938.herokuapp.com/`

---

### Endpoints

### `GET` `/allFlights`

### Returns a two-dimensional array of airplanes that are currently in the air in mainland Portugal.

### Returns

    [
     [
        "4952c1",
        "TAP1710 ",
        "Portugal",
        -8.6949,
        41.3,
        251.46,
        51.96,
        168.58
      ],
      [ ... ]
    ]

### The returned array contains the following fields:

| Index | Property       | Type   | Description                                                                      |
| ----- | -------------- | ------ | -------------------------------------------------------------------------------- |
| 0     | icao24         | string | Unique ICAO 24-bit address of the transponder in hex string representation.      |
| 1     | callsign       | string | Callsign of the vehicle (8 chars). Can be null if no callsign has been received. |
| 2     | origin_country | string | Country name inferred from the ICAO 24-bit address.                              |
| 3     | longitude      | float  | WGS-84 longitude in decimal degrees. Can be null.                                |
| 4     | latitude       | float  | WGS-84 latitude in decimal degrees. Can be null.                                 |
| 5     | baro_altitude  | float  | Barometric altitude in meters. Can be null.                                      |
| 6     | velocity       | float  | Velocity over ground in m/s. Can be null.                                        |
| 7     | true_track     | float  | True track in decimal degrees clockwise from north (north=0°). Can be null.      |



**`GET` `/airplaneImages/:icao`**

### Returns a two-dimensional array of a maximum of 5 images of an airplane with a given ICAO code.

**This endpoint should only be used to populate `PUT /jetPhotos` if `GET /jetPhotos` does not return any image for a specific ICAO code.**

    [
        [
            "https://cdn.airport-data.com/images/aircraft/thumbnails/001/583/001583510.jpg",
            "leo larsen"
        ],
        [ ... ]
    ]

### The returned array contains the following fields:

| Index | Type   | Description                                          |
| ----- | ------ | ---------------------------------------------------- |
| 0     | string | Image URL of the airplane that matches the ICAO sent |
| 1     | string | Name of the image photographer                       |



**`GET` `/jetPhotos`**

### Gets all the images that were already inserted with the endpoint above.

**You should always check for the existence of a matching entry for a given ICAO before calling `airplaneImages/:icao`**

### Returns

    [
        {
            "_id": "60253fe73625f94c1837c13b",
            "username": "<your username>",
            "airplane_icao": "<the airplane icao>",
            "airplane_image": "<the airplane image url>",
            "__v": 0
        },
    	{ ... }
    ]



**`POST` `/jetPhotos`**

### Creates a matching entry with the following parameters:

| Parameter name | Type   | Description                                                                                                          |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| username       | string | Your github/bitbucket or any GIT service username                                                                    |
| airplane_icao  | string | Identifies a specific airplane. Get it from `GET /jetPhotos`                                                         |
| airplane_image | string | Image URL of the airplane with that specific `airplane_icao`. You can get the image from `GET /airplaneImages/:icao` |

### Returns

    {
        "_id": "60253fe73625f94c1837c13b",
        "username": "<your username>",
        "airplane_icao": "<the airplane icao>",
        "airplane_image": "<the airplane image url>",
        "__v": 0
    }



**`PUT` `/jetPhotos/:imageId`**

### If by any reason you want to update an image you can do so by doing the following:

**IMAGE TO UPDATE**

        {
    	"_id": "60253fe73625f94c1837c13b",
    	"username": "<your username>",
    	"airplane_icao": "<the airplane icao>",
    	"airplane_image": "<the airplane image url>",
    	"__v": 0
    }

`PUT /jetPhotos/60253fe73625f94c1837c13b`

### Request body params:

| Parameter name | Type   | Description                                                   |
| -------------- | ------ | ------------------------------------------------------------- |
| username       | string | Your github/bitbucket or any GIT service username             |
| airplane_icao  | string | Identifies a specific airplane. Get it from `GET /jetPhotos`  |
| airplane_image | string | Image URL of the airplane with that specific `airplane_icao`. |

### Returns

    {
        "_id": "60253fe73625f94c1837c13b",
        "username": "<your username updated>",
        "airplane_icao": "<the airplane icao updated>",
        "airplane_image": "<the airplane image url updated>",
        "__v": 0
    }



**`DELETE` `/jetPhotos/:imageId`**

### If by any reason you want to delete an image you can do so by doing the following:

**IMAGE TO DELETE**

    {
            "_id": "60253fe73625f94c1837c13b",
            "username": "<your username>",
            "airplane_icao": "<the airplane icao>",
            "airplane_image": "<the airplane image url>",
            "__v": 0
        }

`DELETE /jetPhotos/60253fe73625f94c1837c13b`

### Returns

    {
        "message": "Image successfully deleted"
    }


