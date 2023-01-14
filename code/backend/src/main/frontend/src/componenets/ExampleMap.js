import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useState } from "react";
import axios from "axios";
import React from "react";

function MyComponent() {
  const key = process.env.REACT_APP_API_KEY;
  const fields = ["formatted_address", "opening_hours", "rating", "name"];
  const [details, setDetails] = useState([]);

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const handleMarkerClick = (marker) => {
    const url = new URL(
      "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json"
    );
    url.searchParams.append("place_id", marker.placeId);
    url.searchParams.append("fields", fields);
    url.searchParams.append("key", key);
    var config = {
      method: "get",
      url: url.toString(),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <LoadScript googleMapsApiKey={key}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleMarkerClick}
      ></GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
