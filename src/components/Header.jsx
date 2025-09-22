import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#0097a7' }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="SeniorCare" style={{ height: 40, marginRight: 8 }} />
          <span>SeniorCare</span>
        </Box>

        {/* Menu */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/">Trang chủ</Button>
          <Button> Tin tức </Button>
          <Button> Đặt lịch khám </Button>
          <Button> AI Companion </Button>
          <Button> Hỗ trợ </Button>
        </Box>

        {/* Đăng nhập / Đăng ký */}
        <Box>
          <Button component={Link} to="/login" color="inherit">Đăng nhập</Button>
          <Button variant="contained" color="secondary">Đăng ký</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
