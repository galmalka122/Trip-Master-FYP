import React from "react";
import {useState} from "react";
import {useLoadScript} from "@react-google-maps/api";

import {BrowserRouter as Router} from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';

import AppRoutes from "./components/routes/AppRoutes";
import Navigation from "./components/routes/Navigation";

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App({ pageProps }) 
{

    // Initialize the google api.
    const [ libraries ] = useState(['places', 'routes', "geometry", "marker"]);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        version: "weekly",
        libraries,
    });

    return isLoaded && (
        <PrimeReactProvider>
            <Router>
                <Navigation />
                <AppRoutes {...pageProps}/>
            </Router>
        </PrimeReactProvider>)
}

export default App;
