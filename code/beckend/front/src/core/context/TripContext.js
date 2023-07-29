// noinspection JSUnresolvedFunction,JSUnresolvedVariable

import React, {createContext, useEffect, useState} from 'react';
import useToast from "../hooks/useToast";
import useLoading from "../hooks/useLoading";
import useAuth from "../hooks/useAuth";
import tripAPI from "../api/tripAPI";

export const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
    const {isLoggedIn, baseApi} = useAuth();
    const toast = useToast();
    const {spinnerProcess} = useLoading();
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
        }
        isLoggedIn && spinnerProcess(getAllTrips);
        // eslint-disable-next-line
    },[isLoggedIn])

    const getTripsHandler = async () => spinnerProcess(async () => {
        try {
            const trips = await api.getTrips();
            setTrips(trips);
        }
        catch (e) {
            toast.showError(e);
            setTrips(old=>{return {...old}});
        }
    });

    const saveTripHandler = async (trip) => spinnerProcess( async () => {
        try {
            const updatedTrip = await api.saveTrip(trip);
            const updatedTrips = trips?.map((t) => (t.id === updatedTrip.id ? updatedTrip : t));
            setTrips(updatedTrips);
            toast.showSuccess(trip.name,'Successfully updated');
        }
        catch (e){
            toast.showError(e);
        }
    })

    const addTripHandler = async (trip) => spinnerProcess(async () => {
        try {
            const addedTrip = await api.addTrip(trip);
            setTrips([...trips, addedTrip]);
            toast.showSuccess(trip.name,'Successfully added');

        }
        catch (e){
            toast.showError(e);
        }
    })

    const deleteTripHandler = async (trip) => spinnerProcess(async () => {
        try {
            const deletedTrip = await api.deleteTrip(trip.trip_id);
            const updatedTrips = trips.filter((trip) => trip.trip_id !== deletedTrip.trip_id);
            setTrips(updatedTrips);
            toast.showSuccess(deletedTrip.name, 'Successfully removed')
        } catch (e) {
            toast.showError(e);
        }
    })

    const addPlaceHandler = async (tripId, place) => spinnerProcess(async () =>  {
        try {
            const addedPlace = await api.addPlace(tripId, place);
            toast.showSuccess(addedPlace.name, 'Successfully added');
            selectedTrip.trip_days[place.day_index].places.push(addedPlace);
            trips.map((trip) => {
                    if (trip.trip_id === tripId) {
                        trip = selectedTrip;
                    }
                    return trip;
                }
            );

            return addedPlace;
        } catch (e) {
            toast.showError(e);
        }
    })

    const updatePlaceHandler = async (tripId, place) => spinnerProcess(async () => {
        try {
            const updatedPlace = await api.updatePlace(tripId, place);
            trips.map((trip) => {
                if (trip.trip_id === tripId) {
                    trip.trip_days[place.day_index].places.map((p) => {
                        if (p.place_id === place.place_id) {
                            p = updatedPlace;
                        }
                        return p;
                    });
                }
                return trip;
            });
            return updatedPlace;
        } catch (e) {
            toast.showError(e);
        }
    })

    const updateTripDayHandler = async (tripId, dayIndex, tripDay) =>spinnerProcess(async () => {
        try {
            const newTripDay = await api.updateTripDay(tripId, dayIndex, tripDay);
            toast.showSuccess('Successfully updated');
            trips.map((trip) => {
                if (trip.trip_id === tripId) {
                    trip.trip_days[dayIndex] = newTripDay;
                }
                return trip;
            });
            return newTripDay;
        } catch (e) {
            toast.showError(e);
        }

    })

    const removePlaceHandler = async (tripId, place, placeIndex) => spinnerProcess(async () => {
        try {
            const removedPlace = await api.removePlace(tripId, place.place_id, placeIndex);
            toast.showSuccess(removedPlace.name, 'Successfully removed');
            trips.map((trip) => {
                if (trip.trip_id === tripId) {
                    trip.trip_days[place.day_index].places.splice(placeIndex, 1);
                }
                return trip;
            });
            return removedPlace;
        } catch (e) {
            toast.showError(e);
        }
    })

    const calculateRouteHandler = (request) => spinnerProcess(async () =>{
        try{
            const route = await api.calculateRoute(request);
            return route;
        } catch (e) {
            toast.showError(e);
        }
    })

    const selectTrip = (trip) => {
        setSelectedTrip(trip);
    }

    // Value object to be provided by the context
    const tripContextValue = {
        trips,
        getTripsHandler,
        addTripHandler,
        saveTripHandler,
        deleteTripHandler,
        selectTrip,
        selectedTrip,
        addPlaceHandler,
        updatePlaceHandler,
        removePlaceHandler,
        calculateRouteHandler,
        updateTripDayHandler
    };

    // Render the context provider with the provided value
    return (
        <TripContext.Provider value={tripContextValue}>
            {children}
        </TripContext.Provider>
    );
};
