import React, {createContext, useEffect, useRef, useState} from 'react';
import {useLoadScript} from "@react-google-maps/api";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [map, setMap] = useState(null);
    const [placesService, setPlacesService] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [ libraries ] = useState(['places', 'routes']);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries,
    });

    useEffect(() => {
        if (isLoaded) {
            setPlacesService(new window.google.maps.places.PlacesService(document.createElement('div')));
            setDirectionsService(new window.google.maps.DirectionsService());
            setDirectionsRenderer(new window.google.maps.DirectionsRenderer());
        }
    }, [isLoaded]);

    return isLoaded && (
        <MapContext.Provider value={map}>
                {children}
        </MapContext.Provider>
    )
}


export default MapContext;