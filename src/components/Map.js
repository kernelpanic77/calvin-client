import React, { useState } from "react";
import MapGL, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import marker from "./../assets/marker.png";
import axios from "axios";
import {
  Dropdown,
  InputGroup,
  FormControl,
  DropdownButton,
} from "react-bootstrap";
import { routes } from "../utils/Mapper";

import VerticleModal from './VerticleModal';

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px",
};

const Map = () => {
  const [viewport, setViewPort] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  const [fourSquareResponse, SetFourSquareResponse] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleMapClick = async (e) => {
    const [longitude, latitude] = e.lngLat;
    setViewPort((prevState) => ({
      ...viewport,
      latitude: latitude,
      longitude: longitude,
      zoom: prevState.zoom + 2,
    }));
    getSights(viewport.latitude, viewport.longitude);

    handleShowModal();
    // await this.props.showModal({ latitude, longitude });
  };

  const getSights = async (
    latitude,
    longitude,
    endpoint = "4d4b7105d754a06374d81259"
  ) => {
    const baseURL = "https://api.foursquare.com/v2/venues/search?";
    const params = {
      client_id: "SUFVHQILGHMPEPHBJIOJOMNXA5ZQUDY4YI1JQZHXWLMH2MDA",
      client_secret: "RG45BFLYYVBAE0TNJHBTJ1513RRSJXZBXJJV01TXF3UUILKL",
      ll: `${viewport.latitude},${viewport.longitude}`,
      v: "20182507",
      categoryId: endpoint,
      radius: 10000,
    };
    try {
      const data = await axios.get(baseURL + new URLSearchParams(params));
      const venues = data.data.response.venues;
      SetFourSquareResponse(venues);
      console.log(fourSquareResponse);
    } catch (error) {
      console.log(error.message);
    }
  };

  const _onViewportChange = (viewport) => {
    setViewPort({ ...viewport, transitionDuration: 100 });
  };

  const fetchDropDownEndpoint = async (endpoint) => {
    const baseURL = "https://api.foursquare.com/v2/venues/search?";
    const params = {
      client_id: "SUFVHQILGHMPEPHBJIOJOMNXA5ZQUDY4YI1JQZHXWLMH2MDA",
      client_secret: "RG45BFLYYVBAE0TNJHBTJ1513RRSJXZBXJJV01TXF3UUILKL",
      ll: `${viewport.latitude},${viewport.longitude}`,
      v: "20182507",
      categoryId: endpoint.toString(),
      radius: 10000,
    };
    try {
      const data = await axios.get(baseURL + new URLSearchParams(params));
      const venues = data.data.response.venues;
      SetFourSquareResponse(venues);
      console.log(fourSquareResponse);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ margin: "0 auto" }}>

      <VerticleModal
        show={showModal}
        onHide={() => handleCloseModal()}
      />
      <InputGroup className="mb-3">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title="Category"
          id="input-group-dropdown-1"
        >
          {routes.map((curr, idx) => (
            <Dropdown.Item
              href="#"
              key={idx}
              onClick={() => fetchDropDownEndpoint(curr.endpoint)}
            >
              {curr.action}
            </Dropdown.Item>
          ))}
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
