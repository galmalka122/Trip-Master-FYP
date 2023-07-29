import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import useTripContext from "../../core/hooks/useTripContext";
import {daysString} from "../trip/utils";
import PlaceDetailContainer from "../place-details/PlaceDetailContainer";
import {Dialog} from "primereact/dialog";
import PlacesAutocomplete from "../map/PlacesAutocomplete";
import Route from "./Route";
import {Calendar} from "primereact/calendar";
import {getDayIndex, getRouteRequest, hoursLimit} from "./utils";
import PlacesData from "./PlacesData";
import moment from "moment";
import RouteOptions from "./RouteOptions";
import { getRoadCoords } from "../nearbySearch/googleUtils";


const Day = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedTrip, calculateRouteHandler, updateTripDayHandler } = useTripContext();
    const {day} = location.state;
    const defaultHour = hoursLimit(1,0);
    const [validated, setValidated] = useState(false);
    const [places, setPlaces] = useState(day.index < selectedTrip.trip_days.length ?  selectedTrip.trip_days[day.index].places : []);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const initialPlaceState = {
        priority: 1,
        interestLevel: 1,
        duration: defaultHour,
    };
    const [placesStates, setPlacesStates] = useState( Array.from({ length: places.length }, () => ({ ...initialPlaceState }))   );
    // eslint-disable-next-line no-unused-vars
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [differentDestination, setDifferentDestination] = useState(false);
    const t = new Date()
    // eslint-disable-next-line no-unused-vars
    const [startingTime, setStartingTime] = useState("16:45");
    const [endingTime, setEndingTime] = useState(null);
    const [hasEndingTime, setHasEndingTime] = useState(false);
    const [routeVisible, setRouteVisible] = useState(false);
    const [route, setRoute] = useState(null);
    const [visible, setVisible] = useState(false);
    const [travelMode, setTravelMode] = useState(window.google.maps.TravelMode.DRIVING);
    const [transitOptions, setTransitOptions] = useState(["BUS"])
    const [drivingOptions, setDrivingOptions] = useState([]);
    const [routeOptions, setRouteOptions] = useState(null);

    const ref = useRef(null);

    const dayDate = moment(day.datetime, "MM-DD-YYYY").day();
    const dayIndex = dayDate % 7;

    useEffect(() => {
        selectedPlace && setVisible(true);
    }, [selectedPlace]);

    const calculateRoute = async () => {
        if (validateForm()) {
            try {
                origin.coords.road = await getRoadCoords(origin);
                let newTripDay = {
                    origin: origin,
                    places: places
                }
                if (differentDestination) {
                    destination.coords.road = await getRoadCoords(destination);
                    newTripDay.destination = destination;
                }
                let routeOptions = {travelMode: travelMode}
                if (travelMode === window.google.maps.TravelMode.DRIVING) {
                    routeOptions.avoidFerries = drivingOptions.includes("FERRIES");
                    routeOptions.avoidHighways = drivingOptions.includes("HIGHWAYS");
                    routeOptions.avoidTolls = drivingOptions.includes("TOLLS");
                } else if (travelMode === window.google.maps.TravelMode.TRANSIT) {
                    routeOptions.transitOptions = {
                        modes: transitOptions
                    }
                }
                const tripDay = await updateTripDayHandler(selectedTrip.trip_id, getDayIndex(selectedTrip.starting_date,day.datetime), newTripDay);
                let placesRequest = [tripDay.origin, ...tripDay.places];
                if (destination) placesRequest.push(tripDay.destination);
                const request = await getRouteRequest(selectedTrip, placesRequest, startingTime, day, dayIndex, placesStates, routeOptions, differentDestination);
                if (endingTime) request.endingTime = endingTime;
                request.differentDestination = differentDestination;
                setRouteOptions(routeOptions);
                const route = await calculateRouteHandler(request);
                setRoute(route);
                setValidated(true);
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    const validateForm = () => {
        if (!origin) {
            return false;
        }
        if (differentDestination && !destination) {
            return false;
        }
        if (!startingTime) {
            return false;
        }
        return true;
    }

    const clearForm = () => {
        setOrigin(null);
        setDestination(null);
        setDifferentDestination(false);
        setStartingTime(null);
        setEndingTime(null);
        setHasEndingTime(false);
        setValidated(false);
        setDrivingOptions([]);
        setTransitOptions(["BUS"]);
        setTravelMode(window.google.maps.TravelMode.DRIVING);
    }

    return (
        <div className="card gap-2">
            <div className="flex p-2 m-auto gap-2">
                <Button label="Back" className="p-button-secondary" onClick={() => navigate(-1)}/>
                <Button label="Find Places Nearby" className="p-button-secondary" onClick={() => navigate("/members/search",{state:{day: day, places: places}})}/>
                <Button label="Find the best route" className="p-button-secondary" onClick={()=>setRouteVisible(true)}/>
            </div>
            <Dialog header="Route"
                    visible={routeVisible}
                    style={{ width: '80vw', height: '80vh' }}
                    onHide={() => {
                        setRouteVisible(false);
                        setValidated(false);
                        clearForm();
                    }}
                    ref={ref}
            >
                {!validated && <div className="flex flex-column">
                    <div className="d-flex justify-content-center">
                        <PlacesAutocomplete setSelected={setOrigin} disabled={false} placeholder="Select origin"/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Checkbox
                            id="destination"
                            onChange={e => {
                                setDifferentDestination(e.checked)
                            }}
                            checked={differentDestination}
                            className="align-self-center"
                        />
                        <label htmlFor="destination" className="ml-2">Destination (optional)</label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <PlacesAutocomplete setSelected={setDestination} disabled={!differentDestination} placeholder="Select destination (optional)"/>
                    </div>
                    <div className="d-flex justify-content-center gap-3 pt-2">
                        <Calendar
                            placeholder="Select starting time"

                            stepMinute={15}
                            value={startingTime}
                            onChange={(e) => setStartingTime(e.value)}
                            timeOnly
                        />
                    </div>
                    <div className="d-flex justify-content-center pt-2">
                        <Checkbox
                            id="ending-time"
                            className="align-self-center"
                            onChange={e => {
                                setHasEndingTime(e.checked)
                            }} checked={hasEndingTime}/>
                        <label htmlFor="ending-time" className="ml-2">Ending Time (optional)</label>
                    </div>

                    <div className="d-flex justify-content-center gap-3 pt-2">
                        <Calendar
                            stepMinute={15}
                            placeholder="Select ending time (optional)"
                            value={endingTime}
                            disabled={!hasEndingTime}
                            onChange={(e) => setEndingTime(e.value)}
                            timeOnly
                        />
                    </div>
                    <RouteOptions transitOptions={transitOptions}
                                  setTransitOptions={setTransitOptions}
                                  travelMode={travelMode}
                                  setTravelMode={setTravelMode}
                                  drivingOptions={drivingOptions}
                                  setDrivingOptions={setDrivingOptions}
                    />
                    <div className="d-flex justify-content-center gap-3">
                        <Button label="Calculate" className="p-button-secondary mt-2 w-auto" onClick={async() => await calculateRoute()}/>
                        <Button label="Clear" className="p-button-secondary mt-2" onClick={() => clearForm()}/>
                    </div>
                </div>}
                {validated && <Route route={route} date={startingTime} routeOptions={routeOptions} dayDate={day.datetime}/>}
            </Dialog>
            <Dialog header={selectedTrip.country} visible={visible} style={{ width: '50vw' }} onHide={()=>{
                setVisible(false)
                setSelectedPlace(null)
            }}>
                <PlaceDetailContainer place={selectedPlace} day={daysString[day.day]} key={selectedPlace?.place_id}/>
            </Dialog>
            <PlacesData onSelectPlace={setSelectedPlace}
                        day={day}
                        places={places}
                        setPlaces={setPlaces}
                        placesStates={placesStates}
                        setPlacesStates={setPlacesStates}/>
        </div>
    );
};

export default Day;