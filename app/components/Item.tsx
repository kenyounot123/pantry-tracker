import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from "react";
import DeleteItemForm from "./DeleteItemForm";
import EditModalButton from "./EditModalButton"

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}

interface ItemProps {
  pantryItem: PantryItem
}
export default function Item({pantryItem}: ItemProps) {
  return (
    <>
      <Box sx={{display: "flex", justifyContent:"space-between", alignItems:"center"}} borderBottom={1} borderColor={"secondary.main"} py={2} my={2}>
        <Typography sx={{ flexGrow: 1, color: "primary.main", fontWeight: 600, maxWidth: "40%" }}>
          {pantryItem.name}
        </Typography>
        <Typography sx={{flexGrow: 1, color: "primary.main", fontWeight: 600}}>
          {pantryItem.quantity}
        </Typography>
        <EditModalButton pantryItem={pantryItem}/>
        <DeleteItemForm pantryItem={pantryItem}/>
      </Box>
    </>
  )
}