import React, {useState} from 'react';
import Map from "./Map";
import PlaceDetailContainer from "./PlaceDetailContainer"
import axios from "axios";

function MapContainer(props) {
    const photoAPIUrl = "https://maps.googleapis.com/maps/api/place/photo?"
    const [placeDetails, setPlaceDetails] = useState({})
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")

    //const [images, setImages] = useState([]) TODO get images
    const [stars, setStars] = useState([])
    const onPlaceDetailsChange = async(newPlaceDetails)=>{
        setPlaceDetails(newPlaceDetails)
        /*const images = newPlaceDetails.photos.slice(0, 5).map(async (image) => {
            const url = new URL(photoAPIUrl);
            url.searchParams.append("photo_reference", image.photo_reference);
            url.searchParams.append("key", "AIzaSyBpp2ghW57shwPVSLc5AjLhYsbhRtL5f6k");
            const img = await axios.get(url.href);
            return img;
        })*/
        setNewRating(newPlaceDetails.rating)
        setDescription(newPlaceDetails.description ?? "")
        setName(newPlaceDetails.name)
        //setImages(images)
    }
    const setNewRating = (newRating)=>{
        let newStars = []
        while(newRating > 1){
            newStars.push(<i className="fa fa-star-o icon" data-fill={1}></i>)
            newRating -= 1
        }
        newStars.push(<i className="fa fa-star-o icon" data-fill={newRating}></i>)
        setStars(newStars)
    }

    const fields = ["formatted_address", "opening_hours", "rating", "name", "photos", "editorial_summary"];

    const handleClick = async (marker) => {
        const url = new URL(
            "https://maps.googleapis.com/maps/api/place/details/json?"
        );
        url.searchParams.append("place_id", marker.placeId);
        url.searchParams.append("fields", fields);
        url.searchParams.append("key", "AIzaSyBpp2ghW57shwPVSLc5AjLhYsbhRtL5f6k");

        const response = await axios(url.href);
        const today = new Date().getDay();
        onPlaceDetailsChange({
            longitude: marker.latLng.lng(),
            latitude: marker.latLng.lat(),
            name: response.data.result.name,
            rating: response.data.result.rating,
            address: response.data.result.formatted_address,
            placeId: marker.placeId,
            photos: response.data.result.photos,
            description: response.data.result?.editorial_summary?.overview,
            hours: response.data.result?.opening_hours?.weekday_text || [],
        });
    };

    return (<div className="container m-4">
        <div className="map-example">
            <div className="row">
                <div className="col-lg-6">
                    <Map onClick={handleClick}/>
                </div>
                {<PlaceDetailContainer description={description} /*images={images}*/ name={name} stars={stars}/>}
            </div>
        </div>
    </div>)
        ;
}

export default MapContainer;