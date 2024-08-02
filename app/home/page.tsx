'use client'
import { Container, Box, Typography } from "@mui/material";
// import AiFormModalButton from "./components/AiFormModalButton";
import FormModalButton from "../components/FormModalButton";
import Search from "../components/Search";
import ItemList from "../components/ItemList";
import LogOutButton from "../components/LogoutButton";
import AiFormModalButton from "../components/AiFormModalButton";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "../context/UserContext";



export default function Home({searchParams} : {searchParams?: {query?: string; page?: string}}) {
  const { userId, setUserId } = useUser()
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const query = searchParams?.query || ""

  useEffect(() => {
    if (!userId) {
      router.replace('/'); // Redirect to login page if not authenticated
    }
    setLoading(false);
  }, []);


  if (loading) return <Typography sx={{height:"100vh", display: "flex", justifyContent:"center", alignItems:"center", color:"primary.main"}}>Checking if user is logged in...</Typography>; // Optionally show a loading indicator

  // If user is not authenticated, nothing is rendered
  if (!userId) return null;

  return (
    <Container> 
      <LogOutButton/>
      <Typography sx={{textAlign: "center", color: "primary.main", fontWeight: 600, fontSize: 48}} variant="h2">Track Your Pantry Items</Typography>
      <Box sx={{maxWidth: { xs:"100%", md:"80%"}, mx: "auto"}}>
        <Box sx={{ borderRadius: '5px', bgcolor: "primary.light", pb:2}}>
          <Search placeholder="Search Items..."/>
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
