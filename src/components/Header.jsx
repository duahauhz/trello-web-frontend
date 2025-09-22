import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Badge,
  Button,
  Avatar
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ModeSelect from "./ModeSelect";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth(); // context trả về user { name, avatar }

  const handleNotificationClick = () => {
    // ✅ chuyển hẳn sang trang Notifications
    navigate("/notifications");
  };

  const handleAvatarClick = () => {
    navigate("/user");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#0097a7" }}>
      {/* ===== HÀNG 1 ===== */}
      <Toolbar
        sx={{
          justifyContent: "space-between",
          bgcolor: "#00838f",
          py: 1,
        }}
      >
        {/* Bên trái: FAQ + Chuông */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            component={Link}
            to="/faq"
            sx={{ color: "#fff", textTransform: "none", fontWeight: "bold" }}
          >
            FAQ
          </Button>

          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge variant="dot" color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>

        {/* Logo giữa */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img src="/logo.png" alt="SeniorCare" style={{ height: 40 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            SeniorCare
          </Typography>
        </Box>

        {/* Bên phải: chỉ hiện chào + avatar khi ĐÃ đăng nhập */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {user && (
            <>
              <Typography>{`Xin chào, ${user.name}`}</Typography>
              <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                <Avatar
                  src={user.avatar || ""}
                  alt={user.name}
                  sx={{ width: 36, height: 36 }}
                />
              </IconButton>
            </>
          )}

          {!user && (
            <Button
              onClick={handleLoginClick}
              sx={{ color: "#fff", textTransform: "none" }}
            >
              Đăng nhập
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* ===== HÀNG 2 ===== */}
      <Toolbar
        sx={{
          justifyContent: "center", // Menu nằm giữa
          bgcolor: "#00acc1",
          py: 1,
          px: 4,
          gap: 4,
        }}
      >
        {/* Menu giữa */}
        <Button component={Link} to="/" color="inherit" sx={{ textDecoration: "underline" }}>
          Trang chủ
        </Button>
        <Button component={Link} to="/news" color="inherit" sx={{ textDecoration: "underline" }}>
          Tin tức
        </Button>
        <Button component={Link} to="/booking" color="inherit" sx={{ textDecoration: "underline" }}>
          Đặt lịch khám
        </Button>
        <Button component={Link} to="/ai" color="inherit" sx={{ textDecoration: "underline" }}>
          AI Companion
        </Button>
        <Button component={Link} to="/support" color="inherit" sx={{ textDecoration: "underline" }}>
          Hỗ trợ
        </Button>

        {/* ✅ Light/Dark Mode hẳn về góc phải */}
        <Box sx={{ position: "absolute", right: 16 }}>
          <ModeSelect />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
