
import React, { useContext } from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import { FlightsContext } from '../context/Context'
import AnyReactComponent from '../components/Flight'

interface FlightTypes {
  lat: number,
  lng: number,
  text: string,
  flightId: string
}

const MapView = () => {
  const { flights, setFlights } = useContext(FlightsContext)

  const coords = {
    lat: -15.786111,
    lng: 35.005833,
  }
  const zoom = 5

  React.useEffect(() => {
    const getFlights = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/allFlights`
      const { data: allFlights } = await axios.get(url)
      setFlights(allFlights)
    }
    getFlights()

  }, [])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY as string }}
        defaultCenter={coords}
        defaultZoom={zoom}
      >
        {flights.length > 0 && flights.map((flight, idx) => <AnyReactComponent
          key={idx}
          lat={flight[3]}
          lng={flight[4]}
          text={flight[1]}
          flightId={flight[0] as string}
          trueTrack={flight[7]}
        />)}
      </GoogleMapReact>
    </div>
  )
}

export default MapView
