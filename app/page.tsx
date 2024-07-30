"use client"
import { Container, Box, Button, Modal, Typography } from "@mui/material";
import { Input } from '@mui/material';
import Item from "./components/Item";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from "./lib/firebase"
import { useEffect, useState, MouseEvent } from "react";
import NewItemForm from "./components/NewItemForm";
import { createItem } from "@/app/action" 

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

interface PantryItem {
  id: number;
  name: string;
  quantity: number;
}

const Loading = () => {
  return (
    <Typography variant="h2" sx={{display: "flex", justifyContent: "center"}}> Loading </Typography>
  )
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<PantryItem[]>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      try {
        const q = await getDocs(collection(db, "pantry"))
        const docs = q.docs.map(doc => {
          const docData = doc.data() as Partial<PantryItem>; // Use Partial to handle missing fields
          return { id: doc.id, ...docData } as PantryItem;
        });
        setData(docs)
      } catch (error) {
        console.error("Error fetching data")
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Container> 
      <Typography sx={{textAlign: "center", color: "primary.main", fontWeight: 600, fontSize: 48}} variant="h2">Track Your Pantry Items</Typography>
      <Box sx={{ borderRadius: '12px', bgcolor: "primary.light", pb:1}}>
        <Box sx={{ mt: 5, display:"flex", alignItems: "center", justifyContent:"center", p:3, gap:3}}>
          <Input sx={{bgcolor: "white"}}></Input>
          <Typography sx={{color: "secondary.main", fontSize: 20, fontWeight: 600}}>Search</Typography>
        </Box>
        <Box sx={{display: "flex", p:2, gap:18}}>
          <Typography sx={{color: "secondary.main", fontSize: 20, fontWeight: 600}}>Item</Typography>
          <Typography sx={{color: "secondary.main", fontSize: 20, fontWeight: 600}}>Qty</Typography>
        </Box>
        {loading && <Loading/>}
        <Box p={2}>
          {data && data.map((item) => (
            <Item key={item.id} pantryItem={item}/>
          ))}
        </Box>
      </Box>
      {/* Opens up a modal form */}
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
          <NewItemForm action={createItem}/>
        </Box>
      </Modal>
    </Container>
  );
}
