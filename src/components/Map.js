import React, { useState, useEffect } from "react";
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

import VerticleModal from "./VerticleModal";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px",
};

export const Map = () => {
  const [viewport, setViewPort] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  const [foundLocations, setFoundLocations] = useState([]);
  const [fourSquareResponse, SetFourSquareResponse] = useState([]);
  const [currentRoute, setCurrentRoute] = useState();

  useEffect(() => {
    getSights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute]);

  useEffect(() => {
    //* idhar dekho bro
    console.log(fourSquareResponse);
    postApiResponseToDb(fourSquareResponse);
    fetchNearByRatings(fourSquareResponse);
  }, [fourSquareResponse]);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleMapClick = async (e) => {
    const [longitude, latitude] = e.lngLat;
    setViewPort(
      (prevState) => ({
        ...viewport,
        latitude: latitude,
        longitude: longitude,
        zoom: prevState.zoom < 16 ? prevState.zoom + 2 : prevState.zoom,
      }),
      () => {
        getSights();
      }
    );
    // getSights();
      handleShowModal();
    // await this.props.showModal({ latitude, longitude });
  };

  const fetchNearByRatings = async (responseArray) => {
    console.log(responseArray);
    responseArray.forEach(async (current) => {
      const options = {
        body: {
          fourSquareId: current.fourSquareId,
        },
      };
      try {
        const location = await axios.get(
          "http://localhost:5000/location",
          options
        );
        setFoundLocations([...foundLocations, location]);
      } catch (err) {
        console.log(err.message);
      }
    });
    console.log("\n\nsuccess!!!\n\n");
  };

  const postApiResponseToDb = async (data) => {
    // data.forEach(async (element) => {
    data.forEach(async (element) => {
      try {
        const options = {
          body: {
            fourSquareId: element.id,
            latitude: element.location.lat,
            longitude: element.location.lng,
            name: element.name,
          },
        };
        const res = await axios.post("http://localhost:5000/location", options);
        console.log(res);
      } catch (err) {
        console.log(err.message);
      }
    });
  };

  const getSights = async () => {
    if (viewport.latitude && viewport.longitude && currentRoute) {
      const baseURL = "https://api.foursquare.com/v2/venues/search?";
      const params = {
        client_id: "SUFVHQILGHMPEPHBJIOJOMNXA5ZQUDY4YI1JQZHXWLMH2MDA",
        client_secret: "RG45BFLYYVBAE0TNJHBTJ1513RRSJXZBXJJV01TXF3UUILKL",
        ll: viewport.latitude + "," + viewport.longitude,
        v: "20182507",
        categoryId: currentRoute,
        radius: 10000,
      };
      try {
        const data = await axios.get(baseURL + new URLSearchParams(params));
        console.log(baseURL + new URLSearchParams(params));
        console.log(currentRoute);

        const venues = data.data.response.venues;
        SetFourSquareResponse(venues);
        // handleShowModal();
        // console.log(fourSquareResponse);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const _onViewportChange = (viewport) => {
    setViewPort({ ...viewport, transitionDuration: 100 });
  };

  const fetchDropDownEndpoint = async (endpoint) => {
    // const baseURL = "https://api.foursquare.com/v2/venues/search?";
    // const params = {
    //   client_id: "SUFVHQILGHMPEPHBJIOJOMNXA5ZQUDY4YI1JQZHXWLMH2MDA",
    //   client_secret: "RG45BFLYYVBAE0TNJHBTJ1513RRSJXZBXJJV01TXF3UUILKL",
    //   ll: `${viewport.latitude},${viewport.longitude}`,
    //   v: "20182507",
    //   categoryId: endpoint.toString(),
    //   radius: 10000,
    // };
    // try {
    //   const data = await axios.get(baseURL + new URLSearchParams(params));
    //   const venues = data.data.response.venues;
    //   SetFourSquareResponse(venues);
    //   console.log(fourSquareResponse);
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <VerticleModal show={showModal} onHide={() => handleCloseModal()} LocType={currentRoute} />
      <InputGroup className="mb-3">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={currentRoute}
          id="input-group-dropdown-1"
        >
          {routes.map((curr, idx) => (
            <Dropdown.Item
              href="#"
              key={idx}
              onClick={() => {
                //console.log(curr.action);
                //console.log(currentRoute);
                //console.log(curr.endpoint);
                setCurrentRoute(curr.endpoint);
                //console.log(currentRoute);
                // getSights();
              }}
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
