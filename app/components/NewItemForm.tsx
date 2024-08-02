'use client'
import { FormControl, Input, InputLabel, Box, Typography, TextField, Button } from "@mui/material";
import { SubmitButton } from "./SubmitButton";
import { createItem } from "../action";
import { useState } from "react";
import CameraComponent from "./Camera";
import { useUser } from "../context/UserContext";


export default function NewItemForm({handleClose}:any) {
  const { userId } = useUser()
  const [error, setError] = useState<string | null>()
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleToggleCamera = () => {
    setShowCamera(prev => !prev); // Toggle camera visibility
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (image) {
      console.log('hi')
      handleClose()
      // AI stuff 
      // Use open vision to read image
      // Add image to database, add item and quantity to database if not in pantry
      // Display confirmation message 
    } else {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form);
      for (let [key, value] of formData.entries()) {
        if (value === "") {
          setError(`${key} field cannot be empty`)
          return
        }
      }
      createItem(userId, formData).then(() => {
        form.reset()
      })
    }
  }
 
  return (
    <Box onSubmit={(e) => {handleSubmit(e)}} component={"form"} method="POST">
      <Typography variant="h5" sx={{mb:3, textAlign:"center", color: "primary.main", fontWeight: 600}}>
        New Item
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
