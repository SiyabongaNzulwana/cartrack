import "./App.css"
import MapView from "./components/MapView"
import { FlightsController } from "./context/Context"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import FlightView from "./components/FlightView"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FlightsController>
          <BrowserRouter>
            <Switch>
              <Route component={MapView} exact path={["/", "/home"]} />
              <Route component={FlightView} exact path="/flight/:flightId" />
            </Switch>
          </BrowserRouter>
        </FlightsController>
      </header>
    </div>
  )
}

export default App
