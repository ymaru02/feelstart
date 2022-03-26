import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SelectImage from "components/Molecules/SelectImage";
import ToggleFeeling from "components/Molecules/ToggleFeeling";

let check_file_type = ["jpg", "jfif", "png", "jpeg", "pjpeg", "pjp"];

export default function Write() {
  const [file, setFile] = useState("");
  const [previewURL, setPreviewURL] = useState(
    `${process.env.PUBLIC_URL}/image/add_image.svg`
  );

  const handleFileOnChange = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    let file_dot = file.name.lastIndexOf(".");
    let file_type = file.name.substring(file_dot + 1, file.name.length);
    file_type = file_type.toLowerCase();
    console.log(file_type);
    console.log(check_file_type.indexOf(file_type));

    if (check_file_type.indexOf(file_type) === -1) {
      alert("이미지 파일만 업로드해주세요!");
    } else {
      let reader = new FileReader();
      reader.onloadend = (e) => {
        setFile(file);
        setPreviewURL(reader.result);
      };
      if (file) reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
    >
      <SelectImage
        previewURL={previewURL}
        handleFileOnChange={handleFileOnChange}
      ></SelectImage>
      <ToggleFeeling />
      <textarea></textarea>
      <p>주소</p>
      {file ? <p>T</p> : <p>F</p>}
      <Box>
        <Button variant="contained" color="primary" component="span">
          취소
        </Button>
        <Button variant="contained" color="primary" component="span">
          확인
        </Button>
      </Box>
    </Box>
  );
}
