import React, { useEffect, useState } from "react";
import Map from "components/Atoms/Map";
import SearchBar from "components/Atoms/SearchBar";
import SearchBox from "components/Molecules/SearchBox";
import Button from "@mui/material/Button";
import Autorenew from "@mui/icons-material/Autorenew";

import { contentStore } from "Store/contentStore";

const { kakao } = window;

export default function MapWrite() {
  const { contents } = contentStore();
  const [pickcontents, setPickContents] = useState([]);

  const [search, setSearch] = useState("");
  // 위도,경도
  const [pos, setPos] = useState({
    latitude: 0,
    longitude: 0,
  });
  // 현재 지도의 위도 경도, 레벨
  const [mapData, setMapData] = useState({
    level: 3,
    position: {},
  });
  // 초기 위치 지정
  const [reSet, setReSet] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setPos({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
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
  };

  // 주소 찾기
  const address = (key) => {
    let geocoder = new kakao.maps.services.Geocoder();
    let addresscallback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setPos({
          latitude: result[0].y,
          longitude: result[0].x,
        });
      }
    };
    geocoder.addressSearch(key, addresscallback);
  };

  // 검색어 결과
  const handleSearch = (key) => {
    if (key === "") return;
    setSearch(key);
    address(key);
    setReSet(true);
  };

  // 지도의 데이터 받아오기
  const handlePropsChange = (level, position) => {
    setMapData({ level, position });
    setReSet(true);
  };

  // 위도 경도에 따른 위치 조정
  const calPos = ({ level, position }) => {
    function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1); // deg2rad below
      const dLon = deg2rad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km return d;
      return d;
    }

    setPickContents(
      contents.filter((content) => {
        return (
          0.05 * 2 ** level >
          getDistanceFromLatLonInKm(
            content.latitude,
            content.longitude,
            mapData.position.Ma,
            mapData.position.La
          )
        );
      })
    );
  };

  // 현재 위치에 pos 새로 지정
  const handleClick = () => {
    setReSet(false);
    calPos({ ...mapData });
    setPos({ latitude: mapData.position.Ma, longitude: mapData.position.La });
  };

  const handlereSet = () => {
    setReSet(false);
  };

  useEffect(() => {
    getLocation();
    setPickContents(contents);
  }, []);

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      {reSet ? (
        <Button
          sx={{
            position: "fixed",
            width: 300,
            maxWidth: "100%",
            top: 160,
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            zIndex: "tooltip",
            backgroundColor: "white",
            color: "#1e6b7b",
            borderRadius: 3,
          }}
          variant="outlined"
          startIcon={<Autorenew />}
          onClick={handleClick}
        >
          reSearch
        </Button>
      ) : (
        <></>
      )}
      <Map
        contents={pickcontents}
        baseLatitude={pos.latitude}
        baseLongitude={pos.longitude}
        baseheight={92}
        maplevel={mapData.level}
        search={search}
        reset={reSet}
        handlePropsChange={handlePropsChange}
        handlePropsClick={handlereSet}
      />
      <SearchBox contents={pickcontents} />
    </>
  );
}
