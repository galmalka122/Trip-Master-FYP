import React, {createContext, useEffect, useState} from 'react';
import useToast from "../hooks/useToast";
import useLoading from "../hooks/useLoading";
import useAuth from "../hooks/useAuth";
import tripAPI from "../api/tripAPI";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const {isLoggedIn, baseApi} = useAuth();
    const toast = useToast();
    const loading = useLoading();
    const api = tripAPI(baseApi);
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null);

    useEffect(() => {
        const getAllTrips = async () => {
            try {
                const trips = await api.getTrips();
                setTrips(trips);
            }
            catch (e){
                toast.showError(e);
                setTrips([])
            }
            finally {
                loading.off();
            }
        }
        isLoggedIn && getAllTrips();
        // eslint-disable-next-line
    },[isLoggedIn])

    const getTripsHandler = async () => {
        try {
            const trips = await api.getTrips();
            setTrips(trips);
        }
        catch (e) {
            toast.showError(e);
        }
    }

    const getTripHandler = async (tripId) => {
        // try {
        //     const trip = await api.getTrip(tripId);
        //     // When should we use this?
        // }
        // catch (e){
        //     toast.showError(e);
        // }
    }

    const saveTripHandler = async (trip) => {
        try {
            const updatedTrip = await api.saveTrip(trip);
            const updatedTrips = trips.map((t) => (t.id === updatedTrip.id ? updatedTrip : t));
            setTrips(updatedTrips);
            toast.showSuccess(trip.name,'Successfully updated');
        }
        catch (e){
            toast.showError(e);
        }
    }

    const addTripHandler = async (trip) => {
        try {
            const addedTrip = await api.addTrip(trip);
            setTrips([...trips, addedTrip]);
            toast.showSuccess(trip.name,'Successfully added');

        }
        catch (e){
            toast.showError(e);
        }
    }

    const deleteTripHandler = async (trip) => {
        try {
            const deletedTrip = await api.deleteTrip(trip.trip_id);
            const updatedTrips = trips.filter((trip) => trip.trip_id !== deletedTrip.trip_id);
            setTrips(updatedTrips);
            toast.showSuccess(deletedTrip.name, 'Successfully removed')
        } catch (e) {
            toast.showError(e);
        }
    }

    const selectTrip = async (trip) => {
        setSelectedTrip(trip);
    }

    // Value object to be provided by the context
    const tripContextValue = {
        trips,
        getTripHandler,
        getTripsHandler,
        addTripHandler,
        saveTripHandler,
        deleteTripHandler,
        selectTrip,
        selectedTrip,
    };

    // Render the context provider with the provided value
    return (
        <TripContext.Provider value={tripContextValue}>
            {children}
        </TripContext.Provider>
    );
};
