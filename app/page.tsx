'use client'
import { useRouter } from 'next/navigation'
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "./lib/firebase";
export default function Login() {
  const router = useRouter()

  const handleSignIn = async () => {
    try {
      const auth = getAuth(app)
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider)
      const user = result.user 
      if (user) {
        console.log("User signed in:", user);

        const { uid, displayName, email, photoURL } = user;

        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, {
          uid: uid,
          displayName: displayName,
          email: email,
          photoURL: photoURL
        }, { merge: true });

        // Confirming user sign-in and redirection
        router.push('/home');
      } else {
        console.log("No user signed in");
      }
    } catch (error) {
      console.error("Error signing in: ", error)
    }

  }

  return (
    <Box sx={{ width:"80%", mx: "auto",  height: {sm: "100%", lg: "95vh"}, display: "flex", justifyContent:"center", alignItems:"center"}}>
      <Box sx={{ display: { lg: "flex"}, gap: 5, alignItems: "center" }}>
        <Box sx={{display: "flex", flexDirection: "column", gap: 5, my:"auto", maxWidth: {lg:"40%"}}}>
          <Typography sx={{fontSize:64, fontWeight:600, color:"primary.main"}} variant="h1">Track and Create with Magic Pantry</Typography>
          <Typography sx={{fontSize:32, fontWeight:600, color:"secondary.main"}} variant="h3">The future of tracking items with simple to use AI features</Typography>
          <Box sx={{ flexBasis: "50%" }}>
            <Button onClick={handleSignIn} sx={{fontSize: 24 }} variant="contained">Log In</Button>
          </Box>
        </Box>
        <Box my={"auto"} sx={{flexGrow: 1, mt:5, rotate:"-1deg"}}>
          <Image sizes="100vw" alt="food pantry tracker" src={"/hero-img2.jpg"} width={0} height={0} style={{width: "100%", height: "100%"}}/>
        </Box>
      </Box>
    </Box>
  )
}