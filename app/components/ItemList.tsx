'use client'
import Item from "./Item"
import { getFilteredItems } from "@/data-access/items"
import { Box, Typography} from "@mui/material"
import { useState, useEffect } from "react"

interface ItemListProps {
  query: string;
}
interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}
import { useUser } from "../context/UserContext";


export default function ItemList({ query }: ItemListProps) {
  const [items, setItems] = useState<PantryItem[]>([]);
  const { userId } = useUser()


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await getFilteredItems(userId, query);
        setItems(fetchedItems);
      } catch (error) {
        console.log('Failed to fetch items');
      }
    };

    fetchItems();
  }, [query, userId]);
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