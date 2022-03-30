import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Box } from "@mui/material";
import { submitStore } from "Store/submitStore";

export default function TextArea() {
  const { setTextValue } = submitStore();
  return (
    <Box
      sx={{
        m: 1,
        width: "90%",
        backgroundColor: "#2C3D51",
        height: "40%",
      }}
      variant="outlined"
    >
      <TextareaAutosize
        style={{
          height: "100%",
          backgroundColor: "transparent",
          color: "#FFBE4A",
          border: "0",
          resize: "none",
          outline: "transparent",
          textAlign: "center",
          fontSize: "25px",
          padding: "10px",
        }}
        onChange={setTextValue}
      ></TextareaAutosize>
    </Box>
  );
}
