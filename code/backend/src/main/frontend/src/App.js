import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./componenets/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
