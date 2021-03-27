import React, { useState, useEffect } from "react";
import MapGL, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import marker from "./../assets/marker.png";
import axios from "axios";
import Amadeus from "amadeus";
import {
  Dropdown,
  InputGroup,
  FormControl,
  DropdownButton,
} from "react-bootstrap";
const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px",
};

const Map = () => {
  useEffect(() => {
    const amadeus = new Amadeus({
      clientId: "V6rUCDGrsB77XkbNmQiMYmJj0a5m2YzA",
      clientSecret: "TJQC4nss8yPbRSEd",
    });

    amadeus.referenceData.locations.pointsOfInterest
      .get({
        latitude: 17.385,
        longitude: 78.4867,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [viewport, setViewPort] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  const [fourSquareResponse, SetFourSquareResponse] = useState([]);

  const handleMapClick = async (e) => {
    const [longitude, latitude] = e.lngLat;
    setViewPort((prevState) => ({
      ...viewport,
      latitude: latitude,
      longitude: longitude,
      zoom: prevState.zoom + 2,
    }));

    getSights(viewport.latitude, viewport.longitude);

    // await this.props.showModal({ latitude, longitude });
  };

  const getSights = async (latitude, longitude) => {
    const endpoint = "https://api.foursquare.com/v2/venues/search?";
    const parameters = {
      client_id: "SUFVHQILGHMPEPHBJIOJOMNXA5ZQUDY4YI1JQZHXWLMH2MDA",
      client_secret: "RG45BFLYYVBAE0TNJHBTJ1513RRSJXZBXJJV01TXF3UUILKL",
      ll: "12.967758,77.754238",
      query: "sights",
      v: "20182507",
    };
    try {
      const data = await axios.get(endpoint + new URLSearchParams(parameters));
      const venues = data.data.response.venues;
      console.log(venues);
    } catch (err) {
      console.log(err.messag);
    }
  };

  const _onViewportChange = (viewport) => {
    setViewPort({ ...viewport, transitionDuration: 100 });
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <InputGroup className="mb-3">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title="Dropdown"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </DropdownButton>
        <FormControl aria-describedby="basic-addon1" />
      </InputGroup>

      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v8"
        onViewportChange={_onViewportChange}
        onClick={handleMapClick}
      >
        <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
          <div>
            <img src={marker} width="50px" />
          </div>
        </Marker>

        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </MapGL>
    </div>
  );
};

export default Map;
