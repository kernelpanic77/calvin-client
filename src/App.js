import "./App.css";
import Map from "./components/Map";
import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Fragment>
      <div className="App">
        <Map />
      </div>
    </Fragment>
  );
}

export default App;
