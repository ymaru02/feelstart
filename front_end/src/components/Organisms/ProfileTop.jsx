import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./ProfileTop.module.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import axios from "axios";
import { loginStore } from "Store/loginStore";

export default function ProfileTop(props) {
  const [vw, setVw] = useState();
  const token = loginStore().jwtToken;
  const [src, setSrc] = useState("");
  const [username, setName] = useState("");

  window.addEventListener(
    "resize",
    function () {
      setVw(
        Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        )
      );
    },
    true
  );

  useEffect(() => {
    axios
      .get(`/api/users/${props.userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSrc(res.data.profile);
        setName(res.data.nickname);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {Number(vw) < 1200 ? (
          <Avatar
            sx={{
              width: 70,
              height: 70,
              mx: 3,
              top: 0,
              bottom: 0,
              marginTop: "auto",
              marginBottom: "auto",
            }}
            style={{
              background:
                "linear-gradient(45deg, #ffbe4a 20%, #fde1b0 70%, #d1aa60 100%)",
            }}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
                mx: 3,
                top: 0,
                bottom: 0,
                marginTop: "auto",
                marginBottom: "auto",
              }}
              style={{ backgroundColor: "#fff" }}
              src={src}
            ></Avatar>
          </Avatar>
        ) : (
          <Avatar
            sx={{
              width: 130,
              height: 130,
              mx: 3,
              top: 0,
              bottom: 0,
              marginTop: "auto",
              marginBottom: "auto",
            }}
            style={{
              background:
                "linear-gradient(45deg, #ffbe4a 20%, #fde1b0 70%, #d1aa60 100%)",
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 3,
                top: 0,
                bottom: 0,
                marginTop: "auto",
                marginBottom: "auto",
              }}
              style={{ backgroundColor: "#fff" }}
              src={src}
            ></Avatar>
          </Avatar>
        )}

        <section className={styles.profilename}>
          <Stack spacing={2} direction="row">
            <h1>{username}</h1>
            {/* <Button variant="outlined">Outlined</Button> */}
          </Stack>
          <ul className={styles.profilenamemid}>
            <Stack spacing={2} direction="row">
              <li>
                <Box>
                  게시물
                  <p>{props.contents.length}</p>
                </Box>
              </li>
              <li>
                <Box>
                  팔로워
                  <p>user.count</p>
                </Box>
              </li>
              <li>
                <Box>
                  팔로우
                  <p>user.count</p>
                </Box>
              </li>
            </Stack>
          </ul>
          <Stack spacing={2} direction="row">
            <Box className={styles.profilenametop}>user.introductory</Box>
          </Stack>
        </section>
      </Box>
    </Box>
  );
}
