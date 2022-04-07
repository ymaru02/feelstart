import ProfileBottom from "components/Organisms/ProfileBottom";
import ProfileTop from "components/Organisms/ProfileTop";
import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import axios from "axios";
import { loginStore } from "Store/loginStore";
import { useParams } from "react-router-dom";
export default function Profile() {
  const token = loginStore().jwtToken;
  const [contents, setContents] = useState([]);
  const { userid } = useParams();

  useEffect(() => {
    axios
      .get(`/api/stars/all/${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContents(res.data);
      })
      .catch((error) => console.log(error));
  }, [userid]);
  return (
    <div className={styles.profilecontainer}>
      <ProfileTop contents={contents} userid={userid} />
      <ProfileBottom contents={contents} />
    </div>
  );
}
