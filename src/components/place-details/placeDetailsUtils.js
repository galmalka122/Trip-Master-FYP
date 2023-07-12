import {createPrompt} from "../map/utils"

import openAi from "../../core/api/openaiApi";

export const fetchAiOverview = async (details, place=true) => {
    try {
        let newDetails = {};
        console.log(details)
        if (!place){
            newDetails = {
                coords: {lat: details.latitude, lng: details.longitude},
                name: details?.city ? `${details?.city}, ${details.country}` : details.country,
            }
        }
        const prompt = createPrompt(`brief overview up to ${place ? 30 : 100} words`, place ? details : newDetails)
        const {data} = await openAi.post("https://api.openai.com/v1/completions", {...prompt});
        const overviewText = data.choices[0].text;
        if(overviewText.length === "no results") return null;
        return overviewText;
    }
    catch (e) {
        console.log(e)
    }
}

