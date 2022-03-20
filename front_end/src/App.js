import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./components/Pages/About";
import Home from "./components/Pages/Home";
import Title from "components/Atoms/Title";
import KakaoCallback from "components/Atoms/KakaoCallback";
import styles from "styles.module.css";
import Box from "@mui/material/Box";

const App = () => {
  return (
    <Box
      className="App"
      id={styles.dark}
      height="100vh"
      display="flex"
      flexDirection="column"
    >
      <Title />
      <Box flexGrow="1">
        <Routes flexGrow="1">
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/kakaocallback" element={<KakaoCallback />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
