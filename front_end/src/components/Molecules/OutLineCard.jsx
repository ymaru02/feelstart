import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

export default function OutlinedCard({ imgurl }) {
  return (
    <Box
      sx={{
        mx: "auto",
        minWidth: 275,
        maxWidth: 1000,
      }}
    >
      <Box>
        <Card sx={{ display: "flex" }} variant="outlined">
          <CardMedia
            component="img"
            sx={{ maxWidth: 200, maxHeight: 150 }}
            image={imgurl}
            alt="Live from space album cover"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mx: 5,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                작성자
              </Typography>
              <Typography sx={{ mt: 1 }} color="text.secondary">
                위치 장소
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                카테고리
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
