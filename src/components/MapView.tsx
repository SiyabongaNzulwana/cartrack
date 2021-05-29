
import React from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'


const AnyReactComponent = ({ text }: any) => <div>{text}</div>

const MapView = () => {

  const [ flights, setFlights ] = React.useState([])

  const coords = {
    lat: 59.95,
    lng: 30.33,
  }
  const zoom = 11

  React.useEffect(() => {
    const getFlights= async()=> {
      const url = `${process.env.REACT_APP_API_HOST}/allFlights`
      const results  =  await axios.get(url)
      console.log('results: ', results)
    }
    getFlights()
  },[])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY as string}}
        defaultCenter={coords}
        defaultZoom={zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  )
}

export default MapView
