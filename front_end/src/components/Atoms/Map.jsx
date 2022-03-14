/*global kakao*/
import React, { useRef, useEffect } from "react";

const { kakao } = window;

const options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  level: 3, //지도의 레벨(확대, 축소 정도)
};

function Home() {
  const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스

  useEffect(() => {
    var map = new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    return () => {};
  }, []);

  return (
    <div
      className="map"
      style={{ width: "500px", height: "500px" }}
      ref={container}
    ></div>
  );
}

export default Home;
