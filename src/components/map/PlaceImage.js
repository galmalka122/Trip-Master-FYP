import React from 'react';

function PlaceImage(props) {
    return (
        
            <div className="col-md-4"><img className="img-fluid image" src={props.url}/></div>
        
    );
}

export default PlaceImage;