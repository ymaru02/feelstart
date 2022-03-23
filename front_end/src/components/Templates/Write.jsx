import React, { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function Write() {
  const [file, setFile] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (file !== "")
      //처음 파일 등록하지 않았을 때를 방지
      setPreview(
        <img
          className="img_preview"
          src={previewURL}
          height="100px"
          alt=""
        ></img>
      );
    return () => {};
  }, [previewURL]);

  const handleFileOnChange = (event) => {
    //파일 불러오기
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => {
      setFile(file);
      setPreviewURL(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleFileButtonClick = (e) => {
    //버튼 대신 클릭하기
    e.preventDefault();
    fileRef.current.click(); // file 불러오는 버튼을 대신 클릭함
  };

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
    >
      <Box
        className="priveiw-rapping"
        onClick={handleFileButtonClick}
        width="100%"
      >
        {preview}
      </Box>
      <aside className="side">
        <input
          ref={fileRef}
          hidden={true}
          id="file"
          type="file"
          accept="image/*"
          onChange={handleFileOnChange}
        ></input>
      </aside>
      <p>감정</p>
      <textarea></textarea>
      <p>주소</p>
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
