import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: PhoneIcon,
      title: 'Điện thoại',
      info: '1900 xxxx',
      subInfo: 'Phí cuộc gọi theo nhà mạng'
    },
    {
      icon: EmailIcon,
      title: 'Email',
      info: 'support@healthCare.com',
      subInfo: 'Phản hồi trong 24 giờ'
    },
    {
      icon: LocationOnIcon,
      title: 'Địa chỉ',
      info: '123 Đường ABC, Quận XYZ',
      subInfo: 'Thành phố Hồ Chí Minh'
    },
    {
      icon: AccessTimeIcon,
      title: 'Giờ làm việc',
      info: 'Thứ 2 - Chủ nhật',
      subInfo: '24/7 - Luôn sẵn sàng'
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'secondary.main',
              fontWeight: 700,
              letterSpacing: '1.5px',
              mb: 2,
              display: 'block'
            }}
          >
            THÔNG TIN LIÊN HỆ
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Liên hệ với chúng tôi
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.8
            }}
          >
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng phục vụ bạn
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {contactDetails.map((detail, index) => {
            const IconComponent = detail.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    bgcolor: '#fafafa',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    borderLeft: '3px solid transparent',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderLeftColor: 'secondary.main',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                      bgcolor: '#ffffff'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      border: '2px solid',
                      borderColor: 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <IconComponent 
                      sx={{ 
                        fontSize: 28,
                        color: 'secondary.main'
                      }} 
                    />
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      color: 'text.primary',
                      mb: 1.5
                    }}
                  >
                    {detail.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      mb: 0.5
                    }}
                  >
                    {detail.info}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary'
                    }}
                  >
                    {detail.subInfo}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Additional Information */}
        <Box sx={{ mt: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: '#ffffff',
              border: '1px solid',
              borderColor: 'divider',
              borderLeft: '3px solid',
              borderLeftColor: '#f39c12',
              borderRadius: 2
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 1
                  }}
                >
                  Cần hỗ trợ khẩn cấp?
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.7
                  }}
                >
                  Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. 
                  Liên hệ ngay để được tư vấn và giải đáp thắc mắc.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    color: '#f39c12'
                  }}
                >
                  24/7
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600
                  }}
                >
                  Hỗ trợ không ngừng nghỉ
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
