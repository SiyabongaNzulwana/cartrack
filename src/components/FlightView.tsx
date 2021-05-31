
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FlightsContext } from '../context/Context'

const FlightView = () => {
  const { flights, setFlights } = useContext(FlightsContext)
  const [allPhotos, setAllPhotos] = React.useState([])
  const [airplaneImages, setAirplaneImages] = React.useState([])
  const { flightId } = useParams<{ flightId: string }>()
  const flight = flights.filter(flight => flight[0] === flightId)
  const options = ['icao2', 'callsign', 'origin_country', 'longitude', 'latitude ', 'baro_altitude', 'velocity', 'true_track']
  let flightImage = ''

  React.useEffect(() => {
    const getPhotos = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/jetPhotos`
      const { data: allPhotos } = await axios.get(url)
      setAllPhotos(allPhotos)
    }
    getPhotos()
  }, [])

  React.useEffect(() => {
    const getAirplaneImages = async () => {

      const url = `${process.env.REACT_APP_API_HOST}/jetPhotos` //Call GET /jetPhotos and check if there is any entry that matches your airplane ICAO code
      const { data: images } = await axios.get(url)
      /* @ts-ignore */
      const returnedImages = images.filter(item => item.airplane_icao === flightId)

      if (returnedImages.length) {
        if (returnedImages[0].airplane_icao) {
          flightImage = returnedImages[0].airplane_image //If so, use that image.
          console.log('flightImageGHMUM: ', flightImage)
        }
      } else {
        const url = `${process.env.REACT_APP_API_HOST}/airplaneImages/${flightId}` //If not, ask our API for 5 images of that airplane with:
        const { data: airplaneImages } = await axios.get(url) //Call GET /airplaneImages/:icao
        console.log('ELSE images: ', airplaneImages)
        setAirplaneImages(airplaneImages)

        if (airplaneImages.length > 0) { //If you get any image from that endpoint you need to send it to our DB:
          const url = `${process.env.REACT_APP_API_HOST}/jetPhotos`
          const flattenedData: [any] = airplaneImages.flat()
          console.log('flattenedData: ', flattenedData)
          const params: any = {
            username: 'Siyabonga Nzulwana',
            airplane_icao: flightId,
            airplane_image: flattenedData[0] as string
          }
          const { data: postedImage } = await axios.post(url, params)
          console.log('response: ', postedImage)
          if ( postedImage._id) {
            const url = `${process.env.REACT_APP_API_HOST}/jetPhotos` //Call GET /jetPhotos and check if there is any entry that matches your airplane ICAO code
            const { data: jetPhotos } = await axios.get(url)
            console.log('jetPhotos::: ', jetPhotos)
          }
        }
      }
    }
    getAirplaneImages()
  }, [allPhotos])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {
        flight.length &&
        <>
          {
            options && options.map((option, index) => <div key={index}>
              <span style={{ display: 'inline-block' }} >{option}:</span>
              <span style={{ display: 'inline-block' }}>{flight[0][index]}</span>
            </div>
            )
          }
        </>
      }
    </div>
  )
}

export default FlightView