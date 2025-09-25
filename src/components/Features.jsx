import { Box, Typography, Card, CardContent, CardMedia, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import NewsIcon from '@mui/icons-material/Newspaper';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import HelpIcon from '@mui/icons-material/Help';

const features = [
  {
    title: 'Tin tức',
    description: 'Cập nhật tin tức mới nhất về chăm sóc sức khỏe và đời sống.',
    icon: NewsIcon,
    link: '/news',
    image: '/news-feature.jpg'  // Placeholder image path
  },
  {
    title: 'Đặt lịch khám',
    description: 'Dễ dàng đặt lịch khám bệnh, tư vấn sức khỏe hoặc trò chuyện cùng bác sĩ.',
    icon: CalendarMonthIcon,
    link: '/booking',
    image: '/booking-feature.jpg'  // Placeholder image path
  },
  {
    title: 'AI Companion',
    description: 'Trò chuyện cùng với AI về các chủ đề hoặc vấn đề mà bạn đang quan tâm.',
    icon: SmartToyIcon,
    link: '/ai',
    image: '/ai-feature.jpg'  // Placeholder image path
  },
  {
    title: 'Hỗ trợ',
    description: 'Đội ngũ hỗ trợ 24/7 luôn sẵn sàng giải đáp mọi thắc mắc của bạn.',
    icon: HelpIcon,
    link: '/support',
    image: '/support-feature.jpg'  // Placeholder image path
  }
];

export default function Features() {
  return (
    <Box sx={{py: 8, bgcolor: '#f5f5f5' }}>
      <br />
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ 
            mb: 6, 
            fontWeight: 700,
            color: '#00838f'
          }}
        >
          DỊCH VỤ NỔI BẬT
        </Typography>
          <br />
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={6} key={feature.title}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                  sx={{
                    objectFit: 'cover',
                    bgcolor: '#e0f7fa' // Placeholder background color
                  }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mb: 2 
                    }}
                  >
                    <feature.icon sx={{ fontSize: 40, color: '#00acc1', mr: 1 }} />
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#00838f' }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography sx={{ mb: 3, color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={feature.link}
                    variant="contained"
                    sx={{
                      bgcolor: '#00acc1',
                      color: '#ffffff',
                      '&:hover': {
                        bgcolor: '#5cedfaff',
                      },
                      px: 4
                    }}
                  >
                    Xem thêm
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}