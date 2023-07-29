export const adjustTimezone = (date ,localDateTime, desiredOffset) => {
    // Step 1: Create a Date object with the initial local time
    const initialDate = new Date(date);

    initialDate.setHours(localDateTime.getHours());
    initialDate.setMinutes(localDateTime.getMinutes());

    // Step 2: Get the current offset of the initial local time zone in minutes
    const initialOffset = initialDate.getTimezoneOffset();

    // Step 3: Calculate the offset difference in minutes
    const offsetDifference = (desiredOffset + initialOffset) * 60 * 1000;

    // Step 4: Add the offset difference to the initial date to get the new date in the desired time zone
    return new Date(initialDate.getTime() + offsetDifference);
}

export const parseOpeningHours = (dayHours) => {
    return dayHours.openingHours.map((hours) => {
        const openHour = (parseInt(hours.open.split(":")[0]) * 60 ) + parseInt(hours.open.split(":")[1])
        const closeHour = (parseInt(hours.close.split(":")[0]) * 60) + parseInt(hours.close.split(":")[1])
        return {open: openHour, close: closeHour};
    })
}

export const getDayIndex = (startingDate, date) => {
    const startingDay = new Date(startingDate);
    const day = new Date(date);
    return Math.floor((day - startingDay) / (1000 * 60 * 60 * 24));
}
const findDistances = async(places, date, timeOffset,placesStates, options={}) => {
    let distances = [];
    const ids = places.map((place) => {return new window.google.maps.LatLng(place.coords.road)});
    const distanceMatrixService = new window.google.maps.DistanceMatrixService();
    let request = {
        origins: ids,
        destinations: ids,
        travelMode: options?.travelMode || window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
    }
    if (options?.drivingOptions) {
        request.drivingOptions = {
            departureTime: adjustTimezone(date, timeOffset),
            ...options?.drivingOptions,
        }
    }
    if(options.avoidFerries) request.avoidFerries = options.avoidFerries;
    if(options.avoidHighways) request.avoidHighways = options.avoidHighways;
    if(options.avoidTolls) request.avoidTolls = options.avoidTolls;
    await distanceMatrixService.getDistanceMatrix(request, (response, status) => {
        if (status === 'OK') {
            response.rows.forEach((row) => {

                const distance = row.elements.map((element) => {
                    return {
                        duration: Math.floor(element.duration.value / 60),
                        distance: element.distance.value}
                })
                distances.push(distance);
            })
        }
    })
    return places.map((place, index) => {
        return {
            ...place,
            distances: distances[index],
        }
    })

}

export const getRouteRequest = async (selectedTrip, places, startingTime, day, dayIndex, placesStates, routeOptions, hasDestination ) => {
    const newDest = await findDistances(places, startingTime, selectedTrip.timeOffset,routeOptions);
    const requestPlaces = newDest.map((place, index) => {
        let result = {
            name: place.name,
            originalIndex: index,
            openingHours: parseOpeningHours(place.openingHours[dayIndex]),
            distances: place.distances,
        }
        if (index === 0 || ( hasDestination && index === newDest.length -1)){
            result.duration = 0;
            result.priority = 0;
        }
        else {
            result.duration = (placesStates[index - 1].duration.getHours() * 60) + placesStates[index - 1].duration.getMinutes();
            result.priority = placesStates[index - 1].priority * placesStates[index - 1].interestLevel;
        }
        return result;
    });

    return {
        places: requestPlaces,
        startingTime: (startingTime.getHours() * 60) + startingTime.getMinutes(),
        tripId: selectedTrip.trip_id,
        dayIndex: day.index,
    }

}

export const hoursLimit = (hour, minute) => {
    let d = new Date();
    d.setHours(hour);
    d.setMinutes(minute);
    return d;
}
