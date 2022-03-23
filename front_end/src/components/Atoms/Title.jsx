import { AppBar, Typography } from "@mui/material";
import styles from "styles.module.css";
import Box from "@mui/material/Box";
import { loginStore } from "Store/loginStore";

const Title = () => {
  const { login, isLogined } = loginStore();
  return (
    <AppBar
      position="sticky"
      id={styles.indigo}
      style={{ height: "74px", alignItems: "center" }}
    >
      <Box maxWidth="1000px" width="100%">
        <Typography
          variant="h5"
          align="left"
          className={styles.apricot}
          style={{ margin: "5px" }}
        >
          <span className={styles.orange}>감</span>
          <span>정은</span>
          <br />
          <span className={styles.orange}>별</span>
          <span>이 되어</span>
          <span>{login.toString()}</span>
          <span>{isLogined()}</span>
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Title;
