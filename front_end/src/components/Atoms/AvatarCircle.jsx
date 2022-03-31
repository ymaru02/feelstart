import React from "react";
import Avatar from "@mui/material/Avatar";

export default function AvatarCircle() {
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
      >
        <Avatar></Avatar>
      </Avatar>
    </Avatar>
  );
}
