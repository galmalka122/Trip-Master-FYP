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

export const ND_MARKER_ICONS_BY_TYPE = {
    restaurant: 'path/to/restaurant-icon.svg',
    hotel: 'path/to/hotel-icon.svg',
    attraction: 'path/to/attraction-icon.svg',
    _default: 'path/to/default-icon.svg',
};