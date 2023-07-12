import axios from "axios";
const BASE_URL = `http://${window.location.hostname}:8090`;

const baseAPI = axios.create({
    baseURL: `${BASE_URL}/api/`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export const membersAPI = axios.create({
    baseURL: `${BASE_URL}/api/`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});


export const axiosTripAdvisor = axios.create({
    baseURL: 'https://api.content.tripadvisor.com/api/v1/',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },

})

export const axiosFourSquare = axios.create({
    baseURL: 'https://api.foursquare.com/',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },

})

export default baseAPI;