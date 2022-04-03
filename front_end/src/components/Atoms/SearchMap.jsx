import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { submitStore } from "Store/submitStore";

const { kakao } = window;

export default function SearchMap() {
  const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스
  const { latitude, setLatitude, longitude, setLongitude, setkakaoAdress } =
    submitStore();
  useEffect(() => {
    var mapContainer = container.current, // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    //지도의 레벨(확대, 축소 정도)}); //지도 생성 및 객체 리턴
    var marker = new kakao.maps.Marker();
    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      var latlng = mouseEvent.latLng;
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          if (!!result[0].road_address)
            setkakaoAdress(result[0].road_address.address_name);
          else setkakaoAdress(result[0].address.address_name);

          // 마커 위치를 클릭한 위치로 옮깁니다
          marker.setPosition(latlng);

          setLatitude(latlng.getLat());
          setLongitude(latlng.getLng());
        }
      });
    });
  }, []);

  return <Box className="map" width="90%" height="80%" ref={container}></Box>;
}
