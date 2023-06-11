import React, {createContext, useState} from 'react';
import baseAPI from "../api/baseAPI";
import {useEffect} from "react";
import useLoading from "../hooks/useLoading";
import authAPI from "../api/authAPI";
import useToast from "../hooks/useToast";
import useApi from "../hooks/useApi";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const loading = useLoading();
    const toast = useToast();
    const [auth, setAuth] = useState(null);
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const refreshTokenHandler = async () => {
        loading.on();
        try{
            const newAuth = await api.refreshToken();
            await onAuthChange(newAuth);
        }
        catch(e){
            toast.showError(e);
        }
        finally {
                loading.off();
        }
    }

    const baseApi = useApi(refreshTokenHandler, auth);
    const api = authAPI(baseAPI);

    useEffect(() => {

        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refreshTokenHandler();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && loading.off();
            }
        }
        !auth?.accessToken && persist ? verifyRefreshToken() : loading.off();

        return () => isMounted = false;
        // eslint-disable-next-line
    }, [])

    useEffect(()=>{
        localStorage.setItem('persist', JSON.stringify(persist))
    },[persist])


    const loginHandler = async (loginRequest) =>{
        loading.on();
        try{
            let {persist, email, password} = loginRequest;
            const newAuth = await api.login(email, password);
            setPersist(persist);
            onAuthChange(newAuth);
            setIsLoggedIn(true);
            toast.showSuccess(`Welcome back`, `You are logged in as ${email}`)
        }
        catch (e) {
            setIsLoggedIn(false);
            toast.showError(e);
        }
        finally {
            loading.off();
        }
    }

    const registerHandler = async (registerRequest) => {
        loading.on();
        try {
            let {username, email, password} = registerRequest;
            await api.register(username, email, password);
            toast.showSuccess(`Welcome aboard ${username}`, `Please log in to continue`);
        }
        catch (e){
            if (!e?.response) {
                toast.showError(e);
            }
            else {
                throw e;
            }
        }
        finally {
            loading.off();
        }
    }


    const logoutHandler = async () => {
        loading.on();
        try{
            await api.logout();
            toast.showSuccess(`Successfully logged out`, `We hope to see you again soon`)
        }
        catch(e){
            if (!e?.response) {
                toast.showError('No Server Response');
            }
            else{
                throw e
            }
        }
        finally {
            setIsLoggedIn(false);
            onAuthChange(null);
            loading.off();
        }
    }

    const onAuthChange = (newAuth) => {
        if(newAuth){
            setAuth(prev=> {return {...prev, ...newAuth}})
            setIsLoggedIn(true);
            return;
        }
        else {
            setIsLoggedIn(false);
            setAuth(null);
        }
    }

    const authContextValue = {
        auth,
        baseApi,
        loginHandler,
        registerHandler,
        refreshTokenHandler,
        logoutHandler,
        isLoggedIn
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;