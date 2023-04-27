import React from 'react';

function Input(props) {
    return (
        <div className="form-group">
            <label className="text-secondary">{props.label}</label>
            <input className="form-control" type={props.type} inputMode={props.inputMode}/>
        </div>
    );
}

export default Input;