import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'url("/bg-login.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: 'rgba(27, 169, 181, 0.3)',
            borderRadius: 2,
            p: 4,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              color: '#000',
            }}
          >
            Choose your option
          </Typography>

          <Button 
            variant="contained" 
            fullWidth 
            onClick={() => navigate('/signin')}
            sx={{
              mb: 2,
              backgroundColor: '#006B5E',
              height: '48px',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#005347',
              },
            }}
          >
            SIGN IN
          </Button>

          <Button 
            variant="outlined" 
            fullWidth 
            onClick={() => navigate('/signup')}
            sx={{
              height: '48px',
              borderRadius: 1,
              borderColor: '#006B5E',
              color: '#006B5E',
              '&:hover': {
                borderColor: '#005347',
                backgroundColor: 'rgba(0, 107, 94, 0.04)',
              },
            }}
          >
            SIGN UP
          </Button>
        </Box>
      </Container>
    </Box>
  );
}