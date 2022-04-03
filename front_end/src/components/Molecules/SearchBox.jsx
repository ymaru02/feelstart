import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import { contentStore } from "Store/contentStore";

import BasicCard from "components/Molecules/BasicCard";
export default function SearchBox() {
  const [content, setContent] = useState([1, 1, 1, 1, 1, 1, 1]);
  const contents = contentStore();

  const settings = {
    // dots: true,
    // infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    // arrows: true,
  };

  useEffect(() => {
    setContent(contents.contentStore);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: 300,
        position: "fixed",
        bottom: 10,
        zIndex: "tooltip",
        // display: "flex",
      }}
    >
      <Slider {...settings}>
        {content.map((value, index) => {
          return <BasicCard value={value} key={index} />;
        })}
      </Slider>
    </Box>
  );
}
