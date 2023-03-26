import { GoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Card from "./Card";
import Place from "./Place";
//axios.defaults.baseURL = "http://localhost:16000";
function MyComponent(props) {
  const key = process.env.REACT_APP_API_KEY;
  const fields = ["formatted_address", "opening_hours", "rating", "name"];
  const [showCard, setShowCard] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => data?.name && setShowCard(true), [data]);
  const containerStyle = {
    width: "1000px",
    height: "800px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const isLoaded = props.isLoaded;
  const handleMarkerClick = async (marker) => {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json?"
    );
    url.searchParams.append("place_id", marker.placeId);
    url.searchParams.append("fields", fields);
    url.searchParams.append("key", key);

    const response = await axios(url.href);
    console.log(response);
    const today = new Date().getDay();
    setData({
      longitude: marker.latLng.lng(),
      latitude: marker.latLng.lat(),
      name: response.data.result.name,
      rating: response.data.result.rating,
      address: response.data.result.formatted_address,
      placeId: marker.placeId,
      hours: response.data.result?.opening_hours?.weekday_text || [],
    });
  };

  return (
    { isLoaded } && (
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMarkerClick}
        ></GoogleMap>
        {showCard === true && (
          <Place
            {...data}
            onSaveClick={() => props.onSaveClick(data)}
            setShowCard={() => setShowCard(false)}
          />
        )}
      </div>
    )
  );
}

export default MyComponent;
