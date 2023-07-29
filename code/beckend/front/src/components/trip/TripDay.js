// noinspection JSUnresolvedVariable

import React from 'react';
import { Button } from 'primereact/button';
import {daysString} from "./utils";
import {Image} from "react-bootstrap";
const TripDay = ({day, onClick}) => {

    return (
        <div className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
            <div className="p-4 border-1 surface-border surface-card border-round">
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-calendar"></i>
                        <span className="font-semibold">{day.datetime}</span>

                    </div>
                    <span className="font-semibold">{daysString[day.day]}</span>
                </div>
                <div className="flex flex-column align-items-center gap-3 py-5">
                    <Image fluid src={day.icon}/>
                    {`${parseInt(day.tempmin)} - ${parseInt(day.tempmax)}`}
                </div>
                <div className="flex align-items-center justify-content-center">
                    <Button className="p-button-rounded" onClick={onClick}>Plan</Button>
                </div>
            </div>
        </div>
    );
};

export default TripDay;