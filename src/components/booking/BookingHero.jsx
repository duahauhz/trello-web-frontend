import { Box, Container, Typography, TextField, Button, InputAdornment, Grid, Card } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from 'react';

const QuickStatCard = ({ icon, value, label, color }) => (
  <Card
    sx={{
      p: 2.5,
      textAlign: 'center',
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        borderColor: color
      }
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: '12px',
        bgcolor: `${color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        mb: 1.5,
        color: color
      }}
    >
      {icon}
    </Box>
    <Typography 
      variant="h4" 
      sx={{ 
        fontFamily: '"Playfair Display", serif',
        fontWeight: 700, 
        mb: 0.5,
        color: 'text.primary'
      }}
    >
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Card>
);

export default function BookingHero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // TODO: Implement search functionality
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 6, md: 8 },
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        {/* Main Content */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="overline"
              sx={{
                color: 'secondary.main',
                fontWeight: 600,
                letterSpacing: '0.15em',
                fontSize: '0.875rem',
                mb: 1,
                display: 'block'
              }}
            >
              ĐẶT LỊCH KHÁM
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: 'text.primary',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.75rem' },
                lineHeight: 1.2
              }}
            >
              Chăm Sóc Sức Khỏe
              <br />
              <Box component="span" sx={{ color: 'secondary.main' }}>
                Chuyên Nghiệp
              </Box>
            </Typography>
            <Typography 
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 3,
                lineHeight: 1.8,
                fontSize: '1.05rem'
              }}
            >
              Đặt lịch khám với các bác sĩ hàng đầu. Nhanh chóng, tiện lợi và an toàn.
            </Typography>

            {/* Search Box */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Tìm bác sĩ, chuyên khoa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSearch}
                        sx={{
                          borderRadius: '4px',
                          px: 3,
                          py: 1,
                          fontWeight: 600,
                          boxShadow: 'none',
                          '&:hover': {
                            boxShadow: 'none'
                          }
                        }}
                      >
                        Tìm kiếm
                      </Button>
                    </InputAdornment>
                  ),
                  sx: {
                    pr: 0.5,
                    bgcolor: 'background.default'
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'divider',
                      borderWidth: '1px'
                    },
                    '&:hover fieldset': {
                      borderColor: 'text.secondary'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'secondary.main',
                      borderWidth: '2px'
                    }
                  }
                }}
              />
            </Box>

            {/* Quick Actions */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: '20px',
                  px: 2,
                  py: 0.5,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    bgcolor: 'transparent'
                  }
                }}
              >
                Tim mạch
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: '20px',
                  px: 2,
                  py: 0.5,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    bgcolor: 'transparent'
                  }
                }}
              >
                Nhi khoa
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: '20px',
                  px: 2,
                  py: 0.5,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    bgcolor: 'transparent'
                  }
                }}
              >
                Da liễu
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: '20px',
                  px: 2,
                  py: 0.5,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderColor: 'divider',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    bgcolor: 'transparent'
                  }
                }}
              >
                Nội khoa
              </Button>
            </Box>
          </Grid>

          {/* Stats Cards */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <QuickStatCard
                  icon={<LocalHospitalIcon sx={{ fontSize: 28 }} />}
                  value="150+"
                  label="Bác sĩ chuyên khoa"
                  color="#e74c3c"
                />
              </Grid>
              <Grid item xs={6}>
                <QuickStatCard
                  icon={<CalendarMonthIcon sx={{ fontSize: 28 }} />}
                  value="5,000+"
                  label="Lịch khám/tháng"
                  color="#f39c12"
                />
              </Grid>
              <Grid item xs={6}>
                <QuickStatCard
                  icon={<AccessTimeIcon sx={{ fontSize: 28 }} />}
                  value="24/7"
                  label="Hỗ trợ khách hàng"
                  color="#3498db"
                />
              </Grid>
              <Grid item xs={6}>
                <QuickStatCard
                  icon={<SearchIcon sx={{ fontSize: 28 }} />}
                  value="98%"
                  label="Hài lòng dịch vụ"
                  color="#27ae60"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
