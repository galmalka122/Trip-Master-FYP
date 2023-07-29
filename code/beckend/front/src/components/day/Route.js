import React, { useState, useEffect } from 'react';
import useTripContext from "../../core/hooks/useTripContext";
import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import {adjustTimezone} from "./utils";

const Route = ({ route, date, routeOptions, dayDate, destination=null }) => {
    const { selectedTrip } = useTripContext();
    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState([]);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);

    const getDirections = async () => {

        try {
            const directionsService = new window.google.maps.DirectionsService();
            const origin = new window.google.maps.LatLng(route.places[0].coords.road);
            if (routeOptions.travelMode === window.google.maps.TravelMode.TRANSIT) {
                let render = [];
                let curDate = adjustTimezone(dayDate, date, selectedTrip.timeOffset);
                await route.places.map(async (p, i) => {
                    if (i === route.places.length - 1) return;
                    let request = {
                        origin: new window.google.maps.LatLng(p.coords.road),
                        destination: new window.google.maps.LatLng(route.places[i + 1].coords.road),
                        travelMode: routeOptions.travelMode,
                        transitOptions: {
                            departureTime: curDate,
                            modes: routeOptions.transitOptions.modes,
                        }
                    }
                    await new Promise((resolve, reject) => {
                        directionsService.route(request, (result, status) => {
                                if (status === window.google.maps.DirectionsStatus.OK) {
                                    curDate = result.routes[0].legs[0].arrival_time.value;
                                    setDirectionsResponse((old)=>{
                                        const newDirections = [...old, result];
                                        return newDirections;
                                    });

                                } else {
                                    reject(new Error(`Directions request failed: ${status}`));
                                }
                            }
                        );
                    });


                })
                setDirectionsResponse(render);

            } else {

                const waypoints = route.places.slice(1, route.places.length - 1).map(place => ({
                    location: new window.google.maps.LatLng(place.coords.road),
                    stopover: true
                }));
                let request = {
                    origin: origin,
                    destination: route.places[route.places.length - 1].coords.road,
                    travelMode: routeOptions.travelMode,
                    waypoints: waypoints,
                }
                if (routeOptions.travelMode === window.google.maps.TravelMode.DRIVING) {
                    request = {
                        ...request,
                        drivingOptions: {
                            departureTime: adjustTimezone(dayDate, date, selectedTrip.timeOffset),
                            trafficModel: window.google.maps.TrafficModel.OPTIMISTIC,
                        },
                        avoidFerries: false,
                        avoidHighways: false,
                        avoidTolls: false,
                        provideRouteAlternatives: true
                    }
                }

                const response = await new Promise((resolve, reject) => {
                    directionsService.route(request, (result, status) => {
                            if (status === window.google.maps.DirectionsStatus.OK) {
                                resolve(result);
                            } else {
                                reject(new Error(`Directions request failed: ${status}`));
                            }
                        }
                    );
                });
                console.log(response);
                setDirectionsResponse([response]);
            }
        }
        catch (error) {
            console.error(error);
        }
        console.log("end")

    };

    return (
        <div className="row">
            <div className="col-8">
                <GoogleMap
                    zoom={15}
                    mapTypeId={"terrain"}
                    mapContainerClassName={"map-container"}
                    mapContainerStyle={{ height: '80vh', width: "100%" }}
                    options={{
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: true,
                        gestureHandling: 'greedy',
                    }}
                    onLoad={async (map) => {
                        console.log("map loaded")
                        setMap(map)
                        await getDirections();
                        console.log(map);
                    }}
                >
                    {directionsResponse.length > 0 && (
                        directionsResponse.map(d=>{
                            console.log(d);
                            return (<DirectionsRenderer
                            directions={d}
                            panel={document.getElementById("d-card")}
                            options={{
                                polylineOptions: {
                                    zIndex: 50,
                                    strokeColor: "#1976D2",
                                    strokeWeight: 5,
                                },
                            }}
                        />)})
                    )}
                </GoogleMap>
            </div>
            <div className="col-4">
                <div className="card p-sidebar-content" id="d-card"></div>
            </div>
        </div>
    );
}

export default Route;
