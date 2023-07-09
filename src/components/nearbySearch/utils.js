import nearBySearchConstants from "./constants";



// Helper function to convert degrees to radians
function degToRad(degrees) {
    return (degrees * Math.PI) / 180;
}

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    // Convert latitude and longitude from degrees to radians
    const lat1Rad = degToRad(lat1);
    const lon1Rad = degToRad(lon1);
    const lat2Rad = degToRad(lat2);
    const lon2Rad = degToRad(lon2);

    // Calculate the differences between the latitudes and longitudes
    const latDiff = lat2Rad - lat1Rad;
    const lonDiff = lon2Rad - lon1Rad;

    // Apply the Haversine formula
    const a =
        Math.sin(latDiff / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance
    const distance = earthRadius * c;
    return distance;
}



export const placeDetailsFields = "location,description,website,hours,photos,price"

export const createFourSquareQuery = (details) => {
    const query = {};
    query.ll = `${details.coords.lat},${details.coords.lng}`;
    query.radius = details.radius;
    query.limit = 10;
    query.fields = nearBySearchConstants.getNearByFields;
    if(details.query) query.query = details.query;
    if (details.name) query.query = details.name;
    if (details.categories) query.categories = details.types.map(type => nearBySearchConstants.getFoursquareCategories[type]).join(',');
    if (details.min_price) query.min_price = details.min_price;
    if (details.max_price) query.max_price = details.max_price;
    return query;
}
