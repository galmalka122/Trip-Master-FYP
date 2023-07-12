import React, { useEffect, useState } from 'react';
import useAxiosTripAdvisor from "../../core/hooks/useAxiosTripAdvisor";
import {Image} from "react-bootstrap";

const TripImage = ({ tripId,country, city, latitude, longitude }) => {
    const [imageSrc, setImageSrc] = useState(JSON.parse(localStorage.getItem(`${tripId}-image`) || null));
    const api = useAxiosTripAdvisor();
    useEffect(()=>{
        imageSrc || fetchImages();
        // eslint-disable-next-line
    },[])

    const fetchImages = async ()=>{
        const query = city ?? country;
        const images = await api.getLocationPhoto(query, latitude, longitude);
        localStorage.setItem(`${tripId}-image`, JSON.stringify(images));
        setImageSrc(images);
    }

    return imageSrc && (<Image src={imageSrc[0]} alt="Image" fluid rounded />);
};

export default TripImage;
