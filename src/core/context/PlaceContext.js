import React, {createContext, useEffect, useState} from 'react';
import useToast from "../hooks/useToast";
import useLoading from "../hooks/useLoading";
import useAuth from "../hooks/useAuth";
import PlaceApi from "../api/placeApi";

export const PlaceContext = createContext();

export const PlaceProvider = ({ children }) => {
    const {isLoggedIn, baseApi} = useAuth();
    const toast = useToast();
    const loading = useLoading();
    const api = PlaceApi(baseApi);
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => {
        const getAllPlaces = async () => {
            try {
                const trips = await api.getPlaces();
                setPlaces(trips);
            }
            catch (e){
                toast.showError(e);
                setPlaces([])
            }
            finally {
                loading.off();
            }
        }
        isLoggedIn && getAllPlaces();
        // eslint-disable-next-line
    },[isLoggedIn])

    const getPlacesHandler = async () => {
        try {
            const places = await api.getPlaces();
            setPlaces(places);
        }
        catch (e) {
            toast.showError(e);
        }
    }

    const getPlaceHandler = async (tripId) => {
        // try {
        //     const trip = await api.getTrip(tripId);
        //     // When should we use this?
        // }
        // catch (e){
        //     toast.showError(e);
        // }
    }

    const savePlaceHandler = async (place) => {
        try {
            const updatedPlace = await api.savePlace(place);
            const updatedPlaces = places?.map((p) => (p.id === updatedPlace.id ? updatedPlace : p));
            setPlaces(updatedPlaces);
            toast.showSuccess(place.name,'Successfully updated');
        }
        catch (e){
            toast.showError(e);
        }
    }

    const addTripHandler = async (place) => {
        try {
            const addedPlace = await api.addPlace(place);
            setPlaces([...places, addedPlace]);
            toast.showSuccess(place.name,'Successfully added');

        }
        catch (e){
            toast.showError(e);
        }
    }

    const deleteTripHandler = async (place) => {
        try {
            const deletedPlace = await api.deletePlace(place.id);
            const updatedPlaces = places.filter((p) => p.id !== place.id);
            setPlaces(updatedPlaces);
            toast.showSuccess(deletedPlace.name, 'Successfully removed')
        } catch (e) {
            toast.showError(e);
        }
    }

    const selectTrip = async (place) => {
        setSelectedPlace(place);
    }

    // Value object to be provided by the context
    const tripContextValue = {
        places,
        selectedPlace,
        getPlacesHandler,
        getPlaceHandler,
        savePlaceHandler,
        addTripHandler,
        deleteTripHandler,
        selectTrip
    };

    // Render the context provider with the provided value
    return (
        <PlaceContext.Provider value={tripContextValue}>
            {children}
        </PlaceContext.Provider>
    );
};
