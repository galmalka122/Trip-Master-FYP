import React, {createContext, useState} from 'react';
import {ProgressSpinner} from "primereact/progressspinner";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const on = () => {
        setIsLoading(true);
    }

    const off = () => {
        setIsLoading(false);
    }

    return (
        <LoadingContext.Provider value={{on, off}}>
            <div className="card flex justify-content-center">
                <ProgressSpinner className={isLoading ? 'spinner' : 'd-none'}/>
            </div>
            <div className={isLoading ? 'opacity-blur ' : ''}>
                {children}
            </div>
        </LoadingContext.Provider>
    )
}


export default LoadingContext;