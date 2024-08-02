'use client'
import { Button } from "@mui/material"
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useItems } from "../context/ItemContext";

export default function AiFormModalButton() {
  // const { items } = useItems();
  // const handleMagicClick = async () => {
  //   try {
  //     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  //       method: "POST",
  //       headers: {
  //         "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         "model": "meta-llama/llama-3.1-8b-instruct:free",
  //         messages: [
  //           {
  //             role: "system",
  //             content:
  //               "You are a world class chef with the best culinary practices. I will give you the list of all the ingredients and it's quantity I have in my pantry and I want you to only return a delicious recipe made out of these items.",
  //           },
  //           { role: "user", content: items },
  //         ],
  //       })
  //     });

  //     // Check if the response is ok (status code 200-299)
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     // Parse the response as JSON
  //     const data = await response.json();

  //     // Log the response or handle it as needed
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }

  return (
    <Button sx={{}} variant="outlined">
      <AutoAwesomeIcon/>
    </Button>
  )
  
}