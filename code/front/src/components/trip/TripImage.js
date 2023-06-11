import React, { useEffect, useState } from 'react';
import useAxiosTripAdvisor from "../../core/hooks/useAxiosTripAdvisor";
import {Image} from "react-bootstrap";

const TripImage = ({ country, city, latitude, longitude }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const api = useAxiosTripAdvisor();
    useEffect(()=>{
        fetchImages();
        // eslint-disable-next-line
    },[])

    const fetchImages = async ()=>{
        const query = city ?? country;
        const images = await getLocationPhoto(query, latitude, longitude);
        setImageSrc(images);
    }

    const getLocationPhoto = async (query, lat, lng) => {
        try {
            const id = await api.getLocationId(query, lat, lng);
            const photos = await api.getLocationPhoto(id);
            console.log(photos);
            setImageSrc(photos);
        }
        catch (e) {
            console.log(e);
        }

    }
    return imageSrc && (<Image src={imageSrc[0]} alt="Image" fluid rounded />)
    ;
};

export default TripImage;
