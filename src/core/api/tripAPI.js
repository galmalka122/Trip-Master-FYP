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
            const {data} = await api.post(`trips/${tripId}`, place);
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
        addPlace
    }

}

export default tripAPI;