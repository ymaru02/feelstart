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

  const { jwtToken } = loginStore();

  const handlePost = async () => {
    try {
      await axios.post("/api/stars", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        image_file: file,
        dto: {
          content: textValue,
          latitude: latitude,
          longitude: longitude,
          addr: kakaoAdress,
          mode: alignment,
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
              ? "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik04Niw1LjczMzMzYy0zNS45MDIxMywwIC01Ny4zMzMzMywyMy41NzU0NyAtNTcuMzMzMzMsNjMuMDY2NjdjMCw0My4wODAyNyA1MS4xNDU4MSw5My42OTg5NyA1My4zMjQ0OCw5NS44MzE3N2MyLjIyODI3LDIuMTc5MzcgNS43ODk0NCwyLjE3OTM3IDguMDE3NzEsMGMyLjE3ODY3LC0yLjEzMjggNTMuMzI0NDgsLTUyLjc1MTUxIDUzLjMyNDQ4LC05NS44MzE3N2MwLC0zOS40OTEyIC0yMS40MzEyLC02My4wNjY2NyAtNTcuMzMzMzMsLTYzLjA2NjY3ek04NiwxNy4yYzI5LjU3ODI3LDAgNDUuODY2NjcsMTguMzQ2NjcgNDUuODY2NjcsNTEuNmMwLDMxLjc1MTIgLTM0LjAxNTg3LDcwLjgyNyAtNDUuODY2NjcsODMuNDgwNDdjLTExLjg1NjUzLC0xMi42NDc3MyAtNDUuODY2NjcsLTUxLjY4MzQgLTQ1Ljg2NjY3LC04My40ODA0N2MwLC0zMy4yNTMzMyAxNi4yODg0LC01MS42IDQ1Ljg2NjY3LC01MS42ek04NiwyOC42NjY2N2MtMTUuODMyMTYsMCAtMjguNjY2NjcsMTIuODM0NSAtMjguNjY2NjcsMjguNjY2NjdjMCwxNS44MzIxNiAxMi44MzQ1LDI4LjY2NjY3IDI4LjY2NjY3LDI4LjY2NjY3YzE1LjgzMjE2LDAgMjguNjY2NjcsLTEyLjgzNDUgMjguNjY2NjcsLTI4LjY2NjY3Yy0wLjAxODk2LC0xNS44MjQzIC0xMi44NDIzNiwtMjguNjQ3NzEgLTI4LjY2NjY3LC0yOC42NjY2N3pNODUuMjgzMzMsNDAuMTQ0NTNjNC42ODI2NCwtMC4xOTUyOCA5LjI0MjE5LDEuNTI4NzMgMTIuNjI0MTgsNC43NzMzM2MzLjM4MTk5LDMuMjQ0NiA1LjI5MzUxLDcuNzI4NzcgNS4yOTI0OSwxMi40MTU0OGMwLDkuNDk5MyAtNy43MDA3LDE3LjIgLTE3LjIsMTcuMmMtOS40MDAzNCwwLjA1NzQzIC0xNy4xMDU0OCwtNy40NDI4MyAtMTcuMzAxMzQsLTE2Ljg0MTMxYy0wLjE5NTg3LC05LjM5ODQ4IDcuMTkwMSwtMTcuMjEzMjQgMTYuNTg0NjcsLTE3LjU0NzV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
              : "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0xMzAuNjkxNjksMTcuMTIwODFjLTYuNDUsMC4wNzY3OSAtMTMuMDUxMTgsMi41MzYzMyAtMTguMjcyNiw3LjQ1MDYxbC01OS41OTI5MSw1OS41ODA5MmMtMC42MTQyOSwxLjIyODU3IC0xLjgzNTY2LDIuNDY2NzQgLTEuODM1NjYsMy42OTUzMWwtNC4zMDcyLDI5LjQ3ODUxYzAsMS44NDI4NiAwLjYxOTA4LDMuNjkwNTIgMS44NDc2Niw0LjkxOTA5YzEuMjI4NTcsMS4yMjg1NyAyLjQ1MjM0LDEuODM1NjYgNC4yOTUyLDEuODM1NjZoMC42MTE4OWwzMS4zMzgxNywtMi40NDc1NWMxLjIyODU3LDAgMy4wNjkwMywtMC42MTkwOCAzLjY4MzMyLC0xLjg0NzY1bDU5LjU4MDkxLC01OS41ODA5MmM5LjgyODU3LC05LjgyODU3IDkuODI4NTcsLTI2LjQxNjY5IDAsLTM2LjI0NTI2Yy00LjYwNzE0LC00LjYwNzE0IC0xMC44OTg3NywtNi45MTU1MSAtMTcuMzQ4NzcsLTYuODM4NzN6TTUyLjIxNDI5LDM1LjAwOTQ5Yy0yMC4yNzE0MywwIC0zNi44NTcxNCwxNi41ODU3MSAtMzYuODU3MTQsMzYuODU3MTR2NDYuNjk1MzFoMC42MTE4OWMwLDIwLjI3MTQzIDE2LjU4NTcxLDM2Ljg1NzE0IDM2Ljg1NzE0LDM2Ljg1NzE0aDUwLjk5MDUyYzIwLjI3MTQzLDAgMzYuODU3MTQsLTE2LjU4NTcxIDM2Ljg1NzE0LC0zNi44NTcxNHYtMTkuMDUyNDVjMCwtMy42ODU3MSAtMi40NTcxNCwtNi4xNDI4NiAtNi4xNDI4NiwtNi4xNDI4NmMtMy42ODU3MSwwIC02LjE0Mjg2LDIuNDU3MTQgLTYuMTQyODYsNi4xNDI4NnYxOS4wNTI0NWMwLDEzLjUxNDI5IC0xMS4wNTcxNCwyNC41NzE0MyAtMjQuNTcxNDMsMjQuNTcxNDNoLTUxLjYwMjRjLTEzLjUxNDI5LDAgLTI0LjU3MTQzLC0xMS4wNTcxNCAtMjQuNTcxNDMsLTI0LjU3MTQzdi00Ni42OTUzMWMwLC0xMy41MTQyOSAxMS4wNTcxNCwtMjQuNTcxNDMgMjQuNTcxNDMsLTI0LjU3MTQzaDIxLjVjMy42ODU3MSwwIDYuMTQyODYsLTIuNDU3MTQgNi4xNDI4NiwtNi4xNDI4NmMwLC0zLjY4NTcxIC0yLjQ1NzE0LC02LjE0Mjg2IC02LjE0Mjg2LC02LjE0Mjg2eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
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
          src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik04NiwxNy4yYy0xNy4wMTk5OCwwIC0zMi42NjM4Myw2LjIxMTcxIC00NC42Nzk2OSwxNi40ODMzM2MtMS42NDAwMywxLjMwNTYxIC0yLjQzNjg3LDMuNDAyMTMgLTIuMDc4MDUsNS40Njc0NWMwLjM1ODgyLDIuMDY1MzIgMS44MTYwOSwzLjc3MDIyIDMuODAwMzgsNC40NDYxNmMxLjk4NDI5LDAuNjc1OTQgNC4xNzkyOSwwLjIxNTE3IDUuNzI0MjgsLTEuMjAxNjRjMTAuMDIzMDcsLTguNTY4MTEgMjIuOTk0OTIsLTEzLjcyODY1IDM3LjIzMzA3LC0xMy43Mjg2NWMyOS43OTM2MSwwIDU0LjE4NTY3LDIyLjU3NzQ1IDU3LjA1MzM5LDUxLjZoLTE2LjkyMDA1bDIyLjkzMzMzLDM0LjRsMjIuOTMzMzMsLTM0LjRoLTE3LjQ5MTE0Yy0yLjkzMTQyLC0zNS4yNTA0OSAtMzIuNTE1OTEsLTYzLjA2NjY3IC02OC41MDg4NiwtNjMuMDY2Njd6TTIyLjkzMzMzLDU3LjMzMzMzbC0yMi45MzMzMywzNC40aDE3LjQ5MTE1YzIuOTMxNDIsMzUuMjUwNDkgMzIuNTE1OTEsNjMuMDY2NjcgNjguNTA4ODUsNjMuMDY2NjdjMTcuMDE5OTgsMCAzMi42NjM4MywtNi4yMTE3MSA0NC42Nzk2OSwtMTYuNDgzMzNjMS42NDAwNCwtMS4zMDU2MSAyLjQzNjg4LC0zLjQwMjEzIDIuMDc4MDcsLTUuNDY3NDZjLTAuMzU4ODIsLTIuMDY1MzMgLTEuODE2MDksLTMuNzcwMjQgLTMuODAwMzksLTQuNDQ2MTdjLTEuOTg0MywtMC42NzU5NCAtNC4xNzkzLC0wLjIxNTE2IC01LjcyNDI5LDEuMjAxNjVjLTEwLjAyMzA4LDguNTY4MTEgLTIyLjk5NDkzLDEzLjcyODY0IC0zNy4yMzMwOCwxMy43Mjg2NGMtMjkuNzkzNjEsMCAtNTQuMTg1NjcsLTIyLjU3NzQ0IC01Ny4wNTMzOSwtNTEuNmgxNi45MjAwNXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
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
