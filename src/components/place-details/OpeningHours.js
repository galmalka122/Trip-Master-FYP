import React, {useEffect, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const OpeningHours = ({hours, tripDay}) => {

    const [days, setDays] = useState([]);
    useEffect(
        () => {
            const data = Object.entries(hours).map(([key, value])=> {
                let day = {};
                day.day = key;
                hours = value.split('–');
                day.opening = hours[0];
                day.closing = hours[1];
                return day;
            })
            setDays(data);
        }, [hours]
    )

    const dayTemplate = (day) => {
        return <span className={day.day === tripDay ? `font-bold` : ""}>{day.day}</span>;
    };

    const openingHoursTemplate = (day) => {
        return <span className={day.day === tripDay ? `font-bold` : ""}>{day.opening}</span>;
    };

    const closingHoursTemplate = (day) => {
        return <span className={day.day === tripDay ? `font-bold` : ""}>{day.closing}</span>;
    };



    return (
        <div>
            <DataTable value={days} showGridlines={false} size="small" >
                <Column field="day"
                        body={dayTemplate}>
                </Column>
                <Column field="opening"
                        body={openingHoursTemplate}>
                </Column>
                <Column field="closing"
                        body={closingHoursTemplate}>
                </Column>
            </DataTable>
        </div>
    );
};

export default OpeningHours;