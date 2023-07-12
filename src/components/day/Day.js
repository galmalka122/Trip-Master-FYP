import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import useTripContext from "../../core/hooks/useTripContext";
import moment from "moment";
import {daysString} from "../trip/utils";
import PlaceDetailContainer from "../place-details/PlaceDetailContainer";
import {Dialog} from "primereact/dialog";
import PlacesAutocomplete from "../map/PlacesAutocomplete";
import Route from "./Route";

const Day = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {day} = location.state;
    const { selectedTrip, removePlaceHandler, calculateRouteHandler } = useTripContext();
    const [places, setPlaces] = useState(selectedTrip.places[day.index] || []);
    const [startingPoint, setStartingPoint] = useState({});
    const [route, setRoute] = useState([]);
    const [routeVisible, setRouteVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        selectedPlace && setVisible(true);
    }, [selectedPlace]);

    // find the index of the day in the opening hours array (0 - Monday, 6 - Sunday)

    const dayDate = moment(day.datetime, "MM-DD-YYYY").day();
    const dayIndex = dayDate % 7 === 0 ? 6 : dayDate - 1;

    const openingHoursTemplate = (rowData) => {
        if(rowData?.openingHours) {
            const hours = rowData?.openingHours[dayIndex];
            return rowData && (
                <div>
                    <span>{hours?.close ? `${hours?.open} - ${hours?.close}` : hours?.open}</span>
                </div>)
        }
        return <p>No opening hours</p>

    };


    const showDetailsButton = (rowData) => {
        return <Button  icon="pi pi-info" className="p-button-secondary" onClick={() => setSelectedPlace(rowData)}/>
    }

    const DeletePlaceButton = (rowData) => {
        return <Button icon="pi pi-times-circle"
                       className="p-button-secondary"
                       onClick={
                           async () => {
                               const reamoved = await removePlaceHandler(selectedTrip.trip_id, rowData.place_id, rowData.day_index);
                               if (reamoved) {
                                   setPlaces(places.filter(place => place.place_id !== rowData.place_id));
                               }
                           }
                       }/>
    }

    const calculateRoute = async () => {
        console.log("calculate route");
        const route = await calculateRouteHandler(selectedTrip.trip_id, day.index);
        console.log(route);
        setRoute(route);
        setRouteVisible(true);
    }


    return (
        <div className="card gap-2">
            <div className="flex p-2 m-auto">
                <Button label="Back" className="p-button-secondary" onClick={() => navigate(-1)}/>
                <Button label="Find Places Nearby" className="p-button-secondary" onClick={() => navigate("/members/search",{state:{day: day}})}/>
                <Button label="Find the best route" className="p-button-secondary" onClick={async() => await calculateRoute()}/>
            </div>
            <Dialog header="Header" visible={routeVisible} style={{ width: '50vw' }} onHide={() => setRouteVisible(false)}>
                <Route route={places} />
            </Dialog>
            <Dialog header={selectedTrip.country} visible={visible} style={{ width: '50vw' }} onHide={()=>{
                setVisible(false)
                setSelectedPlace(null)
            }}>
                <PlaceDetailContainer place={selectedPlace} day={daysString[day.day]} key={selectedPlace?.place_id}/>
            </Dialog>
            <PlacesAutocomplete setSelected={setStartingPoint} />
            {selectedTrip && <DataTable value={places}
                                        className="p-datatable-striped p-2"
                                        paginator rows={10}
                                        dataKey="place_id"
                                        emptyMessage="No places yet. Add some!"
            >
                <Column field="name" header="Name" filterField="name" style={{ minWidth: '12rem' }} />
                <Column header="Opening Hours" filterField="openingHours" style={{ minWidth: '12rem' }} body={openingHoursTemplate}/>
                <Column header="Details" body={showDetailsButton}/>
                <Column header="Remove" body={DeletePlaceButton}/>
            </DataTable>}
        </div>
    );
};

export default Day;