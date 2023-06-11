import React from 'react';

function PlaceImage(props) {
    return (
            <div className="col-md-4 p-2"><img className="img-fluid image" alt={"s"} src={props.url}/></div>
    );
}

export default PlaceImage;