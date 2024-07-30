import { Container } from "@mui/material";
import Typography from '@mui/joy/Typography';


export default function Home() {
  return (
    <Container> 
      <Typography sx={{textAlign: "center", color: "primary.main"}} level="h2">Track Your Pantry Items</Typography>
    </Container>
  );
}
