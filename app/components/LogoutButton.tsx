'use client'
import { Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { app } from "../lib/firebase"; 
export default function LogoutButton() {
  const router = useRouter()
  const auth = getAuth(app);

  const handleSignOut = () => {
    signOut(auth).then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
    });
    router.push("/")
  }
  return (

    <Button onClick={handleSignOut} variant="contained">Log Out</Button>
  )
}