import React, {useState} from 'react';
import {Panel} from "primereact/panel";
import useTripContext from "../../core/hooks/useTripContext";
import {GoogleMap} from "@react-google-maps/api";
import NearbySearchResults from "../NewMap1";
import {Dialog} from "primereact/dialog";
import Map from "./Map";

function MapContainer() {
    const {  selectedTrip } = useTripContext();
    const { country, city, starting_date, ending_date, lat, lng } = selectedTrip;
    const [map,setMap] = useState(null);
    const [selectedPlace,setSelectedPlace] = useState(null);
    const [center,setCenter] = useState({lat, lng});
    const [visible, setVisible] = useState(false);

    const onPlaceClick = (place)=> {
        setSelectedPlace(place);
        setVisible(true);
    }

    const header = (<div className="flex justify-content-center">
        Plan your trip
    </div>);
    return (
        <>
        <Panel header={header} className="h-full">
            <div className="grid h-100">
                <div className="col-8 h-auto" >
                    <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{ height: '80vh', width:"100%" }}
                        options={{
                            zoomControl: true,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: true,
                            gestureHandling: 'greedy'
                        }}
                        onLoad={map => setMap(map)}
                    >
                    </GoogleMap></div>
                    <div className="col">
                        {map && <NearbySearchResults lat={center.lat} lng={center.lng} mapRef={map} setCenter={setCenter} viewDetails={onPlaceClick}/>}
                    </div>
            </div>
        </Panel>
    <Dialog header="name" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <Map place={selectedPlace}/>
    </Dialog>
        </>
    )
}

export default MapContainer;