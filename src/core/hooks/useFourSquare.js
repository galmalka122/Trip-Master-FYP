import {axiosFourSquare} from "../api/baseAPI";
const TRIP_ADVISOR_API_KEY = process.env.REACT_APP_FOURSQUARE_API_KEY;
function useFourSquare() {

    axiosFourSquare.interceptors.request.use(config=>{
        config.headers.Authorization = TRIP_ADVISOR_API_KEY;
        return config;
    })


    return {
        axiosFourSquare
    };
}

export default useFourSquare;