import {fetchAiOverview} from "../place-details/placeDetailsUtils";
import {parseDaysHours} from "../map/utils";

/**
 * parse the place details response from Google api to place object
 * @param result - place details response from Google api
 * @param fields - fields to be parsed
 * @returns {Promise<{}>} - place object
 */
export const processResult = async (result, fields) => {
    const place = {};
    // Basic details.
    if (fields.includes('name')) place.name = result.name;
    if (fields.includes('geometry')) place.coords = parseCoords(result.geometry.location);
    if (fields.includes('formatted_address')) place.address = result.formatted_address;
    if (fields.includes('photos')) place.photos = parsePhotos(result.photos);
    if (fields.includes('types')) place.types = parseTypes(result.types);
    if (fields.includes('website')) place.website = result.website;
    if (fields.includes('opening_hours')) place.openingHours = parseDaysHours(result.opening_hours);
    if (fields.includes('rating')) place.rating = result.rating;
    if (fields.includes('price_level')) place.priceLevel = result.price_level;
    if (fields.includes('user_ratings_total')) place.numRatings = result.user_ratings_total;
    if (fields.includes('reviews')) place.reviews = result.reviews;
    if (fields.includes('overview')) place.overview = await fetchAiOverview(place);
    return place;
};

const parseTypes = (types) => {
    return types.map((type) => {
        const formattedType = type.replace(/_/g, '-');
        return {
        string: formattedType,
        icon: `/assets/icons/svgconverter/${formattedType}.PNG`,
    }});
}

const parsePhotos = (photos) => {
    if(photos)
        return photos.map((photo) => ({
            urlSmall: photo.getUrl({maxWidth: 200, maxHeight: 200}),
            urlLarge: photo.getUrl({maxWidth: 1200, maxHeight: 1200}),
            attrs: photo.html_attributions,
        })).slice(0, 5);
}

const parseCoords = (geometry) => {
    if(geometry)
        return {place: {
                lat: geometry.lat(),
                lng: geometry.lng()
            }
    }
}

export const googleCategories = [
    { name: 'Airport', id: 'airport' },
    { name: 'Amusement park', id: 'amusement_park' },
    { name: 'Aquarium', id: 'aquarium' },
    { name: 'Art gallery', id: 'art_gallery' },
    { name: 'Bar', id: 'bar' },
    { name: 'Cafe', id: 'cafe' },
    { name: 'Casino', id: 'casino' },
    { name: 'City hall', id: 'city_hall' },
    { name: 'Movie theater', id: 'movie_theater' },
    { name: 'Museum', id: 'museum' },
    { name: 'Night Club', id: 'night_club' },
    { name: 'Park', id: 'park' },
    { name: 'Restaurant', id: 'restaurant' },
    { name: 'Shopping mall', id: 'shopping_mall' },
    { name: 'Spa', id: 'spa' },
    { name: 'Stadium', id: 'stadium' },
    { name: 'Store', id: 'store' },
    { name: 'Synagogue', id: 'synagogue' },
    { name: 'Tourist attraction', id: 'tourist_attraction' },
    { name: 'Zoo', id: 'zoo' }
]

const parseParams = (params)=> {
    const newParams = {};
    if (params.query) newParams.keyword = params.query;
    if (params.radius) newParams.radius = params.radius * 1000;
    if (params?.categories?.length === 1) newParams.type = params.categories;
    if (params.price !== null) {newParams.minPriceLevel = 0; newParams.maxPriceLevel = params.price;}
    return newParams;
}

export const googlePlaceDetailsFields = [ 'formatted_address', 'website', 'opening_hours', 'types', 'photos']
export const googleSearchFields = "name,geometry,editorial_summary,rating"
export const allGoogleFields = [ 'formatted_address', 'website', 'opening_hours', 'types', 'photos', 'name', 'geometry', 'editorial_summary', 'rating']

/**
 * Performs a nearby search using the Google Places API
 * @param dayPlaces - The places already in the day
 * @param map
 * @param formValues - The nearby search form values
 * @param viewDetails - The function to view the details of a place (if the user clicks on it)
 * @param setPlaces - The function to update the places state
 * @param setNextPage - The function to fetch the next page of results
 * @returns {Promise<void>} - A promise that resolves when the nearby search is complete and contains the processed places
 */
export const nearbySearch = async (dayPlaces, map, formValues, viewDetails, setPlaces, setNextPage) => {

    // Create a new location object from the place geolocation values
    const coords = await new window.google.maps.LatLng(formValues.lat,formValues.lng);

    // Create a new request object
    const nearbySearchRequest = { location: coords, ...parseParams(formValues), fields: googleSearchFields};

    // Create a new places service object
    const service = await new window.google.maps.places.PlacesService(document.createElement('div'));

    // Perform a nearby search, and process the results
    await service.nearbySearch(nearbySearchRequest,  (results, status, pagination) => {

            // If the request was unsuccessful, set the places to an empty array
            if (status !== "OK" || !results) setPlaces([]);

            results = results.filter(result=>result.business_status === "OPERATIONAL");

            // If the request was successful, parse the results and set the places
            const places = results?.map(place=>{

                // Check if the place is already in the dayPlaces array (to prevent unnecessary API calls) else,
                // process the result and return the place
                let index = dayPlaces.findIndex(p=>p.place_id === place.place_id);
                if (index > -1){
                    place = {...dayPlaces[index]};
                    place.onClick = () => viewDetails(place);
                    return place;
                }
                let searchFields = Object.keys(place).filter(key=>key !== 'opening_hours');

                // Remove fields that are already in the result
                let detailsFields = googlePlaceDetailsFields.filter(key=>!searchFields.includes(key));

                // If there are no fields left, set the onClick function to viewDetails and return the place
                if(detailsFields.length === 0) {
                    place.onClick = async () => {
                        const newPlace = await processResult(place,searchFields);
                        viewDetails(newPlace)
                    };
                }
                else
                    place.onClick = async () => {
                        try {

                            // Create a new placeDetailsRequest object
                            const placeDetailsRequest = {
                                placeId: place.place_id,
                                fields: detailsFields
                            };

                            // Perform a place details search
                            await service.getDetails(placeDetailsRequest, async (result, status) => {
                                if (status === "OK") {

                                    // Process the result and set the onClick function to viewDetails
                                    const placeProcessed = await processResult(place, searchFields);
                                    let newPlace = await processResult(result, [...detailsFields, 'overview']);
                                    newPlace = {...placeProcessed, ...newPlace};
                                    newPlace.place_id = place.place_id;
                                    newPlace.onAdd = () => getRoadCoords(place);

                                    viewDetails(newPlace);
                                }
                            });
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }
                return place;
            });

            // Set the places and the nextPage function
            setPlaces(places);
            setNextPage({
                nextPage: ()=>pagination.nextPage(),
                hasNextPage: pagination.hasNextPage
            });
        }
    );
}

export const fetchDetails = async (place,fields, setDetails) => {
    const service = await new window.google.maps.places.PlacesService(document.createElement('div'));
    const placeDetailsRequest = {
        placeId: place.place_id,
        fields: fields
    };
    await service.getDetails(placeDetailsRequest, async (result, status) => {
        if (status === "OK") {
            console.log(result);
            let newPlace = await processResult(result,fields);
            newPlace = {...newPlace, ...place};
            setDetails(newPlace);
            return newPlace;
        }
    });
}

export const getRoadCoords = async (place) => {
    const service = await new window.google.maps.DirectionsService();

    const request = {
        origin: {placeId: place.place_id},
        destination: {placeId: place.place_id},
        travelMode: window.google.maps.TravelMode.DRIVING
    };
    return new Promise((resolve, reject) => {
        service.route(request, (result, status) => {
            if (status === 'OK') {
                const latLon = result.routes[0].legs[0].end_location;
                resolve({lat: latLon.lat(), lng: latLon.lng()});
            }
            else reject(status);
        });
    });
}