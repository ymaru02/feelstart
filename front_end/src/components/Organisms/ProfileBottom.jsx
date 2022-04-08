import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
// import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageListItem from "@mui/material/ImageListItem";
import styles from "./ProfileBottom.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@mui/styles";
import MidMap from "components/Atoms/MidMap";
import axios from "axios";
import { loginStore } from "Store/loginStore";
import { useParams } from "react-router-dom";
import AvatarCircle from "components/Atoms/AvatarCircle";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  label: {
    color: " #ffffff",
    "&.Mui-focused": {
      color: "darkred",
    },
  },
});

export default function ProfileBottom({
  contents = [],
  follow = false,
  changeid = 0,
}) {
  const token = loginStore().jwtToken;
  const { userid } = useParams();

  const [value, setValue] = React.useState("0");
  const [pos, setPos] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const [friends, setFriends] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  useEffect(() => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setPos({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }

    axios
      .get(`/api/user/profile/${userid}/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFriends(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [follow, changeid]);
  return (
    <>
      <Box className={styles.bttongroup}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          centered
        >
          <Tab className={classes.label} value="0" label="게시글" />
          <Tab className={classes.label} value="1" label="지도" />
          <Tab className={classes.label} value="2" label="친구" />
        </Tabs>
      </Box>
      <Box hidden={value !== "0"}>
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
      {value === "1" ? (
        <Box hidden={value !== "1"}>
          <MidMap
            contents={contents}
            baseLatitude={pos.latitude}
            baseLongitude={pos.longitude}
            baseheight={50}
            maplevel={7}
          />
        </Box>
      ) : (
        <></>
      )}

      <Box hidden={value !== "2"}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {friends.map((item, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <ImageListItem
                key={item.userId}
                sx={{
                  margin: 2,
                  border: "1px solid rgb(99,99,99)",
                  borderRadius: 3,
                }}
              >
                <Link to={`/profile/${item.userId}`}>
                  <AvatarCircle userProFile={item.profile} w1={150} w2={140} />
                </Link>
              </ImageListItem>
              {item.nickname}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
