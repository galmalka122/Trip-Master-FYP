
import {useEffect, useRef, useState} from 'react'
import PlaceDetailContainer from "./PlaceDetailContainer";
import React from "react";
import axios from "axios";
import {getDetails} from "use-places-autocomplete";

function Map({place}) {
        //const [images, setImages] = useState([])
        useEffect(()=>{
                fetchDetails();
        },[place])
        const [placeDetails, setPlaceDetails] = useState({})
        const [name, setName] = useState("")
        const [stars, setStars] = useState([])
        const onPlaceDetailsChange = (newPlaceDetails)=>{
                setPlaceDetails(newPlaceDetails)
                setNewRating(newPlaceDetails.rating)
                setName(newPlaceDetails.name)
        }
        const setNewRating = (newRating)=>{
                let newStars = []
                while(newRating > 1){
                        newStars.push(<i className="fa fa-star-o icon" data-fill={1}/>)
                        newRating -= 1
                }
                newStars.push(<i className="fa fa-star-o icon tada" data-fill={newRating}/>)
                setStars(newStars)
        }

        const fetchDetails = async () => {
                let newDetails = {
                        ...place,
                        lat : place.coords.lat,
                        lng: place.coords.lng
                };
                const parameter = {
                        // Use the "place_id" of suggestion from the dropdown (object), here just taking first suggestion for brevity
                        placeId: place.place_id,
                        // Specify the return data that you want (optional)
                        fields: ["formatted_address",
                                "opening_hours",
                                "photos",
                        "editorial_summary"],
                };
                try {
                        const details = await getDetails(parameter)
                        newDetails = {...newDetails, ...details}
                        const url = new URL("https://maps.googleapis.com/maps/api/place/details/json?");
                        const params = new URLSearchParams();
                        params.append("key", process.env.REACT_APP_GOOGLE_API_KEY);
                        params.append("fields", "editorial_summary");
                        params.append("place_id", parameter.placeId);
                        url.search = params.toString();

                        const {data} = await axios.get(url.href);
                        newDetails = {
                                ...newDetails,
                                overview: data?.result?.editorial_summary?.overview
                        }

                        onPlaceDetailsChange(newDetails);
                }
                catch (e) {
                        console.log(e)
                }
        }

        return  (
            placeDetails &&
            (<>
                    hello
                <PlaceDetailContainer placeDetails={placeDetails}/>
                </>)
        )
}
export default Map;
