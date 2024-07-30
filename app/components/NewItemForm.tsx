import { FormControl, Input, InputLabel, Box, Typography, Button } from "@mui/material";

interface NewItemFormProps {
  action: (formData: FormData) => Promise<void>;
}
export default function NewItemForm({action}: NewItemFormProps) {
  return (
    <Box component={"form"} action={action} method="POST">
      <Typography variant="h5" sx={{mb:3, textAlign:"center", color: "primary.main", fontWeight: 600}}>
        New Item
      </Typography>
      <Box sx={{display: "flex", gap:2}}>
        <FormControl>
          <InputLabel>Item Name</InputLabel>
          <Input sx={{bgcolor: "white"}} name="name"/>
        </FormControl>
        <FormControl>
          <InputLabel>Qty</InputLabel>
          <Input sx={{bgcolor: "white"}} type="number" name="quantity"/>
        </FormControl>
      </Box>
      <Box sx={{mt:5, display:"flex", justifyContent:"center"}}>
        <Button variant="contained" size="large" type="submit">
          Add
        </Button>
      </Box>
    </Box>
  )
}
