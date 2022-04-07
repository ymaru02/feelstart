import { AppBar, Typography } from "@mui/material";
import styles from "styles.module.css";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Title = () => {
  return (
    <AppBar
      position="sticky"
      id={styles.indigo}
      style={{ height: "74px", alignItems: "center" }}
      sx={{ borderBottom: 1, borderColor: "#282c34" }}
    >
      <Box maxWidth="1000px" width="100%">
        <Typography variant="h5" align="left" style={{ margin: "5px" }}>
          <Link
            // to="/content"
            to="/content"
            style={{ textDecoration: "none" }}
            className={styles.apricot}
          >
            <span className={styles.orange}>감</span>
            <span>정은</span>
            <br />
            <span className={styles.orange}>별</span>
            <span>이 되어</span>
          </Link>
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Title;
