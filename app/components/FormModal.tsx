'use client'
import NewItemForm from "./NewItemForm";
import { createItem } from "../action";
import { Modal, Box } from "@mui/material";
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
export default function FormModal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<PantryItem[]>()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <NewItemForm action={createItem}/>
    </Box>
  </Modal>
  )
}