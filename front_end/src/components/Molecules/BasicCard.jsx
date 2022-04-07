import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

export default function BasicCard(props) {
  const [vw, setVw] = React.useState(1920);
  const [heigth, setHeigth] = React.useState(200);

  window.addEventListener(
    "resize",
    function () {
      setVw(
        Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        )
      );
    },
    true
  );

  React.useEffect(() => {
    const Vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );

    let calcuHeigth = Vw / 3;
    if (calcuHeigth > 230) {
      calcuHeigth = 230;
    }
    setHeigth(calcuHeigth);

    return () => {
      setHeigth(0);
    };
  }, [vw]);

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
          height={heigth}
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
