import KakaoLoginButton from "components/Atoms/KakaoLoginButton";
// import Map from "components/Atoms/Map";
import Box from "@mui/material/Box";
import styles from "styles.module.css";
import Carousel from "components/Organisms/Carousel";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      {/* <Map /> */}
      <Box flexGrow="1">
        <Carousel />
      </Box>
      <Box id={styles.indigo}>
        <KakaoLoginButton />
      </Box>
    </Box>
  );
};

export default Home;
