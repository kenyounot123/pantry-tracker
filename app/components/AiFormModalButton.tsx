import { Button } from "@mui/material"
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})
async function main() {
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      { 
        role: "user",
        content: [
          { 
            type: "text",
            text: "Describe this image",

          },
          {
            type: "image_url",
            image_url: {
              url: "https://assets.clevelandclinic.org/transform/cd71f4bd-81d4-45d8-a450-74df78e4477a/Apples-184940975-770x533-1_jpg",
              detail: "low",
            },
          }
        ]}
    ],
  })
  console.log(completion.choices[0])
}

export default function AiFormModalButton() {
  main()
  return (
    <Button sx={{}} variant="outlined">
      <AutoAwesomeIcon/>
    </Button>
  )
  
}