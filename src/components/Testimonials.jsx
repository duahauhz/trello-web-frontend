import React, { useState } from "react";
import { Box, Container, Typography, Card, CardContent, Avatar, IconButton, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const reviews = [
  {
    id: 1,
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face",
    text: "Người già là kho tàng kinh nghiệm quý báu của gia đình và xã hội. Họ từng trải qua nhiều biến cố, tích lũy được kiến thức và bài học sống. Tuy nhiên, tuổi già cũng đi kèm với sức khỏe giảm sút, cần sự quan tâm và chăm sóc tận tình từ con cháu.",
    name: "Jessie Owner",
    role: "Founder, XYZ Company",
    rating: 5
  },
  {
    id: 2,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    text: "Cuộc sống của người già thường gắn liền với sự cô đơn khi con cháu bận rộn. Vì vậy, việc trò chuyện, lắng nghe họ mỗi ngày mang lại niềm vui tinh thần to lớn. Chỉ những cử chỉ nhỏ như hỏi thăm, dắt đi dạo cũng giúp họ cảm thấy hạnh phúc.",
    name: "Maria Garcia",
    role: "Healthcare Specialist",
    rating: 5
  },
  {
    id: 3,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
    text: "Trong xã hội hiện đại, nhu cầu chăm sóc sức khỏe và hỗ trợ tinh thần cho người cao tuổi ngày càng được chú trọng. Các trung tâm dưỡng lão, câu lạc bộ người già hay hoạt động cộng đồng là cầu nối giúp họ gắn kết, sống vui vẻ, có thêm động lực.",
    name: "David Chen",
    role: "Senior Care Director",
    rating: 5
  },
  {
    id: 4,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    text: "Dịch vụ chăm sóc người cao tuổi tại đây thực sự tuyệt vời. Đội ngũ nhân viên chuyên nghiệp, tận tâm và luôn quan tâm đến từng chi tiết nhỏ nhất. Gia đình tôi hoàn toàn yên tâm khi gửi gắm người thân ở đây.",
    name: "Lisa Thompson",
    role: "Family Member",
    rating: 5
  },
  {
    id: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    text: "Môi trường ở đây rất ấm cúng và thân thiện. Các hoạt động được tổ chức đa dạng, giúp người cao tuổi có cuộc sống vui vẻ và ý nghĩa. Tôi rất hài lòng với chất lượng dịch vụ.",
    name: "Robert Wilson",
    role: "Senior Resident",
    rating: 5
  },
  {
    id: 6,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    text: "Sự chăm sóc và quan tâm từ đội ngũ nhân viên làm tôi cảm thấy như đang ở nhà. Họ không chỉ chăm sóc sức khỏe mà còn lắng nghe và chia sẻ, tạo nên một môi trường sống thật sự ấm áp.",
    name: "Emily Rodriguez",
    role: "Satisfied Customer",
    rating: 5
  }
];

const NavigationButton = styled(IconButton)(({ theme }) => ({
  border: '2px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    transform: 'scale(1.1)'
  },
  '&:disabled': {
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.grey[100],
    opacity: 0.5
  }
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'visible',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '0%',
    backgroundColor: theme.palette.secondary.main,
    transition: 'height 0.3s ease'
  },
  '&:hover::before': {
    height: '100%'
  }
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  fontSize: 48,
  color: theme.palette.grey[200],
  opacity: 0.5,
  transform: 'rotate(180deg)'
}));

export default function TestimonialsCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + itemsPerPage < reviews.length;

  const nextSlide = () => {
    if (canGoNext) {
      setStartIndex(prev => prev + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (canGoPrev) {
      setStartIndex(prev => prev - itemsPerPage);
    }
  };

  const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage);
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
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
            ĐÁNH GIÁ KHÁCH HÀNG
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
            Họ nói gì về chúng tôi
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
            Những phản hồi chân thật từ khách hàng và gia đình đã tin tưởng sử dụng dịch vụ của chúng tôi
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', px: { xs: 0, md: 6 } }}>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <NavigationButton
              onClick={prevSlide}
              disabled={!canGoPrev}
              sx={{
                position: 'absolute',
                left: -24,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10
              }}
            >
              <ArrowBackIcon />
            </NavigationButton>

            <NavigationButton
              onClick={nextSlide}
              disabled={!canGoNext}
              sx={{
                position: 'absolute',
                right: -24,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10
              }}
            >
              <ArrowForwardIcon />
            </NavigationButton>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: 3
            }}
          >
            {currentReviews.map((review) => (
              <TestimonialCard key={review.id}>
                <QuoteIcon />
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      src={review.avatar}
                      alt={review.name}
                      sx={{
                        width: 64,
                        height: 64,
                        border: '3px solid',
                        borderColor: 'divider'
                      }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {review.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {review.role}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: 'text.primary',
                      lineHeight: 1.8,
                      mb: 3,
                      flex: 1,
                      fontStyle: 'italic'
                    }}
                  >
                    &ldquo;{review.text}&rdquo;
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Rating 
                      value={review.rating} 
                      readOnly 
                      size="small"
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: 'accent.main'
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {review.rating}.0
                    </Typography>
                  </Box>
                </CardContent>
              </TestimonialCard>
            ))}
          </Box>

          <Box 
            sx={{ 
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
              gap: 2,
              mt: 3
            }}
          >
            <NavigationButton onClick={prevSlide} disabled={!canGoPrev}>
              <ArrowBackIcon />
            </NavigationButton>
            <NavigationButton onClick={nextSlide} disabled={!canGoNext}>
              <ArrowForwardIcon />
            </NavigationButton>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 1,
              mt: 4
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <Box
                key={i}
                onClick={() => setStartIndex(i * itemsPerPage)}
                sx={{
                  width: i === currentPage ? 32 : 12,
                  height: 12,
                  borderRadius: '6px',
                  bgcolor: i === currentPage ? 'secondary.main' : 'grey.300',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: i === currentPage ? 'secondary.dark' : 'grey.400'
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              px: 3,
              py: 1.5,
              bgcolor: 'background.paper',
              borderRadius: '50px',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'text.primary',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'background.paper'
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
                SC
              </Typography>
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                fontFamily: '"Playfair Display", serif',
                color: 'text.primary'
              }}
            >
              SeniorCare
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
