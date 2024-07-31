'use server'
import { Box, Button } from "@mui/material";
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
    <Box component="form" action={deleteItem.bind(null, pantryItem.id)}>
      <Button type="submit">
        ❌
      </Button>
    </Box>
  )
}