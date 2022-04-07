import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchMap from "components/Atoms/SearchMap";
import WriteImageFeelingText from "components/Templates/WriteImageFeelingText";
import { submitStore } from "Store/submitStore";
import axios from "axios";
import { loginStore } from "Store/loginStore";

export default function Write() {
  const {
    file,
    alignment,
    textValue,
    kakaoAdress,
    latitude,
    longitude,
    setkakaoAdress,
    setLatitude,
    setLongitude,
    reset,
  } = submitStore();

  const [isShowKakaoMap, setShowKakaoMap] = useState(false);
  const changeShowKakaoMap = () => {
    setShowKakaoMap(!isShowKakaoMap);
  };
  const setkakaoAdressOriginal = () => {
    setkakaoAdress("");
  };

  const { getJwtToken } = loginStore();

  const handlePost = async () => {
    var formData = new FormData();
    formData.append("imgFile", file);
    formData.append(
      "dto",
      new Blob(
        [
          JSON.stringify({
            content: textValue,
            latitude: latitude,
            longitude: longitude,
            addr: kakaoAdress,
            mode: alignment,
          }),
        ],
        { type: "application/json" }
      )
    );
    try {
      await axios.post("/api/stars", formData, {
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      reset();
    } catch (e) {
      console.log(e);
    }
  };

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
      height="calc(var(--app-height) - 74px - 56px)"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
      width="100%"
    >
      {isShowKakaoMap ? <SearchMap /> : <WriteImageFeelingText />}

      <Box display="flex" flexDirection="row">
        <img
          src={
            !isShowKakaoMap
              ? `${process.env.PUBLIC_URL}/image/ping.svg`
              : `${process.env.PUBLIC_URL}/image/pen.svg`
          }
          alt="marker"
          width="40px"
          onClick={changeShowKakaoMap}
        ></img>
        <Box
          sx={{
            backgroundColor: "#2C3D51",
            padding: "10px",
            borderRadius: "20px",
            color: "#FDE1B0",
          }}
        >
          {!!kakaoAdress ? kakaoAdress : "주소를 지정해 주세요!"}
        </Box>
        <img
          src={`${process.env.PUBLIC_URL}/image/refresh.svg`}
          alt="refresh"
          width="40px"
          onClick={setkakaoAdressOriginal}
        ></img>
      </Box>
      <Box
        display="flex"
        width="35%"
        marginLeft="55%"
        justifyContent="space-between"
      >
        <Button
          variant="contained"
          component="span"
          sx={{
            backgroundColor: "#819EAC",
          }}
        >
          취소
        </Button>
        <Button
          variant="contained"
          color="primary"
          component="span"
          sx={{
            backgroundColor: "#FFBE4A",
          }}
          onClick={handlePost}
        >
          확인
        </Button>
      </Box>
    </Box>
  );
}
