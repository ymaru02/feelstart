import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";

import BasicCard from "components/Molecules/BasicCard";
export default function SearchBox({ contents }) {
  const [vw, setVw] = useState(1920);
  const [settings, setSettings] = useState({
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  });

  if (
    vw !==
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  ) {
    setVw(
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      )
    );
  }

  useEffect(() => {
    setVw(
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      )
    );
    if (vw >= 1920) {
      setSettings({
        speed: 500,
        slidesToShow: Math.min(5, contents.length),
        slidesToScroll: Math.min(5, contents.length),
      });
    } else if (vw >= 1320) {
      setSettings({
        speed: 500,
        slidesToShow: Math.min(4, contents.length),
        slidesToScroll: Math.min(4, contents.length),
      });
    } else {
      setSettings({
        speed: 500,
        slidesToShow: Math.min(3, contents.length),
        slidesToScroll: Math.min(3, contents.length),
      });
    }
  }, [vw, contents]);

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: 300,
        position: "fixed",
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        bottom: 50,
        zIndex: "tooltip",
      }}
    >
      <Slider {...settings}>
        {contents.map(
          (
            {
              starId,
              content,
              date,
              imageName,
              latitude,
              longitude,
              addr,
              mood,
              writer,
            },
            index
          ) => (
            <BasicCard
              starId={starId}
              content={content}
              date={date}
              imageName={imageName}
              latitude={latitude}
              longitude={longitude}
              addr={addr}
              mood={mood}
              key={index}
            />
          )
        )}
      </Slider>
    </Box>
  );
}
