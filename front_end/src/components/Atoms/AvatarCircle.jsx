import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { loginStore } from "Store/loginStore";

export default function AvatarCircle({
  id = "",
  userProFile = "",
  w1 = 50,
  w2 = 45,
}) {
  const token = loginStore().jwtToken;
  const [src, setSrc] = useState("");
  useEffect(() => {
    if (userProFile) {
      setSrc(userProFile);
    } else {
      axios
        .get(`/api/users/${id}`, {
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
    }
    return () => {
      setSrc("");
    };
  }, []);
  return (
    <Avatar
      sx={{ width: w1, height: w1 }}
      style={{
        background:
          "linear-gradient(45deg, #ffbe4a 20%, #fde1b0 70%, #d1aa60 100%)",
      }}
    >
      <Avatar
        sx={{ width: w2, height: w2 }}
        style={{ backgroundColor: "#fff" }}
        src={src}
      >
        <Avatar></Avatar>
      </Avatar>
    </Avatar>
  );
}
