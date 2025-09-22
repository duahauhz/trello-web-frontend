import { Box, Avatar, Typography } from "@mui/material";

export default function User() {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Avatar
        src="https://i.pravatar.cc/150"
        sx={{ width: 120, height: 120, mb: 2 }}
      />
      <Typography variant="h5">Tên người dùng</Typography>
      <Typography>Email: user@example.com</Typography>
    </Box>
  );
}
