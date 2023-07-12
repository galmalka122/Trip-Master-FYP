import {membersAPI} from "../api/baseAPI";


const useApi = (refreshTokenHandler, auth) => {

    membersAPI.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'] && auth?.accessToken) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

    membersAPI.interceptors.response.use(
            response => response,
            async (error) => {
                console.log(error)
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refreshTokenHandler();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return membersAPI(prevRequest);
                }
                return Promise.reject(error);
            }
        );

    return membersAPI;
}

export default useApi;