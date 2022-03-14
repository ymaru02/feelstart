import "./App.css";
import Map from "./components/Atoms/Map";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About";
import Home from "./Pages/Home";

const App = () => {
  return (
    <div className="App">
      <Map />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
