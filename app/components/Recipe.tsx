import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';

interface RecipeProps {
  recipe: string | null,
  loading: boolean
}
export default function Recipe({recipe, loading}:RecipeProps) {
  return (
    <Box>
      <Typography sx={{textAlign: "center", color: "primary.main"}} variant="h3">Magic Recipe</Typography>
      {loading 
        ? <Typography variant="h4" sx={{display: "flex", justifyContent:"center", alignItems: "center", color:"secondary.main", mt: 6}}>Generating magic recipe...</Typography>
        : <ReactMarkdown>{recipe}</ReactMarkdown>}
    </Box>
  )
}