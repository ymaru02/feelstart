import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./components/Pages/About";
import Home from "./components/Pages/Home";
import MapWrite from "components/Pages/MapWrite";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mapwirte" element={<MapWrite />} />
      </Routes>
    </div>
  );
};

export default App;
