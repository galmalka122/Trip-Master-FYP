import React from 'react';
import FormHeader from "./FormHeader";

function FormContainer(props) {
    const formInputs = props.inputs;


    return (
        <div className="container-fluid">
            <div className="row mh-100vh">
                <FormHeader title={props.title} id={props.id}>
                    {props.inputs}
                    {props.buttons}
                    {props.optionals}
                </FormHeader>
                <div id="bg-block" className="col-lg-6 d-flex align-items-end"
                     style={`background-image: url('${props.image}');background-size: cover;background-position: center center;`}>
                </div>
            </div>
        </div>
    );
}

export default FormContainer;