import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Badge,
  Button,
  Avatar,
  Container,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Divider
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ModeSelect from "./ModeSelect";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/user");
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login"); // Chuyển đến trang chọn loại đăng nhập
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Tin tức", path: "/news" },
    { label: "Đặt lịch khám", path: "/booking" },
    { label: "AI Companion", path: "/ai" },
    { label: "Hỗ trợ", path: "/support" }
  ];

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="xl">
        {/* ===== DESKTOP HEADER ===== */}
        {!isMobile && (
          <>
            {/* Top Bar */}
            <Toolbar
              sx={{
                justifyContent: "space-between",
                py: 1.5,
                minHeight: { xs: '56px', sm: '64px' }
              }}
            >
              {/* Left: FAQ + Notifications */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  component={Link}
                  to="/faq"
                  sx={{ 
                    color: 'text.secondary',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: 'secondary.main'
                    }
                  }}
                >
                  FAQ
                </Button>

                <IconButton 
                  onClick={handleNotificationClick}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      color: 'secondary.main'
                    }
                  }}
                >
                  <Badge variant="dot" color="secondary" invisible={false}>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Box>

              {/* Center: Logo */}
              <Box 
                sx={{ 
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/')}
              >
                <img src="/logo.png" alt="SeniorCare" style={{ height: 40 }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 700,
                    fontFamily: '"Playfair Display", serif',
                    letterSpacing: '-0.5px'
                  }}
                >
                  SeniorCare
                </Typography>
              </Box>

              {/* Right: User Info or Login */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ModeSelect />
                
                {user ? (
                  <>
                    <Typography 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}
                    >
                      Xin chào, <span style={{ color: theme.palette.text.primary, fontWeight: 600 }}>{user.name}</span>
                    </Typography>
                    <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                      <Avatar
                        src={user.avatar || ""}
                        alt={user.name}
                        sx={{ 
                          width: 36,
                          height: 36,
                          border: '2px solid',
                          borderColor: 'divider',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: 'secondary.main',
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                    </IconButton>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleLoginClick}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Đăng nhập
                  </Button>
                )}
              </Box>
            </Toolbar>

            {/* Navigation Bar */}
            <Toolbar
              sx={{
                justifyContent: "center",
                py: 1,
                borderTop: '1px solid',
                borderColor: 'divider',
                gap: 1,
                minHeight: '48px !important'
              }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: isActiveRoute(item.path) ? 'secondary.main' : 'text.primary',
                    textDecoration: 'none',
                    textTransform: 'none',
                    fontWeight: isActiveRoute(item.path) ? 600 : 500,
                    fontSize: '0.9375rem',
                    px: 2.5,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActiveRoute(item.path) ? '60%' : '0%',
                      height: '2px',
                      backgroundColor: 'secondary.main',
                      transition: 'width 0.3s ease'
                    },
                    '&:hover': {
                      color: 'secondary.main',
                      backgroundColor: 'transparent',
                      '&::after': {
                        width: '60%'
                      }
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Toolbar>

            {/* User Menu Dropdown */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  border: '1px solid',
                  borderColor: 'divider'
                }
              }}
            >
              <MenuItem onClick={handleProfileClick}>
                <Avatar sx={{ width: 20, height: 20, mr: 2, fontSize: 14 }}>
                  {user?.name?.charAt(0)}
                </Avatar>
                Trang cá nhân
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
                Đăng xuất
              </MenuItem>
            </Menu>
          </>
        )}

        {/* ===== MOBILE HEADER ===== */}
        {isMobile && (
          <Toolbar
            sx={{
              justifyContent: "space-between",
              py: 1.5
            }}
          >
            {/* Mobile Menu Button */}
            <IconButton
              onClick={toggleMobileMenu}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Box 
              sx={{ 
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              <img src="/logo.png" alt="SeniorCare" style={{ height: 32 }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  fontFamily: '"Playfair Display", serif'
                }}
              >
                SeniorCare
              </Typography>
            </Box>

            {/* User Avatar or Login */}
            {user ? (
              <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                <Avatar
                  src={user.avatar || ""}
                  alt={user.name}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={handleLoginClick}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.8125rem'
                }}
              >
                Đăng nhập
              </Button>
            )}
          </Toolbar>
        )}
      </Container>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          '& .MuiDrawer-paper': {
            width: '280px',
            bgcolor: 'background.paper'
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
              Menu
            </Typography>
            <IconButton onClick={toggleMobileMenu} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Avatar src={user.avatar || ""} alt={user.name} sx={{ width: 40, height: 40 }} />
              <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>{user.name}</Typography>
            </Box>
          )}
          
          <ModeSelect />
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={toggleMobileMenu}
                sx={{
                  py: 1.5,
                  backgroundColor: isActiveRoute(item.path) ? 'grey.100' : 'transparent',
                  borderLeft: isActiveRoute(item.path) ? '4px solid' : '4px solid transparent',
                  borderColor: isActiveRoute(item.path) ? 'secondary.main' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'grey.100'
                  }
                }}
              >
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActiveRoute(item.path) ? 600 : 500,
                    color: isActiveRoute(item.path) ? 'secondary.main' : 'text.primary'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/faq"
              onClick={toggleMobileMenu}
              sx={{ py: 1.5 }}
            >
              <ListItemText primary="FAQ" />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleNotificationClick();
                toggleMobileMenu();
              }}
              sx={{ py: 1.5 }}
            >
              <ListItemText primary="Thông báo" />
              <Badge variant="dot" color="secondary" invisible={false} />
            </ListItemButton>
          </ListItem>

          {user && (
            <>
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  sx={{ py: 1.5, color: 'error.main' }}
                >
                  <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
                  <ListItemText primary="Đăng xuất" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}
