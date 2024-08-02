'use client'
import { Typography, Box, FormControl, InputLabel, Input, Button } from "@mui/material"
import { useState } from "react";
import { updateItem } from "../action";
import { useUser } from "../context/UserContext";
interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}
interface ItemProps {
  handleClose: () => void; // Define handleClose as a function that returns void
  item: PantryItem;
}

export default function EditForm({ handleClose, item }: ItemProps) {
  const { userId } = useUser()
  const [error, setError] = useState<string | null>()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    let hasError = false;
    for (let [key, value] of formData.entries()) {
      if (value === "") {
        setError(`${key} field cannot be empty`);
        hasError = true;
        break;
      }
    }
    if (hasError) return;

    try {
      await updateItem(userId, item.id, formData);
      form.reset();
      handleClose();
    } catch (error) {
      setError("Failed to update item. Please try again.");
    }
  }
  return (
    <>
      <Box onSubmit={handleSubmit} component={"form"}>
        <Typography variant="h5" sx={{mb:3, textAlign:"center", color: "primary.main", fontWeight: 600}}>
          Edit {item.name.toUpperCase()}
        </Typography>
        <Box sx={{display: "flex", gap:2}}>
          <FormControl>
            <InputLabel>Item Name</InputLabel>
            <Input defaultValue={item.name} sx={{bgcolor: "white"}} name="name"/>
          </FormControl>
          <FormControl>
            <InputLabel>Qty</InputLabel>
            <Input defaultValue={item.quantity} sx={{bgcolor: "white"}} type="number" name="quantity"/>
          </FormControl>
        </Box>
        {/* {error && <Typography sx={{ color: "red" }}>{error}</Typography>} */}
        <Box sx={{mt:5, display:"flex", justifyContent:"center"}}>
          <Button type="submit" variant="contained">Update</Button>
        </Box>
      </Box>
    </>

  )
}