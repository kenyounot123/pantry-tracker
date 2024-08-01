'use server'
import { Box, Button, Typography } from "@mui/material";
import { deleteItem } from "../action";


interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}

interface DeleteItemProps {
  pantryItem: PantryItem
}
export default async function DeleteItemForm({pantryItem}: DeleteItemProps) {
  return (
    <Box ml={1} component="form" action={deleteItem.bind(null, pantryItem.id)}>
      <Button type="submit" variant="outlined">
        <Typography sx={{color: "red"}}>❌</Typography>
      </Button>
    </Box>
  )
}