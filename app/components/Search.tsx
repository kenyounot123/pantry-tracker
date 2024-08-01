"use client"
import { Box, Typography, TextField } from "@mui/material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({placeholder} : {placeholder: string}) {
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const { replace } = useRouter()

  const debouncedHandleSearchChange = useDebouncedCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set('query', query);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    },
    200 
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    debouncedHandleSearchChange(query);
  };

  return (
    <>
      <Box sx={{ mt: 5, display:"flex", alignItems: "center", justifyContent:"center", p:3, gap:3}}>
        <TextField sx={{bgcolor:"white"}} defaultValue={searchParams.get('query')?.toString()} onChange={handleSearchChange} id="outlined-basic" label={placeholder} variant="outlined" />
        <Typography sx={{ color: "secondary.main", fontSize: 20, fontWeight: 600}}>Search</Typography>
      </Box>
    </>
  );
}