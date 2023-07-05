import React, {useEffect, useState} from 'react';
import {Card, Carousel, Image, Button} from "react-bootstrap";
import {fetchDetails} from "./placeDetailsUtils";
import {Link} from "@chakra-ui/react";
import {Divider} from "primereact/divider";

function PlaceDetailContainer({place, map}) {
    const [currentPlace, setCurrentPlace] = useState(null)
    const [loading, setLoading] = useState(true)
    const [placeDetails, setPlaceDetails] = useState(null)
    useEffect(() => {
        if(place && place != currentPlace) {
            setCurrentPlace(place)
            onSelectedPlace()
        }
    }, [currentPlace])



    const onSelectedPlace = async () => {
        setLoading(true);
        const newDetails = await fetchDetails(place, map);
        setPlaceDetails(newDetails);
        setLoading(false);
    }

    const onSavePlace = () => {

    }

    const loader = <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
    </div>

    console.log(placeDetails)
    return loading ? loader :
        <Card className="text-center">
            <Card.Header as="h5">{placeDetails.name}</Card.Header>
            <Card.Body>
                {placeDetails.overview && <Card.Text>
                    {placeDetails.overview}
                </Card.Text>}
                <Link href={placeDetails.website} isExternal>Website</Link>
                <Divider/>
                {placeDetails?.photos?.length > 0 &&
                    <section className="slider mb-3 carousel-container">
                        <Carousel>
                            {placeDetails.photos.map((photo)=> {
                                let url = photo.urlLarge;
                                return <Carousel.Item className='slide'>
                                    <Image
                                        key={url}
                                        className="img-fluid image uniform-image"
                                        src={url}
                                    />
                                </Carousel.Item>
                            })}
                        </Carousel>
                    </section>}

                <Button variant="primary" onClick={onSavePlace}>Add</Button>
            </Card.Body>
        </Card>

}

export default PlaceDetailContainer;