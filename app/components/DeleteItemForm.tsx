'use client'
import { Box, Button, Typography } from "@mui/material";
import { deleteItem } from "../action";
import { useUser } from "../context/UserContext";


interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}

interface DeleteItemProps {
  pantryItem: PantryItem
}
export default function DeleteItemForm({pantryItem}: DeleteItemProps) {
  const { userId } = useUser()
  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await deleteItem(userId, pantryItem.id); // Perform the deletion
      // Optionally, you can trigger a state update or re-render here if needed
    } catch (error) {
      console.log('Failed to delete item');
    } 
  };
  return (
    <Box ml={1} component="form" onSubmit={handleDelete}>
      <Button type="submit" variant="outlined">
        <Typography sx={{color: "red"}}>❌</Typography>
      </Button>
    </Box>
  )
}