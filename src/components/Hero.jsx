import { Box, Typography, TextField, IconButton, Container } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';

// Custom styled components
const HeroContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("/main_banner.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  paddingTop: theme.spacing(20),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)',
    pointerEvents: 'none'
  }
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '600px',
  width: '100%',
  margin: '0 auto',
  marginTop: theme.spacing(6),
}));

const ScrollButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(12),
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#fff',
  border: '2px solid rgba(255, 255, 255, 0.8)',
  padding: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: '2px solid #fff',
  },
  animation: 'bounce 2s infinite',
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateX(-50%) translateY(0)',
    },
    '40%': {
      transform: 'translateX(-50%) translateY(-15px)',
    },
    '60%': {
      transform: 'translateX(-50%) translateY(-7px)',
    },
  },
}));

export default function Hero({ onScrollClick }) {
  return (
    <HeroContainer>
      <Container maxWidth="md" sx={{ 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        transform: 'translateY(-10vh)'
      }}>
        <Typography
          variant="overline"
          sx={(theme) => ({
            fontFamily: "'Roboto', sans-serif",
            fontSize: { xs: '1.1rem', md: '1.4rem' },
            letterSpacing: 4,
            textTransform: 'uppercase',
            mb: 4,
            color: theme.palette.primary.main,
            fontWeight: 700,
            textShadow: '0 2px 8px rgba(0,0,0,0.25)',
            animation: 'fadeInDown 1s ease-out, glow 2s ease-in-out infinite alternate',
            '@keyframes fadeInDown': {
              from: { opacity: 0, transform: 'translateY(-20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            },
            '@keyframes glow': {
              from: { textShadow: '0 0 5px #4caf50, 0 0 10px #4caf50' },
              to: { textShadow: '0 0 20px #4caf50, 0 0 40px #4caf50' }
            }
          })}
        >
          SHARED SPACE IN YOUR TOWN
        </Typography>

        <Typography
          variant="h2"
          sx={(theme) => ({
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: { xs: '2.2rem', sm: '3.2rem', md: '4.2rem' },
            lineHeight: 1.3,
            mb: 1,
            color: '#fff',
            textShadow: '0 4px 24px rgba(0,0,0,0.35)',
            letterSpacing: '-0.5px',
            animation: 'fadeIn 1.5s ease-out forwards',
            opacity: 0,
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          })}
        >
          "The elderly are a shelter
        </Typography>
        <Typography
          variant="h2"
          sx={(theme) => ({
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: { xs: '2.2rem', sm: '3.2rem', md: '4.2rem' },
            lineHeight: 1.3,
            mb: 4,
            color: theme.palette.primary.light,
            textShadow: '0 2px 12px rgba(76,175,80,0.25)',
            letterSpacing: '-0.5px',
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: '-8px',
              width: '100%',
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
              borderRadius: '2px',
            },
            animation: 'fadeIn 1.8s ease-out forwards',
            opacity: 0,
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          })}
        >
          for the younger generation."
        </Typography>

        <SearchContainer>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tìm kiếm dịch vụ..."
            sx={(theme) => ({
              backgroundColor: 'rgba(255,255,255,1)',
              borderRadius: 2,
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              fontFamily: "'Roboto', sans-serif",
              '& .MuiOutlinedInput-root': {
                color: '#222',
                fontWeight: 500,
                fontSize: '1.1rem',
                fontFamily: "'Roboto', sans-serif",
                '& input::placeholder': {
                  color: '#888',
                  opacity: 1,
                  fontWeight: 400,
                  fontSize: '1.05rem',
                },
                '& fieldset': {
                  borderColor: 'rgba(76,175,80,0.25)',
                  borderWidth: 2,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            })}
          />
        </SearchContainer>
      </Container>

      <ScrollButton onClick={onScrollClick}>
        <KeyboardArrowDownIcon fontSize="large" />
      </ScrollButton>
    </HeroContainer>
  );
}