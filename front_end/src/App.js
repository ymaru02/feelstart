import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./components/Pages/About";
import Home from "./components/Pages/Home";
import Title from "components/Atoms/Title";
import KakaoCallback from "components/Atoms/KakaoCallback";

const App = () => {
  return (
    <div className="App">
      <Title />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/kakaocallback" element={<KakaoCallback />} /> */}
      </Routes>
    </div>
  );
};

export default App;
