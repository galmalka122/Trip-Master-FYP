import React from 'react';

function FormHeader(props) {
    return (
        <div id={props.id}
             className="col-10 col-sm-8 col-md-6 col-lg-6 offset-1 offset-sm-2 offset-md-3 offset-lg-0 align-self-center
              d-lg-flex align-items-lg-center align-self-lg-stretch bg-white p-5 rounded rounded-lg-0 my-5 my-lg-0">
            <div className="m-auto w-lg-75 w-xl-50">
                <h2 className="d-xl-flex justify-content-center text-info font-weight-light mb-5"><i
                    className="fa fa-suitcase"></i> {props.title}</h2>
                <form>
                {props.children}
                </form>
            </div>
        </div>
    );
}

export default FormHeader;