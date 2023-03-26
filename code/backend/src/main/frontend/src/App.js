import { BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import { useJsApiLoader } from "@react-google-maps/api";
import Distance from "./componenets/Distance";
import ExampleMap from "./componenets/ExampleMap";
import Layout from "./componenets/Layout";
import Login from "./componenets/Login";
import Register from "./componenets/Register";
import Directions from "./componenets/Directions";
import Test from "./componenets/Test";
import Navigation from "./componenets/Navigation";
import Routes from "./routes";

function App() {
  const key = process.env.REACT_APP_API_KEY;
  const [details, setDetails] = useState([]);
  useEffect(() => console.log(details), [details]);
  const onSaveClick = (newDetails) => {
    if (!details.includes(newDetails))
      setDetails((PrevDetails) => [...PrevDetails, newDetails]);
    else alert("Place already in list");
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
  });

  return (
    isLoaded && (
      <>
        <Navigation />
        <Routes />
      </>
    )
  );
}
export default App;
