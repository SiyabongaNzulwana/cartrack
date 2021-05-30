
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { FlightsContext } from '../context/Context'

const FlightView = () => {
  const { flights, setFlights } = useContext(FlightsContext)

  const { flightId } = useParams<{ flightId: string }>()

  const flight = flights.filter(flight => flight[0] === flightId)

  const options = [ 'icao2', 'callsign', 'origin_country', 'longitude', 'latitude ', 'baro_altitude', 'velocity', 'true_track']
  console.log('flightIdAPHA: ', flight)

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {
        flight.length &&
        <>
        {
          options && options.map((option, index) => <div>
            <span style={{ display: 'inline-block' }}>{option}:</span>
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