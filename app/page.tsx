import { Container, Box, Typography } from "@mui/material";
import { unstable_noStore } from "next/cache";
import AiFormModalButton from "./components/AiFormModalButton";
import FormModalButton from "./components/FormModalButton";
import Search from "./components/Search";
import ItemList from "./components/ItemList";
import CameraComponent from "./components/Camera";

export default async function Home({searchParams} : {searchParams?: {query?: string; page?: string}}) {
  unstable_noStore();
  const query = searchParams?.query || ""
  return (
    <Container> 
      <Typography sx={{textAlign: "center", color: "primary.main", fontWeight: 600, fontSize: 48}} variant="h2">Track Your Pantry Items</Typography>
      <Box sx={{maxWidth: { xs:"100%", md:"80%"}, mx: "auto"}}>
        <Box sx={{ borderRadius: '5px', bgcolor: "primary.light", pb:2}}>
          <Search placeholder="Search Items..."/>
          <Box sx={{display: "flex", p:2}}>
            <Typography sx={{ maxWidth: "40%", color: "secondary.main", flexGrow: 1, fontSize: 20, fontWeight: 600}}>Item</Typography>
            <Typography sx={{color: "secondary.main", flexGrow: 1, fontSize: 20, fontWeight: 600}}>Qty</Typography>
          </Box>
          <Box sx={{overflowY: 'auto', maxHeight:500, mx:2}}>
            <ItemList query={query}/>
          </Box>
        </Box>
        {/* Opens up a modal form */}
        <Box sx={{display: "flex", gap: 1, alignItems: "flex-end", justifyContent: "flex-end"}}>
          <AiFormModalButton/>
          <FormModalButton/>
        </Box>
      </Box>
    </Container>
  );
}
