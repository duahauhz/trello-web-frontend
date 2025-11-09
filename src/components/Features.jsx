import { Box, Typography, Card, CardContent, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import NewsIcon from '@mui/icons-material/Newspaper';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import HelpIcon from '@mui/icons-material/Help';

const features = [
  {
    title: 'Tin tức',
    description: 'Cập nhật tin tức mới nhất về chăm sóc sức khỏe, dinh dưỡng và đời sống dành cho người cao tuổi.',
    icon: NewsIcon,
    link: '/news'
  },
  {
    title: 'Đặt lịch khám',
    description: 'Dễ dàng đặt lịch khám bệnh với các bác sĩ uy tín, tư vấn sức khỏe chuyên nghiệp.',
    icon: CalendarMonthIcon,
    link: '/booking'
  },
  {
    title: 'AI Companion',
    description: 'Trò chuyện cùng AI để nhận tư vấn và giải đáp các thắc mắc về sức khỏe và cuộc sống.',
    icon: SmartToyIcon,
    link: '/ai'
  },
  {
    title: 'Hỗ trợ',
    description: 'Đội ngũ hỗ trợ chuyên nghiệp 24/7 luôn sẵn sàng giải đáp mọi thắc mắc của bạn.',
    icon: HelpIcon,
    link: '/support'
  }
];

export default function Features() {
  return (
    <Box 
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
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
            DỊCH VỤ CỦA CHÚNG TÔI
          </Typography>
          <Typography 
            variant="h2"
            sx={{ 
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: 'text.primary',
              mb: 2
            }}
          >
            Dịch vụ toàn diện
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.8
            }}
          >
            Chúng tôi cung cấp các dịch vụ chăm sóc sức khỏe hiện đại, 
            giúp người cao tuổi có cuộc sống khỏe mạnh và hạnh phúc hơn.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} key={feature.title}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: { xs: 2, md: 3 },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'visible',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '0%',
                    backgroundColor: 'secondary.main',
                    transition: 'height 0.3s ease'
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
                    '&::before': {
                      height: '100%'
                    }
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                  {/* Icon */}
                  <Box 
                    sx={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 64,
                      height: 64,
                      borderRadius: '8px',
                      bgcolor: 'grey.100',
                      mb: 3,
                      transition: 'all 0.3s ease',
                      '.MuiCard-root:hover &': {
                        bgcolor: 'secondary.main',
                        transform: 'scale(1.05)',
                        '& svg': {
                          color: 'secondary.contrastText'
                        }
                      }
                    }}
                  >
                    <feature.icon sx={{ fontSize: 32, color: 'text.primary' }} />
                  </Box>

                  {/* Title */}
                  <Typography 
                    variant="h4"
                    sx={{ 
                      fontWeight: 600,
                      mb: 2,
                      color: 'text.primary'
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: 'text.secondary',
                      lineHeight: 1.8,
                      mb: 3
                    }}
                  >
                    {feature.description}
                  </Typography>

                  {/* CTA Button */}
                  <Button
                    component={Link}
                    to={feature.link}
                    variant="text"
                    endIcon={<Box component="span" sx={{ transition: 'transform 0.3s ease', '.MuiButton-root:hover &': { transform: 'translateX(4px)' } }}>→</Box>}
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      px: 0,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'secondary.main'
                      }
                    }}
                  >
                    Tìm hiểu thêm
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <Box 
          sx={{ 
            textAlign: 'center',
            mt: { xs: 6, md: 8 },
            p: { xs: 4, md: 6 },
            bgcolor: 'grey.50',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography 
            variant="h4"
            sx={{ 
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              mb: 2,
              color: 'text.primary'
            }}
          >
            Sẵn sàng trải nghiệm?
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 3,
              maxWidth: '600px',
              margin: '0 auto 24px'
            }}
          >
            Đăng ký ngay hôm nay để nhận tư vấn miễn phí và trải nghiệm đầy đủ các dịch vụ của chúng tôi.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/signup"
              sx={{
                px: 4,
                py: 1.5
              }}
            >
              Đăng ký ngay
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/booking"
              sx={{
                px: 4,
                py: 1.5
              }}
            >
              Đặt lịch tư vấn
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}