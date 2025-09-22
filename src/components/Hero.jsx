import { Box, Button, TextField } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        height: "60vh",
        backgroundImage: "url('/banner.jpg')",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        gap: 2
      }}
    >
      <h1>Người già là bóng mát yêu thương cho thế hệ sau</h1>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField size="small" placeholder="Job title or keyword" />
        <TextField size="small" placeholder="City" />
        <Button variant="contained">Search</Button>
      </Box>
    </Box>
  );
}
