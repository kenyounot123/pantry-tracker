import { Box, Container, Typography, Button } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Box sx={{ width:"80%", mx: "auto",  height: {sm: "100%", lg: "95vh"}, display: "flex", justifyContent:"center", alignItems:"center"}}>
      <Box sx={{ display: { lg: "flex"}, gap: 1, alignItems: "center" }}>
        <Box sx={{display: "flex", flexDirection: "column", gap: 5, my:"auto", maxWidth: {lg:"50%"}}}>
          <Typography sx={{fontSize:64, fontWeight:600, color:"primary.main"}} variant="h1">Track and Create with Magic Pantry</Typography>
          <Typography sx={{fontSize:32, fontWeight:600, color:"secondary.main"}} variant="h3">The future of tracking items with simple to use AI features</Typography>
          <Box sx={{ flexBasis: "50%" }}><Button sx={{fontSize: 24 }} variant="contained">Sign In</Button></Box>
        </Box>
        <Box my={"auto"} sx={{flexGrow: 1, mt:5}}>
          <Image sizes="100vw" alt="food pantry tracker" src={"/hero-img2.jpg"} width={0} height={0} style={{width: "100%", height: "100%"}}/>
        </Box>
      </Box>
    </Box>
  )
}