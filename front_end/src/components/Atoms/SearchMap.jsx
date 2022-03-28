import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";

const { kakao } = window;

export default function SearchMap({
  latitude,
  setLatitude,
  longitude,
  setLongitude,
}) {
  const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스

  const getGpsData = async () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(
            "처음 돌림",
            position.coords.latitude,
            position.coords.longitude
          );
          return [position.coords.latitude, position.coords.longitude];
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
  };

  useEffect(() => {
    console.log("지도 생성 지점", latitude, longitude);
    getGpsData();
    var mapContainer = container.current, // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    //지도의 레벨(확대, 축소 정도)}); //지도 생성 및 객체 리턴
    var marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      var latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다";
      console.log(message);
      setLatitude(latlng.getLat());
      setLongitude(latlng.getLng());
    });
  }, []);

  return (
    <Box
      flexGrow="1"
      className="map"
      width="90%"
      height="100%"
      ref={container}
    ></Box>
  );
}
