import { Box, Typography, TextField, IconButton, Container, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

// Modern Book-style Hero Container
const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[100]} 100%)`,
  overflow: 'hidden',
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    minHeight: '80vh',
    padding: theme.spacing(2)
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-20%',
    width: '70%',
    height: '70%',
    background: theme.palette.mode === 'dark' 
      ? 'radial-gradient(circle, rgba(255,107,91,0.08) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(231,76,60,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-30%',
    left: '-10%',
    width: '50%',
    height: '50%',
    background: theme.palette.mode === 'dark'
      ? 'radial-gradient(circle, rgba(245,176,65,0.06) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(243,156,18,0.06) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none'
  }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  maxWidth: '900px',
  width: '100%',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  }
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '600px',
  width: '100%',
  margin: '0 auto',
  marginTop: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(3)
  }
}));

const ScrollButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(6),
  left: '50%',
  transform: 'translateX(-50%)',
  color: theme.palette.text.primary,
  border: `2px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1.5),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    transform: 'translateX(-50%) translateY(-4px)',
    boxShadow: '0 8px 16px rgba(231, 76, 60, 0.25)'
  },
  animation: 'bounce 2s infinite',
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateX(-50%) translateY(0)',
    },
    '40%': {
      transform: 'translateX(-50%) translateY(-10px)',
    },
    '60%': {
      transform: 'translateX(-50%) translateY(-5px)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    bottom: theme.spacing(3),
    padding: theme.spacing(1)
  }
}));

const AccentText = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 700,
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-4px',
    width: '100%',
    height: '3px',
    background: theme.palette.secondary.main,
    opacity: 0.3
  }
}));

export default function Hero({ onScrollClick }) {
  return (
    <HeroContainer>
      <ContentBox>
        {/* Overline Label */}
        <Typography
          variant="overline"
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            mb: { xs: 2, md: 3 },
            color: 'text.secondary',
            fontWeight: 600,
            display: 'block',
            animation: 'fadeInDown 0.8s ease-out',
            '@keyframes fadeInDown': {
              from: { opacity: 0, transform: 'translateY(-20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          CHĂM SÓC SỨC KHỎE TOÀN DIỆN
        </Typography>

        {/* Main Heading */}
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            lineHeight: 1.2,
            mb: 2,
            color: 'text.primary',
            animation: 'fadeIn 1s ease-out forwards',
            animationDelay: '0.2s',
            opacity: 0,
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          "Người già là <AccentText>mái ấm</AccentText>
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            lineHeight: 1.2,
            mb: { xs: 3, md: 4 },
            color: 'text.primary',
            animation: 'fadeIn 1s ease-out forwards',
            animationDelay: '0.4s',
            opacity: 0
          }}
        >
          cho thế hệ trẻ"
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
            lineHeight: 1.8,
            color: 'text.secondary',
            maxWidth: '700px',
            margin: '0 auto',
            mb: { xs: 3, md: 4 },
            animation: 'fadeIn 1s ease-out forwards',
            animationDelay: '0.6s',
            opacity: 0
          }}
        >
          Nền tảng chăm sóc sức khỏe hiện đại dành cho người cao tuổi. 
          Kết nối với các bác sĩ uy tín, đặt lịch khám nhanh chóng và nhận tư vấn từ AI.
        </Typography>

        {/* CTA Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
            mb: { xs: 3, md: 4 },
            animation: 'fadeIn 1s ease-out forwards',
            animationDelay: '0.8s',
            opacity: 0
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              px: { xs: 3, md: 4 },
              py: { xs: 1.25, md: 1.5 },
              fontSize: { xs: '0.9375rem', md: '1rem' }
            }}
          >
            Đặt lịch ngay
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: { xs: 3, md: 4 },
              py: { xs: 1.25, md: 1.5 },
              fontSize: { xs: '0.9375rem', md: '1rem' }
            }}
          >
            Tìm hiểu thêm
          </Button>
        </Box>

        {/* Search Bar */}
        <SearchContainer
          sx={{
            animation: 'fadeIn 1s ease-out forwards',
            animationDelay: '1s',
            opacity: 0
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tìm kiếm bác sĩ, chuyên khoa, dịch vụ..."
            InputProps={{
              endAdornment: (
                <IconButton 
                  sx={{ 
                    color: 'secondary.main',
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                      color: 'secondary.contrastText'
                    }
                  }}
                >
                  <SearchIcon />
                </IconButton>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.paper',
                borderRadius: '50px',
                fontSize: { xs: '0.9375rem', md: '1rem' },
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                '& input': {
                  padding: { xs: '14px 16px', md: '16px 20px' }
                },
                '& fieldset': {
                  borderWidth: '2px',
                  borderRadius: '50px'
                },
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)'
                },
                '&.Mui-focused': {
                  boxShadow: '0 8px 24px rgba(231, 76, 60, 0.15)'
                }
              }
            }}
          />
        </SearchContainer>
      </ContentBox>

      {/* Scroll Down Button */}
      <ScrollButton onClick={onScrollClick}>
        <KeyboardArrowDownIcon fontSize="medium" />
      </ScrollButton>
    </HeroContainer>
  );
}