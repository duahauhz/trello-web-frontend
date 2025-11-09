import { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function FAQSection() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Mock data - sẽ được thay thế bằng API
  const faqCategories = [
    {
      id: 'booking',
      label: 'Đặt Lịch Khám',
      faqs: [
        {
          id: 'faq1',
          question: 'Làm thế nào để đặt lịch khám bệnh?',
          answer: 'Bạn có thể đặt lịch khám bằng cách vào mục "Đặt Lịch" trên trang chủ, chọn chuyên khoa và bác sĩ phù hợp, sau đó chọn ngày giờ khám. Hệ thống sẽ gửi xác nhận qua email và SMS.'
        },
        {
          id: 'faq2',
          question: 'Tôi có thể hủy hoặc đổi lịch hẹn không?',
          answer: 'Có, bạn có thể hủy hoặc đổi lịch hẹn trong mục "Lịch Hẹn Của Tôi". Vui lòng thực hiện ít nhất 24 giờ trước giờ khám để tránh mất phí.'
        },
        {
          id: 'faq3',
          question: 'Chi phí khám bệnh như thế nào?',
          answer: 'Chi phí khám bệnh phụ thuộc vào chuyên khoa và bác sĩ. Bạn có thể xem chi phí ước tính khi đặt lịch. Chúng tôi chấp nhận thanh toán qua thẻ, chuyển khoản và tiền mặt.'
        }
      ]
    },
    {
      id: 'account',
      label: 'Tài Khoản',
      faqs: [
        {
          id: 'faq4',
          question: 'Làm sao để tạo tài khoản?',
          answer: 'Click vào nút "Đăng Ký" ở góc phải màn hình, điền thông tin cá nhân và email. Bạn sẽ nhận được email xác thực để kích hoạt tài khoản.'
        },
        {
          id: 'faq5',
          question: 'Tôi quên mật khẩu, phải làm sao?',
          answer: 'Click vào "Quên Mật Khẩu" ở trang đăng nhập, nhập email đã đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu vào email của bạn.'
        },
        {
          id: 'faq6',
          question: 'Làm thế nào để cập nhật thông tin cá nhân?',
          answer: 'Đăng nhập vào tài khoản, vào mục "Hồ Sơ" và click "Chỉnh Sửa". Bạn có thể cập nhật tên, số điện thoại, địa chỉ và thông tin bảo hiểm y tế.'
        }
      ]
    },
    {
      id: 'medical',
      label: 'Y Tế',
      faqs: [
        {
          id: 'faq7',
          question: 'Bác sĩ có tư vấn online không?',
          answer: 'Có, chúng tôi cung cấp dịch vụ tư vấn online qua video call với bác sĩ. Bạn có thể đặt lịch tư vấn online trong mục "Tư Vấn Trực Tuyến".'
        },
        {
          id: 'faq8',
          question: 'Làm sao để xem kết quả xét nghiệm?',
          answer: 'Kết quả xét nghiệm sẽ được cập nhật trong mục "Hồ Sơ Y Tế" của bạn. Bạn sẽ nhận thông báo khi kết quả sẵn sàng và có thể tải xuống file PDF.'
        },
        {
          id: 'faq9',
          question: 'Tôi có thể đặt thuốc online không?',
          answer: 'Sau khi bác sĩ kê đơn, bạn có thể đặt thuốc trực tuyến trong mục "Đơn Thuốc". Thuốc sẽ được giao tận nhà trong vòng 2-4 giờ.'
        }
      ]
    },
    {
      id: 'technical',
      label: 'Kỹ Thuật',
      faqs: [
        {
          id: 'faq10',
          question: 'Hệ thống hỗ trợ những trình duyệt nào?',
          answer: 'Hệ thống hoạt động tốt nhất trên Chrome, Firefox, Safari và Edge phiên bản mới nhất. Chúng tôi khuyến nghị cập nhật trình duyệt để có trải nghiệm tốt nhất.'
        },
        {
          id: 'faq11',
          question: 'Dữ liệu của tôi có được bảo mật không?',
          answer: 'Tuyệt đối. Chúng tôi sử dụng mã hóa SSL 256-bit và tuân thủ nghiêm ngặt các quy định về bảo vệ dữ liệu y tế. Thông tin của bạn chỉ được chia sẻ với bác sĩ điều trị.'
        },
        {
          id: 'faq12',
          question: 'Ứng dụng mobile có sẵn chưa?',
          answer: 'Hiện tại chúng tôi đang phát triển ứng dụng mobile cho iOS và Android. Bạn có thể sử dụng phiên bản web trên mobile, được tối ưu hóa cho màn hình nhỏ.'
        }
      ]
    }
  ];

  return (
    <Box sx={{ mb: 12 }} id="faq-section">
      {/* Header */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #00acc1 0%, #0097a7 100%)',
          borderRadius: 4,
          p: 4,
          mb: 4,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(50%, -50%)'
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <HelpOutlineIcon sx={{ fontSize: 32 }} />
            Câu Hỏi Thường Gặp
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.95 }}>
            Tìm câu trả lời nhanh chóng cho các thắc mắc phổ biến
          </Typography>
        </Box>
      </Box>

      {/* FAQ Categories */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        {faqCategories.map((category) => (
          <Chip
            key={category.id}
            label={category.label}
            onClick={() => {
              const element = document.getElementById(`category-${category.id}`);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          />
        ))}
      </Box>

      {/* FAQ Accordion */}
      {faqCategories.map((category) => (
        <Box key={category.id} id={`category-${category.id}`} sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              mb: 2, 
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            📌 {category.label}
          </Typography>
          
          {category.faqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              sx={{
                mb: 1,
                '&:before': { display: 'none' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderRadius: 2,
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: expanded === faq.id ? 'white' : 'inherit' }} />}
                sx={{
                  bgcolor: expanded === faq.id ? 'primary.main' : 'grey.50',
                  '& .MuiAccordionSummary-content': {
                    my: 2
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Typography 
                  sx={{ 
                    fontWeight: 700, 
                    fontSize: '1.05rem',
                    color: expanded === faq.id ? 'white' : 'text.primary'
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: 'white', pt: 2 }}>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ))}
    </Box>
  );
}
