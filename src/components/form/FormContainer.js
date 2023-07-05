import React from 'react';
import FormHeader from "./FormHeader";
import FormBackground from "./FormBackground";

/**
 * Component that renders a form container with a header, inputs, buttons, and an image.
 *
 * @param {string} title - The ID of the form container.
 * @param {string} image - The title of the form header.
 * @param {JSX.Element} children - The alert message to be displayed if there is an error in the form.
 * @returns {JSX.Element} - A form container component.
 */
function FormContainer({ children, title, image }) {
    return (
        <div className="container-fluid">
            <div className="row mh-100vh">
                <FormHeader formTitle={title}>
                    {children}
                </FormHeader>
                {image && (<FormBackground imageUrl={image}/> )}
            </div>
        </div>
    );
}

export default FormContainer;
