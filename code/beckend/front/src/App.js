import React from "react";
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import AppRoutes from "./components/routes/AppRoutes";
import Navigation from "./components/routes/Navigation";
import {useState} from "react";
import {useLoadScript} from "@react-google-maps/api";
import { PrimeReactProvider } from 'primereact/api';


function App({ pageProps }) {
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
