import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./ProfileTop.module.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { loginStore } from "Store/loginStore";
import { useParams } from "react-router-dom";
export default function ProfileTop(props) {
  const [vw, setVw] = useState();
  const [src, setSrc] = useState("");
  const [username, setName] = useState("");
  const myId = loginStore().userId;
  const { userid } = useParams();

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
    setSrc(props.userData.profile);
    setName(props.userData.nickname);

    return () => {
      setSrc("");
      setName("");
    };
  }, [props.userData.profile]);

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
            {myId === Number(userid) ? (
              <></>
            ) : props.follow ? (
              <Button
                variant="text"
                onClick={props.handleFollowClick}
                sx={{
                  padding: 1,
                  borderRadius: 3,
                  color: "rgb(255,200,100)",
                }}
              >
                팔로우 취소
              </Button>
            ) : (
              <Button
                variant="text"
                onClick={props.handleFollowClick}
                sx={{
                  padding: 1,
                  borderRadius: 3,
                  color: "rgb(255,200,100)",
                }}
              >
                팔로우
              </Button>
            )}
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
                  <p>{props.followerCount}</p>
                </Box>
              </li>
              <li>
                <Box>
                  팔로우
                  <p>{props.followingCount}</p>
                </Box>
              </li>
            </Stack>
          </ul>
        </section>
      </Box>
    </Box>
  );
}
