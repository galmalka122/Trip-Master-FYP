import React from 'react';
import { Button } from 'primereact/button';
import {daysString} from "./utils";
const TripDayList = ({date}) => {
    return (
        <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                <span className="flex align-items-center gap-2">
                    <i className="pi pi-calendar"></i>
                    <span className="font-semibold">{date.toLocaleDateString()}</span>
                </span>
                <span className="flex align-items-center gap-2">
                    {daysString[date.getDay()]}
                </span>
                <div/>
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="flex align-items-center gap-3">
                            Weather + Image
                        </div>
                    </div>
                </div>
                <div className="flex sm:flex-column flex-row sm:align-items-end align-items-center gap-3 sm:gap-2">
                    <Button className="p-button-rounded">Plan</Button>
                </div>
            </div>
        </div>
    );
};

export default TripDayList;