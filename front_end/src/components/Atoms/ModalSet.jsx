import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import ListSet from "components/Atoms/ListSet";
import Modal from "@mui/material/Modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { loginStore } from "Store/loginStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 2,
};

export default function ModalSet(props) {
  const token = loginStore().jwtToken;
  const [open, setOpen] = useState(false);
  const [follow, setFollow] = useState(false);
  const [userDto, setUserDto] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseClick = () => setOpen(false);

  const handleFollowClick = () => {
    axios
      .post(
        `/api/follow/`,
        { id: props.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    axios
      .get(`/api/user/profile/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFollow(res.data.follow);
        setUserDto(res.data.usersDto);
      })
      .catch((error) => console.log(error));

    return () => {
      setFollow(false);
      setUserDto([]);
    };
  }, []);

  return (
    <>
      <IconButton variant="outlined" aria-label="settings" onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ListSet
            handleCloseClick={handleCloseClick}
            handleFollowClick={handleFollowClick}
          />
        </Box>
      </Modal>
    </>
  );
}
