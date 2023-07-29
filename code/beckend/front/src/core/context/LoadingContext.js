import React, {createContext, useState} from 'react';

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const on = () => {
        setIsLoading(true);
    }

    const off = () => {
        setIsLoading(false);
    }

    const spinnerProcess = async (callback) => {
        on();
        const data = await callback();
        off();
        return data;
    }

    // noinspection CheckTagEmptyBody
    return (
        <LoadingContext.Provider value={{on, off, spinnerProcess}}>
            {isLoading && <div className="spinner"></div>}
            <div className={isLoading ? 'opacity-blur ' : ''}>
                {children}
            </div>
        </LoadingContext.Provider>
    )
}


export default LoadingContext;