import React, {useState} from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import NewTripForm from "./NewTripForm";
import DeleteTripButton from "./DeleteTripButton";
import {useNavigate} from "react-router";
import useTripContext from "../../core/hooks/useTripContext";

/**
 * TripList component that renders a list of trips in a table format with the ability to filter and search
 * @returns {JSX.Element} TripList component
 */
export default function TripList() {
    const {trips, addTripHandler, selectTrip, deleteTripHandler} = useTripContext();
    const navigate = useNavigate();
    const handleSubmit = async (tripData) => {
        await addTripHandler(tripData);
    }

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <>
                <NewTripForm handleSubmit={handleSubmit}/>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </>
        );
    };

    const countryBodyTemplate = (rowData) => {
         return rowData &&(
            <div id={rowData.country} className="flex align-items-center gap-2">
                <span>{rowData.country}</span>
            </div>
        );
    };

    const datesBodyTemplate = (rowData) => {

        return rowData &&(
            <div id={rowData} className="flex align-items-center gap-2">
                <span>{rowData.starting_date} - {rowData.ending_date}</span>
            </div>
        );
    };


    const buttonBodyTemplate = (rowData) => {

        return rowData &&(
            <div>
                <Button severity="info" text icon="pi pi-file-edit" onClick={async ()=>{
                    await selectTrip(rowData);
                    navigate('/members/days');
                }}/>
                <DeleteTripButton onAcceptDelete={()=>{
                    deleteTripHandler(rowData)
                }}/>
            </div>)
    };


    const header = renderHeader();

    return (
        <div className="card">
            <DataTable value={trips || []} paginator rows={10} dataKey="trip_id" filters={filters} filterDisplay="menu"
                       globalFilterFields={['name', 'country']} header={header} emptyMessage="No Trips found.">
                <Column field="name" header="Name" filterField="name"  filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                <Column header="Country" filterField="country" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
                <Column header="Dates" style={{ minWidth: '14rem' }} body={datesBodyTemplate} />
                <Column field="edit" header="Edit" dataType="boolean" style={{ minWidth: '6rem' }} body={buttonBodyTemplate} />
            </DataTable>
        </div>
    );
}