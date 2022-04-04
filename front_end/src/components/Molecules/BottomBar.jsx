import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Image from "components/Atoms/Image";
import { Link } from "react-router-dom";

export default function BottomBar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100vw",
        position: "fixed",
        bottom: "0",
        zIndex: 3000,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: "#0f1e35" }}
      >
        <BottomNavigationAction
          component={Link}
          to="content"
          icon={
            <Image
              src={`${process.env.PUBLIC_URL}/image/Home.svg`}
              width="50px"
              alt="test"
            />
          }
        />
        <BottomNavigationAction
          component={Link}
          to="map"
          icon={
            <Image
              src={`${process.env.PUBLIC_URL}/image/map.svg`}
              width="50"
              alt="test"
            />
          }
        />
        <BottomNavigationAction
          component={Link}
          to="write"
          icon={
            <Image
              src={`${process.env.PUBLIC_URL}/image/write.svg`}
              width="50"
              alt="test"
            />
          }
        />
      </BottomNavigation>
    </Box>
  );
}
