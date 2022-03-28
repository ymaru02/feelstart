import React from "react";
import Box from "@mui/material/Box";
import SelectImage from "components/Molecules/SelectImage";
import ToggleFeeling from "components/Molecules/ToggleFeeling";
import TextArea from "components/Atoms/TextArea";

export default function WriteImageFeelingText({
  previewURL,
  handleFileOnChange,
}) {
  return (
    <Box flexGrow="1">
      <SelectImage
        previewURL={previewURL}
        handleFileOnChange={handleFileOnChange}
      ></SelectImage>
      <ToggleFeeling />
      <TextArea />
    </Box>
  );
}
