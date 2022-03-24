import ProfileBottom from "components/Organisms/ProfileBottom";
import ProfileTop from "components/Organisms/ProfileTop";
import React from "react";
import styles from "./Profile.module.css";
export default function Profile() {
  return (
    <div className={styles.profilecontainer}>
      <ProfileTop />
      <ProfileBottom />
    </div>
  );
}
