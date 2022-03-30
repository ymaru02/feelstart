import React, { useRef } from "react";
import Box from "@mui/material/Box";
import { submitStore } from "Store/submitStore";

export default function SelectImage() {
  const { setFile, setPreviewURL, previewURL } = submitStore();
  const fileRef = useRef();
  const handleFileButtonClick = (e) => {
    e.preventDefault();
    fileRef.current.click(); // file 불러오는 버튼을 대신 클릭함
  };

  const check_file_type = ["jpg", "jfif", "png", "jpeg", "pjpeg", "pjp"];

  const handleFileOnChange = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    let file_dot = file.name.lastIndexOf(".");
    let file_type = file.name.substring(file_dot + 1, file.name.length);
    file_type = file_type.toLowerCase();

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
    <Box>
      <Box
        className="priveiw-rapping"
        onClick={handleFileButtonClick}
        width="100%"
      >
        <img
          className="img_preview"
          src={previewURL}
          height="200px"
          alt=""
        ></img>
      </Box>
      <aside className="side">
        <input
          ref={fileRef}
          hidden={true}
          id="file"
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileOnChange}
        ></input>
      </aside>
    </Box>
  );
}
