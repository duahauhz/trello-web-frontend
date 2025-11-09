import { useState } from "react";
import { Box, Button, TextField, Typography, Container, Divider, InputAdornment, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    // Giả lập dữ liệu user từ server
    login({
      name: "Nguyen Van A",
      avatar: "https://i.pravatar.cc/40",
      email: "a@example.com",
    });
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: '4px',
            py: { xs: 4, sm: 6 },
            px: { xs: 3, sm: 5 },
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
            width: '100%',
            maxWidth: '480px',
            margin: '0 auto',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          {/* Back Button */}
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              mb: 2,
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          {/* Header */}
          <Typography 
            variant="h3"
            align="center" 
            sx={{ 
              mb: 1,
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: 'text.primary',
              fontSize: { xs: '2rem', sm: '2.5rem' }
            }}
          >
            Tạo tài khoản
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              mb: 4,
              color: 'text.secondary',
              lineHeight: 1.6
            }}
          >
            Tham gia cộng đồng chăm sóc sức khỏe người cao tuổi
          </Typography>
          
          {/* Form Fields */}
          <TextField 
            variant="outlined"
            placeholder="example@gmail.com"
            label="Email" 
            fullWidth 
            sx={{ mb: 2.5 }}
          />
          
          <TextField 
            variant="outlined"
            placeholder="Nhập mật khẩu"
            label="Mật khẩu" 
            type={showPassword ? 'text' : 'password'}
            fullWidth 
            sx={{ mb: 2.5 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <TextField 
            variant="outlined"
            placeholder="Xác nhận mật khẩu"
            label="Xác nhận mật khẩu" 
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth 
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {/* Terms */}
          <Typography 
            variant="body2"
            align="center"
            sx={{ 
              mb: 3,
              color: 'text.secondary',
              fontSize: '0.875rem'
            }}
          >
            Bằng việc đăng ký, bạn đồng ý với{' '}
            <Box component="span" sx={{ color: 'secondary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              Điều khoản dịch vụ
            </Box>
            {' '}và{' '}
            <Box component="span" sx={{ color: 'secondary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              Chính sách bảo mật
            </Box>
          </Typography>

          {/* Sign Up Button */}
          <Button 
            variant="contained" 
            color="secondary"
            fullWidth 
            onClick={handleSignUp}
            sx={{
              mb: 3,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)'
              }
            }}
          >
            Đăng ký
          </Button>

          {/* Divider */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
              Hoặc tiếp tục với
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          {/* Social Login Buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2,
              mb: 3
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
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'text.primary',
                  bgcolor: 'action.hover'
                }
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
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'text.primary',
                  bgcolor: 'action.hover'
                }
              }}
            >
              Facebook
            </Button>
          </Box>

          {/* Sign In Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              component="span"
              sx={{ color: 'text.secondary' }}
            >
              Đã có tài khoản?{' '}
            </Typography>
            <Button 
              onClick={() => navigate('/signin')}
              sx={{ 
                textTransform: 'none',
                color: 'secondary.main',
                fontWeight: 600,
                p: 0,
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline'
                }
              }}
            >
              Đăng nhập
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
