import React from 'react';
import {Button} from "primereact/button";
import {DataView} from "primereact/dataview";
import PlaceRating from "../place-details/PlaceRating";




const NearbySearchResults = ({places}) => {

    const itemTemplate = (place) => {
        return (
            <div key={place.coords} className="col-12 m-2">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-1">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start">
                            <div className="lg:text-xl text-base">{place.name}</div>
                            <span className="p-1">{place.address}</span>
                            <PlaceRating rating={place.rating} />
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end">
                            <Button onClick={place.onClick} icon="pi pi-shopping-cart" className="p-button-rounded"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return  <DataView value={places} itemTemplate={itemTemplate} />;
}

export default NearbySearchResults;
