import React from 'react';

const MapPreview = ({ latitude, longitude }) => {
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=12&size=400x300&markers=color:red%7C${latitude},${longitude}&key=${API_KEY}`;

    return (
        <img src={mapUrl} alt="Map Preview" />
    );
};

export default MapPreview;