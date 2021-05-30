import { useHistory } from 'react-router'

interface FlightTypes {
  lat: number,
  lng: number,
  text: string,
  flightId: string
}

const AnyReactComponent = ({ text, flightId }: FlightTypes) => {
  const history = useHistory()
  return <div onClick={() => { history.push(`/flight/${flightId}`) }}> {text}<img width={40} height={40} src={require('../images/airplane.png')} /></div>
}

export default AnyReactComponent