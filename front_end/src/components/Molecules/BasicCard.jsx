import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function BasicCard(props) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 10,
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`https://j6b205.p.ssafy.io/api/starimg/${props.imageName}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom component="div">
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
