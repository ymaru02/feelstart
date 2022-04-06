import React from "react";
import Box from "@mui/material/Box";
import Image from "components/Atoms/Image";
import Typography from "@mui/material/Typography";

export default function AdminRec(props) {
  return (
    <Box
      sx={{
        backgroundColor: `${props.backgroundColor}`,
        borderRadius: 4,
        paddingY: 4,
        color: `${props.color}`,
      }}
    >
      <Box
        sx={{
          backgroundImage: `${props.backgroundImage}`,
          borderRadius: 10,
          width: "64px",
          height: "64px",
          marginX: "auto",
          right: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          sx={{ marginY: "auto", top: 0, bottom: 0, color: "white" }}
          src={`${process.env.PUBLIC_URL}/image/${props.svg}.svg`}
          width="30"
          alt="test"
        />
      </Box>
      <Typography variant="h5">{props.count}</Typography>
      <Typography>{props.name}</Typography>
    </Box>
  );
}
