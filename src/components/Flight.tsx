import { useHistory } from 'react-router'

interface FlightTypes {
  lat: number,
  lng: number,
  text: string,
  flightId: string
}
const placeholderImage = 'https://cdn.airport-data.com/images/aircraft/thumbnails/001/572/001572634.jpg'
const AnyReactComponent = ({ text, flightId }: FlightTypes) => {
  const history = useHistory()
  return <div onClick={() => {history.push(`/flight/${flightId}`)}}> {text}<img width={40} height={40} src={placeholderImage} /></div>
}

export default AnyReactComponent