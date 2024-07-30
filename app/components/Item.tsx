import { Box, Stack } from "@mui/material";
import { Typography } from "@mui/material";

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
    <Stack direction={"row"} spacing={15} borderBottom={1} borderColor={"secondary.main"} py={2}>
      <Typography sx={{ flexGrow: 1, color: "primary.main", fontWeight: 600 }}>
        {pantryItem.name}
      </Typography>
      <Typography sx={{color: "primary.main", fontWeight: 600}}>
        {pantryItem.quantity}
      </Typography>
      <Typography>
      ❌
      </Typography>
    </Stack>
  )
}