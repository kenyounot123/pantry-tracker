'use client'
import { FormControl, Input, InputLabel, Box, Typography, TextField, Button } from "@mui/material";
import { SubmitButton } from "./SubmitButton";
import { createItem } from "../action";
import { useState } from "react";
import CameraComponent from "./Camera";


export default function NewItemForm() {
  const [error, setError] = useState<string | null>()
  const [showCamera, setShowCamera] = useState(false);

  const handleToggleCamera = () => {
    setShowCamera(prev => !prev); // Toggle camera visibility
  };
 
  return (
    <Box onSubmit={(e) => {
      e.preventDefault()
      const form = e.target as HTMLFormElement
      const formData = new FormData(form);
      console.log(formData)
      for (let [key, value] of formData.entries()) {
        if (value === "") {
          setError(`${key} field cannot be empty`)
          return
        }
      }
      createItem(formData).then(() => {
        form.reset()
      })
    }} component={"form"} method="POST">
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
      <CameraComponent showCamera={showCamera} setShowCamera={setShowCamera}/>
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      <Box sx={{mt:10, display:"flex", justifyContent:"center", gap: 2}}>
        <SubmitButton/>
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
