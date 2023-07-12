import React, {useEffect, useState} from 'react';
import {Panel} from "primereact/panel";
import useTripContext from "../../core/hooks/useTripContext";
import {GoogleMap} from "@react-google-maps/api";
import {Dialog} from "primereact/dialog";
import {getDetails} from "use-places-autocomplete";
import {Button} from "primereact/button";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {daysString} from "../trip/utils";
import NearBySearchContainer from "../nearbySearch/NearBySearchContainer";
import PlaceDetailContainer from "../place-details/PlaceDetailContainer";
import useToast from "../../core/hooks/useToast";

function MapContainer({ route, navigation }) {
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const { selectedTrip, addPlaceHandler } = useTripContext();
    const {day} = location.state;
    const {trip_id, country, city, starting_date, ending_date } = selectedTrip;
    const [map,setMap] = useState(null);
    const [selectedPlace,setSelectedPlace] = useState(null);
    let latitude = selectedTrip.latitude;
    let longitude = selectedTrip.longitude;
    const [center,setCenter] = useState({lat:latitude, lng:longitude});
    const [visible, setVisible] = useState(false);
    console.log(selectedTrip)
    useEffect(()=>{
        selectedPlace && setVisible(true);
    },[selectedPlace])
    const onPlaceClick = async (place)=> {
        setSelectedPlace(place);
        setCenter({lat:place.latitude, lng:place.longitude});
    }

    const onSavePlace = async (details) => {
        details.day_index = day.index;
        try {
            const place = await addPlaceHandler(trip_id, details);
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

                <Button title="Go back" onClick={() => navigate(-1)} />
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
                                await setMap(map)
                            }
                            }
                        >{map && <NearBySearchContainer dayPlaces={selectedTrip.places[day.index]} lat={center.lat} lng={center.lng} map={map} setCenter={setCenter} viewDetails={onPlaceClick}/>}
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