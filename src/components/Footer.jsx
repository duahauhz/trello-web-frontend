import React from "react";
import { Box, Container, Grid, Typography, IconButton, Link } from "@mui/material";
import { Facebook, LinkedIn, YouTube, Instagram, Email, Phone, LocationOn } from "@mui/icons-material";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Logo & Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'text.primary',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'background.paper'
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
                  SC
                </Typography>
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  fontFamily: '"Playfair Display", serif',
                  letterSpacing: '-0.5px'
                }}
              >
                SeniorCare
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                lineHeight: 1.7,
                mb: 3
              }}
            >
              Nền tảng chăm sóc sức khỏe toàn diện dành cho người cao tuổi. 
              Chúng tôi cam kết mang đến dịch vụ chất lượng và sự chăm sóc tận tâm nhất.
            </Typography>
            
            {/* Social Media */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: LinkedIn, label: 'LinkedIn' },
                { icon: YouTube, label: 'YouTube' },
                { icon: Instagram, label: 'Instagram' }
              ].map((social) => (
                <IconButton
                  key={social.label}
                  aria-label={social.label}
                  sx={{
                    border: '2px solid',
                    borderColor: 'divider',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      color: 'secondary.main',
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  <social.icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                fontWeight: 700,
                fontSize: '1rem'
              }}
            >
              Dịch vụ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Tin tức', 'Đặt lịch khám', 'AI Companion', 'Hỗ trợ'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'secondary.main'
                    }
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                fontWeight: 700,
                fontSize: '1rem'
              }}
            >
              Về chúng tôi
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Giới thiệu', 'Đội ngũ', 'Liên hệ', 'Tuyển dụng'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'secondary.main'
                    }
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                fontWeight: 700,
                fontSize: '1rem'
              }}
            >
              Pháp lý
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Điều khoản', 'Bảo mật', 'FAQ', 'Chính sách'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'secondary.main'
                    }
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={12} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                fontWeight: 700,
                fontSize: '1rem'
              }}
            >
              Liên hệ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOn sx={{ fontSize: 18, color: 'text.secondary', mt: 0.3 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  123 Đường ABC, Quận XYZ, TP.HCM
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  1900 1234
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  support@seniorcare.vn
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontSize: '0.875rem'
            }}
          >
            © {currentYear} SeniorCare. All rights reserved.
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontSize: '0.875rem'
            }}
          >
            Thiết kế bởi <Box component="span" sx={{ color: 'secondary.main', fontWeight: 600 }}>SeniorCare Team</Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
