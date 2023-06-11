import React from "react";
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AppRoutes from "./components/routes/AppRoutes";
import Navigation from "./components/routes/Navigation";
import {useState} from "react";
import {useLoadScript} from "@react-google-maps/api";

function App() {
    const [ libraries ] = useState(['places', 'routes']);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries,
        version: "beta",
    });

    return isLoaded && (<Router>
            <Navigation />
            <AppRoutes />
        </Router>)
}

export default App;
