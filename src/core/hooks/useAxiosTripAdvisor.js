import {axiosTripAdvisor} from "../api/baseAPI";
const TRIP_ADVISOR_API_KEY = process.env.REACT_APP_TRIP_ADVISOR_API_KEY;
function useAxiosTripAdvisor() {

    axiosTripAdvisor.interceptors.request.use(config=>{
        config.params = {
            key: TRIP_ADVISOR_API_KEY,
        }
        return config;
    })

    const getLocationId = async (query, lat, lng) => {
        try {
            const params = new URLSearchParams({
                searchQuery: query.replace(/\s/g, '+'),
                latLong: `${lat}%2C${lng}`
            }).toString();
            const {data} = await axiosTripAdvisor.get(`location/search?${params}`);
            return data.data[0].location_id;
        }
        catch (e){
            throw e;
        }
    }
    const getLocationPhoto = async (query, lat, lng) => {
        try {
            const id = await getLocationId(query, lat, lng);
            const {data} = await axiosTripAdvisor.get(`location/${id}/photos?`);
            const images = data?.data?.map(photo=> {return photo?.images?.original?.url});
            console.log(images);
            return images;
        }
        catch (e) {
            throw e;
        }

    }

    const getLocationDetails = async (locationId) => {
        try {
            const {data} = await axiosTripAdvisor.get(`location/${locationId}/details?`);
            return data?.data?.map(photo=> {return photo?.images?.original?.url});
        }
        catch (e) {
            throw e;
        }
    }

    return {
        getLocationId,
        getLocationPhoto,
        getLocationDetails
    };
}

export default useAxiosTripAdvisor;