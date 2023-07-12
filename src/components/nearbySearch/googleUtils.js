import {fetchAiOverview} from "../place-details/placeDetailsUtils";
import {formatPlaceType, ND_MARKER_ICONS_BY_TYPE, parseDaysHours} from "../map/utils";

const processResult = async (result, place) => {
    // Basic details.
    if (result.name && !place.name) place.name = result.name;
    if (result.geometry && !place.latitude) {place.latitude = result.geometry.location.lat();place.longitude = result.geometry.location.lng()};
    if (result.formatted_address && !place.address) place.address = result.formatted_address;
    if (result.photos && (!place?.photos || !(place?.photos?.length > result?.photos?.length))) {
        place.photos = result.photos.map((photo) => ({
            urlSmall: photo.getUrl({maxWidth: 200, maxHeight: 200}),
            urlLarge: photo.getUrl({maxWidth: 1200, maxHeight: 1200}),
            attrs: photo.html_attributions,
        })).slice(0, 5);
    }
    if (result.types && !place.types) {
        place.types = [];

        for (let type of result.types) {
            place.types.push({string: formatPlaceType(type),
                icon: null
            });
        }
    }
    if (result.url && !place.url) place.url = result.url;
    // Contact details.
    if (result.website && !place.website) place.website = result.website;
    if (result.formatted_phone_number && !place.phoneNumber) place.phoneNumber = result.formatted_phone_number;
    if (result.opening_hours && !place.openingHours) place.openingHours = parseDaysHours(result.opening_hours);
    if (result.rating && !place.rating) place.rating = result.rating;
    if (result.price_level && !place.priceLevel) place.priceLevel = result.price_level;
    if (result.user_ratings_total && !place.numRatings) place.numRatings = result.user_ratings_total;
    if (result.reviews && !place.reviews) place.reviews = result.reviews;
    if (result.editorial_summary !== undefined && !place.overview) place.overview = result.editorial_summary.overview;
    else if(!place.overview) place.overview = await fetchAiOverview(place);

    return place;
};

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
    console.log(params);
    const newParams = {};
    if (params.query) newParams.keyword = params.query;
    if (params.radius) newParams.radius = params.radius * 1000;
    if (params?.categories?.length === 1) newParams.type = params.categories;
    if (params.price !== null) {newParams.minPriceLevel = 0; newParams.maxPriceLevel = params.price;}
    return newParams;
}

const googlePlaceDetailsFields = [ 'formatted_address', 'website', 'opening_hours', 'types', 'photos']
const googleSearchFields = "name,geometry,editorial_summary,rating"

export const nearbySearch = async (dayPlaces, map, formValues, viewDetails, setPlaces, setNextPage) => {
    // Perform a nearby search.
    const pyrmont = await new window.google.maps.LatLng(formValues.lat,formValues.lng);
    const nearbySearchRequest = { location: pyrmont, ...parseParams(formValues), fields: googleSearchFields};
    const service = await new window.google.maps.places.PlacesService(map);
    await service.nearbySearch(nearbySearchRequest, (results, status, pagination) => {
        console.log(results);
        if (status !== "OK" || !results) setPlaces([]);

            // create an onClick handler to fetch place details request for each place
            const places = results?.map(place=>{
                let index = dayPlaces.findIndex(p=>p.place_id === place.place_id);
                if (index > -1){
                    place = {...dayPlaces[index]};
                    place.onClick = () => viewDetails(place);
                    return place;
                }
                const placeDetailsRequest = {
                    placeId: place.place_id,
                    fields: googlePlaceDetailsFields
                };

                place.onClick = async () => {
                    try {
                        await service.getDetails(placeDetailsRequest, async (result, status) => {
                            if (status === "OK") {
                                const placeProcessed = await processResult(place,{});
                                let newPlace = await processResult(result,placeProcessed);
                                newPlace = {...placeProcessed, ...newPlace};
                                newPlace.place_id = place.place_id;
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
            setPlaces(places);
            setNextPage({
                nextPage: ()=>pagination.nextPage(),
                hasNextPage: pagination.hasNextPage
            });
        }
    );
}