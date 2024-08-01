'use client'
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import EditForm from "./EditForm";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}

interface EditItemProps {
  pantryItem: PantryItem;
}

const modalStyle = {
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

export default function EditModalButton({ pantryItem }: EditItemProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        🖊️ Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-edit-title"
        aria-describedby="modal-edit-description"
      >
        <Box sx={modalStyle}>
          <EditForm item={pantryItem} handleClose={handleClose}/>
        </Box>
      </Modal>
    </>
  );
}