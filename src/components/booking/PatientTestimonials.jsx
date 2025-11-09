import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Mock data - Backend will provide via API
const patientReviews = [
  {
    id: 1,
    patientName: 'Nguyễn Thị Lan',
    patientRole: 'Giáo viên tiểu học',
    rating: 5,
    date: '15/10/2025',
    comment: 'Tôi rất hài lòng với dịch vụ khám chữa bệnh tại đây. Bác sĩ tận tâm, chu đáo và luôn lắng nghe. Phòng khám sạch sẽ, hiện đại. Tôi sẽ tiếp tục sử dụng dịch vụ.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    treatment: 'Khám nội tổng quát'
  },
  {
    id: 2,
    patientName: 'Trần Văn Minh',
    patientRole: 'Kỹ sư xây dựng',
    rating: 5,
    date: '12/10/2025',
    comment: 'Dịch vụ tuyệt vời! Bác sĩ rất chuyên nghiệp và giải thích rõ ràng về tình trạng bệnh. Hệ thống đặt lịch online rất tiện lợi, không phải chờ đợi lâu.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    treatment: 'Khám tim mạch'
  },
  {
    id: 3,
    patientName: 'Phạm Thị Hương',
    patientRole: 'Nhân viên văn phòng',
    rating: 4.5,
    date: '10/10/2025',
    comment: 'Rất hài lòng với dịch vụ chăm sóc sức khỏe. Bác sĩ luôn lắng nghe và giải đáp mọi thắc mắc. Thời gian chờ đợi ngắn và quy trình khám bệnh rất chuyên nghiệp.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    treatment: 'Khám da liễu'
  },
  {
    id: 4,
    patientName: 'Lê Văn Hùng',
    patientRole: 'Doanh nhân',
    rating: 5,
    date: '08/10/2025',
    comment: 'Tôi rất ấn tượng với chất lượng dịch vụ. Đội ngũ y tế chuyên nghiệp, cơ sở vật chất hiện đại. Chắc chắn sẽ giới thiệu cho bạn bè và người thân.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    treatment: 'Khám tim mạch'
  },
  {
    id: 5,
    patientName: 'Võ Thị Mai',
    patientRole: 'Y tá',
    rating: 5,
    date: '05/10/2025',
    comment: 'Là người làm việc trong ngành y, tôi đánh giá cao chất lượng khám chữa bệnh ở đây. Bác sĩ giỏi chuyên môn, thái độ tốt. Phòng khám đạt chuẩn y tế cao.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
    treatment: 'Khám sức khỏe định kỳ'
  },
  {
    id: 6,
    patientName: 'Đặng Văn Tuấn',
    patientRole: 'Lập trình viên',
    rating: 4.5,
    date: '03/10/2025',
    comment: 'Dịch vụ khám online rất tiện, không mất thời gian di chuyển. Bác sĩ tư vấn nhiệt tình qua video call. Đơn thuốc được gửi về nhà nhanh chóng.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    treatment: 'Tư vấn sức khỏe trực tuyến'
  },
  {
    id: 7,
    patientName: 'Hoàng Thị Thúy',
    patientRole: 'Kế toán',
    rating: 5,
    date: '01/10/2025',
    comment: 'Tôi đã khám cho cả gia đình tại đây. Bác sĩ nhi khoa rất yêu trẻ, con tôi không sợ khám bệnh nữa. Giá cả hợp lý, dịch vụ tốt.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    treatment: 'Khám nhi khoa'
  },
  {
    id: 8,
    patientName: 'Bùi Văn Nam',
    patientRole: 'Chủ doanh nghiệp',
    rating: 4.5,
    date: '28/09/2025',
    comment: 'Phòng khám có đầy đủ trang thiết bị hiện đại. Kết quả xét nghiệm nhanh, chính xác. Bác sĩ tư vấn chi tiết về phương án điều trị. Rất hài lòng!',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    treatment: 'Khám tổng quát VIP'
  }
];

const ReviewCard = ({ review }) => {
  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        border: '1px solid',
        borderColor: 'divider',
        borderLeft: '3px solid',
        borderLeftColor: 'transparent',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          borderLeftColor: 'secondary.main',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Reviewer Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
          <Avatar
            src={review.image}
            sx={{
              width: 56,
              height: 56,
              border: '2px solid',
              borderColor: 'divider',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 700, 
                mb: 0.5, 
                fontSize: '1rem',
                color: 'text.primary'
              }}
            >
              {review.patientName}
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                mb: 0.5, 
                display: 'block', 
                fontSize: '0.8rem' 
              }}
            >
              {review.patientRole}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating 
                value={review.rating} 
                precision={0.5} 
                size="small" 
                readOnly 
                sx={{ 
                  fontSize: '1rem',
                  '& .MuiRating-iconFilled': {
                    color: '#f39c12'
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                {review.date}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Review Content */}
        <Box
          sx={{
            position: 'relative',
            pl: 2.5,
            mb: 2.5,
            '&::before': {
              content: '"""',
              position: 'absolute',
              left: 0,
              top: -8,
              fontSize: 32,
              color: 'secondary.main',
              opacity: 0.2,
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700
            }
          }}
        >
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {review.comment}
          </Typography>
        </Box>

        {/* Treatment Info */}
        <Box
          sx={{
            p: 1.5,
            bgcolor: 'rgba(231, 76, 60, 0.04)',
            borderRadius: 1,
            borderLeft: '3px solid',
            borderLeftColor: 'secondary.main'
          }}
        >
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ 
              display: 'block', 
              mb: 0.3, 
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600
            }}
          >
            Dịch vụ sử dụng
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600, 
              color: 'secondary.main', 
              fontSize: '0.9rem' 
            }}
          >
            {review.treatment}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function PatientTestimonials() {
  const scrollContainerRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const targetScroll = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  React.useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3 } }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
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
          ĐÁNH GIÁ
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: 'text.primary',
            mb: 1,
            fontSize: { xs: '1.75rem', md: '2.25rem' }
          }}
        >
          Phản Hồi Của Bệnh Nhân
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}
        >
          Những trải nghiệm thực tế từ bệnh nhân về dịch vụ
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', px: { xs: 5, md: 6 } }}>
        {/* Left Arrow */}
        <IconButton
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          sx={{
            position: 'absolute',
            left: { xs: 0, md: -4 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            width: 40,
            height: 40,
            '&:hover': {
              bgcolor: 'secondary.main',
              borderColor: 'secondary.main',
              color: 'white'
            },
            '&:disabled': {
              opacity: 0.3,
              bgcolor: 'background.paper'
            }
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        {/* Scrollable Container */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            py: 2
          }}
        >
          {patientReviews.map((review) => (
            <Box
              key={review.id}
              sx={{
                minWidth: {
                  xs: '85%',
                  sm: '320px',
                  md: '340px'
                },
                maxWidth: {
                  xs: '85%',
                  sm: '320px',
                  md: '340px'
                },
                flexShrink: 0
              }}
            >
              <ReviewCard review={review} />
            </Box>
          ))}
        </Box>

        {/* Right Arrow */}
        <IconButton
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          sx={{
            position: 'absolute',
            right: { xs: 0, md: -4 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            width: 40,
            height: 40,
            '&:hover': {
              bgcolor: 'secondary.main',
              borderColor: 'secondary.main',
              color: 'white'
            },
            '&:disabled': {
              opacity: 0.3,
              bgcolor: 'background.paper'
            }
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
