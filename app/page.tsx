import { Container, Box } from "@mui/material";
import { Input } from '@mui/material';
import Typography from '@mui/joy/Typography';
import Item from "./components/Item";

const dummyData = [{
  id: 1,
  name: "apples",
  quantity: 5
}, {
  id: 2,
  name: "bananas",
  quantity: 5
}]

export default function Home() {
  return (
    <Container> 
      <Typography sx={{textAlign: "center", color: "primary.main", fontWeight: 600, fontSize: 48}} level="h2">Track Your Pantry Items</Typography>
      <Box sx={{ borderRadius: '12px', bgcolor: "primary.light", pb:1}}>
        <Box sx={{ mt: 5, display:"flex", alignItems: "center", justifyContent:"center", p:3, gap:3}}>
          <Input sx={{bgcolor: "white"}}></Input>
          <Typography sx={{color: "secondary.main", fontSize: 20, fontWeight: 600}}>Search</Typography>
        </Box>
        <Box sx={{display: "flex", p:2, gap:18}}>
          <Typography sx={{color: "secondary.main", fontSize: 20, fontWeight: 600}}>Item</Typography>
          <Typography sx={{color: "secondary.main", fontSize: 20, fontWeight: 600}}>Qty</Typography>
        </Box>

        <Box p={2}>
          {dummyData && dummyData.map((item) => (
            <Item key={item.id} pantryItem={item}/>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
