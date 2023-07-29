// noinspection JSUnresolvedFunction

import React, {useEffect, useState} from 'react';
import {Panel} from "primereact/panel";
import useTripContext from "../../core/hooks/useTripContext";
import {GoogleMap} from "@react-google-maps/api";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {daysString} from "../trip/utils";
import NearBySearchContainer from "../nearbySearch/NearBySearchContainer";
import PlaceDetailContainer from "../place-details/PlaceDetailContainer";
import useToast from "../../core/hooks/useToast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


function MapContainer() {
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const { selectedTrip, addPlaceHandler } = useTripContext();
    const {day, places} = location.state;
    const {trip_id, country } = selectedTrip;
    const [map,setMap] = useState(null);
    const [selectedPlace,setSelectedPlace] = useState(null);
    const [center,setCenter] = useState(new window.google.maps.LatLng(selectedTrip.coords));
    const [visible, setVisible] = useState(false);
    useEffect(()=>{
        selectedPlace && setVisible(true);
    },[selectedPlace])

    const onPlaceClick = async (place)=> {
        setSelectedPlace(place);
        setCenter(new window.google.maps.LatLng(place.coords.place));
    }

    const onSavePlace = async (details) => {
        details.day_index = day.index;
        try {
            const place = await addPlaceHandler(trip_id, details);
            setVisible(false);
            toast.showSuccess("Place " + place.name + " added successfully");
        }
        catch (e) {
            console.log(e);
        }

    }

    const onPlaceHide = () => {
        setVisible(false)
        setSelectedPlace(null)
    }
    const header = <div className="flex justify-content-center">
        Plan your trip
    </div>;
    return (
        <>
            <Panel header={header} className="h-full">

                <Button title="Go back"  icon={<FontAwesomeIcon icon={faArrowLeft} />} onClick={() => navigate(-1)} />
                <div className="grid h-100">
                    <div className="col-12 h-auto" >
                        <GoogleMap
                            center={center}
                            zoom={15}
                            mapContainerClassName={"map-container"}
                            mapContainerStyle={{ height: '80vh', width:"100%" }}
                            options={{
                                zoomControl: true,
                                streetViewControl: false,
                                mapTypeControl: false,
                                fullscreenControl: true,
                                gestureHandling: 'greedy'
                            }}
                            onLoad={async map => {
                                await setMap(map);
                                places.forEach((place)=>{
                                    const marker = new window.google.maps.Marker({
                                        position: place.coords,
                                        map: map,
                                        title: place.name,
                                    });
                                    marker.addListener("click", ()=>{
                                        onPlaceClick(place);
                                    })

                                });
                            }
                            }
                        >{map && <NearBySearchContainer
                            dayPlaces={selectedTrip.trip_days[day.index].places}
                            lat={center.lat()}
                            lng={center.lng()}
                            map={map}
                            setCenter={setCenter}
                            viewDetails={onPlaceClick}/>}
                        </GoogleMap></div>
                    <div className="col">

                    </div>
                </div>
            </Panel>
            <Dialog header={country} visible={visible} style={{ width: '50vw' }} onHide={onPlaceHide}>
                <PlaceDetailContainer place={selectedPlace} day={daysString[day.day]} key={selectedPlace?.place_id} onSavePlace={onSavePlace}/>
            </Dialog>
        </>
    )
}

export default MapContainer;