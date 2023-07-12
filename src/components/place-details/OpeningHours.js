import React, {useEffect, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const OpeningHours = ({hours, tripDay}) => {


    const dayTemplate = (day) => {
        return <span className={day.day === tripDay ? `font-bold` : ""}>{day.day}</span>;
    };

    const openingHoursTemplate = (day) => {
        return <span className={day.day === tripDay ? `font-bold` : ""}>{day.open}</span>;
    };

    const closingHoursTemplate = (day) => {
        return <span className={day.day === tripDay ? `font-bold` : ""}>{day.close}</span>;
    };



    return (
        <div>
            {hours && hours?.length > 0 ? <DataTable value={hours} showGridlines={false} size="small" >
                <Column field="day"
                        body={dayTemplate}>
                </Column>
                <Column field="open"
                        body={openingHoursTemplate}>
                </Column>
                <Column field="close"
                        body={closingHoursTemplate}>
                </Column>
            </DataTable> : "No opening hours available"}
        </div>
    );
};

export default OpeningHours;