import React from 'react';
import {LoadingProvider} from "../core/context/LoadingContext";
import {ToastProvider} from "../core/context/ToastContext";
import {AuthProvider} from "../core/context/AuthContext";
import {TripProvider} from "../core/context/TripContext";

const Providers = ({children}) => {
    return (
        <LoadingProvider>
            <ToastProvider>
                <AuthProvider>
                    <TripProvider>
                        {children}
                    </TripProvider>
                </AuthProvider>
            </ToastProvider>
        </LoadingProvider>
    );
};

export default Providers;