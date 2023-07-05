import React from 'react';

/**
 * A component that renders a form header with a title and children elements.
 *
 * @param {string} id - The ID of the form header div.
 * @param {string} title - The title of the form header.
 * @param {ReactNode} children - The children elements to be rendered within the form header.
 *
 * @returns {JSX.Element} - A form header component.
 */
function FormHeader({ children,formTitle}) {
    return (
        <div
            id={formTitle}
            className="col-sm-8 col-md-6 col-lg-6 offset-1 offset-sm-2 offset-md-3 offset-lg-0 align-self-center
             d-lg-flex align-items-lg-center align-self-lg-stretch p-5 rounded rounded-lg-0 my-5 my-lg-0 bg-transparent">
            <div className="m-auto w-lg-75 w-xl-50">
                <h2 className="d-flex justify-content-center text-secondary font-weight-light mb-5">
                    <p className="fa text-decoration-underline">
                        {formTitle}
                    </p>
                </h2>
                {children}
            </div>
        </div>
    );
}

export default FormHeader;


