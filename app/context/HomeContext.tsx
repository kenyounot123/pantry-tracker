'use client'
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
