import React from "react";
import KakaoLoginButton from "components/Atoms/KakaoLoginButton";
import Box from "@mui/material/Box";
import styles from "styles.module.css";
import Carousel from "components/Organisms/Carousel";

export default function Onbording() {
  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Box flexGrow="1">
        <Carousel />
      </Box>
      <Box id={styles.indigo} sx={{ mt: 3 }}>
        <KakaoLoginButton />
      </Box>
    </Box>
  );
}
