import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./components/Pages/About";
import Home from "./components/Pages/Home";
import Title from "components/Atoms/Title";

const App = () => {
  return (
    <div className="App">
      <Title />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
