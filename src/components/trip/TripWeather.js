import React from 'react';
import useVisualCrossing from "react-open-weather/src/js/providers/visualcrossing/useVisualCrossing";

function TripWeather( latitude, longitude, starting_date, ending_date) {





    const { data, isLoading, errorMessage } = useVisualCrossing({
        key: 'EHC79J5QHLHGFBFMTZ5UJKJ4L',
        lat: latitude,
        lon: longitude,
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });
    return data;
}

export default TripWeather;