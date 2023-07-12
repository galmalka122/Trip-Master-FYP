import React from 'react';
import {Card, Button} from "react-bootstrap";
import {Link} from "@chakra-ui/react";
import {Divider} from "primereact/divider";
import {Chip} from "primereact/chip";
import PlaceGallery from "./PlaceGallery";
import OpeningHours from "./OpeningHours";
import PlaceRating from "./PlaceRating";


function PlaceDetailContainer({place, onSavePlace, day}) {
    const chips = (types) => {
        return <div>
            {types.map((type) => <Chip image={type.icon} className="m-2" label={type.string} key={type.string}/> )}
        </div>
    }

    return <Card key={place?.latitude} className="flex text-center hide-overflow">
            <Card.Header as="h5">{place?.name}</Card.Header>
            <Card.Body >
                {place?.photos?.length > 0 && <PlaceGallery images={place?.photos}/>}
                <div className="flex justify-content-center flex-column">
                    <Divider/>

                    {place?.overview && <Card.Text>
                        {place.overview}
                    </Card.Text>}
                    {place?.rating && <PlaceRating rating={place?.rating}/>}
                    {place?.openingHours && <OpeningHours hours={place?.openingHours} tripDay={day}/>}
                    <Link href={place?.website} isExternal>{place?.website}</Link>
                    {place?.types?.length > 0 && chips(place.types) }
                    {onSavePlace && <><Divider/> <Button disabled={place?.day_index !== undefined} variant="primary" onClick={async()=> await onSavePlace(place)}>Add</Button></>}
                </div>
            </Card.Body>
        </Card>

}

export default PlaceDetailContainer;