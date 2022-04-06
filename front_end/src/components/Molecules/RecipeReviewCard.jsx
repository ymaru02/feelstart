import { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import MapIcon from "@mui/icons-material/Map";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import MiniMap from "components/Atoms/MiniMap";
import AvatarCircle from "components/Atoms/AvatarCircle";
import ModalSet from "components/Atoms/ModalSet";

import styles from "styles.module.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = useState(false);
  const [favor, setFavor] = useState(false);
  const [openmap, setOpenMap] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleExpandClick = () => setExpanded(!expanded);
  const handleFavorClick = () => setFavor((current) => !current);
  const handleClickMap = () => {
    setOpenMap((cur) => !cur);

    jsonfileSave();
  };
  const handelSubmit = (event) => {
    event.preventDefault();
    if (comment === "") return;
    setComments((currentArray) => [...currentArray, comment]);
    setComment("");
  };
  const handelChange = (event) => {
    setComment(event.target.value);
  };

  const jsonfileSave = () => {};

  useEffect(() => {}, []);

  return (
    <Card
      sx={{ maxWidth: 1000, width: "100vw", border: 1, borderColor: "#c0c0c0" }}
      style={{
        backgroundColor: "#fff",
      }}
    >
      <CardHeader
        avatar={
          <>
            <AvatarCircle />
            <Typography style={{ margin: "auto 5px" }}>
              {props.writer}
            </Typography>
          </>
        }
        action={
          <>
            <IconButton
              variant="outlined"
              color="inherit"
              aria-label="map"
              onClick={handleClickMap}
            >
              <MapIcon
                className={styles.grey}
                style={{
                  marginTop: "8px",
                  textdecoration: "none",
                }}
              />
            </IconButton>
            <ModalSet />
          </>
        }
        title={props.mood}
        subheader={props.date}
        subheaderTypographyProps={{ color: "#a0a0a0" }}
        style={{ color: "#a0a0a0" }}
      />
      <Box>
        {openmap ? (
          <MiniMap
            baseLatitude={props.latitude}
            baseLongitude={props.longitude}
            mood={props.mood}
          />
        ) : (
          <CardMedia
            sx={{ maxWidth: 1000, maxHeight: 1000 }}
            component="img"
            image={`https://j6b205.p.ssafy.io/api/starimg/${props.imageName}`}
            alt="Paella dish"
          />
        )}
      </Box>

      <CardContent>
        <Typography variant="body2">{props.content}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleFavorClick}
          variant="outlined"
          style={favor ? { color: "#ff3333" } : { color: "#a0a0a0" }}
          aria-label="add to favorites"
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          variant="outlined"
          style={{ color: "#a0a0a0" }}
          aria-label="share"
        >
          <CommentIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          variant="outlined"
          style={{ color: "#a0a0a0" }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse
        sx={{ border: 1, borderColor: "#c0c0c0" }}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>
          <Box>
            {comments.map((value, index) => (
              <Typography paragraph key={index}>
                {value}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Avatar sx={{ mr: 1, my: 0.5 }}></Avatar>
            <form style={{ width: "100%" }} onSubmit={handelSubmit}>
              <TextField
                onChange={handelChange}
                fullWidth
                id="comment"
                label="댓글달기"
                variant="filled"
                value={comment}
                // InputProps={{ style: { color: "#c0c0c0" } }}
                InputLabelProps={{ style: { color: "#c0c0c0" } }}
              />
            </form>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
