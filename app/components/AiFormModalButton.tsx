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
            text: "Hi",

          },
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