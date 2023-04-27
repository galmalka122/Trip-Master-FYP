import './App.css';
import Button from "./components/Navbar/Button";
import Navlink from "./components/Navbar/Navlink";
import NavBar from "./components/Navbar/Navbar";
import MapContainer from "./components/map/MapContainer";
function App() {
    const buttons = [
        <Button link={"/signup"} text={"Sign up"} key={1}/>,
        <Button link={"/login"} text={"Login"} key={2}/>,
    ]
    const links = [
        <Navlink link={"/"} text={"Home"} key={3}/>,
        <Navlink link={"/places"} text={"Attractions"} key={4}/>,
        <Navlink link={"/trips"} text={"Your trips"} key={5}/>,
    ]
  return (
    <div className="App">

        <NavBar links={links} buttons={buttons}/>
        <MapContainer/>
    </div>
  );
}

export default App;
