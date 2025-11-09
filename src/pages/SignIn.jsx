import { useState } from "react";
import { Box, Button, TextField, Typography, Container, Divider, Link, IconButton, InputAdornment } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Giả lập dữ liệu user từ server
    login({
      name: "Nguyen Van A",
      avatar: "https://i.pravatar.cc/40",
      email: email || "a@example.com",
    });
    navigate("/");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: { xs: 4, md: 8 }
      }}
    >
      <Container maxWidth="sm">
        {/* Back Button */}
        <Box sx={{ mb: 4 }}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              border: '2px solid',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'secondary.main',
                color: 'secondary.main'
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>

        {/* Sign In Card */}
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: '8px',
            py: { xs: 4, md: 6 },
            px: { xs: 3, md: 5 },
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid',
            borderColor: 'divider',
            width: '100%',
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography 
              variant="h2"
              sx={{ 
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                mb: 1,
                color: 'text.primary'
              }}
            >
              Đăng nhập
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                color: 'text.secondary',
                fontWeight: 400
              }}
            >
              Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục
            </Typography>
          </Box>
          
          {/* Form */}
          <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <TextField 
              variant="outlined"
              placeholder="example@gmail.com"
              label="Email" 
              type="email"
              fullWidth 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />

            <TextField 
              variant="outlined"
              placeholder="Nhập mật khẩu"
              label="Mật khẩu" 
              type={showPassword ? 'text' : 'password'}
              fullWidth 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{
                        '&:hover': {
                          color: 'secondary.main'
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Forgot Password */}
            <Box sx={{ textAlign: 'right', mb: 4 }}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: 'secondary.main'
                  }
                }}
              >
                Quên mật khẩu?
              </Link>
            </Box>
            
            {/* Sign In Button */}
            <Button 
              variant="contained" 
              color="secondary"
              fullWidth 
              type="submit"
              size="large"
              sx={{
                mb: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Đăng nhập
            </Button>
          </Box>

          {/* Divider */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography 
              variant="body2" 
              sx={{ 
                mx: 2, 
                color: 'text.secondary',
                fontWeight: 500
              }}
            >
              hoặc tiếp tục với
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          {/* Social Login Buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2,
              mb: 4
            }}
          >
            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{ 
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.9375rem'
              }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<FacebookIcon />}
              sx={{ 
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.9375rem'
              }}
            >
              Facebook
            </Button>
          </Box>

          {/* Sign Up Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              component="span"
              sx={{ color: 'text.secondary' }}
            >
              Chưa có tài khoản?{' '}
            </Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/signup')}
              underline="none"
              sx={{ 
                color: 'secondary.main',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              Đăng ký ngay
            </Link>
          </Box>
        </Box>

        {/* Footer Note */}
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block',
            textAlign: 'center',
            color: 'text.secondary',
            mt: 3
          }}
        >
          Bằng việc đăng nhập, bạn đồng ý với{' '}
          <Link href="#" underline="none" sx={{ color: 'secondary.main' }}>
            Điều khoản dịch vụ
          </Link>
          {' '}và{' '}
          <Link href="#" underline="none" sx={{ color: 'secondary.main' }}>
            Chính sách bảo mật
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}