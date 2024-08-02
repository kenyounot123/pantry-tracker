'use client'
import { Container, Box, Typography } from "@mui/material";
// import AiFormModalButton from "./components/AiFormModalButton";
import FormModalButton from "../components/FormModalButton";
import Search from "../components/Search";
import ItemList from "../components/ItemList";
import LogOutButton from "../components/LogoutButton";
import AiFormModalButton from "../components/AiFormModalButton";
import React, { useState, useEffect, useMemo } from 'react';
import { useUser } from "../context/UserContext";
import { getAllItems } from "@/data-access/items";
import { createContext, useContext } from "react";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}


export const HomeContext = createContext<{
  items: PantryItem[] 
  setItems: React.Dispatch<React.SetStateAction<PantryItem[]>>;
}>({
  items: [],
  setItems: () => []
});

export const useHomeItems = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeItems must be used within an HomeProvider")
  }
  return context
}

export default function Home() {
  const { userId } = useUser()
  const [query, setQuery] = useState("")
  const [items, setItems] = useState<PantryItem[]>([])
  useEffect(() => {
    const fetchItems = async () => {
      const allItems = await getAllItems(userId)
      setItems(allItems)
    }
    fetchItems()
  }, [])

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);

  return (
    <HomeContext.Provider value={{items, setItems}}>
      <Container>
        <LogOutButton/>
        <Typography sx={{textAlign: "center", color: "primary.main", fontWeight: 600, fontSize: 48}} variant="h2">Track Your Pantry Items</Typography>
        <Box sx={{maxWidth: { xs:"100%", md:"80%"}, mx: "auto"}}>
          <Box sx={{ borderRadius: '5px', bgcolor: "primary.light", pb:2}}>
            <Search query={query} setQuery={setQuery} />
            <Box sx={{overflowY: 'auto', maxHeight:500, mx:2}}>
              <ItemList items={filteredItems}/>
            </Box>
          </Box>
          {/* Opens up a modal form */}
          <Box sx={{display: "flex", gap: 1, alignItems: "flex-end", justifyContent: "flex-end"}}>
            <AiFormModalButton/>
            <FormModalButton/>
          </Box>
        </Box>
      </Container>
    </HomeContext.Provider>
  );
}
