export function hideElement(el, focusEl) {
    el.style.display = 'none';
    if (focusEl) focusEl.focus();
}

export function showElement(el, focusEl) {
    el.style.display = 'block';
    if (focusEl) focusEl.focus();
}

export function formatPlaceType(str) {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized.replace(/_/g, ' ');
}

export function parseDaysHours(openingHours) {
    let daysHours;
    if(openingHours?.weekday_text)
    daysHours = openingHours.weekday_text.map((e) => e.split(/:\s+/)).reduce((p, c) => {
        p[c[0]] = c[1];
        return p;
    }, {});
    return daysHours;
}

export function createPrompt(what, place){
    prompt = `find ${what} for the place called ${place.name},${place?.formatted_address ? " in the address " + place.formatted_address : ""} with the geoLocation ` +
        `{latitude: ${place.coords.lat}, longitude: ${place.coords.lng}}`
    let data = {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        n: null,
        stream: false,
        logprobs: null,
        stop: null
    };
    return data;
}

export const ND_MARKER_ICONS_BY_TYPE = {
    restaurant: 'path/to/restaurant-icon.svg',
    hotel: 'path/to/hotel-icon.svg',
    attraction: 'path/to/attraction-icon.svg',
    _default: 'path/to/default-icon.svg',
};