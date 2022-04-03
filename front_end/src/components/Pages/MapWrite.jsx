import React, { useEffect, useState } from "react";
import Map from "components/Atoms/Map";
import SearchBar from "components/Atoms/SearchBar";
import SearchBox from "components/Molecules/SearchBox";
import Button from "@mui/material/Button";
import Autorenew from "@mui/icons-material/Autorenew";

import { contentStore } from "Store/contentStore";

const { kakao } = window;

export default function MapWrite() {
  const contents = contentStore().contents;
  const [pickcontents, setPickContents] = useState([]);
  const [search, setSearch] = useState("");
  const [pos, setPos] = useState({
    latitude: 0,
    longitude: 0,
  }); // 위도,경도
  const [mapData, setMapData] = useState({
    level: 3,
    position: {},
  });
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
  // const keyword = (key) => {
  //   let places = new kakao.maps.services.Places();
  //   let keywordcallback = function (result, status, pagination) {
  //     if (status === kakao.maps.services.Status.OK) {
  //       setPos({
  //         latitude: result[0].y,
  //         longitude: result[0].x,
  //       });
  //     }
  //   };
  //   places.keywordSearch(key, keywordcallback);
  // };
  const handleSearch = (key) => {
    if (key === "") return;
    setSearch(key);
    address(key);
    setReSet(true);
  };
  const handlePropsChange = (level, position) => {
    setMapData({ level, position });
    setReSet(true);
  };
  const handleClick = () => {
    setReSet(false);
  };

  useEffect(() => {
    getLocation();
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
          }}
          variant="outlined"
          startIcon={<Autorenew />}
          onClick={handleClick}
        >
          {" "}
          reSearch
        </Button>
      ) : (
        <></>
      )}
      <Map
        baseLatitude={pos.latitude}
        baseLongitude={pos.longitude}
        baseheight={92}
        maplevel={3}
        search={search}
        handlePropsChange={handlePropsChange}
      />
      <SearchBox contents={contents} />
    </>
  );
}
