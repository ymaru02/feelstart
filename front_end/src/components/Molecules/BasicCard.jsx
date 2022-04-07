import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

export default function BasicCard(props) {
  return (
    <Card
      sx={{
        maxWidth: 355,
        borderRadius: 3,
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={`https://j6b205.p.ssafy.io/api/starimg/${props.imageName}`}
          alt="green iguana"
        />
        {/* <CardContent>
          <Typography gutterBottom component="div">
            {props.addr}
          </Typography>
        </CardContent> */}
      </CardActionArea>
    </Card>
  );
}
