import {parseDaysHours, formatPlaceType, ND_MARKER_ICONS_BY_TYPE} from "./utils"
/** Number of POIs to show on widget load. */
const ND_NUM_PLACES_INITIAL = 5;

/** Number of additional POIs to show when 'Show More' button is clicked. */
const ND_NUM_PLACES_SHOW_MORE = 5;

/** Maximum number of place photos to show on the details panel. */
const ND_NUM_PLACE_PHOTOS_MAX = 6;

/** Minimum zoom level at which the default map POI pins will be shown. */
const ND_DEFAULT_POI_MIN_ZOOM = 18;


export const processResult = (result) => {

    const place = {};
    // Basic details.
    if (result.name) place.name = result.name;
    if (result.geometry) place.coords = {lat:result.geometry.location.lat(),lng:result.geometry.location.lng()};
    if (result.formatted_address) place.address = result.formatted_address;
    if (result.photos) {
        place.photos = result.photos.map((photo) => ({
            urlSmall: photo.getUrl({maxWidth: 200, maxHeight: 200}),
            urlLarge: photo.getUrl({maxWidth: 1200, maxHeight: 1200}),
            attrs: photo.html_attributions,
        })).slice(0, ND_NUM_PLACE_PHOTOS_MAX);
    }
    if (result.types) {
        place.type = formatPlaceType(result.types[0]);
        place.icon = ND_MARKER_ICONS_BY_TYPE['_default'];
        for (let type of result.types) {
            if (type in ND_MARKER_ICONS_BY_TYPE) {
                place.type = formatPlaceType(type);
                place.icon = ND_MARKER_ICONS_BY_TYPE[type];
                break;
            }
        }
    }
    if (result.url) place.url = result.url;
    place.place_id = result.place_id
    // Contact details.
    if (result.website) {
        place.website = result.website;
        const url = new URL(place.website);
        place.websiteDomain = url.hostname;
    }
    if (result.formatted_phone_number) place.phoneNumber = result.formatted_phone_number;
    if (result.opening_hours) place.openingHours = parseDaysHours(result.opening_hours);

    return place;
};
export const placeTypes = {
    None: "",
    Airport: 'airport',
    'Amusement park': 'amusement_park',
    Aquarium: 'aquarium',
    'Art gallery' : 'art_gallery',
    Bar: 'bar',
    Cafe: 'cafe',
    Casino: 'casino',
    'City hall': 'city_hall',
    'Movie theater': 'movie_theater',
    Museum: 'museum',
    'Night Club': 'night_club',
    Park: 'park',
    Restaurant: 'restaurant',
    'Shopping mall': 'shopping_mall',
    Spa: 'spa',
    Stadium: 'stadium',
    Store: 'store',
    Synagogue: 'synagogue',
    'Tourist attraction': 'tourist_attraction',
    Zoo: 'zoo',
}