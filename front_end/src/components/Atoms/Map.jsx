import React, { useRef, useEffect } from "react";

const { kakao } = window;

export default function Map(props) {
  const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스

  let map;

  const handleChange = () => {
    var position = map.getCenter();
    var level = map.getLevel();
    props.handlePropsChange(level, position);
  };

  useEffect(() => {
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(props.baseLatitude, props.baseLongitude), //지도의 중심좌표.
      level: props.maplevel, //지도의 레벨(확대, 축소 정도)
    };
    map = new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴

    kakao.maps.event.addListener(map, "zoom_changed", handleChange);
    kakao.maps.event.addListener(map, "center_changed", handleChange);

    let moodnum = 1;
    switch (props.mood) {
      case "HAPPY":
        moodnum = 5;
        break;
      case "NORMAL":
        moodnum = 2;
        break;
      case "ANGRY":
        moodnum = 3;
        break;
      case "SAD":
        moodnum = 4;
        break;
      default:
        break;
    }
    let imageSrc = `image/star_${moodnum}-removebg-preview.png`, // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 30) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new kakao.maps.LatLng(
        props.baseLatitude,
        props.baseLongitude
      ); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    return () => {
      map.setCenter(new kakao.maps.LatLng(0, 0));
      // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
      marker.setMap(null);
    };
  }, [props.baseLatitude, props.baseLongitude]);

  return (
    <>
      <div
        id="map"
        style={{
          width: "100%",
          height: `${props.baseheight}vh`,
        }}
        ref={container}
      ></div>
    </>
  );
}
