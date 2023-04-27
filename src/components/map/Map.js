import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

const Map = (props) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBpp2ghW57shwPVSLc5AjLhYsbhRtL5f6k",
    });
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

    return (
        <div className="App">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={10}
                    onClick={props.onClick}
                />
            )}
        </div>
    );
};


export default Map;
