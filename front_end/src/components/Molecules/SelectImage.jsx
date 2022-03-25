import React, { useRef } from "react";
import Box from "@mui/material/Box";

export default function SelectImage({ previewURL, handleFileOnChange }) {
  const fileRef = useRef();
  const handleFileButtonClick = (e) => {
    e.preventDefault();
    fileRef.current.click(); // file 불러오는 버튼을 대신 클릭함
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
