import axios from "axios";

const URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const KEY = 'EHC79J5QHLHGFBFMTZ5UJKJ4L'
const PARAMS = "unitGroup=metric&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cicon&include=days%2Cfcst&contentType=json"

export const daysString = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

const forecastDateFormatter = (date) => {
    let toLoc = new Date(date);
    const formattedDate = toLoc.toLocaleDateString("en-CA");
    return formattedDate;
}

export const fetchWeather = async (latitude, longitude, starting_date, ending_date)=>{
    try{
        const start = forecastDateFormatter(starting_date);
        const end = forecastDateFormatter(ending_date);
        const url = `${URL + latitude},${longitude}/${start}/${end}?${PARAMS}&key=${KEY}`
        const {data} = await axios.get(url);
        return data;
    }
    catch (e) {
        throw e;
    }
}

export const calculateRemainingDays = (startingDate, endingDate) => {

    const start = new Date(startingDate);
    const end = new Date(endingDate);

    const timeDifference = end.getTime() - start.getTime();
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const remainingDays = Math.ceil(timeDifference / millisecondsInADay);

    return remainingDays;
};

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