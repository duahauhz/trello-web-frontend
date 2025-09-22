import { Box, TextField, Button } from "@mui/material";

export default function Login() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 10, gap: 2 }}>
      <h2>Đăng nhập</h2>
      <TextField label="Email" />
      <TextField label="Password" type="password" />
      <Button variant="contained">Đăng nhập</Button>
    </Box>
  );
}
