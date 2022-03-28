import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchMap from "components/Atoms/SearchMap";
import WriteImageFeelingText from "components/Templates/WriteImageFeelingText";

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

  const [isShowKakaoMap, setShowKakaoMap] = useState(false);
  const changeShowKakaoMap = () => {
    setShowKakaoMap(!isShowKakaoMap);
  };
  const [latitude, setLatitude] = useState(33.450701); // 위도
  const [longitude, setLongitude] = useState(126.570667); // 경도
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
    >
      {isShowKakaoMap ? (
        <SearchMap
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
        />
      ) : (
        <WriteImageFeelingText
          previewURL={previewURL}
          handleFileOnChange={handleFileOnChange}
        />
      )}

      <button id="getParentOutput" onClick={changeShowKakaoMap}>
        지도 보러 가기
      </button>
      {isShowKakaoMap.toString()}
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
