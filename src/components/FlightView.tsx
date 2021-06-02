import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { FlightsContext } from "../context/Context"
import { FileUploader } from "../components/FileUploader"

interface FlightImageProps {
  flightId: string
  flightImageUrl: string
  flightIcao: string
}
const FlightView = () => {
  const { flights, setFlights } = useContext(FlightsContext)
  const [allPhotos, setAllPhotos] = React.useState([])
  const [isUpdate, setIsUpdate] = React.useState(false)
  const [file, setFile] = React.useState<FormData>()
  const [image, setImage] = React.useState<File>()
  const [selectedFile, setSelectedFile]: any = React.useState()


  // TODO: Change to string instead of array of strings
  const [allAirplaneImages, setAirplaneImages] = React.useState<string[]>([])
  const [flightImage, setFlightImage] = React.useState<FlightImageProps>({
    flightId: "",
    flightIcao: "",
    flightImageUrl: "",
  })
  console.log({ allAirplaneImages })
  const { flightId } = useParams<{ flightId: string }>()
  const flight = flights.filter((flight) => flight[0] === flightId)
  const options = [
    "icao2",
    "callsign",
    "origin_country",
    "longitude",
    "latitude ",
    "baro_altitude",
    "velocity",
    "true_track",
  ]

  React.useEffect(() => {
    const getAirplaneImages = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/jetPhotos`
      const { data: images } = await axios.get<[]>(url)
      /*@ts-ignore*/
      const returnedImages: any[] = images.filter((item) => item.airplane_icao === flightId)
      console.log({ returnedImages })
      if (returnedImages.length) {
        if (returnedImages[0].airplane_icao) {
          setFlightImage({
            flightImageUrl: returnedImages[0].airplane_image,
            flightIcao: returnedImages[0].airplane_icao,
            flightId: returnedImages[0]._id,
          })
        }
      } else {
        const url = `${process.env.REACT_APP_API_HOST}/airplaneImages/${flightId}`
        const { data: airplaneImages } = await axios.get(url)

        if (airplaneImages.length > 0) {
          //If you get any image from that endpoint you need to send it to our DB:
          // TODO: Move to top level
          const url = `${process.env.REACT_APP_API_HOST}/jetPhotos`
          const flattenedData: [any] = airplaneImages.flat()
          const params: any = {
            username: "Siyabonga Nzulwana",
            airplane_icao: flightId,
            airplane_image: flattenedData[0] as string,
          }
          const { data: postedImage } = await axios.post(url, params)
          if (postedImage && postedImage._id) {
            setFlightImage({
              flightImageUrl: postedImage.airplane_image,
              flightIcao: postedImage.airplane_icao,
              flightId: postedImage._id,
            })
          }
        }
      }
    }
    getAirplaneImages()
  }, [allPhotos])

  const handleUpdate = async (icao: string) => {
    const { data: postedImage } = await axios.put(
      `${process.env.REACT_APP_API_HOST}/jetPhotos/${flightImage.flightId}`,
      {
        username: "SiyabongaNzulwana",
        airplane_icao: flightImage.flightId,
        airplane_image: file,
      }
    )

    console.log({ postedImage })
    if (postedImage) {
      setFlightImage({
        flightImageUrl: postedImage.airplane_image,
        flightIcao: postedImage.airplane_icao,
        flightId: postedImage._id,
      })
    }
  }
  const handleDelete = (icao: string) => { }
  const handleSubmission = async () => {
    const formData = new FormData()
    formData.append('File', selectedFile)
    await axios.put(`${process.env.REACT_APP_API_HOST}/jetPhotos/${flightImage.flightId}`, formData)
      .then((response) => response)
      .then((result) => {
        setSelectedFile(result)
        setIsUpdate(false)
      })
      .catch((error) => console.error('Error:', error))
  }

  console.log({ flightImage })
  return (
    <div style={{ height: "100vh", width: "50%" }}>
      <img src={flightImage.flightImageUrl} />
      <div>
        {!file && (<button onClick={() => { setIsUpdate(true) }}> Update </button>)}
        {file && (<button onClick={() => { handleUpdate(flightId) }}> Okay </button>)}
        <button onClick={() => handleDelete(flightId)}>Delete</button>
        {
        isUpdate &&
        <FileUploader
          url={`${process.env.REACT_APP_API_HOST}/jetPhotos/${flightImage.flightId}`}
          flightId={flightId}
          handleSubmission={handleSubmission}
        />
      }
      </div>
      {flight.length > 0 && (
        <>
          {options &&
            options.map((option, index) => (
              <div
                key={index}
                style={{
                  justifyContent: "center",
                  paddingTop: 35,
                  marginTop: 15,
                  justifyItems: "flex-start",
                  alignSelf: "flex-start",
                  paddingRight: 10,
                }}
              >
                <span
                  style={{
                    padding: 10,
                    alignSelf: "flex-start",
                    color: "#000",
                    borderRadius: 10,
                    backgroundColor: "#f47735",
                    fontStyle: "inherit",
                  }}
                >
                  {option}
                </span>
                <span
                  style={{
                    padding: 10,
                    alignSelf: "flex-start",
                    backgroundColor: "grey",
                    border: "1px solid",
                    borderRadius: 10,
                  }}
                >
                  {flight[0][index]}
                </span>
              </div>
            ))}
        </>
      )}
    </div>
  )
}

export default FlightView
