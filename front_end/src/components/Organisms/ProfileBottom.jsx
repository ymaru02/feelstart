import React, { useEffect } from "react";
// import Button from "@mui/material/Button";
// import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageListItem from "@mui/material/ImageListItem";
import styles from "./ProfileBottom.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  label: {
    color: " #ffffff",
    "&.Mui-focused": {
      color: "darkred",
    },
  },
});

export default function ProfileBottom({ contents = [] }) {
  const [value, setValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  useEffect(() => {});
  return (
    <>
      <div className={styles.bttongroup}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          centered
        >
          <Tab className={classes.label} value="0" label="Item One" />
          <Tab className={classes.label} value="1" label="Item Two" />
          <Tab className={classes.label} value="2" label="Item Three" />
        </Tabs>
      </div>
      <div>
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {contents.map((item, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <ImageListItem
                  key={item.img}
                  sx={{
                    margin: 2,
                    border: "1px solid rgb(99,99,99)",
                    borderRadius: 3,
                  }}
                >
                  <img
                    src={`https://j6b205.p.ssafy.io/api/starimg/${item.imageName}`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
}
