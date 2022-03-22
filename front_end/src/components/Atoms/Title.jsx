import { AppBar, Typography } from "@mui/material";
import styles from "styles.module.css";

const Title = () => {
  return (
    <AppBar position="static" id={styles.indigo} style={{ Height: "10vh" }}>
      <Typography
        sx={{ mx: 0 }}
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
      </Typography>
    </AppBar>
  );
};

export default Title;
