import RecipeReviewCard from "components/Molecules/RecipeReviewCard";
import React, { useEffect, useState } from "react";
import styles from "./Content.module.css";
import axios from "axios";

export default function Content() {
  const [content, setContent] = useState([1, 2, 3, 4]);

  useEffect(() => {
    axios
      .get("http://j6b205.p.ssafy.io/stars/all")
      .then((res) => {
        if (JSON.stringify(res).length !== 0) {
          setContent(JSON.stringify(res));
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {content.map((value, index) => (
        <div className={styles.flexbox} key={index}>
          <RecipeReviewCard
            imgurl={`https://source.unsplash.com/collection/${value}`}
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
