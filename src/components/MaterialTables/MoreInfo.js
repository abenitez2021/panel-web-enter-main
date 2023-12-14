import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import { IconButton } from "@material-ui/core";

export default function MoreInfo({ children }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={"Mas Información"} arrow>
        <IconButton
          aria-label="detalle"
          onClick={() => {
            handleClickOpen();
          }}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          style={{ backgroundColor: "#EE273E", color: "#fff" }}
          id="alert-dialog-title"
        >
          MAS INFORMACIÓN
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
}
