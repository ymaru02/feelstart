import React from "react";
import { Link } from "react-router-dom";
// import { useStore } from "Store/useStore";
import Map from "../Atoms/Map";

export default function MapWrite() {
  return (
    <div>
      <Map />
      <div>현재 게시물 위치 주변글</div>
      <Link to="/">홈으로</Link>
    </div>
  );
}
