import React, {useState} from 'react';
import {Button} from "primereact/button";
import DeleteTripButton from "../trip/DeleteTripButton";
import useTripContext from "../../core/hooks/useTripContext";
import moment from "moment";
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {hoursLimit} from "./utils";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const PlacesData = ({onSelectPlace, day, places, setPlaces, placesStates, setPlacesStates}) => {
    const { selectedTrip, removePlaceHandler } = useTripContext();
    const onPlaceStateChange = (index, name, value) => {
        const newStates = [...placesStates];
        newStates[index][name] = value;
        setPlacesStates(newStates);
    }

    // find the index of the day in the opening hours array
    const dayDate = moment(day.datetime, "MM-DD-YYYY").day();
    const dayIndex = dayDate % 7;

    const openingHoursTemplate = (rowData) => {
        return rowData?.openingHours[dayIndex].openingHours.map((hours) => {
            return (
                <>
                    <span>{`${hours?.open} - ${hours?.close}`}</span><br/>
                </>
            )
        })
    }

    const showDetailsButton = (rowData) => {
        return <Button severity="info" text icon="pi pi-info" className="p-button-secondary" onClick={() => onSelectPlace(rowData)}/>
    }

    const DeletePlaceButton = (rowData) => {

        return <DeleteTripButton onAcceptDelete={(async () => {
            const removed = await removePlaceHandler(selectedTrip.trip_id, rowData, rowData.day_index);
            if (removed) {
                setPlaces(places.filter(place => place.place_id !== rowData.place_id));
            }
        })}/>
    }

    const priorityTemplate = (rowData, props) => {
        return <Dropdown value={placesStates[props.rowIndex].priority}
                         onChange={(e) => onPlaceStateChange(props.rowIndex, 'priority', e.value)}
                         options={Array.from({ length: 10 }, (_, index) => {return {name: index + 1, value: index+1}})} optionLabel="name"
                         placeholder="Select Priority"
                         className="w-full md:w-14rem" />;
    }

    const interestLevelTemplate = (rowData, props) => {
        return <Dropdown value={placesStates[props.rowIndex].interestLevel}
                         onChange={(e) => onPlaceStateChange(props.rowIndex, 'interestLevel', e.value)}
                         options={Array.from({ length: 10 }, (_, index) => {return {name: index + 1, value: index+1}})} optionLabel="name"
                         placeholder="Select Interest level"
                         className="w-full md:w-14rem" />;
    }

    const minDate = hoursLimit(0, 0);
    const maxDate = hoursLimit(12, 0);

    const durationTemplate = (rowData, props) => {
        return <Calendar
            stepMinute={15}
            value={placesStates[props.rowIndex].duration}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(e) => onPlaceStateChange(props.rowIndex, 'duration', e.value)}
            timeOnly
        />
    }

    return  selectedTrip && <DataTable value={places || null}
                                       className="p-datatable-striped p-2"
                                       paginator rows={10}
                                       key={selectedTrip.trip_id}
                                       emptyMessage="No places yet. Add some!">
        <Column field="name" header="Name" filterField="name" style={{ minWidth: '12rem' }} />
        <Column header="Opening Hours" filterField="openingHours" style={{ minWidth: '12rem' }} body={openingHoursTemplate}/>
        <Column header="Staying Time" style={{ minWidth: '12rem' }} body={durationTemplate}/>
        <Column header="Priority" filterField="priority"  body={priorityTemplate}/>
        <Column header="Interest Level" filterField="interestLevel" body={interestLevelTemplate}/>
        <Column header="Details" body={showDetailsButton}/>
        <Column header="Remove" body={DeletePlaceButton}/>
    </DataTable>
};

export default PlacesData;