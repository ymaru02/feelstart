import React from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./ProfileTop.module.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function ProfileTop() {
  return (
    <div className={styles.profilecontainer}>
      <div className={styles.profiletop}>
        <Avatar
          sx={{ width: 150, height: 150, margin: 5 }}
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />

        <section className={styles.profilename}>
          <Stack spacing={2} direction="row">
            <h1>user.name</h1>
            <Button variant="outlined">Outlined</Button>
          </Stack>
          <ul className={styles.profilenamemid}>
            <Stack spacing={2} direction="row">
              <li>
                <div>
                  게시물
                  <span>user.count</span>
                </div>
              </li>
              <li>
                {" "}
                <div>
                  팔로워
                  <span>user.count</span>
                </div>
              </li>
              <li>
                {" "}
                <div>
                  팔로우
                  <span>user.count</span>
                </div>
              </li>
            </Stack>
          </ul>
          <Stack spacing={2} direction="row">
            <div className={styles.profilenametop}>user.introductory</div>
          </Stack>
        </section>
      </div>
    </div>
  );
}
