import React from "react";
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function TextArea() {
  return (
    <FormControl
      sx={{
        m: 1,
        width: "90%",
        backgroundColor: "#2C3D51",
        height: "40%",
        flexGrow: "1",
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
      ></TextareaAutosize>
    </FormControl>
  );
}
