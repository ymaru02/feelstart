import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { loginStore } from "Store/loginStore";

export default function AvatarCircle(props) {
  const token = loginStore().jwtToken;
  const [src, setSrc] = useState("");
  useEffect(() => {
    axios
      .get(`/api/users/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSrc(res.data.profile);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <Avatar
      sx={{ width: 50, height: 50 }}
      style={{
        background:
          "linear-gradient(45deg, #ffbe4a 20%, #fde1b0 70%, #d1aa60 100%)",
      }}
    >
      <Avatar
        sx={{ width: 45, height: 45 }}
        style={{ backgroundColor: "#fff" }}
        src={src}
      >
        <Avatar></Avatar>
      </Avatar>
    </Avatar>
  );
}
