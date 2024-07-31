'use client'
import NewItemForm from "./NewItemForm";
import { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'primary.light',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};
export default function FormModalButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleOpen} size="large" variant="contained">
          Add Item
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewItemForm/>
        </Box>
      </Modal>
    </>
  )
}
