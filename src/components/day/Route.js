import React, {useState} from 'react';
import useTripContext from "../../core/hooks/useTripContext";
import {GoogleMap} from "@react-google-maps/api";

const Route = ({route}) => {

    const { selectedTrip } = useTripContext();
    const latLng = {lat: selectedTrip.latitude, lng: selectedTrip.longitude};
    const [center,setCenter] = useState(latLng);
    const [map,setMap] = useState(null);

    const routePlanCoordinates = route.map((place, index)=>{
        return {lat: place.latitude, lng: place.longitude}
    })
    routePlanCoordinates.push()


    return (
        <div>
            <GoogleMap
                center={center}
                zoom={15}
                mapTypeId={"terrain"}
                mapContainerClassName={"map-container"}
                mapContainerStyle={{ height: '80vh', width:"100%" }}
                options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
                    gestureHandling: 'greedy',
                }}
                onLoad={async map => {
                    await setMap(map)
                    const flightPath = await new window.google.maps.Polyline({
                        path: routePlanCoordinates,
                        geodesic: true,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                    });
                    flightPath.setMap(map);
                }
            }>
            </GoogleMap>
        </div>
    );
};

export default Route;