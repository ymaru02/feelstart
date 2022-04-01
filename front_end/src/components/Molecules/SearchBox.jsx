import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Slider from "react-slick";

import BasicCard from "components/Molecules/BasicCard";
export default function SearchBox() {
  const [content, setContent] = useState([1, 1, 1, 1, 1, 1, 1]);

  const settings = {
    // dots: true,
    // infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    // arrows: true,
  };

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
        {content.map((value1, index) => {
          return <BasicCard />;
        })}
      </Slider>
    </Box>
  );
}
