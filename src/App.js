import "./App.css";
import Map from "./components/Map";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <div className="App">
        <Map />
      </div>
      <div>
        <div>
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
