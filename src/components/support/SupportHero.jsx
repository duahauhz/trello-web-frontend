import { Box, Container, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export default function SupportHero() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #00acc1 0%, #0097a7 100%)',
        color: 'white',
        py: 12,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '600px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=400&fit=crop") center/cover',
          opacity: 0.1,
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Main Title */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              mb: 3,
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '2px 4px 8px rgba(0,0,0,0.3)',
              letterSpacing: '-0.02em'
            }}
          >
            🤝 Trung Tâm Hỗ Trợ
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 400,
              opacity: 0.95,
              fontSize: { xs: '1.1rem', md: '1.5rem' },
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(3, 1fr)' 
            },
            gap: 4,
            maxWidth: '1000px',
            mx: 'auto',
            width: '100%'
          }}
        >
          {/* FAQ Card */}
          <Box
            onClick={() => scrollToSection('faq-section')}
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              p: 4,
              textAlign: 'center',
              border: '2px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              '&:hover': {
                transform: 'translateY(-12px)',
                bgcolor: 'rgba(255,255,255,0.25)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                borderColor: 'rgba(255,255,255,0.4)'
              }
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <HelpOutlineIcon sx={{ fontSize: 48 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Câu Hỏi Thường Gặp
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
              Tìm câu trả lời nhanh chóng cho các thắc mắc phổ biến
            </Typography>
          </Box>

          {/* Contact Form Card */}
          <Box
            onClick={() => scrollToSection('contact-section')}
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              p: 4,
              textAlign: 'center',
              border: '2px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              '&:hover': {
                transform: 'translateY(-12px)',
                bgcolor: 'rgba(255,255,255,0.25)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                borderColor: 'rgba(255,255,255,0.4)'
              }
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <ContactSupportIcon sx={{ fontSize: 48 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Liên Hệ Hỗ Trợ
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
              Gửi yêu cầu hỗ trợ và nhận phản hồi trong 24h
            </Typography>
          </Box>

          {/* Live Chat Card */}
          <Box
            onClick={() => scrollToSection('live-chat-section')}
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              p: 4,
              textAlign: 'center',
              border: '2px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              '&:hover': {
                transform: 'translateY(-12px)',
                bgcolor: 'rgba(255,255,255,0.25)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                borderColor: 'rgba(255,255,255,0.4)'
              }
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <SupportAgentIcon sx={{ fontSize: 48 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Trò Chuyện Trực Tiếp
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
              Chat với đội ngũ hỗ trợ ngay lập tức
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
