'use client'
import { FormControl, Input, InputLabel, Box, Typography, TextField, Button } from "@mui/material";
import { SubmitButton } from "./SubmitButton";
import { createItem } from "../action";
import { useState } from "react";
import CameraComponent from "./Camera";
import { useUser } from "../context/UserContext";
import { useHomeItems } from "../context/HomeContext";
import { classifyImage } from "../action";
interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}
interface CameraImage {
  itemName: string
  encoding: string
}
 
export default function NewItemForm({handleClose}:any) {
  const { items, setItems } = useHomeItems()
  const { userId } = useUser()
  const [error, setError] = useState<string | null>()
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState<CameraImage | null>(null);

  const handleToggleCamera = () => {
    setShowCamera(prev => !prev); // Toggle camera visibility
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (image) {
      handleClose()
      // Classify the image taken -> save to firestore
      const data = {
        name: image.itemName,
        quantity: 1,
      }
      createItem(userId, data).then((result) => {
        const newItem = {id: result, name: data.name, quantity: data.quantity}  as PantryItem
        setItems((prevItems) => [...prevItems, newItem])
      })
    } else {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form);
      for (let [key, value] of formData.entries()) {
        if (value === "") {
          setError(`${key} field cannot be empty`)
          return
        }
      }
     
      createItem(userId, formData).then((result) => {
        form.reset()
        const itemName = formData.get('name') as string; // Replace 'name' with the actual field name
        const itemQuantity = parseInt(formData.get('quantity') as string);
        const newItem = {id: result, name: itemName, quantity: itemQuantity}  as PantryItem
        setItems((prevItems) => [...prevItems, newItem])
      })
    }
  }
 
  return (
    <Box onSubmit={(e) => {handleSubmit(e)}} component={"form"} method="POST">
      <Typography variant="h5" sx={{mb:3, textAlign:"center", color: "primary.main", fontWeight: 600}}>
        {image ? image.itemName : 'New Item'}
      </Typography>
      {!showCamera && <Box sx={{display: "flex", flexDirection:"column", gap:2}}>
        <FormControl>
          <TextField sx={{bgcolor:"white"}} name="name" label="Item Name" variant="outlined" />
        </FormControl>
        <FormControl sx={{width:"20%", alignSelf:"center"}}>
          <InputLabel>Qty</InputLabel>
          <Input sx={{bgcolor: "white"}} type="number" name="quantity"/>
        </FormControl>
      </Box>}
      <CameraComponent image={image} setImage={setImage} showCamera={showCamera} setShowCamera={setShowCamera}/>
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      <Box sx={{mt:10, display:"flex", justifyContent:"center", gap: 2}}>
        <SubmitButton />
        <Button 
          variant="contained"  
          onClick={handleToggleCamera}
        >
          {showCamera ? 'Hide Camera' : 'Magic Camera'}
        </Button>
      </Box>
    </Box>
  )
}
