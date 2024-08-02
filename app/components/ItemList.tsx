import Item from "./Item"
import { getFilteredItems } from "@/data-access/items"
import { Box, Typography} from "@mui/material"

export default async function ItemList({query}: {query: string}) {
  const items = await getFilteredItems(query)
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