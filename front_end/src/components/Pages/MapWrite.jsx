import React, { useEffect, useState } from "react";
import Map from "components/Atoms/Map";
import SearchBar from "components/Atoms/SearchBar";
import SearchBox from "components/Molecules/SearchBox";

const { kakao } = window;

export default function MapWrite() {
  const [search, setSearch] = useState("");
  const [pos, setPos] = useState({
    latitude: 0,
    longitude: 0,
  }); // 위도,경도

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

  const keyword = (key) => {
    let places = new kakao.maps.services.Places();
    let keywordcallback = function (result, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        setPos({
          latitude: result[0].y,
          longitude: result[0].x,
        });
      }
    };
    places.keywordSearch(key, keywordcallback);
  };
  const handleSearch = (key) => {
    if (key === "") return;
    setSearch(key);

    address(key);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <Map
        baseLatitude={pos.latitude}
        baseLongitude={pos.longitude}
        baseheight={92}
        search={search}
      />
      <SearchBox />
    </>
  );
}
