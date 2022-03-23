import React from "react";
import BottomBar from "components/Molecules/BottomBar";
import Write from "components/Templates/Write";
import Box from "@mui/material/Box";

export default function Inbording() {
  return (
    <Box
      Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="calc(var(--app-height) - 74px - 56px)"
    >
      <Box flexGrow="1">
        <Write />
      </Box>
      <BottomBar />
    </Box>
  );
}
