import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Link,
  Divider
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: EmailIcon,
      title: 'Email',
      primary: 'support@healthsystem.com',
      secondary: 'info@healthsystem.com',
      link: 'mailto:support@healthsystem.com',
      color: 'primary'
    },
    {
      icon: PhoneIcon,
      title: 'Hotline',
      primary: '1900-xxxx (24/7)',
      secondary: '028-xxxx-xxxx (Văn phòng)',
      link: 'tel:1900xxxx',
      color: 'success'
    },
    {
      icon: LocationOnIcon,
      title: 'Địa Chỉ',
      primary: '123 Đường ABC, Phường XYZ',
      secondary: 'Quận 1, TP. Hồ Chí Minh',
      link: 'https://maps.google.com',
      color: 'error'
    },
    {
      icon: AccessTimeIcon,
      title: 'Giờ Làm Việc',
      primary: 'Thứ 2 - Thứ 6: 8:00 - 20:00',
      secondary: 'Thứ 7 - CN: 8:00 - 17:00',
      link: null,
      color: 'warning'
    }
  ];

  const socialMedia = [
    { icon: FacebookIcon, name: 'Facebook', url: 'https://facebook.com', color: '#1877F2' },
    { icon: TwitterIcon, name: 'Twitter', url: 'https://twitter.com', color: '#1DA1F2' },
    { icon: InstagramIcon, name: 'Instagram', url: 'https://instagram.com', color: '#E4405F' },
    { icon: LinkedInIcon, name: 'LinkedIn', url: 'https://linkedin.com', color: '#0A66C2' }
  ];

  return (
    <Box sx={{ mb: 8 }}>
      {/* Header */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #00acc1 0%, #0097a7 100%)',
          borderRadius: 4,
          p: 4,
          mb: 4,
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Thông Tin Liên Hệ
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.95 }}>
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
        </Typography>
      </Box>

      {/* Contact Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {contactDetails.map((detail, index) => {
          const IconComponent = detail.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: `${detail.color}.light`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <IconComponent sx={{ fontSize: 32, color: `${detail.color}.main` }} />
                  </Box>
                  
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: `${detail.color}.main` }}>
                    {detail.title}
                  </Typography>
                  
                  {detail.link ? (
                    <Link
                      href={detail.link}
                      underline="hover"
                      sx={{ display: 'block', mb: 0.5, color: 'text.primary', fontWeight: 600 }}
                    >
                      {detail.primary}
                    </Link>
                  ) : (
                    <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 600 }}>
                      {detail.primary}
                    </Typography>
                  )}
                  
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {detail.secondary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Social Media Section */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Kết Nối Với Chúng Tôi
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Theo dõi để cập nhật thông tin mới nhất
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          {socialMedia.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <Link
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  '&:hover': {
                    bgcolor: social.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 16px ${social.color}40`,
                    '& .MuiSvgIcon-root': {
                      color: 'white'
                    }
                  }
                }}
              >
                <IconComponent sx={{ color: social.color, fontSize: 28 }} />
              </Link>
            );
          })}
        </Box>
      </Box>

      {/* Emergency Notice */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          bgcolor: 'error.light',
          borderRadius: 3,
          border: '2px solid',
          borderColor: 'error.main'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.dark', mb: 1, textAlign: 'center' }}>
          🚨 Trường Hợp Khẩn Cấp
        </Typography>
        <Typography variant="body2" sx={{ color: 'error.dark', textAlign: 'center' }}>
          Vui lòng gọi <strong>115</strong> hoặc đến ngay cơ sở y tế gần nhất
        </Typography>
      </Box>
    </Box>
  );
}
