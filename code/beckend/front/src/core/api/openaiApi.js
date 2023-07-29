import axios from "axios";
const apiKey = process.env.REACT_APP_OPENAI_API_KEY


const openAi = axios.create();
openAi.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
openAi.defaults.headers.common['Content-Type'] = 'application/json';
openAi.defaults.headers.common['Accept'] = 'application/json';

export default openAi;