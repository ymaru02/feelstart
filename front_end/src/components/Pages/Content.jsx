import RecipeReviewCard from "components/Molecules/RecipeReviewCard";
import React, { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { contentStore } from "Store/contentStore";
import Box from "@mui/material/Box";

export default function Content() {
  const [content, setContent] = useState();

  const contents = contentStore().contents;

  useEffect(() => {
    setContent(contents);

    return () => {
      setContent([]);
    };
  }, [contents]);

  return (
    <Box sx={{ marginBottom: 10 }}>
      {content &&
        content.map((value, index) => (
          <Box className={styles.flexbox} key={index}>
            <RecipeReviewCard
              content={value.content}
              date={value.date}
              imageName={value.imageName}
              latitude={value.latitude}
              longitude={value.longitude}
              addr={value.addr}
              mood={value.mood}
              writer={value.writer}
              value={value}
              starid={value.starId}
            />
            <br />
          </Box>
        ))}
    </Box>
  );
}
