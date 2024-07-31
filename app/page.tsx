import { Container, Box, Button, Typography } from "@mui/material";
import { Input } from '@mui/material';
import Item from "./components/Item";
import getAllItems from "@/data-access/items";
import { unstable_noStore } from "next/cache";

export default async function Home() {
  unstable_noStore();
  const items = await getAllItems()

  return (
    <Container> 
      <Typography sx={{textAlign: "center", color: "primary.main", fontWeight: 600, fontSize: 48}} variant="h2">Track Your Pantry Items</Typography>
      <Box sx={{ borderRadius: '12px', bgcolor: "primary.light", pb:1}}>
        <Box sx={{ mt: 5, display:"flex", alignItems: "center", justifyContent:"center", p:3, gap:3}}>
          <Input sx={{bgcolor: "white"}}></Input>
          <Typography sx={{color: "secondary.main", fontSize: 20, fontWeight: 600}}>Search</Typography>
        </Box>
        <Box sx={{display: "flex", p:2}}>
          <Typography sx={{ maxWidth: "45%", color: "secondary.main", flexGrow: 1, fontSize: 20, fontWeight: 600}}>Item</Typography>
          <Typography sx={{color: "secondary.main", flexGrow: 1, fontSize: 20, fontWeight: 600}}>Qty</Typography>
        </Box>
        <Box p={2}>
          {items && items.map((item) => (
            <Item key={item.id} pantryItem={item}/>
          ))}
        </Box>
      </Box>
      {/* Opens up a modal form */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button size="large" variant="contained">
          Add Item
        </Button>
      </Box>
    </Container>
  );
}
