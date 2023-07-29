import React, {useEffect, useState} from 'react';
import {Card, Button} from "react-bootstrap";
import {Link} from "@chakra-ui/react";
import {Divider} from "primereact/divider";
import {Chip} from "primereact/chip";
import PlaceGallery from "./PlaceGallery";
import OpeningHours from "./OpeningHours";
import PlaceRating from "./PlaceRating";
import useTripContext from "../../core/hooks/useTripContext";
import {fetchDetails} from "../nearbySearch/googleUtils";


function PlaceDetailContainer({place, onSavePlace, day}) {
    const isOpenToday = () => {

        if(place?.openingHours?.find((h) => h?.day === day).openingHours.length ===0) return 1;
        if(place?.day_index !== undefined) return 2;
        return 0;
    }
    const [placeDetails, setPlaceDetails] = useState(place);
    const [disabled, setDisabled] = useState(isOpenToday());
    const { selectedTrip, updatePlaceHandler } = useTripContext();
    const updatePlaceDetails = async (field) => {
        placeDetails[field] = null;
        await fetchDetails(place, [field],  (newPlace)=>updatePlaceHandler(selectedTrip.trip_id, newPlace));
    }

    useEffect(() => {
        setDisabled(isOpenToday());
    },[place])

    const chips = (types) => {
        return <div>
            {types.map((type) => <Chip image={type.icon} className="m-2" label={type.string} key={type.string}/> )}
        </div>
    }

    return <Card key={place?.latitude} className="flex text-center hide-overflow">
            <Card.Header as="h5">{place?.name}</Card.Header>
            <Card.Body >
                {place?.photos?.length > 0 && <PlaceGallery images={place?.photos} onError={updatePlaceDetails}/>}
                <div className="flex justify-content-center flex-column">
                    <Divider/>

                    {place?.overview && <Card.Text>
                        {place.overview}
                    </Card.Text>}
                    {place?.rating && <PlaceRating rating={place?.rating}/>}
                    {place?.openingHours && <OpeningHours hours={place?.openingHours} tripDay={day}/>}
                    <Link href={place?.website} isExternal>{place?.website}</Link>
                    {place?.types?.length > 0 && chips(place.types) }
                    {onSavePlace && <><Divider/> <Button disabled={disabled !== 0}
                                                         variant="primary"
                                                         onClick={async()=> {
                                                             place.coords.road = await place.onAdd();
                                                             await onSavePlace(place)
                                                         }}>
                        {disabled === 0 ? 'Add to trip' : (disabled === 1 ? 'Place closed' : 'Place already added')}
                    </Button></>}
                </div>
            </Card.Body>
        </Card>

}

export default PlaceDetailContainer;