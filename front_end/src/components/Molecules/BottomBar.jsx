import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Image from "components/Atoms/Image";
import { Link } from "react-router-dom";

export default function BottomBar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "100vw", position: "fixed", bottom: "0" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Recents"
          icon={
            <Image
              src="https://img.icons8.com/nolan/344/speech-bubble-with-dots.png"
              width="35"
              alt="test"
            />
          }
        />
        <BottomNavigationAction
          label="Favorites"
          icon={
            <Image
              src="https://img.icons8.com/nolan/344/speech-bubble-with-dots.png"
              width="35"
              alt="test"
            />
          }
        />
        <BottomNavigationAction
          label="Nearby"
          icon={
            <Image
              src="https://img.icons8.com/nolan/344/speech-bubble-with-dots.png"
              width="35"
              alt="test"
            />
          }
        />
      </BottomNavigation>
    </Box>
  );
}
