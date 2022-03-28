import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import React from "react";

export default function ToggleFeeling() {
  const [alignment, setAlignment] = React.useState("normal");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      size="large"
      sx={{ backgroundColor: "white", width: "90%" }}
    >
      <ToggleButton disabled selected value="">
        <Box>감정 : </Box>
      </ToggleButton>
      <ToggleButton
        value="happy"
        aria-label="기쁨"
        color="warning"
        sx={{ border: 0, backgroundColor: "white", flexGrow: 1 }}
      >
        <Box>기쁨</Box>
      </ToggleButton>
      <ToggleButton
        value="normal"
        aria-label="보통"
        color="success"
        sx={{ border: 0, backgroundColor: "white", flexGrow: 1 }}
      >
        <Box>보통</Box>
      </ToggleButton>
      <ToggleButton
        value="angry"
        aria-label="화남"
        color="error"
        sx={{ border: 0, backgroundColor: "white", flexGrow: 1 }}
      >
        <Box>화남</Box>
      </ToggleButton>
      <ToggleButton
        value="sad"
        aria-label="슬픔"
        color="primary"
        sx={{ border: 0, backgroundColor: "white", flexGrow: 1 }}
      >
        <Box>슬픔</Box>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
