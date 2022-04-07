import Onbording from "components/Templates/Onbording";
import Inbording from "components/Templates/Inbording";
import { loginStore } from "Store/loginStore";
import Box from "@mui/material/Box";

const Home = () => {
  const { isLogined } = loginStore();
  return (
    <Box height="100%" id="Home">
      {isLogined() ? <Inbording /> : <Onbording />}
    </Box>
  );
};

export default Home;
