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
  Divider,
  Menu,
  MenuItem
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ModeSelect from "./ModeSelect";
import { useState } from "react";

export default function DoctorHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotificationClick = () => {
    navigate("/doctor/notifications");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Menu dành cho bác sĩ
  const doctorMenuItems = [
    { label: "Dashboard", path: "/doctor/dashboard", icon: <DashboardIcon /> },
    { label: "Lịch hẹn", path: "/doctor/appointments", icon: <NotificationsIcon /> },
    { label: "Bệnh nhân", path: "/doctor/patients", icon: <NotificationsIcon /> },
    { label: "Cài đặt", path: "/doctor/settings", icon: <SettingsIcon /> }
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
              {/* Left: Logo */}
              <Box 
                sx={{ 
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/doctor/dashboard')}
              >
                <img src="/logo.png" alt="SeniorCare" style={{ height: 40 }} />
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'text.primary',
                      fontWeight: 700,
                      fontFamily: '"Playfair Display", serif',
                      letterSpacing: '-0.5px',
                      lineHeight: 1.2
                    }}
                  >
                    SeniorCare
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'secondary.main',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      letterSpacing: '1px'
                    }}
                  >
                    DOCTOR PORTAL
                  </Typography>
                </Box>
              </Box>

              {/* Right: User Info */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ModeSelect />
                
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

                {user && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography 
                          sx={{ 
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: 'text.primary'
                          }}
                        >
                          BS. {user.name}
                        </Typography>
                        <Typography 
                          sx={{ 
                            fontSize: '0.75rem',
                            color: 'text.secondary'
                          }}
                        >
                          {user.specialty}
                        </Typography>
                      </Box>
                      <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                        <Avatar
                          src={user.avatar || ""}
                          alt={user.name}
                          sx={{ 
                            width: 40,
                            height: 40,
                            border: '2px solid',
                            borderColor: 'secondary.main',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                              boxShadow: '0 0 0 3px rgba(231, 76, 60, 0.2)'
                            }
                          }}
                        />
                      </IconButton>
                    </Box>

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
                      <MenuItem onClick={() => { navigate('/doctor/settings'); handleMenuClose(); }}>
                        <SettingsIcon sx={{ mr: 2, fontSize: 20 }} />
                        Cài đặt
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                        <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
                        Đăng xuất
                      </MenuItem>
                    </Menu>
                  </>
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
              {doctorMenuItems.map((item) => (
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
              onClick={() => navigate('/doctor/dashboard')}
            >
              <img src="/logo.png" alt="SeniorCare" style={{ height: 32 }} />
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    fontFamily: '"Playfair Display", serif',
                    lineHeight: 1
                  }}
                >
                  SeniorCare
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'secondary.main',
                    fontWeight: 600,
                    fontSize: '0.6rem',
                    letterSpacing: '0.5px'
                  }}
                >
                  DOCTOR
                </Typography>
              </Box>
            </Box>

            {/* User Avatar */}
            {user && (
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar
                  src={user.avatar || ""}
                  alt={user.name}
                  sx={{ 
                    width: 36, 
                    height: 36,
                    border: '2px solid',
                    borderColor: 'secondary.main'
                  }}
                />
              </IconButton>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, p: 2, bgcolor: '#fafafa', borderRadius: 2 }}>
              <Avatar 
                src={user.avatar || ""} 
                alt={user.name} 
                sx={{ 
                  width: 50, 
                  height: 50,
                  border: '2px solid',
                  borderColor: 'secondary.main'
                }} 
              />
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                  BS. {user.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {user.specialty}
                </Typography>
              </Box>
            </Box>
          )}
          
          <ModeSelect />
        </Box>

        <List>
          {doctorMenuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={toggleMobileMenu}
                sx={{
                  py: 1.5,
                  backgroundColor: isActiveRoute(item.path) ? 'rgba(231, 76, 60, 0.1)' : 'transparent',
                  borderLeft: isActiveRoute(item.path) ? '4px solid' : '4px solid transparent',
                  borderColor: isActiveRoute(item.path) ? 'secondary.main' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(231, 76, 60, 0.05)'
                  }
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', color: isActiveRoute(item.path) ? 'secondary.main' : 'text.secondary' }}>
                  {item.icon}
                </Box>
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
          
          <Divider sx={{ my: 1 }} />
          
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}
              sx={{ py: 1.5, color: 'error.main' }}
            >
              <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                <LogoutIcon />
              </Box>
              <ListItemText primary="Đăng xuất" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
