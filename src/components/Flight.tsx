import { useHistory } from "react-router"
import airplaneImage from "../images/airplane.png"

interface FlightTypes {
  lat: number
  lng: number
  text: string
  flightId: string
  trueTrack: number
}

const AnyReactComponent = ({ text, flightId, trueTrack }: FlightTypes) => {
  const history = useHistory()
  return (
    <div
      onClick={() => {
        history.push(`/flight/${flightId}`)
      }}
    >
      {" "}
      {text}
      <img
        width={40}
        height={40}
        src={airplaneImage}
        style={{
          transform: `rotate(${trueTrack}deg)`,
        }}
      />
    </div>
  )
}

export default AnyReactComponent
