import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  useTheme,
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
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2.5,
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        boxShadow: theme.shadows[1],
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[6],
          borderColor: theme.palette.primary.main
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar
            src={review.image}
            sx={{
              width: 50,
              height: 50,
              border: `2.5px solid ${theme.palette.primary.main}`
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.3, fontSize: '0.95rem' }}>
              {review.patientName}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.3, display: 'block', fontSize: '0.75rem' }}>
              {review.patientRole}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Rating value={review.rating} precision={0.5} size="small" readOnly sx={{ fontSize: '1rem' }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                {review.date}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            pl: 2.5,
            '&::before': {
              content: '"""',
              position: 'absolute',
              left: 0,
              top: -8,
              fontSize: 32,
              color: theme.palette.primary.main,
              opacity: 0.3,
              fontFamily: 'Georgia, serif'
            }
          }}
        >
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.6,
              color: theme.palette.text.secondary,
              mb: 1.5,
              fontStyle: 'italic',
              fontSize: '0.85rem',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {review.comment}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 1.2,
            bgcolor: theme.palette.primary.light + '15',
            borderRadius: 1.5,
            borderLeft: `3px solid ${theme.palette.primary.main}`
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.2, fontSize: '0.7rem' }}>
            Dịch vụ đã sử dụng:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: '0.85rem' }}>
            {review.treatment}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function PatientTestimonials() {
  const theme = useTheme();
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
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: theme.palette.primary.main
          }}
        >
          Phản hồi của bệnh nhân
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
          Những trải nghiệm thật từ bệnh nhân về dịch vụ
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', px: { xs: 4, md: 6 } }}>
        <IconButton
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          sx={{
            position: 'absolute',
            left: { xs: -8, md: -12 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[2],
            width: 36,
            height: 36,
            '&:hover': {
              bgcolor: theme.palette.primary.main,
              color: 'white'
            },
            '&:disabled': {
              opacity: 0.3
            }
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: 2,
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
                  xs: '80%',
                  sm: '300px',
                  md: '320px'
                },
                maxWidth: {
                  xs: '80%',
                  sm: '300px',
                  md: '320px'
                },
                flexShrink: 0
              }}
            >
              <ReviewCard review={review} />
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          sx={{
            position: 'absolute',
            right: { xs: -8, md: -12 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[2],
            width: 36,
            height: 36,
            '&:hover': {
              bgcolor: theme.palette.primary.main,
              color: 'white'
            },
            '&:disabled': {
              opacity: 0.3
            }
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
