import React from 'react';
import {Routes, Route} from "react-router-dom";
import RequireAuth from "../auth/RequireAuth";
import Login from "./Login";
import SignupForm from "./Register";
import TripList from "../trip/TripsList";
import ErrorPage from "./ErrorPage";
import LandingPage from "../landing/LandingPage";
import Unauthorized from "./Unauthorized";
import useTripContext from "../../core/hooks/useTripContext";
import Trip from "../trip/Trip";
import MapContainer from "../map/MapContainer";
import Day from "../day/Day";
import PlaceDetailContainer from "../place-details/PlaceDetailContainer";

function AppRoutes() {
    const {  selectedTrip } = useTripContext()
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route element={<RequireAuth key={"/"} shouldBeAuthenticated={false}/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignupForm />} />
            </Route>
            <Route element={<RequireAuth key={"/members"} shouldBeAuthenticated={true}/>}>
                <Route path="/members/trips" element={<TripList/>} />
                <Route path="/members/days" element={selectedTrip && <Trip />}/>
                <Route path="/members/day" element={selectedTrip && <Day />}/>
                <Route path="/members/search" element={selectedTrip && <MapContainer />}/>
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default AppRoutes;