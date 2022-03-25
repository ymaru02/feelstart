import RecipeReviewCard from "components/Molecules/RecipeReviewCard";
import React, { useEffect, useState } from "react";
import styles from "./Content.module.css";

export default function Content() {
  const [content, setContent] = useState([1, 2, 3, 4]);

  useEffect(() => {
    setContent([1, 2, 3, 4]);
  }, []);

  return (
    <div>
      {content.map((value, index) => (
        <div className={styles.flexbox} key={index}>
          <RecipeReviewCard
            imgurl={`https://source.unsplash.com/collection/${value}`}
          />
          <br />
        </div>
      ))}
    </div>
  );
}
