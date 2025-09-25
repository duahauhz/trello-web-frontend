import { Box, Button, TextField, Typography, Container, Divider } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function SignUp() {
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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'url("/bg-login.jpg")', // You'll need to add this image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: 'rgba(27, 169, 181, 0.3)',
            borderRadius: 2,
            py: 6, // Increased vertical padding
            px: 4,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '450px', // Slightly wider
            margin: '0 auto',
          }}
        >
          <Typography 
            variant="h3"  // Larger title
            align="center" 
            sx={{ 
              mb: 1,
              fontWeight: 'bold',
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
            }}
          >
            Welcome
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            sx={{ 
              mb: 5, // More space before form
              color: '#FFFFFF',
              fontWeight: '500',
            }}
          >
            Sign Up
          </Typography>
          
          <TextField 
            variant="outlined"
            placeholder="example@gmail.com"
            label="Email" 
            fullWidth 
            sx={{ 
              mb: 3, // More space between fields
              backgroundColor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                height: '56px', // Taller input fields
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1BA9B5',
                },
              },
            }}
          />
          <TextField 
            variant="outlined"
            placeholder="Enter your password"
            label="Password" 
            type="password" 
            fullWidth 
            sx={{ 
              mb: 3,
              backgroundColor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                height: '56px',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1BA9B5',
                },
              },
            }}
          />
          <TextField 
            variant="outlined"
            placeholder="Confirm your password"
            label="Confirm password" 
            type="password" 
            fullWidth 
            sx={{ 
              mb: 4, // More space before button
              backgroundColor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                height: '56px',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1BA9B5',
                },
              },
            }}
          />
          
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleLogin}
            sx={{
              mb: 4,
              backgroundColor: '#006B5E',
              height: '56px',
              borderRadius: 1,
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.3s ease',
              },
              '&:hover': {
                backgroundColor: '#005347',
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(0, 107, 94, 0.4)',
                '&::before': {
                  transform: 'translateX(100%)',
                },
              },
              '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 2px 10px rgba(0, 107, 94, 0.4)',
              },
            }}
          >
            SIGN UP
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body1" sx={{ mx: 2, color: '#000', fontWeight: '500' }}>
              or continue with
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 3,
              mb: 4,
              px: 4,
            }}
          >
            <Button
              variant="outlined"
              fullWidth
              sx={{ 
                backgroundColor: 'white',
                borderColor: 'transparent',
                borderRadius: 1,
                height: '56px',
                maxWidth: '160px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#DB4437',
                  backgroundColor: 'rgba(219, 68, 55, 0.05)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 5px 15px rgba(219, 68, 55, 0.2)',
                  '& .MuiSvgIcon-root': {
                    transform: 'scale(1.1)',
                  },
                },
                '&:active': {
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 10px rgba(219, 68, 55, 0.2)',
                },
              }}
            >
              <GoogleIcon 
                sx={{ 
                  color: '#DB4437', 
                  fontSize: '28px',
                  transition: 'transform 0.3s ease',
                }} 
              />
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ 
                backgroundColor: 'white',
                borderColor: 'transparent',
                borderRadius: 1,
                height: '56px',
                maxWidth: '160px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#4267B2',
                  backgroundColor: 'rgba(66, 103, 178, 0.05)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 5px 15px rgba(66, 103, 178, 0.2)',
                  '& .MuiSvgIcon-root': {
                    transform: 'scale(1.1)',
                  },
                },
                '&:active': {
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 10px rgba(66, 103, 178, 0.2)',
                },
              }}
            >
              <FacebookIcon 
                sx={{ 
                  color: '#4267B2', 
                  fontSize: '28px',
                  transition: 'transform 0.3s ease',
                }} 
              />
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              component="span"
              sx={{ color: '#FFFFFF' }}
            >
              Already have an account?{' '}
            </Typography>
            <Button 
              onClick={() => navigate('/signin')}
              sx={{ 
                textTransform: 'none',
                color: '#1BA9B5',
                fontWeight: 'bold',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: '2px',
                  backgroundColor: '#1BA9B5',
                  transition: 'width 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#1BA9B5',
                  '&::before': {
                    width: '80%',
                  },
                },
              }}
            >
              SIGN IN
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
