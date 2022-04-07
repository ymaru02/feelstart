import { Fragment, useEffect, useState } from "react";

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
import Grid from "@mui/material/Grid";
import MiniMap from "components/Atoms/MiniMap";
import AvatarCircle from "components/Atoms/AvatarCircle";
import ModalSet from "components/Atoms/ModalSet";

import styles from "styles.module.css";
import axios from "axios";

import { loginStore } from "Store/loginStore";
import { Link } from "react-router-dom";
import { fontFamily } from "@mui/system";

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
  const [favorCnt, setFavorCnt] = useState(0);
  const [openmap, setOpenMap] = useState(false);
  const [comment, setComment] = useState({ writer: "", content: "" });
  const [comments, setComments] = useState([]);
  const [mood, setMood] = useState(1);
  const token = loginStore().jwtToken;
  const username = loginStore().username;

  const { jwtToken } = loginStore();

  const handleExpandClick = () => setExpanded(!expanded);
  const handleFavorClick = async () => {
    let like = favor;
    await axios.post(
      "api/stars/likes",
      { mark: !like, star_id: props.starid },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    setFavor(!like);
  };
  const handleClickMap = () => {
    setOpenMap((cur) => !cur);
    handleClickSave();
  };
  const handelSubmit = (event) => {
    event.preventDefault();
    if (comment.content === "") return;

    axios
      .post(
        "/api/stars/comments",
        { content: comment.content, id: props.starid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((e) => {
        console.log(e);
      });
    setComments((currentArray) => [...currentArray, comment]);
    setComment({ writer: username, content: "" });
  };
  const handelChange = (event) => {
    setComment({ writer: username, content: event.target.value });
  };
  const handleClickSave = () => {
    const data = {
      user: username,
      latitude: props.value.latitude,
      longitude: props.value.longitude,
      mood: props.value.mood,
    };

    axios
      .post("api/clicks", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  };
  async function like() {
    let res = await axios.get(`api/stars/${props.starid}/likes`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return setFavor(res.data);
  }
  async function likeCnt() {
    let res = await axios.get(`api/stars/${props.starid}/likes/count`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return setFavorCnt(res.data);
  }

  useEffect(() => {
    likeCnt();

    return () => {
      setFavorCnt(0);
    };
  }, [favor]);

  useEffect(() => {
    like();

    axios
      .get(`/api/stars/${props.value.starId}/comments/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => console.log(error));

    switch (props.mood) {
      case "HAPPY":
        setMood(5);
        break;
      case "NORMAL":
        setMood(2);
        break;
      case "ANGRY":
        setMood(3);
        break;
      case "SAD":
        setMood(4);
        break;
      default:
        break;
    }

    return () => {
      setComments([]);
      setFavor(false);
    };
  }, []);

  return (
    <Card
      sx={{ maxWidth: 800, width: "100vw", border: 1, borderColor: "#c0c0c0" }}
      style={{
        backgroundColor: "#fff",
      }}
    >
      <CardHeader
        avatar={
          <>
            <AvatarCircle id={props.value.userId} />
            <Typography
              style={{ margin: "auto 5px", textDecorationLine: "none" }}
            >
              <Link
                to={`/profile/${props.value.userId}`}
                style={{
                  textDecorationLine: "none",
                  color: "rgb(120, 120, 120)",
                  fontWeight: "bold ",
                }}
              >
                {props.writer}
              </Link>
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
            <ModalSet id={props.value.userId} />
          </>
        }
        title={
          <Fragment>
            <img
              src={`image/star_${mood}-removebg-preview.png`}
              width={50}
              height={50}
            ></img>
            <Typography
              sx={{ display: "inline", fontFamily: "Jua, sans-serif" }}
            >
              {props.mood}
            </Typography>
          </Fragment>
        }
        titleTypographyProps={{ color: "black" }}
        subheader={props.date.replace("T", " ").split(".")[0]}
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
        <Typography variant="h4" sx={{ fontFamily: "Dongle, sans-serif" }}>
          {props.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {!!favorCnt && favorCnt}
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
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ marginBottom: 3 }}
          >
            {comments.map((value, index) => (
              <Fragment key={index}>
                <Grid
                  item
                  xs={3}
                  sx={{
                    fontFamily: "Jua, sans-serif",
                  }}
                >
                  {value.writer}:
                </Grid>
                <Grid
                  item
                  xs={9}
                  sx={{
                    fontFamily: "Jua, sans-serif",
                    textAlign: "left",
                  }}
                >
                  {value.content}
                  {value.date ? (
                    <Typography
                      sx={{
                        color: "rgb(120,120,120)",
                        fontFamily: "Jua, sans-serif",
                      }}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      {value.date.split("T")[0]}{" "}
                      {value.date.split("T")[1].split(".")[0]}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Fragment>
            ))}
          </Grid>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Avatar sx={{ mr: 1, my: 0.5 }}></Avatar>
            <form style={{ width: "100%" }} onSubmit={handelSubmit}>
              <TextField
                onChange={handelChange}
                fullWidth
                id="comment"
                label="댓글달기"
                variant="filled"
                value={comment.content}
                InputLabelProps={{ style: { color: "#c0c0c0" } }}
              />
            </form>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
