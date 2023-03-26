import {
  GoogleMap,
  DistanceMatrixService,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const Distance = (props) => {
  const key = process.env.REACT_APP_API_KEY;

  const fetchDistance = async (destination) => {
    const newDestinations = props.places.filter(
      (dest) => dest.placeId !== destination.placeId
    );
    const url = new URL(
      "https://maps.googleapis.com/maps/api/distancematrix/json?"
    );
    url.searchParams.append("origins", "place_id:" + destination.placeId);
    const param = props.places
      .filter((dest) => dest !== destination)
      .map((dest) => "place_id:" + dest.placeId);
    url.searchParams.append("destinations", param.join("|"));
    url.searchParams.append("key", key);
    const res = await axios.get(url.href);
    let distances = {};
    for (let i = 0; i < newDestinations.length; i++) {
      var yourTime =
        res.data.rows[0].elements[i].duration.text.split(" ") || "";
      var result = 0;
      var index = 0;
      if (yourTime.indexOf("days") !== -1 || yourTime.indexOf("day") !== -1) {
        index =
          yourTime.indexOf("days") > yourTime.indexOf("day")
            ? yourTime.indexOf("days")
            : yourTime.indexOf("day");
        result += parseInt(yourTime[index - 1]) * 24 * 60;
      }
      if (yourTime.indexOf("hours") !== -1 || yourTime.indexOf("hour") !== -1) {
        index =
          yourTime.indexOf("hours") > yourTime.indexOf("hour")
            ? yourTime.indexOf("hours")
            : yourTime.indexOf("hour");
        result += parseInt(yourTime[index - 1]) * 60;
      }
      if (yourTime.indexOf("mins") !== -1 || yourTime.indexOf("min") !== -1) {
        index =
          yourTime.indexOf("mins") > yourTime.indexOf("min")
            ? yourTime.indexOf("mins")
            : yourTime.indexOf("min");
        result += parseInt(yourTime[index - 1]);
      }

      distances[newDestinations[i].name] = result;
    }
    return { ...destination, distances: { ...distances } };
  };
  useEffect(() => {
    async function findDistances() {
      const newDest = await Promise.all(
        props.places.map(
          async (destination) => await fetchDistance(destination)
        )
      );
      props.setPlaces(newDest);
      console.log(newDest);
    }
    findDistances();
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
  });

  return <h1>Distance</h1>;
};

export default Distance;
