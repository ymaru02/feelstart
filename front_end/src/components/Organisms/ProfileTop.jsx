import React from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./ProfileTop.module.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function ProfileTop() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Avatar
          sx={{
            width: 56,
            height: 56,
            mx: 3,
            top: 0,
            bottom: 0,
            marginTop: "auto",
            marginBottom: "auto",
          }}
        />

        <section className={styles.profilename}>
          <Stack spacing={2} direction="row">
            <h1>user.name</h1>
            <Button variant="outlined">Outlined</Button>
          </Stack>
          <ul className={styles.profilenamemid}>
            <Stack spacing={2} direction="row">
              <li>
                <Box>
                  게시물
                  <p>user.count</p>
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
