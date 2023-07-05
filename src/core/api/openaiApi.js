import axios from "axios";
const apiKey = process.env.REACT_APP_OPENAI_API_KEY

const openAi = axios.create({
    method: 'post',
    maxBodyLength: Infinity,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
    }
});


export default openAi;