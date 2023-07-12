import useFourSquare from "../../core/hooks/useFourSquare";
import {daysString} from "../trip/utils";
import {fetchAiOverview} from "../place-details/placeDetailsUtils";
import {axiosFourSquare} from "../../core/api/baseAPI";

export const foursquareCategories =  [
    { name: "Restaurant", id: 13065 },
    { name: "BBQ Joint", id: 13026 },
    { name: "Bistro", id: 13027 },
    { name: "Breakfast Spot", id: 13028 },
    { name: "Buffet", id: 13030 },
    { name: "Burger Joint", id: 13031 },
    { name: "Café", id: 13034 },
    { name: "Diner", id: 13049 },
    { name: "Night Market", id: 13062 },
    { name: "Pizzeria", id: 13064 },
    { name: "Bar", id: 13003 },
    { name: "Beach Bar", id: 13005 },
    { name: "Beer Garden", id: 13007 },
    { name: "Champagne Bar", id: 13008 },
    { name: "Cocktail Bar", id: 13009 },
    { name: "Dive Bar", id: 13010 },
    { name: "Hookah Bar", id: 13012 },
    { name: "Hotel Bar", id: 13013 },
    { name: "Karaoke Bar", id: 13015 },
    { name: "Lounge", id: 13016 },
    { name: "Night club", id: 10032 },
    { name: "Pub", id: 13018 },
    { name: "Rooftop Bar", id: 13019 },
    { name: "Speakeasy", id: 13021 },
    { name: "Sports Bar", id: 13022 },
    { name: "Wine Bar", id: 13025 },
    { name: "Internet Cafe", id: 10020 },
    { name: "Coffee Shop", id: 13035 },
    { name: "Dessert Shop", id: 13040 },
    { name: "Donut Shop", id: 13043 },
    { name: "Smoothie Shop", id: 13381 },
    { name: "Tea House", id: 13032 },
    { name: "Landmarks and Outdoors", id: 16000 },
    { name: "Bathing Area", id: 16001 },
    { name: "Bay", id: 16002 },
    { name: "Beach", id: 16003 },
    { name: "Bike Trail", id: 16004 },
    { name: "Botanical Garden", id: 16005 },
    { name: "Bridge", id: 16006 },
    { name: "Campground", id: 16008 },
    { name: "Canal", id: 16009 },
    { name: "Canal Lock", id: 16010 },
    { name: "Castle", id: 16011 },
    { name: "Cave", id: 16012 },
    { name: "Dive Spot", id: 16013 },
    { name: "Farm", id: 16014 },
    { name: "Forest", id: 16015 },
    { name: "Fountain", id: 16016 },
    { name: "Garden", id: 16017 },
    { name: "Harbor or Marina", id: 16018 },
    { name: "Hiking Trail", id: 16019 },
    { name: "Historic and Protected Site", id: 16020 },
    { name: "Hot Spring", id: 16021 },
    { name: "Island", id: 16022 },
    { name: "Lake", id: 16023 },
    { name: "Lighthouse", id: 16024 },
    { name: "Memorial Site", id: 16025 },
    { name: "Monument", id: 16026 },
    { name: "Mountain", id: 16027 },
    { name: "Nature Preserve", id: 16028 },
    { name: "Nudist Beach", id: 16029 },
    { name: "Other Great Outdoors", id: 16030 },
    { name: "Palace", id: 16031 },
    { name: "Park", id: 16032 },
    { name: "Pedestrian Plaza", id: 16040 },
    { name: "Plaza", id: 16041 },
    { name: "Reservoir", id: 16042 },
    { name: "River", id: 16043 },
    { name: "Rock Climbing Spot", id: 16044 },
    { name: "Roof Deck", id: 16045 },
    { name: "Scenic Lookout", id: 16046 },
    { name: "Sculpture Garden", id: 16047 },
    { name: "Stable", id: 16048 },
    { name: "Surf Spot", id: 16049 },
    { name: "Tunnel", id: 16050 },
    { name: "Volcano", id: 16051 },
    { name: "Waterfall", id: 16052 },
    { name: "Waterfront", id: 16053 },
    { name: "Windmill", id: 16054 },
    { name: "Boat Launch", id: 16055 },
    { name: "Dam", id: 16056 },
    { name: "Field", id: 16057 },
    { name: "Hill", id: 16058 },
    { name: "Mountain Hut", id: 16059 },
    { name: "Picnic Shelter", id: 16060 },
    { name: "Retail", id: 17000 },
    { name: "Adult Store", id: 17001 },
    { name: "Antique Store", id: 17002 },
    { name: "Arts and Crafts Store", id: 17003 },
    { name: "Auction House", id: 17004 },
    { name: "Automotive Retail", id: 17005 },
    { name: "Baby Store", id: 17014 },
    { name: "Betting Shop", id: 17015 },
    { name: "Big Box Store", id: 17016 },
    { name: "Board Store", id: 17017 },
    { name: "Bookstore", id: 17018 },
    { name: "Boutique", id: 17020 },
    { name: "Cannabis Store", id: 17021 },
    { name: "Comic Book Store", id: 17022 },
    { name: "Computers andElectronics Retail", id: 17023 },
    { name: "Construction Supplies Store", id: 17028 },
    { name: "Convenience Store", id: 17029 },
    { name: "Cosmetics Store", id: 17030 },
    { name: "Costume Store", id: 17031 },
    { name: "Dance Store", id: 17032 },
    { name: "Department Store", id: 17033 },
    { name: "Discount Store", id: 17034 },
    { name: "Drugstore", id: 17035 },
    { name: "Duty-free Store", id: 17036 },
    { name: "Eyecare Store", id: 17037 },
    { name: "Textiles Store", id: 17038 },
    { name: "Fashion Retail", id: 17039 },
    { name: "Fireworks Store", id: 17053 },
    { name: "Flea Market", id: 17054 },
    { name: "Floating Market", id: 17055 },
    { name: "Flower Store", id: 17056 },
    { name: "Food and Beverage Retail", id: 17057 },
    { name: "Framing Store", id: 17081 },
    { name: "Furniture and Home Store", id: 17082 },
    { name: "Gift Store", id: 17089 },
    { name: "Green Grocer", id: 17090 },
    { name: "Hobby Shop", id: 17092 },
    { name: "Jewelry Store", id: 17045 },
    { name: "Knitting Store", id: 17096 },
    { name: "Leather Goods Store", id: 17097 },
    { name: "Lingerie Store", id: 17098 },
    { name: "Liquor Store", id: 17099 },
    { name: "Mattress Store", id: 17100 },
    { name: "Medical Supply Store", id: 17101 },
    { name: "Mobile Phone Shop", id: 17102 },
    { name: "Motorcycle Shop", id: 17103 },
    { name: "Music Store", id: 17104 },
    { name: "Musical Instrument Store", id: 17105 },
    { name: "Newsstand", id: 17106 },
    { name: "Office Supplies Store", id: 17107 },
    { name: "Outlet Store", id: 17108 },
    { name: "Pawn Shop", id: 17109 },
    { name: "Pharmacy", id: 17111 },
    { name: "Pop-up Shop", id: 17112 },
    { name: "Record Shop", id: 17114 },
    { name: "Retail Service", id: 17115 },
    { name: "Salon / Barbershop", id: 17116 },
    { name: "Shoe Store", id: 17117 },
    { name: "Shopping Mall", id: 17118 },
    { name: "Smoke Shop", id: 17119 },
    { name: "Souvenir Shop", id: 17120 },
    { name: "Sporting Goods Shop", id: 17121 },
    { name: "Stationery Store", id: 17122 },
    { name: "Sunglasses Store", id: 17123 },
    { name: "Supermarket", id: 17124 },
    { name: "Surplus Store", id: 17125 },
    { name: "Tailor Shop", id: 17126 },
    { name: "Thrift / Vintage Store", id: 17127 },
    { name: "Toy / Game Store", id: 17128 },
    { name: "Trophy Shop", id: 17129 },
    { name: "Used Bookstore", id: 17130 },
    { name: "Vape Store", id: 17131 },
    { name: "Bike Rental", id: 19002 },
    { name: "Boat Rental", id: 19003 },
    { name: "Car Rental", id: 19004 },
    { name: "skydiving Center", id: 18057 },
    { name: "Water Sports", id: 18067 },
];

const foursquareNearByFields = "name,geocodes,link,location,rating";

const foursquarePlaceDetailsFields = "categories,website,hours,price,photos,description";

const createNearByQuery = (formValues) => {
    const query = {};
    query.ll = `${formValues.lat},${formValues.lng}`;
    query.radius = Math.trunc(formValues.radius * 1000);
    query.limit = 10;
    query.fields = foursquareNearByFields;
    if (formValues.query) query.query = formValues.query;
    if (formValues.categories) query.categories = formValues.categories.toString();
    if (formValues.max_price){ query.min_price = 1; query.max_price = formValues.max_price;}
    else query.min_price = 1; query.max_price = 4;

    return query;
};

const priceMessage = {
    1: "Cheap",
    2: "Moderate",
    3: "Expensive",
    4: "Very Expensive",
}

const processHours = (hours) => {
    const parsedHours = {};
    const currentDay = new Date().getDay();
    return hours.regular.forEach(day => {
        const dayOfWeek = (day.day - currentDay + 7) % 7; // Adjust day index to start from the current day
        parsedHours[daysString[dayOfWeek]] = `${day.open} - ${day.close}`;
    });
}

const processCategory = (category) => {
    return {
        string: category.name,
        icon: `${category.icon.prefix}bg_32${category.icon.suffix}`
    };

}

// Helper function to parse the Link header
function parseLinkHeader(linkHeader) {
    const links = {};
    linkHeader.split(',').forEach(link => {
        const url = link.match(/<([^>]+)>/)[1];
        const rel = link.match(/rel="([^"]+)"/)[1];
        links[rel] = url;
    });
    return links;
}

const processResult = async (result) => {
    const place = {};
    if (result.name) place.name = result.name;
    if(result?.hours?.openingHours) place.openingHours = processHours(result.hours); else place.openingHours = [];
    if(result.price) place.priceLevel = priceMessage[result.price];
    if(result.categories) place.types = result.categories.map(category => processCategory(category));
    if (result.photos) {
        place.photos = result.photos.map((photo) => ({
            urlSmall: `${photo.prefix}200x200${photo.suffix}`,
            urlLarge: `${photo.prefix}original${photo.suffix}`,
            attrs: [photo.id]
        })).slice(0, 5);
    }
    if(result.website) place.website = result.website;
    if(result.location) place.address = result.location.formatted_address;
    return place;

}
function customRound(number, decimalPlaces) {
    let factor = Math.pow(10, decimalPlaces);
    return Math.floor(number * factor) / factor;
}

export const nearBySearch = async (api, dayPlaces, formValues, viewDetails, setPlaces, setNextPage, next=null) => {
    let url;
    if(!next) {
        const params = createNearByQuery(formValues);
        const searchParams = new URLSearchParams(params);
        url = `v3/places/search?${searchParams}`;
    }
    else url = next;
    try {
        const {data, headers} = await api.get(url);
        const results = data.results;
        const places = results.map(place => {
            const index = dayPlaces.findIndex(dayPlace => dayPlace.id === place.id);
            if(index !== -1) return dayPlaces[index];
            place.latitude = place.geocodes.main.latitude;
            place.longitude = place.geocodes.main.longitude;
            place.onClick = async () => {
                const {data} = await api.get(`${place.link}?fields=${foursquarePlaceDetailsFields}`);
                let placeDetails = await processResult(data);
                placeDetails = {...placeDetails, ...place};
                if(placeDetails.description) placeDetails.overview = placeDetails.description;
                else placeDetails.overview = await fetchAiOverview(placeDetails);
                viewDetails(placeDetails);
            }
            place?.rating ? place.rating = customRound(place.rating / 2, 1) : place.rating = 0;
            return place;
        });
        setPlaces(places);
        const hasNext = headers?.link?.includes('rel="next"');
        if(!hasNext) {
            setNextPage({nextPage: null, hasNextPage: false});
            return;
        }

        const next = new URL(parseLinkHeader(headers.link).next);
        const link = next.pathname + next.search;
        setNextPage({nextPage: async () => {
            await nearBySearch(api, dayPlaces, null, viewDetails, setPlaces, setNextPage, link)
            },
            hasNextPage: hasNext});
    }
    catch (e) {
        throw new Error("Error in fetching places");
    }
}
