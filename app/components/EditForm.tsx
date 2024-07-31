import { Typography, Box, FormControl, InputLabel, Input } from "@mui/material"
interface PantryItem {
  item: {
    id: string;
    name: string;
    quantity: number;
  }
}
export default function EditForm({item}: PantryItem ) {
  return (
    <>
      <Typography variant="h5" sx={{mb:3, textAlign:"center", color: "primary.main", fontWeight: 600}}>
        Edit {item.name.toUpperCase()}
      </Typography>
      <Box sx={{display: "flex", gap:2}}>
        <FormControl>
          <InputLabel>Item Name</InputLabel>
          <Input defaultValue={item.name} sx={{bgcolor: "white"}} name="name"/>
        </FormControl>
        <FormControl>
          <InputLabel>Qty</InputLabel>
          <Input defaultValue={item.quantity} sx={{bgcolor: "white"}} type="number" name="quantity"/>
        </FormControl>
      </Box>
      {/* {error && <Typography sx={{ color: "red" }}>{error}</Typography>} */}
      <Box sx={{mt:5, display:"flex", justifyContent:"center"}}>
        {/* <SubmitButton/> */}
      </Box>
    </>

  )
}