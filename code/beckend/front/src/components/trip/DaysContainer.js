import React from 'react';
import TripDay from "./TripDay";
import {DataView} from "primereact/dataview";
import {useNavigate} from "react-router-dom";


const DaysContainer = ({tripDays}) => {
    const navigate = useNavigate();

    const itemTemplate = (day) => {
        if (!day) {
            return;
        }
        return <TripDay day={day} onClick={() => navigate("/members/day",{state:{day: day}})}/>;
    };

    return (
        <div className="card">
            <DataView value={tripDays} itemTemplate={itemTemplate} />
        </div>
    )
};

export default DaysContainer;