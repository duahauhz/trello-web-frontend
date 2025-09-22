import { Box, Button, TextField } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Giả lập dữ liệu user từ server
    login({
      name: "Nguyen Van A",
      avatar: "https://i.pravatar.cc/40",
      email: "a@example.com",
    });
    navigate("/"); // trở lại trang chủ
  };

  return (
    <Box sx={{ p: 4 }}>
      <TextField label="Email" fullWidth sx={{ mb: 2 }} />
      <TextField label="Mật khẩu" type="password" fullWidth sx={{ mb: 2 }} />
      <Button variant="contained" onClick={handleLogin}>Đăng nhập</Button>
    </Box>
  );
}
