import React from "react";
import Box from "@mui/material/Box";
import SelectImage from "components/Molecules/SelectImage";
import ToggleFeeling from "components/Molecules/ToggleFeeling";
import TextArea from "components/Atoms/TextArea";

export default function WriteImageFeelingText() {
  return (
    <Box
      height="80%"
      display="flex"
      flexDirection="column"
      width="100%"
      justifyContent="space-around"
      alignItems="center"
    >
      <SelectImage></SelectImage>
      <ToggleFeeling />
      <TextArea />
    </Box>
  );
}
