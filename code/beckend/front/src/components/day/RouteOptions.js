import React, {useState} from 'react';
import {Checkbox} from "primereact/checkbox";

const RouteOptions = ({travelMode, setTravelMode, transitOptions, setTransitOptions, drivingOptions, setDrivingOptions}) => {
    const onTransitOptionsChange = (e) => {
        let _transitOptions = [...transitOptions];

        if (e.checked)
            _transitOptions.push(e.value);
        else
            _transitOptions.splice(_transitOptions.indexOf(e.value), 1);

        setTransitOptions(_transitOptions);
    }

    const onDrivingOptionsChange = (e) => {
        let _drivingOptions = [...drivingOptions];

        if (e.checked)
            _drivingOptions.push(e.value);
        else
            _drivingOptions.splice(_drivingOptions.indexOf(e.value), 1);

        setDrivingOptions(_drivingOptions);
    }

    const TransitOptions = () => {
        return <div className="flex flex-wrap justify-content-center gap-3">
            <div className="flex align-items-center">
                <Checkbox inputId="transitMode1" name="Bus" value="BUS" onChange={onTransitOptionsChange}
                          checked={transitOptions.includes("BUS")} />
                <label htmlFor="transitMode1" className="ml-2">Bus</label>
            </div>
            <div className="flex align-items-center">
                <Checkbox inputId="transitMode2" name="Rail" value="RAIL" onChange={onTransitOptionsChange}
                          checked={transitOptions.includes("RAIL")} />
                <label htmlFor="transitMode2" className="ml-2">Rail</label>
            </div>
            <div className="flex align-items-center">
                <Checkbox inputId="transitMode3" name="Subway" value="SUBWAY" onChange={onTransitOptionsChange}
                          checked={transitOptions.includes("SUBWAY")}/>
                <label htmlFor="transitMode3" className="ml-2">Subway</label>
            </div>
            <div className="flex align-items-center">
                <Checkbox inputId="transitMode4" name="Train" value="TRAIN" onChange={onTransitOptionsChange}
                          checked={transitOptions.includes("TRAIN")} />
                <label htmlFor="transitMode4" className="ml-2">Train</label>
            </div>
            <div className="flex align-items-center">
                <Checkbox inputId="transitMode5" name="Tram" value="TRAM" onChange={onTransitOptionsChange}
                          checked={transitOptions.includes("TRAM")} />
                <label htmlFor="transitMode5" className="ml-2">Tram</label>
            </div>
        </div>
    }

    const DrivingOptions = () => {
        return <div className="flex flex-wrap justify-content-center gap-3">
            <div className="flex align-items-center">
                <Checkbox inputId="drivingOptions1" name="Tolls" value="TOLLS" onChange={onDrivingOptionsChange}
                          checked={drivingOptions.includes("TOLLS")} />
                <label htmlFor="drivingOptions1" className="ml-2">Avoid Tolls</label>
            </div>
            <div className="flex align-items-center">
                <Checkbox inputId="drivingOptions2" name="Highways" value="HIGHWAYS" onChange={onDrivingOptionsChange}
                          checked={drivingOptions.includes("HIGHWAYS")} />
                <label htmlFor="drivingOptions2" className="ml-2">Avoid Highways</label>
            </div>
            <div className="flex align-items-center">
                <Checkbox inputId="drivingOptions3" name="Ferries" value="FERRIES" onChange={onDrivingOptionsChange}
                          checked={drivingOptions.includes("FERRIES")} />
                <label htmlFor="drivingOptions3" className="ml-2">Avoid Ferries</label>
            </div>
        </div>
    }

    return (
        <>
            <div className="flex flex-wrap justify-content-center gap-3">
                <div className="flex align-items-center">
                    <Checkbox inputId="travelMode1" name="Driving" value={window.google.maps.TravelMode.DRIVING} onChange={(e)=> setTravelMode(e.value)}
                              checked={travelMode === window.google.maps.TravelMode.DRIVING} />
                    <label htmlFor="travelMode1" className="ml-2">Driving</label>
                </div>
                <div className="flex align-items-center">
                    <Checkbox inputId="travelMode2" name="Bicycling" value={window.google.maps.TravelMode.BICYCLING} onChange={(e)=> setTravelMode(e.value)}
                              checked={travelMode === window.google.maps.TravelMode.BICYCLING} />
                    <label htmlFor="travelMode2" className="ml-2">Bicycling</label>
                </div>
                <div className="flex align-items-center">
                    <Checkbox inputId="travelMode3" name="Transit" value={window.google.maps.TravelMode.TRANSIT} onChange={(e)=> setTravelMode(e.value)}
                              checked={travelMode === window.google.maps.TravelMode.TRANSIT}/>
                    <label htmlFor="travelMode3" className="ml-2">Transit</label>
                </div>
                <div className="flex align-items-center">
                    <Checkbox inputId="travelMode4" name="Walking" value={window.google.maps.TravelMode.WALKING} onChange={(e)=> setTravelMode(e.value)}
                              checked={travelMode === window.google.maps.TravelMode.WALKING} />
                    <label htmlFor="travelMode4" className="ml-2">Walking</label>
                </div>
            </div>
            {travelMode === window.google.maps.TravelMode.TRANSIT && <TransitOptions />}
            {travelMode === window.google.maps.TravelMode.DRIVING && <DrivingOptions />}
        </>
    );
};

export default RouteOptions;