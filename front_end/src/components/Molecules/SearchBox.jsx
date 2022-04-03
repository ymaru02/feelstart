import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";

import BasicCard from "components/Molecules/BasicCard";
export default function SearchBox(props) {
  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  useEffect(() => {}, []);

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
        {props.contents.map((content, index) => {
          return <BasicCard content={content} key={index} />;
        })}
      </Slider>
    </Box>
  );
}
