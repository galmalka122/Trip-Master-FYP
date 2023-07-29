export function hideElement(el, focusEl) {
    el.style.display = 'none';
    if (focusEl) focusEl.focus();
}

export function showElement(el, focusEl) {
    el.style.display = 'block';
    if (focusEl) focusEl.focus();
}

const openAllWeek = [
    { day: "Sunday", openingHours: [{ open: '00:00', close: '23:59' }] },
    { day: "Monday", openingHours: [{ open: '00:00', close: '23:59' }] },
    { day: "Tuesday", openingHours: [{ open: '00:00', close: '23:59' }] },
    { day: "Wednesday", openingHours: [{ open: '00:00', close: '23:59' }] },
    { day: "Thursday", openingHours: [{ open: '00:00', close: '23:59' }] },
    { day: "Friday", openingHours: [{ open: '00:00', close: '23:59' }] },
    { day: "Saturday", openingHours: [{ open: '00:00', close: '23:59' }] }
]

const formatTime = (time) => {
    const hours = time.substr(0, 2);
    const minutes = time.substr(2, 2);
    return `${hours}:${minutes}`;
};

export const parseDaysHours = (apiResponse) => {

    if (apiResponse?.periods) {
        const periods = apiResponse?.periods;

        // Initialize the opening hours array
        const openingHoursArray = [];

        // Map the days of the week to their respective index
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        if(periods.length === 1 && !periods[0]?.close)
            return openAllWeek;
        // Iterate over each day of the week
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            const dayObjects = periods.filter((period) => period.open.day === dayIndex);

            if (dayObjects.length > 0) {
                // Opening hours for the current day exist
                const day = daysOfWeek[dayIndex];
                const openingHours = dayObjects.map((dayObject) => {
                    const openTime = formatTime(dayObject.open.time);
                    const closeTime = dayObject.close.time === '0000' ? '23:59' : formatTime(dayObject.close.time);
                    return { open: openTime, close: closeTime };
                });

                openingHoursArray.push({ day, openingHours });
            } else {
                // Opening hours for the current day are not available
                const day = daysOfWeek[dayIndex];
                openingHoursArray.push({ day, openingHours: [] });
            }
        }
            return openingHoursArray;
        } else{
            return openAllWeek;
    }

}

export function createPrompt(what, place){
    let prompt = `find ${what} for a ${place?.types?.length > 0 ? place.types[0].string : "place"} called ${place.name},`
        + `${place?.formatted_address ? " in the address " + place.formatted_address : ""} with the geoLocation ` +
        `{latitude: ${place.latitude}, longitude: ${place.longitude}}. avoid using the geoLocation in the response.`
        + `if you dont find anything, just say "no results".`;
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