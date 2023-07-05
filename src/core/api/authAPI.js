import BaseAPI from "./baseAPI";
const authAPI = () => {

    const login = async (email, password) => {
        const data = {email, password};
        try{
            const response = await BaseAPI.post('auth/login',data);
            const accessToken = response.headers["authorization"];
            const {roles, email} = response.data;
            return {accessToken, roles, email};
        }
        catch (e) {
            throw e;
        }
    }

    const register = async (username, email, password) => {
        try{
            const {data} = await BaseAPI.post('auth/register',{username, email, password});
            return data;
        }
        catch (e) {
            throw e.response.data;
        }
    }

    const refreshToken = async () => {
        try{
            const response = await BaseAPI.post('auth/refresh-token');
            const accessToken = response.headers["authorization"];
            const {email,roles} = response.data;
            return {
                accessToken,
                email,
                roles
            };
        }
        catch (e) {
            throw e.response.data;
        }
    }

    const logout = async () => {
        try{
            const {data} = await BaseAPI.post('auth/logout');
            return {data};
        }
        catch (e) {
            throw e.response.data;
        }
    }

    return {
        login,
        register,
        refreshToken,
        logout
    }

}

export default authAPI;