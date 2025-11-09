import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    id: 1,
    question: "Làm thế nào để đặt lịch khám với bác sĩ?",
    answer: "Bạn có thể đặt lịch khám bằng cách truy cập trang Đặt lịch khám, chọn chuyên khoa, chọn bác sĩ và thời gian phù hợp. Sau đó điền thông tin và xác nhận đặt lịch."
  },
  {
    id: 2,
    question: "Tôi có thể hủy hoặc thay đổi lịch hẹn không?",
    answer: "Có, bạn có thể hủy hoặc thay đổi lịch hẹn trước 24 giờ. Vui lòng truy cập phần Quản lý lịch hẹn trong tài khoản của bạn để thực hiện thay đổi."
  },
  {
    id: 3,
    question: "Chi phí khám chữa bệnh như thế nào?",
    answer: "Chi phí khám tùy thuộc vào chuyên khoa và bác sĩ. Bạn có thể xem chi phí dự kiến khi đặt lịch. Chúng tôi chấp nhận thanh toán bằng tiền mặt, thẻ, và bảo hiểm y tế."
  },
  {
    id: 4,
    question: "Tôi có thể sử dụng bảo hiểm y tế không?",
    answer: "Có, chúng tôi chấp nhận hầu hết các loại bảo hiểm y tế. Vui lòng mang theo thẻ bảo hiểm và giấy tờ liên quan khi đến khám."
  },
  {
    id: 5,
    question: "Làm thế nào để xem kết quả xét nghiệm?",
    answer: "Kết quả xét nghiệm sẽ được cập nhật vào tài khoản của bạn trong vòng 24-48 giờ. Bạn có thể đăng nhập để xem và tải xuống kết quả."
  },
  {
    id: 6,
    question: "Tôi cần chuẩn bị gì khi đến khám?",
    answer: "Vui lòng mang theo CMND/CCCD, thẻ bảo hiểm y tế (nếu có), và các kết quả xét nghiệm/khám bệnh trước đó liên quan đến tình trạng sức khỏe hiện tại."
  },
  {
    id: 7,
    question: "Thời gian chờ khám trung bình là bao lâu?",
    answer: "Với lịch hẹn đã đặt trước, thời gian chờ trung bình là 10-15 phút. Chúng tôi luôn cố gắng đúng giờ để tôn trọng thời gian của bạn."
  },
  {
    id: 8,
    question: "Tôi có thể tư vấn sức khỏe trực tuyến không?",
    answer: "Có, chúng tôi cung cấp dịch vụ tư vấn trực tuyến với AI Companion và các bác sĩ. Bạn có thể đặt lịch tư vấn trực tuyến qua trang web."
  }
];

export default function FAQSection() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
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
            CÂU HỎI THƯỜNG GẶP
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
            Giải đáp thắc mắc
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.8
            }}
          >
            Tìm câu trả lời nhanh chóng cho các câu hỏi phổ biến về dịch vụ của chúng tôi
          </Typography>
        </Box>

        {/* FAQ Accordion */}
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion
              key={faq.id}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              elevation={0}
              sx={{
                mb: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderLeft: '3px solid',
                borderLeftColor: expanded === `panel${index}` ? 'secondary.main' : 'transparent',
                borderRadius: '8px !important',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:before': {
                  display: 'none'
                },
                '&:hover': {
                  borderLeftColor: 'secondary.main',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon 
                    sx={{ 
                      color: expanded === `panel${index}` ? 'secondary.main' : 'text.secondary',
                      transition: 'color 0.3s'
                    }} 
                  />
                }
                sx={{
                  py: 2,
                  px: 3,
                  '& .MuiAccordionSummary-content': {
                    my: 1
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: expanded === `panel${index}` ? 'secondary.main' : 'text.secondary',
                      minWidth: 40,
                      transition: 'color 0.3s'
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 600,
                      color: 'text.primary',
                      fontSize: '1.1rem'
                    }}
                  >
                    {faq.question}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 3,
                  pb: 3,
                  pt: 0,
                  pl: 10
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Contact CTA */}
        <Paper
          elevation={0}
          sx={{
            mt: 6,
            p: 4,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: '#fafafa'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              mb: 1
            }}
          >
            Không tìm thấy câu trả lời?
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 0
            }}
          >
            Vui lòng liên hệ với chúng tôi qua form bên dưới hoặc chat trực tuyến
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
