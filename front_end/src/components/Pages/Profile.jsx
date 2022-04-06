import ProfileBottom from "components/Organisms/ProfileBottom";
import ProfileTop from "components/Organisms/ProfileTop";
import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import axios from "axios";
import { loginStore } from "Store/loginStore";

export default function Profile() {
  const token = loginStore().jwtToken;
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get("/api/stars/myall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (JSON.stringify(res).length !== 0) {
          setContents(res.data);
        }
      })
      .catch((error) => console.log(error));
  });
  return (
    <div className={styles.profilecontainer}>
      <ProfileTop contents={contents} />
      <ProfileBottom contents={contents} />
    </div>
  );
}
