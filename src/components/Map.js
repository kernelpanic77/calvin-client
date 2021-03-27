import React, { useState } from "react";
import MapGL, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import marker from "./../assets/marker.png";
import axios from "axios";
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
      ll: latitude + "," + longitude,
      query: "sights",
      v: "20182507",
    };
    try {
      const data = await axios.get(endpoint + new URLSearchParams(parameters));
      console.log(data);
    } catch (err) {
      console.log(err.messag);
    }
  };

  const _onViewportChange = (viewport) => {
    setViewPort({ ...viewport, transitionDuration: 100 });
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <h1
        style={{ textAlign: "center", fontSize: "25px", fontWeight: "bolder" }}
      >
        GeoLocator: Click To Find Your Location or click{" "}
        <a href="/search">here</a> to search for a location
      </h1>
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
          onGeolocate={(viewport) => {
            console.log(viewport);
            return;
          }}
        />
      </MapGL>
    </div>
  );
};

export default Map;
