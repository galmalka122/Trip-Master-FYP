import React from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const OpeningHours = ({hours, tripDay}) => {
    const dayTemplate = (day) => {
        return <span  className={day.day === tripDay ? `font-bold` : ""}>{day.day}</span>;
    };

    const openingHoursTemplate = (day, props) => {
        if(day?.openingHours?.length === 0) return <span>Closed</span>
        return day.openingHours.map((hours)=>{
            return <><span key={props.rowIndex + hours.open} className={day.day === tripDay ? `font-bold` : ""}>{hours.open}-{hours.close}</span><br/></>;
        })
    };


    return (
        <div>
            {hours && hours?.length > 0 ? <DataTable value={hours} showGridlines={false} size="small" >
                <Column field="day" key={tripDay}
                        body={dayTemplate}>
                </Column>
                <Column key={hours[0].day + hours[0]?.openingHours[0]}
                        body={openingHoursTemplate}>
                </Column>
            </DataTable> : "No opening hours available"}
        </div>
    );
};

export default OpeningHours;