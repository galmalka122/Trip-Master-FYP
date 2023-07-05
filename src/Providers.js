import React from 'react';
import {LoadingProvider} from "./core/context/LoadingContext";
import {ToastProvider} from "./core/context/ToastContext";
import {AuthProvider} from "./core/context/AuthContext";
import {TripProvider} from "./core/context/TripContext";
import {PlaceProvider} from "./core/context/PlaceContext";

const Providers = ({children}) => {
    return (
        <LoadingProvider>
            <ToastProvider>
                <AuthProvider>
                    <TripProvider>
                        <PlaceProvider>
                            {children}
                        </PlaceProvider>
                    </TripProvider>
                </AuthProvider>
            </ToastProvider>
        </LoadingProvider>
    );
};

export default Providers;