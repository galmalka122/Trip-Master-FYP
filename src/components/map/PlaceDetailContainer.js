import React from 'react';
import PlaceImage from "./PlaceImage";

function PlaceDetailContainer(placeDetails) {
    return (
        <div className="col-lg-6">
            <div className="heading">
                <h3>{placeDetails.name}</h3>
                {placeDetails.stars.length > 0 && (<div className="rating">{placeDetails.stars}</div>)}
            </div>
            {placeDetails.description && (<div className="info">
                <p>{placeDetails.description}</p>
            </div>)}
            {/*{placeDetails.images.length > 0 && (<div className="gallery">*/}
            {/*    <h4>Photos</h4>*/}
            {/*    <div className="row">*/}
            {/*        {placeDetails.images.map((photo)=> <PlaceImage url={photo}/>)}*/}
            {/*    </div>*/}
            {/*</div>)}*/}
        </div>
    );
}

export default PlaceDetailContainer;