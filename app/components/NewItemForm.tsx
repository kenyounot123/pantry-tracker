'use client'
import { FormControl, Input, InputLabel, Box, Typography, Button } from "@mui/material";
import { SubmitButton } from "./SubmitButton";
import { createItem } from "../action";
import { useState } from "react";


export default function NewItemForm() {
  const [error, setError] = useState<string | null>()
 
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
      <Box sx={{display: "flex", gap:2}}>
        <FormControl>
          <InputLabel>Item Name</InputLabel>
          <Input sx={{bgcolor: "white"}} name="name"/>
        </FormControl>
        <FormControl>
          <InputLabel>Qty</InputLabel>
          <Input sx={{bgcolor: "white"}} type="number" name="quantity"/>
        </FormControl>
      </Box>
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      <Box sx={{mt:5, display:"flex", justifyContent:"center"}}>
        <SubmitButton/>
      </Box>
    </Box>
  )
}
