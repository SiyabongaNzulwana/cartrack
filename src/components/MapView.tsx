
import React, { useContext } from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import { FlightsContext } from '../context/Context'
import { useHistory } from 'react-router'
import AnyReactComponent from '../components/Flight'

interface FlightTypes {
  lat: number,
  lng: number,
  text: string,
  flightId: string
}

// const AnyReactComponent = ({ text, flightId }: FlightTypes) => {
//   const history = useHistory()
//   return <div onClick={() => {history.push(`/flight/${flightId}`)}}> {text}<img width={40} height={40} src={require('../images/airplane.png')} /></div>
// }


const MapView = () => {
  const { flights, setFlights } = useContext(FlightsContext)

  const coords = {
    lat: 6.3690,
    lng: 34.8888,
  }
  const zoom = 1

  React.useEffect(() => {
    const getFlights = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/allFlights`
      const { data: allFlights } = await axios.get(url);
      // const actualFlights: any = allFlights.map((flight: any, idx: number) => ({[idx]: flight}))
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
        />)}
      </GoogleMapReact>
    </div>
  )
}

export default MapView
