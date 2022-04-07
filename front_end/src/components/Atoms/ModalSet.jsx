import React, { useState } from "react";

import Box from "@mui/material/Box";
import ListSet from "components/Atoms/ListSet";
import Modal from "@mui/material/Modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

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

export default function ModalSet() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseClick = () => setOpen(false);

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
          <ListSet handleCloseClick={handleCloseClick} />
        </Box>
      </Modal>
    </>
  );
}
