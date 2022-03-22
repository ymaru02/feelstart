import OutlinedCard from "components/Molecules/OutLineCard";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Map from "../Atoms/Map";
import styles from "./MapWrite.module.css";

export default function MapWrite() {
  const [posContent, setPosContent] = useState([1, 2, 3, 4, 5, 6]);
  return (
    <div>
      <Map />
      <br />
      <div className={styles.content}>
        <div className={styles.title}>
          <h2 className={styles.h2}>현재 게시물 위치 주변글</h2>
        </div>
        <br />
        {posContent.map((value, index) => (
          <OutlinedCard
            key={index}
            imgurl={`https://source.unsplash.com/collection/${value}`}
          />
        ))}
      </div>
      <br />
      <Link to="/">홈으로</Link>
    </div>
  );
}
