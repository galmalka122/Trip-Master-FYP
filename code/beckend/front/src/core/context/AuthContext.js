// noinspection JSUnresolvedFunction

import React, {createContext, useState} from 'react';
import {useEffect} from "react";
import useLoading from "../hooks/useLoading";
import authAPI from "../api/authAPI";
import useToast from "../hooks/useToast";
import useApi from "../hooks/useApi";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const {spinnerProcess} = useLoading();
    const toast = useToast();
    const [auth, setAuth] = useState(null);
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const refreshTokenHandler = async () => {
        let newAuth = null;
        try{
            newAuth = await api.refreshToken();
            onAuthChange(newAuth);
            return newAuth.accessToken;
        }
        catch(e){
            toast.showError("Error");
        }
    }

    const baseApi = useApi(refreshTokenHandler, auth);
    const api = authAPI();

    useEffect(() => {
        if(!auth?.accessToken && persist) spinnerProcess(refreshTokenHandler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        localStorage.setItem('persist', JSON.stringify(persist))
    },[persist])


    const loginHandler = async (loginRequest) =>{
        let newAuth = null;
        try{
            let {persist, email, password} = loginRequest;
            newAuth = await api.login(email, password);
            setPersist(persist);
            toast.showSuccess(`Welcome back`, `You are logged in as ${email}`)
            onAuthChange(newAuth);
        }
        catch (e) {
            setIsLoggedIn(false);
            throw e;
        }
        finally {

        }
    }

    const registerHandler = async (registerRequest) => {
        try {
            let {username, email, password} = registerRequest;
            await api.register(username, email, password);
            toast.showSuccess(`Welcome aboard ${username}`, `Please log in to continue`);
        }
        catch (e){
            toast.showError(e);
        }
    }


    const logoutHandler = async () => {
        try{
            await api.logout();
            toast.showSuccess(`Successfully logged out`, `We hope to see you again soon`)
        }
        catch(e){
            if (!e?.response) {
                toast.showError('No Server Response');
            }
            else{
                throw e;
            }
        }
        finally {
            setIsLoggedIn(false);
            onAuthChange(null);
        }
    }

    const onAuthChange = (newAuth) => {
        if(newAuth){
            setAuth(prev=> {return {...prev, ...newAuth}})
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
            setAuth(null);
        }
    }

    const authContextValue = {
        auth,
        baseApi,
        loginHandler: async (loginRequest)=>spinnerProcess(()=>loginHandler(loginRequest)),
        registerHandler: async (registerRequest)=>spinnerProcess(()=>registerHandler(registerRequest)),
        refreshTokenHandler: async ()=>spinnerProcess(refreshTokenHandler),
        logoutHandler: async ()=>spinnerProcess(logoutHandler),
        isLoggedIn
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;