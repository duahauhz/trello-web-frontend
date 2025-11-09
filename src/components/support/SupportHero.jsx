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

  const features = [
    {
      icon: HelpOutlineIcon,
      title: 'Câu Hỏi Thường Gặp',
      description: 'Tìm câu trả lời nhanh chóng cho các thắc mắc phổ biến',
      sectionId: 'faq-section'
    },
    {
      icon: ContactSupportIcon,
      title: 'Liên Hệ Hỗ Trợ',
      description: 'Gửi yêu cầu hỗ trợ và nhận phản hồi trong 24h',
      sectionId: 'contact-section'
    },
    {
      icon: SupportAgentIcon,
      title: 'Trò Chuyện Trực Tiếp',
      description: 'Chat với đội ngũ hỗ trợ ngay lập tức',
      sectionId: 'live-chat-section'
    }
  ];

  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        {/* Main Title */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: '#e74c3c',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '2px',
              mb: 2,
              display: 'block'
            }}
          >
            HỖ TRỢ KHÁCH HÀNG
          </Typography>
          
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              lineHeight: 1.2,
              color: 'text.primary'
            }}
          >
            Trung Tâm Hỗ Trợ
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.8
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
            gap: 3,
            maxWidth: '1000px',
            mx: 'auto'
          }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Box
                key={index}
                onClick={() => scrollToSection(feature.sectionId)}
                sx={{
                  bgcolor: '#fafafa',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderLeft: '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    borderLeftColor: '#e74c3c',
                    bgcolor: '#ffffff'
                  }
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    border: '2px solid #e74c3c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <IconComponent sx={{ fontSize: 32, color: '#e74c3c' }} />
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 2
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    color: 'text.secondary',
                    lineHeight: 1.7
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Emergency Notice */}
        <Box
          sx={{
            mt: 8,
            p: 3,
            bgcolor: 'rgba(231, 76, 60, 0.05)',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'rgba(231, 76, 60, 0.2)',
            borderLeft: '3px solid #e74c3c',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#e74c3c',
              mb: 1
            }}
          >
             Trường Hợp Khẩn Cấp
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Inter', sans-serif",
              color: 'text.primary'
            }}
          >
            Vui lòng gọi <strong style={{ color: '#e74c3c' }}>115</strong> hoặc đến ngay cơ sở y tế gần nhất
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
