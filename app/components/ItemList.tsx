'use client'
import Item from "./Item"
import { Box, Typography} from "@mui/material"

interface ItemListProps {
  items: PantryItem[];
}
interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}

export default function ItemList({ items }: ItemListProps) {

  return (
    <>
      <Box sx={{display: "flex" }}>
        <Typography sx={{ maxWidth: "40%", color: "secondary.main", minWidth: "40%", fontSize: 20, fontWeight: 600}}>Item</Typography>
        <Typography sx={{color: "secondary.main", flexGrow: 1, fontSize: 20, fontWeight: 600}}>Qty</Typography>
      </Box>
      {items && items.map((item) => (
        <Item key={item.id} pantryItem={item}/>
      ))}
    </>
  )
}