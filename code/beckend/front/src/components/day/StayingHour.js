import React from 'react';
import {Dropdown} from "primereact/dropdown";

const StayingHour = ({minute, setMinute, hour, setHour}) => {
    const minutesArray = [
        {name: '00', value: 0},
        {name: '15', value: 15},
        {name: '30', value: 30},
        {name: '45', value: 45}
    ]

    const hoursArray = [
        {name: '00', value: 0},
        {name: '01', value: 1},
        {name: '02', value: 2},
        {name: '03', value: 3},
        {name: '04', value: 4},
        {name: '05', value: 5},
        {name: '06', value: 6},
        {name: '07', value: 7},
        {name: '08', value: 8},
        {name: '09', value: 9},
        {name: '10', value: 10},
        {name: '11', value: 11},
        {name: '12', value: 12},
    ]

    return (
            <div className="flex flex-column md:flex-row gap-3 w-auto">
                <div className="p-inputgroup">
                    <Dropdown value={hour} onChange={setHour} options={hoursArray} optionLabel="name"/>
                </div>
                <span className="align-self-center">:</span>
                <div className="p-inputgroup">
                    <Dropdown value={minute} onChange={setMinute} options={minutesArray} optionLabel="name"/>
                </div>
            </div>
    );
};

export default StayingHour;