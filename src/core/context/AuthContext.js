import React, {createContext, useState} from 'react';
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
        let newAuth = null;
        try{
            newAuth = await api.refreshToken();
            onAuthChange(newAuth);
        }
        catch(e){
            loading.off();
            toast.showError("Error");
        }
    }

    const baseApi = useApi(refreshTokenHandler, auth);
    const api = authAPI();

    useEffect(() => {
        if(!auth?.accessToken && persist) refreshTokenHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        localStorage.setItem('persist', JSON.stringify(persist))
    },[persist])


    const loginHandler = async (loginRequest) =>{
        loading.on();
        let newAuth = null;
        try{
            let {persist, email, password} = loginRequest;
            newAuth = await api.login(email, password);
            setPersist(persist);
            toast.showSuccess(`Welcome back`, `You are logged in as ${email}`)
            onAuthChange(newAuth);
            loading.off();
        }
        catch (e) {
            setIsLoggedIn(false);
            loading.off();
            throw e;
        }
        finally {

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