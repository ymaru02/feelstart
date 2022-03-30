import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./components/Pages/About";
import Home from "./components/Pages/Home";
import Title from "components/Atoms/Title";
import KakaoCallback from "components/Atoms/KakaoCallback";
import styles from "styles.module.css";
import Box from "@mui/material/Box";
import MapWrite from "components/Pages/MapWrite";
import Content from "components/Pages/Content";
import Profile from "components/Pages/Profile";
import Write from "components/Pages/Write";

const App = () => {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", appHeight);
  appHeight();

  return (
    <Box
      className="App"
      id={styles.dark}
      minHeight="var(--app-height)"
      display="flex"
      flexDirection="column"
    >
      <Title />
      <Box flexGrow="1">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/kakaocallback" element={<KakaoCallback />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
