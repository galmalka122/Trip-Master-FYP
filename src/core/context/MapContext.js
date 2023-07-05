import React, {createContext, useEffect, useRef, useState} from 'react';
import {ProgressSpinner} from "primereact/progressspinner";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [map, setMap] = useState(null);

    return (
        <LoadingContext.Provider value={map}>
                {children}
        </LoadingContext.Provider>
    )
}


export default LoadingContext;