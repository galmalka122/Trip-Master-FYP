const tripAPI = (api) => {

    const getTrips = async () => {
        try {
            const {data} = await api.get('trips');
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    const getTrip = async (tripId) => {
        try {
            const {data} = await api.get(`trips/${tripId}`);
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    const deleteTrip = async (tripId) => {
        try {
            const {data} = await api.delete(`trips/${tripId}`);
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    const saveTrip = async (trip) => {
        try {
            const {data} = await api.put(`trips/${trip.id}`,trip);
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    const addTrip = async (trip) => {
        try {
            const {data} = await api.post('trips', trip);
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    const addPlace = async (tripId, place) => {
        try {
            const {data} = await api.post(`trips/${tripId}/places`, place);
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    const removePlace = async (tripId, placeId, placeIndex) => {
        try {
            const body = {
                placeId: placeId,
                placeIndex: placeIndex
            }
            const {data} = await api.delete(`trips/${tripId}/places`,{data: body});
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    const calculateRoute = async (request) => {
        try{
            const {data} = await api.post(`trips/calculate`,request);
            return data;
        }
        catch (e){
            throw e.data; 
        }
    }

    const updatePlace = async (tripId, place) => {
        try {
            const {data} = await api.put(`trips/${tripId}/places/${place.day_index}/${place.place_id}`, place);
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    const updateTripDay = async (tripId, dayIndex, tripDay) => {
        try {
            const {data} = await api.put(`trips/${tripId}/places/${dayIndex}`, tripDay);
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    return {
        getTrips,
        getTrip,
        saveTrip,
        addTrip,
        deleteTrip,
        addPlace,
        removePlace,
        updatePlace,
        calculateRoute,
        updateTripDay
    }

}

export default tripAPI;