import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import { submitStore } from "Store/submitStore";

export default function ToggleFeeling() {
  const { alignment, setAlignment } = submitStore();

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={setAlignment}
      aria-label="text alignment"
      // size="large"
      sx={{ backgroundColor: "white", width: "90%" }}
    >
      <ToggleButton disabled selected value="">
        <Box>감정 : </Box>
      </ToggleButton>
      <ToggleButton
        value="HAPPY"
        aria-label="기쁨"
        color="warning"
        sx={{ border: 0, backgroundColor: "white", flexGrow: 1 }}
      >
        <Box>기쁨</Box>
      </ToggleButton>
      <ToggleButton
        value="NORMAL"
        aria-label="보통"
        color="success"
        sx={{ border: 0, backgroundColor: "white", flexGrow: 1 }}
      >
        <Box>보통</Box>
      </ToggleButton>
      <ToggleButton
        value="ANGRY"
        aria-label="화남"
        color="error"
        sx={{ border: 0, backgroundColor: "white", flexGrow: 1 }}
      >
        <Box>화남</Box>
      </ToggleButton>
      <ToggleButton
        value="SAD"
        aria-label="슬픔"
        color="primary"
        sx={{ border: 0, backgroundColor: "white", flexGrow: 1 }}
      >
        <Box>슬픔</Box>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
