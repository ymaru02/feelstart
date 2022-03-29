import React, { useState, useEffect } from "react";
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
  const [kakaoAdress, setkakaoAdress] = useState("주소를 지정해 주세요!");
  const setkakaoAdressOriginal = () => {
    setkakaoAdress("주소를 지정해 주세요!");
  };
  const [latitude, setLatitude] = useState(0); // 위도
  const [longitude, setLongitude] = useState(0); // 경도
  useEffect(() => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          // var moveLatLon = new kakao.maps.LatLng(latitude, longitude);
          // map.setCenter(moveLatLon);
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }, []);

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
      width="100%"
    >
      {isShowKakaoMap ? (
        <SearchMap
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
          setkakaoAdress={setkakaoAdress}
        />
      ) : (
        <WriteImageFeelingText
          previewURL={previewURL}
          handleFileOnChange={handleFileOnChange}
        />
      )}

      <button onClick={changeShowKakaoMap}>지도 보러 가기</button>
      {kakaoAdress}
      <button onClick={setkakaoAdressOriginal}>주소 원상복구</button>
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
