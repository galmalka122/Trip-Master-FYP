import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
  DirectionsService,
} from "@react-google-maps/api";
import React, { useRef, useState, useCallback, useEffect } from "react";

export default function Directions(props) {
  const mapRef = useRef({});
  const wrapper = useCallback((node, ref, callback = () => {}) => {
    ref.current = node;
    callback();
  }, []);
  const logRef = () => {
    const address = mapRef.current.mapRef.innerText.split("\n");
    if (originInputRef.current.style.borderColor === "red") {
      originInputRef.current.value = address[0] + address[1];
      setIsOriginInputFocused(false);
      setIsDestInputFocused(true);
      setFields((prevFields) => {
        return { ...prevFields, origin: address[0] + address[1] };
      });
    }
    if (destInputRef.current.style.borderColor === "red") {
      destInputRef.current.value = address[0] + address[1];
      setIsDestInputFocused(false);
      setFields((prevFields) => {
        return { ...prevFields, destination: address[0] + address[1] };
      });
    }
  };

  const originInputRef = useRef(null);
  const [isOriginInputFocused, setIsOriginInputFocused] = useState();

  const destInputRef = useRef(null);
  const [isDestInputFocused, setIsDestInputFocused] = useState();
  useEffect(() => {
    if (originInputRef.current) {
      if (isOriginInputFocused) {
        originInputRef.current.style.borderColor = "red";
      } else {
        originInputRef.current.style.borderColor = "";
      }
    }
  }, [isOriginInputFocused]);
  useEffect(() => {
    if (destInputRef.current) {
      if (isDestInputFocused) {
        destInputRef.current.style.borderColor = "red";
      } else {
        destInputRef.current.style.borderColor = "";
      }
    }
  }, [isDestInputFocused]);
  const key = process.env.REACT_APP_API_KEY;
  const [fields, setFields] = useState({
    response: null,
    travelMode: "DRIVING",
    origin: "",
    destination: "",
  });
  const [response, setResponse] = useState(null);

  const directionsCallback = (response) => {
    console.log(response);

    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response);
      }
    } else {
      console.log("response: ", response);
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
  });

  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const options = { closeBoxURL: "", enableEventPropagation: true };

  const onClick = async (e) => {
    setTimeout(logRef, 10);
  };

  return (
    isLoaded && (
      <div className="map">
        <div className="map-settings">
          <hr className="mt-0 mb-3" />

          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="ORIGIN">Origin</label>
                <br />
                <input
                  id="ORIGIN"
                  className="form-control"
                  type="text"
                  ref={(node) => wrapper(node, originInputRef)}
                  onClick={() => {
                    setIsOriginInputFocused(true);
                    setIsDestInputFocused(false);
                  }}
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="DESTINATION">Destination</label>
                <br />
                <input
                  id="DESTINATION"
                  className="form-control"
                  type="text"
                  ref={(node) => wrapper(node, destInputRef)}
                  onClick={() => {
                    setIsOriginInputFocused(false);
                    setIsDestInputFocused(true);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap">
            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="DRIVING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={fields.travelMode === "DRIVING"}
                onChange={(e) =>
                  setFields({ ...fields, travelMode: e.target.id })
                }
              />
              <label className="custom-control-label" htmlFor="DRIVING">
                Driving
              </label>
            </div>

            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="BICYCLING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={fields.travelMode === "BICYCLING"}
                onChange={(e) => {
                  console.log(e);
                  setFields({ ...fields, travelMode: e.target.id });
                }}
              />
              <label className="custom-control-label" htmlFor="BICYCLING">
                Bicycling
              </label>
            </div>

            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="TRANSIT"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={fields.travelMode === "TRANSIT"}
                onChange={(e) =>
                  setFields({ ...fields, travelMode: e.target.id })
                }
              />
              <label className="custom-control-label" htmlFor="TRANSIT">
                Transit
              </label>
            </div>

            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="WALKING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={fields.travelMode === "WALKING"}
                onChange={(e) =>
                  setFields({ ...fields, travelMode: e.target.id })
                }
              />
              <label className="custom-control-label" htmlFor="WALKING">
                Walking
              </label>
            </div>
          </div>
        </div>

        <div className="map-container">
          <GoogleMap
            // required
            id="direction-example"
            // required
            mapContainerStyle={{
              height: "400px",
              width: "100%",
            }}
            center={center}
            zoom={10}
            ref={(node) => wrapper(node, mapRef)}
            onClick={onClick}
          >
            {fields.destination !== "" && fields.origin !== "" && (
              <DirectionsService
                // required
                options={{
                  destination: fields.destination,
                  origin: fields.origin,
                  travelMode: fields.travelMode,
                }}
                // required
                callback={directionsCallback}
              />
            )}

            {response !== null && (
              <DirectionsRenderer
                // required
                options={{
                  directions: response,
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    )
  );
}
