import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import DeleteItemForm from "./DeleteItemForm";

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
      <Box sx={{display: "flex", justifyContent:"space-between", alignItems:"center"}} borderBottom={1} borderColor={"secondary.main"} p={2}>
        <Typography sx={{ flexGrow: 1, color: "primary.main", fontWeight: 600, maxWidth: "45%" }}>
          {pantryItem.name}
        </Typography>
        <Typography sx={{flexGrow: 1, color: "primary.main", fontWeight: 600}}>
          {pantryItem.quantity}
        </Typography>
        <DeleteItemForm pantryItem={pantryItem}/>
      </Box>
    </>
  )
}