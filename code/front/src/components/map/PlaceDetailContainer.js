import React from 'react';
import {Card, Carousel, Image, Button} from "react-bootstrap";

function PlaceDetailContainer({placeDetails}) {
    console.log(placeDetails)
    return placeDetails.name && (
        <Card className="text-center">
            <Card.Header as="h5">{placeDetails.name}</Card.Header>
            <Card.Body>
                {placeDetails.overview && (<Card.Text>
                    {placeDetails.overview}
                </Card.Text>)}

                {placeDetails?.photos?.length > 0 && (
                    <section className="slider mb-3 carousel-container">
                            <Carousel>
                                {placeDetails.photos.map((photo)=> {
                                    let url = photo.getUrl()
                                    return (
                                        <Carousel.Item className='slide'>
                                            <Image
                                                key={url}
                                                className="img-fluid image uniform-image"
                                                src={url}
                                            />
                                        </Carousel.Item>)
                                })}
                            </Carousel>
                    </section>)}
                <Button variant="primary" onClick={placeDetails.onClick}>Add</Button>
            </Card.Body>
        </Card>
    )
}

export default PlaceDetailContainer;