import React from "react"

interface Props {
  children: React.ReactNode;
}

interface FlightsProps {
  flights: any[]
  setFlights: (flights: any[]) => void
}

const flightsSate: FlightsProps = {
  setFlights: (flights: any[]) => { },
  flights: []
}; //structure of the empty object

export const FlightsContext = React.createContext(flightsSate) //empty object

export const FlightsController = (props: Props) => {
  const { children } = props
  const [flights, setFlights] = React.useState<any>([]);

  const value = React.useMemo(
    () => ({
      flights,
      setFlights,
    }),
    [flights, setFlights]
  );
  return (
    <FlightsContext.Provider value={value}>{children}</FlightsContext.Provider>
  )
}