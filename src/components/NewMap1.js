import React, {useEffect, useRef, useState} from 'react';
import {processResult} from "./map/placeDetailsUtils"
import {Rating} from "primereact/rating";
import {Button} from "primereact/button";
import {DataView} from "primereact/dataview";
import NearbySearch from "./NearbySearch";

const NearbySearchResults = ({lat,lng, mapRef, setCenter,viewDetails}) => {
    const [radius,setRadius] = useState(500);
    const [type, setType] = useState("store");
    const [places, setPlaces] = useState(null);
    const loadMorePlaces = useRef(null);



    let getNextPage;

    const onLoadMorePlacesClick = () => {
        loadMorePlaces.current.setAttribute("disabled", true);
        if (getNextPage) {
            getNextPage();
        }
    }


    const nearbySearch = async (options) => {
        // Perform a nearby search.
        const req = { location: {lat,lng}, ...options};
        console.log(req)
        const service = await new window.google.maps.places.PlacesService(mapRef);
        service.nearbySearch(req
            ,
            (results, status, pagination) => {

                if (status !== "OK" || !results) return;
                const places = results?.map(place=>processResult(place));
                console.log(places);
                setPlaces(places);
                loadMorePlaces.current.setAttribute("disabled", !pagination || !pagination.hasNextPage);
                if (pagination && pagination.hasNextPage) {
                    getNextPage = () => {
                        // Note: nextPage will call the same handler function as the initial call
                        pagination.nextPage();
                    };
                }
            }
        );
    }

    const itemTemplate = (place) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    {place?.photos && (<img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={place?.photos[0]?.urlSmall} alt={place.name} />)}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{place.name}</div>
                            <span>{place.address}</span>
                            <Rating value={place.rating} readOnly cancel={false}></Rating>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button onClick={
                                async () => {
                                    setCenter(place.coords);
                                    viewDetails(place);
                                }
                            } icon="pi pi-shopping-cart" className="p-button-rounded"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (<div className="card">
        <NearbySearch onSubmit={nearbySearch}/>
        <DataView value={places} itemTemplate={itemTemplate} />
        <Button ref={loadMorePlaces} onClick={onLoadMorePlacesClick}>Next</Button>
    </div>);
}

export default NearbySearchResults;
