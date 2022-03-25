import Onbording from "components/Templates/Onbording";
import Inbording from "components/Templates/Inbording";
import { loginStore } from "Store/loginStore";
import Box from "@mui/material/Box";

const Home = () => {
  const { login, isLogined } = loginStore();
  <p>{login}</p>;
  return (
    <Box height="100%" id="Home">
      {isLogined() ? <Inbording /> : <Onbording />}
    </Box>
  );
};

export default Home;
