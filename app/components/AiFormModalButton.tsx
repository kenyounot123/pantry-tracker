'use client'
import { Button, Modal, Box } from "@mui/material"
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useHomeItems } from "../home/page";
import { useState } from "react";
import Recipe from "./Recipe";
import { suggestRecipe } from "../action";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'primary.light',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  height: 400,
  overflowY: 'auto'
};

export default function AiFormModalButton() {
  const { items } = useHomeItems()
  const [loading, setLoading] = useState<boolean>(true)
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState<string | null>("")

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMagicClick = async () => {
    handleOpen()
    const fetchedRecipe = await suggestRecipe(items) 
    setRecipe(fetchedRecipe)
    setLoading(false)
  }

  return (
    <>
      <Button sx={{}} onClick={handleMagicClick} variant="outlined">
        <AutoAwesomeIcon/>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Recipe recipe={recipe} loading={loading}/>
        </Box>
      </Modal>
    </>
    
  )
  
}