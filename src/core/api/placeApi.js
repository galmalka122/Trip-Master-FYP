const tripAPI = (api) => {

    const getPlaces = async () => {
        try {
            const {data} = await api.get('places');
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    const getPlace = async (placeId) => {
        try {
            const {data} = await api.get(`places/${placeId}`);
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    const deletePlace = async (placeId) => {
        try {
            const {data} = await api.delete(`places/${placeId}`);
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    const savePlace = async (place) => {
        try {
            const {data} = await api.put(`places/${place.id}`,place);
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    const addPlace = async (placeId) => {
        try {
            const {data} = await api.post('places', placeId);
            return data;
        }
        catch (e){
            throw e.data;
        }
    }

    return {
        getPlaces,
        getPlace,
        savePlace,
        addPlace,
        deletePlace
    }

}

export default tripAPI;