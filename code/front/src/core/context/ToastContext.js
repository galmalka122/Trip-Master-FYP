import React, {createContext, useEffect, useRef} from 'react';
import {Toast} from "primereact/toast";
export const ToastContext = createContext();

export const ToastProvider = ({children}) => {

    const toast = useRef(null);

    const showSuccess = (summary, detail) => {
        showToast({severity:'success', summary: summary, detail: detail});
    }

    const showInfo = (summary,detail) => {
        showToast({severity:'info', summary, detail});
    }

    const showWarn = (summary,detail) => {
        showToast({severity:'warn', summary, detail});
    }

    const showError = (detail) => {
        showToast({severity:'error', summary: `Something went wrong...`, detail});
    }

    const showToast = (options) =>
    {
        toast.current.show({...options, life: 3000})
    }

    const ToastContextValue = {
        showSuccess,
        showError,
        showWarn,
        showInfo
    }

    return (
            <ToastContext.Provider value={ToastContextValue}>
                <Toast ref={toast} position="bottom-right"/>
                {children}
            </ToastContext.Provider>
    );
}

export default ToastContext;