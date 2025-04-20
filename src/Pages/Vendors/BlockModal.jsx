import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const BlockModal = ({ open, onClose, vendorId }) => {
  const [reason, setReason] = useState("");

  const handleBlock = () => {
    alert(`Vendor ${vendorId} blocked for reason: ${reason}`);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Block Vendor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Reason"
          type="text"
          fullWidth
          variant="outlined"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleBlock}>
          Block
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockModal;
BlockModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  vendorId: PropTypes.number,
};
