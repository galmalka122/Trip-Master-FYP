import axios from "axios";

const KEY = process.env.REACT_APP_WEATHER_API_KEY;
const URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const PARAMS = `unitGroup=metric&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cicon&include=days&key=${KEY}&contentType=json`;

export const daysString = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

/**
 * Format the date to be used in the API call to get the weather forecast
 * @param date - the date to be formatted
 * @returns {string} - the formatted date
 */
const forecastDateFormatter = (date) => {
    let toLoc = new Date(date);
    const formattedDate = toLoc.toLocaleDateString("en-CA");
    return formattedDate;
}


/**
 * Fetch the weather forecast from the API for the given location and dates
 * @param latitude - the latitude of the location
 * @param longitude - the longitude of the location
 * @param starting_date - the starting date of the trip
 * @param ending_date - the ending date of the trip
 * @returns {Promise<any>} - the weather forecast data from the API
 * @throws - an error if the API call fails
 */
export const fetchWeather = async (latitude, longitude, starting_date, ending_date)=>{
    try{
        const start = forecastDateFormatter(starting_date);
        const end = forecastDateFormatter(ending_date);
        const url = `${URL + latitude},${longitude}/${start}/${end}?${PARAMS}`
        const {data} = await axios.get(url);
        return data;
    }
    catch (e) {
        throw e;
    }
}


/**
 * Calculate the remaining days between two dates (to view on the trip page)
 * @param startingDate - the starting date
 * @param endingDate - the ending date
 * @returns {number} - the number of the remaining days
 */
export const calculateRemainingDays = (startingDate, endingDate) => {

    const start = new Date(startingDate);
    const end = new Date(endingDate);

    const timeDifference = end.getTime() - start.getTime();
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const remainingDays = Math.ceil(timeDifference / millisecondsInADay);

    return remainingDays;
};

/**
 * Calculate all the dates between two dates
 * @param startingDate - the starting date
 * @param endingDate - the ending date
 * @returns {*[]} - an array of all the dates
 */
export const getAllDays = (startingDate, endingDate) => {
    const startDate = new Date(startingDate);
    const endDate = new Date(endingDate);
    const days = [];

    // Loop through each day and add it to the array
    for (let date = startDate, i = 1; date <= endDate; date.setDate(date.getDate() + 1)) {
        days.push({num:i, date: new Date(date)});
    }

    return days;
}