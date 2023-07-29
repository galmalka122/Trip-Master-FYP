import {axiosFourSquare} from "../api/baseAPI";
const FOUR_SQUARE_API_KEY = process.env.REACT_APP_FOURSQUARE_API_KEY;
function useFourSquare() {

    axiosFourSquare.interceptors.request.use(config=>{
        config.headers.Authorization = FOUR_SQUARE_API_KEY;
        return config;
    })


    return {
        axiosFourSquare
    };
}

export default useFourSquare;