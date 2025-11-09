import { useState } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Divider, 
  InputAdornment, 
  IconButton,
  Paper,
  Alert
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function DoctorSignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulate API call
    const doctorData = {
      name: "Bác sĩ Nguyễn Văn A",
      email: email || "doctor@example.com",
      role: "doctor",
      specialty: "Khoa Tim Mạch",
      licenseNumber: "12345/BYT",
      workplace: "Bệnh viện Đa khoa Trung ương",
      yearsOfExperience: 15,
      consultationFee: 300000,
      avatar: "https://i.pravatar.cc/150",
      verified: true,
      phone: "0912 345 678"
    };

    login(doctorData, 'fake-jwt-token-doctor');
    navigate("/doctor/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fafafa',
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
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            width: '100%',
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'rgba(231, 76, 60, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LocalHospitalIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
              </Box>
            </Box>
            <Typography 
              variant="h2"
              sx={{ 
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                mb: 1,
                color: 'text.primary'
              }}
            >
              Đăng nhập Bác sĩ
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                color: 'text.secondary',
                fontWeight: 400,
                mb: 2
              }}
            >
              Cổng thông tin dành cho bác sĩ
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <VerifiedIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
              <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                Tài khoản đã xác thực
              </Typography>
            </Box>
          </Box>

          <Alert severity="info" sx={{ mb: 4 }}>
            <Typography variant="body2">
              <strong>Demo:</strong> Sử dụng bất kỳ email/mật khẩu nào để đăng nhập
            </Typography>
          </Alert>
          
          {/* Form */}
          <Box component="form" onSubmit={handleLogin}>
            <TextField 
              variant="outlined"
              placeholder="doctor@example.com"
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
                      onClick={() => setShowPassword(!showPassword)}
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
              <Button
                onClick={() => {}}
                sx={{
                  textTransform: 'none',
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    color: 'secondary.main',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Quên mật khẩu?
              </Button>
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
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(231, 76, 60, 0.25)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(231, 76, 60, 0.35)'
                }
              }}
            >
              Đăng nhập
            </Button>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Sign Up Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              component="span"
              sx={{ color: 'text.secondary' }}
            >
              Chưa có tài khoản bác sĩ?{' '}
            </Typography>
            <Button
              onClick={() => navigate('/doctor/signup')}
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
              Đăng ký ngay
            </Button>
          </Box>
        </Paper>

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
          Dành cho bác sĩ có chứng chỉ hành nghề hợp lệ
        </Typography>
      </Container>
    </Box>
  );
}
