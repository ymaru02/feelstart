import React from "react";
import BottomBar from "components/Molecules/BottomBar";
import Write from "components/Pages/Write";
import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import MapWrite from "components/Pages/MapWrite";
import Content from "components/Pages/Content";
import Profile from "components/Pages/Profile";
import Admin from "components/Pages/Admin";
export default function Inbording() {
  return (
    <Box
      Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="calc(var(--app-height) - 74px - 56px)"
    >
      <Box flexGrow="1">
        <Routes>
          <Route path="map" element={<MapWrite />} />
          <Route path="content" element={<Content />} />
          <Route path="profile/:userid" element={<Profile />} />
          <Route path="write" element={<Write />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </Box>
      <BottomBar />
    </Box>
  );
}
