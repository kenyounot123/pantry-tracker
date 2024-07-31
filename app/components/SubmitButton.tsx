'use client'
import { useFormStatus } from "react-dom"
import { Button } from "@mui/material"

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} variant="contained" size="large" type="submit">
      {pending ? "Adding Item ..." : "Add"}
    </Button>
  )
}