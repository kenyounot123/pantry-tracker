"use client"
import { Box, Typography, TextField } from "@mui/material";

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}
export default function Search({query, setQuery}: SearchProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuery(e.target.value)
  }
  return (
    <>
      <Box sx={{ mt: 5, display:"flex", alignItems: "center", justifyContent:"center", p:3, gap:3}}>
        <TextField sx={{bgcolor:"white"}} onChange={(e) => handleSearchChange(e)} id="outlined-basic" label="Search Items" variant="outlined" />
        <Typography sx={{ color: "secondary.main", fontSize: 20, fontWeight: 600}}>Search</Typography>
      </Box>
    </>
  );
}