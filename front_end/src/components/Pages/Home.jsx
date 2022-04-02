import Onbording from "components/Templates/Onbording";
import Inbording from "components/Templates/Inbording";
import Box from "@mui/material/Box";
import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);

  return (
    <Box height="100%" id="Home">
      {!cookies ? <Inbording /> : <Onbording />}
    </Box>
  );
};

export default Home;
