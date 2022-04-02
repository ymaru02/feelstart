import RecipeReviewCard from "components/Molecules/RecipeReviewCard";
import React, { useEffect, useState } from "react";
import styles from "./Content.module.css";
import axios from "axios";
import { loginStore } from "Store/loginStore";

export default function Content() {
  const [content, setContent] = useState();
  const token = loginStore().jwtToken;
  useEffect(() => {
    console.log(token);
    axios
      .get("/api/stars/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (JSON.stringify(res).length !== 0) {
          setContent(res.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {content &&
        content.map((value, index) => (
          <div className={styles.flexbox} key={index}>
            <RecipeReviewCard
              content={value.content}
              date={value.date}
              imageUrl={value.imageUrl}
              latitude={value.latitude}
              longitude={value.longitude}
              addr={value.addr}
              mood={value.mood}
              writer={value.writer}
            />
            <br />
          </div>
        ))}
    </div>
  );
}
