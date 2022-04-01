import React, { useRef, useEffect, useState } from "react";

const { kakao } = window;

export default function Map({
  baseLatitude = 0,
  baseLongitude = 0,
  baseheight = "70",
}) {
  const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스

  useEffect(() => {
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(baseLatitude, baseLongitude), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    let map = new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
    return () => {
      map.setCenter(new kakao.maps.LatLng(0, 0));
    };
  }, [baseLatitude, baseLongitude]);

  return (
    <>
      <div
        id="map"
        style={{
          width: "100%",
          height: `${baseheight}vh`,
        }}
        ref={container}
      ></div>
    </>
  );
}
