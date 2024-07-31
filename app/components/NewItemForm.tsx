import { FormControl, Input, InputLabel, Box, Typography, Button } from "@mui/material";
import { SubmitButton } from "./SubmitButton";
import { createItem, FormState } from "../action";
import { useFormState } from "react-dom";


// Initial form state
export default function NewItemForm() {

  const [ formState, wrappedCreateItemAction] = useFormState(createItem, {
    name: "",
    quantity: "",
    errors: {
      name: undefined,
      quantity: undefined
    }
  } as FormState)
 
  return (
    <Box action={wrappedCreateItemAction} component={"form"} method="POST">
      <Typography variant="h5" sx={{mb:3, textAlign:"center", color: "primary.main", fontWeight: 600}}>
        New Item
      </Typography>
      <Box sx={{display: "flex", gap:2}}>
        <FormControl>
          <InputLabel>Item Name</InputLabel>
          <Input sx={{bgcolor: "white"}} defaultValue={formState.name} name="name"/>
        </FormControl>
        <FormControl>
          <InputLabel>Qty</InputLabel>
          <Input sx={{bgcolor: "white"}} type="number" defaultValue={formState.quantity} name="quantity"/>
        </FormControl>
      </Box>
      {formState.errors.name && <Typography sx={{color: "red"}}>{formState.errors.name}</Typography>}
      {formState.errors.quantity && <Typography sx={{color: "red"}}>{formState.errors.quantity}</Typography>}
      <Box sx={{mt:5, display:"flex", justifyContent:"center"}}>
        <SubmitButton/>
      </Box>
    </Box>
  )
}
