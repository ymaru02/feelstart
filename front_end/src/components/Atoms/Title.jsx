import { AppBar, Typography } from "@mui/material";
import styles from "styles.module.css";
import Box from "@mui/material/Box";

const Title = () => {
  return (
    <AppBar
      position="sticky"
      id={styles.indigo}
      style={{ height: "74px", alignItems: "center" }}
      sx={{ borderBottom: 1, borderColor: "#282c34" }}
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
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Title;
