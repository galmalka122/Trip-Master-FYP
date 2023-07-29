import React from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import {Button} from "primereact/button";

function DeleteTripButton({onAcceptDelete}) {


    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            header: 'Delete Confirmation',
            message: 'Are you sure you want to delete this trip?',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: onAcceptDelete
        })
    }

    return (
        <>
            <ConfirmPopup />
            <Button onClick={confirm} icon="pi pi-trash" className="p-button-danger p-button-outlined border-0"/>
        </>
    );
}

export default DeleteTripButton;