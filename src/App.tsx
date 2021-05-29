import './App.css';
import MapView from './components/MapView'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={'cartrack-logo.svg'} className="App-logo" alt="logo" />
        <p>
          Welcome to Cartrack's Front-End Tech Challenge.
        </p>
        <p>
          Happy Coding!
        </p>
        <MapView/>
      </header>
    </div>
  );
}

export default App;
