import React, {useEffect, useState} from 'react';
import {Panel} from "primereact/panel";
import useTripContext from "../../core/hooks/useTripContext";
import {GoogleMap} from "@react-google-maps/api";
import NearbySearchResults from "../NewMap1";
import {Dialog} from "primereact/dialog";
import {fetchDetails} from "./placeDetailsUtils";
import api from "../../core/api/tripAPI";
import PlaceDetailContainer from "./PlaceDetailContainer";

function MapContainer() {
    const { selectedTrip } = useTripContext();
    const { country, city, starting_date, ending_date, lat, lng } = selectedTrip;
    const {trip_id, country, city, starting_date, ending_date, lat, lng } = selectedTrip;
    const [map,setMap] = useState(null);
    const [selectedPlace,setSelectedPlace] = useState(null);
    const [center,setCenter] = useState({lat, lng});
    const [visible, setVisible] = useState(false);

    useEffect(()=>{
        selectedPlace && setVisible(true);
    },[selectedPlace])

    const onPlaceClick = async (place)=> {
        setSelectedPlace(place);
    }

    const onSavePlace = async (details) => {
        await api.addPlace(`${trip_id}`, details)
    }

    const onPlaceHide = () => {
        setVisible(false)
        setSelectedPlace(null)
    }
    const header = (<div className="flex justify-content-center">
        Plan your trip
    </div>);
    const header = <div className="flex justify-content-center">
        Plan your trip
    </div>;
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
                            onLoad={map => {
                                setMap(map)
                            }
                            }
                        >
                        </GoogleMap></div>
                    <div className="col">
                        {map && <NearbySearchResults lat={center.lat} lng={center.lng} mapRef={map} setCenter={setCenter} viewDetails={onPlaceClick}/>}
                    </div>
                </div>
            </Panel>
            <Dialog header={country} visible={visible} style={{ width: '50vw' }} onHide={onPlaceHide}>
                <PlaceDetailContainer place={selectedPlace} key={selectedPlace?.place_id} onSave={onSavePlace}/>
            </Dialog>
        </>
    )
}

export default MapContainer;