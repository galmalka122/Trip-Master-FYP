import {createPrompt} from "../map/utils"

import openAi from "../../core/api/openaiApi";

/**
 * Fetches a brief overview of a place using OpenAI's API
 * @param details - place details
 * @param place - boolean, if true, details is a place object, else it's a trip object
 * @returns {Promise<null|*>} - null if no results, else a string
 */
export const fetchAiOverview = async (details, place=true) => {
    try {
        // If the details are a trip object, create a new object with the trip's location and name
        let newDetails = {};
        if (!place){
            newDetails = {
                coords: {lat: details.latitude, lng: details.longitude},
                name: details?.city ? `${details?.city}, ${details.country}` : details.country,
            }
        }

        // Create a prompt and send it to OpenAI's API
        const prompt = createPrompt(`brief overview up to ${place ? 30 : 100} words`, place ? details : newDetails)
        const {data} = await openAi.post("https://api.openai.com/v1/completions", {...prompt});
        const overviewText = data.choices[0].text;
        // If the text contains "no results", return null
        if(overviewText.toLowerCase().includes("no results")) return null;
        return overviewText;
    }
    catch (e) {
        throw e.data;
    }
}

