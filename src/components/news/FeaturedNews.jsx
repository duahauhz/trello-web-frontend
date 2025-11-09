import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function FeaturedNews({ onArticleClick }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef(null);

  // Categories
  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'health', label: 'Sức khỏe' },
    { id: 'medical', label: 'Y khoa' },
    { id: 'nutrition', label: 'Dinh dưỡng' },
    { id: 'lifestyle', label: 'Lối sống' }
  ];

  // Mock data - Tin nổi bật
  const featuredNews = [
    {
      id: 1,
      title: '10 Thói Quen Tốt Cho Tim Mạch Mà Bạn Nên Biết',
      category: 'health',
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=500&fit=crop',
      excerpt: 'Khám phá những thói quen đơn giản giúp bảo vệ và tăng cường sức khỏe tim mạch của bạn...',
      date: '14/10/2025',
      views: 1234,
      content: `
        <h2>10 Thói Quen Tốt Cho Tim Mạch</h2>
        <p>Tim mạch là cơ quan quan trọng nhất của cơ thể, việc chăm sóc tim mạch là điều cần thiết để có một cuộc sống khỏe mạnh.</p>
        
        <h3>1. Tập thể dục đều đặn</h3>
        <p>Tập thể dục ít nhất 30 phút mỗi ngày giúp tăng cường tim mạch, cải thiện tuần hoàn máu và giảm nguy cơ mắc bệnh tim.</p>
        
        <h3>2. Ăn uống lành mạnh</h3>
        <p>Chế độ ăn giàu trái cây, rau xanh, ngũ cốc nguyên hạt và protein nạc giúp duy trì sức khỏe tim mạch tốt.</p>
        
        <h3>3. Kiểm soát cân nặng</h3>
        <p>Duy trì cân nặng hợp lý giúp giảm gánh nặng cho tim và giảm nguy cơ các bệnh tim mạch.</p>
        
        <h3>4. Giảm căng thẳng</h3>
        <p>Học cách quản lý căng thẳng thông qua thiền, yoga, hoặc các hoạt động thư giãn khác.</p>
        
        <h3>5. Ngủ đủ giấc</h3>
        <p>Ngủ 7-8 tiếng mỗi đêm giúp tim nghỉ ngơi và phục hồi.</p>
        
        <h3>6. Hạn chế rượu bia</h3>
        <p>Uống rượu bia vừa phải hoặc tốt nhất là không uống để bảo vệ tim mạch.</p>
        
        <h3>7. Bỏ thuốc lá</h3>
        <p>Hút thuốc là một trong những yếu tố nguy cơ lớn nhất gây bệnh tim mạch.</p>
        
        <h3>8. Kiểm tra sức khỏe định kỳ</h3>
        <p>Khám sức khỏe định kỳ để phát hiện sớm các vấn đề về tim mạch.</p>
        
        <h3>9. Kiểm soát huyết áp</h3>
        <p>Theo dõi và duy trì huyết áp ở mức bình thường.</p>
        
        <h3>10. Duy trì mối quan hệ xã hội tốt</h3>
        <p>Có mối quan hệ xã hội tốt giúp giảm stress và cải thiện sức khỏe tim mạch.</p>
      `
    },
    {
      id: 2,
      title: 'Chế Độ Dinh Dưỡng Khoa Học Cho Người Tiểu Đường',
      category: 'nutrition',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop',
      excerpt: 'Hướng dẫn chi tiết về chế độ ăn uống phù hợp giúp kiểm soát đường huyết hiệu quả...',
      date: '13/10/2025',
      views: 987,
      content: `
        <h2>Chế Độ Dinh Dưỡng Cho Người Tiểu Đường</h2>
        <p>Chế độ ăn uống đóng vai trò quan trọng trong việc kiểm soát bệnh tiểu đường.</p>
        
        <h3>Nguyên tắc cơ bản</h3>
        <p>- Ăn đủ bữa, đúng giờ<br/>
        - Kiểm soát lượng carbohydrate<br/>
        - Tăng cường chất xơ<br/>
        - Hạn chế đường và chất béo bão hòa</p>
        
        <h3>Thực phẩm nên ăn</h3>
        <p>- Rau xanh<br/>
        - Ngũ cốc nguyên hạt<br/>
        - Protein nạc<br/>
        - Trái cây ít đường</p>
      `
    },
    {
      id: 3,
      title: 'Phòng Ngừa Đột Quỵ: Những Điều Cần Biết',
      category: 'medical',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
      excerpt: 'Tìm hiểu các dấu hiệu cảnh báo và biện pháp phòng ngừa đột quỵ hiệu quả...',
      date: '12/10/2025',
      views: 1456,
      content: `
        <h2>Phòng Ngừa Đột Quỵ</h2>
        <p>Đột quỵ là một trong những nguyên nhân gây tử vong hàng đầu. Việc nhận biết sớm và phòng ngừa là vô cùng quan trọng.</p>
        
        <h3>Dấu hiệu cảnh báo</h3>
        <p>- Yếu hoặc tê mặt, tay, chân đột ngột<br/>
        - Lú lẫn, khó nói hoặc khó hiểu<br/>
        - Nhìn mờ một hoặc hai mắt<br/>
        - Chóng mặt, mất thăng bằng<br/>
        - Đau đầu dữ dội đột ngột</p>
        
        <h3>Biện pháp phòng ngừa</h3>
        <p>- Kiểm soát huyết áp<br/>
        - Tập thể dục thường xuyên<br/>
        - Ăn uống lành mạnh<br/>
        - Bỏ thuốc lá<br/>
        - Kiểm tra sức khỏe định kỳ</p>
      `
    },
    {
      id: 4,
      title: 'Tầm Quan Trọng Của Giấc Ngủ Đối Với Sức Khỏe',
      category: 'lifestyle',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=500&fit=crop',
      excerpt: 'Giấc ngủ chất lượng là chìa khóa cho sức khỏe toàn diện. Tìm hiểu cách cải thiện giấc ngủ...',
      date: '11/10/2025',
      views: 823,
      content: `
        <h2>Giấc Ngủ Và Sức Khỏe</h2>
        <p>Giấc ngủ đủ và chất lượng là nền tảng cho sức khỏe thể chất và tinh thần.</p>
        
        <h3>Lợi ích của giấc ngủ tốt</h3>
        <p>- Tăng cường hệ miễn dịch<br/>
        - Cải thiện trí nhớ và tập trung<br/>
        - Giảm stress và lo âu<br/>
        - Hỗ trợ kiểm soát cân nặng<br/>
        - Giảm nguy cơ bệnh tim mạch</p>
        
        <h3>Mẹo cải thiện giấc ngủ</h3>
        <p>- Đi ngủ và thức dậy đúng giờ<br/>
        - Tạo môi trường ngủ thoải mái<br/>
        - Tránh caffeine trước khi ngủ<br/>
        - Hạn chế sử dụng thiết bị điện tử<br/>
        - Thư giãn trước khi ngủ</p>
      `
    }
  ];

  // Filter by category
  const filteredNews = selectedCategory === 'all' 
    ? featuredNews 
    : featuredNews.filter(news => news.category === selectedCategory);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  // Scroll handlers with pagination
  const scrollLeft = () => {
    const container = scrollRef.current;
    if (container) {
      const newPage = Math.max(0, currentPage - 1);
      setCurrentPage(newPage);
      container.scrollTo({
        left: newPage * container.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    if (container) {
      const newPage = Math.min(totalPages - 1, currentPage + 1);
      setCurrentPage(newPage);
      container.scrollTo({
        left: newPage * container.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const goToPage = (pageIndex) => {
    const container = scrollRef.current;
    if (container) {
      setCurrentPage(pageIndex);
      container.scrollTo({
        left: pageIndex * container.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box sx={{ mb: 8 }} id="featured-news">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
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
            TIN NỔI BẬT
          </Typography>
          <Typography 
            variant="h3"
            sx={{ 
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: 'text.primary',
              mb: 1
            }}
          >
            Tin Tức Trong Ngày
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.8
            }}
          >
            Cập nhật tin tức y tế và sức khỏe mới nhất
          </Typography>
        </Box>

        {/* Category Filter */}
        <Tabs 
          value={selectedCategory} 
          onChange={(e, newValue) => setSelectedCategory(newValue)}
          centered
          sx={{ 
            borderBottom: '1px solid',
            borderColor: 'divider',
            '& .MuiTab-root': {
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.95rem',
              textTransform: 'none',
              '&.Mui-selected': {
                color: 'secondary.main'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'secondary.main',
              height: 3
            }
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map(cat => (
            <Tab key={cat.id} value={cat.id} label={cat.label} />
          ))}
        </Tabs>
      </Box>

      {/* News Cards Container với Navigation */}
      <Box sx={{ position: 'relative' }}>
        {/* Navigation Buttons */}
        {currentPage > 0 && (
          <IconButton 
            onClick={scrollLeft}
            sx={{ 
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'white',
              boxShadow: 3,
              '&:hover': { bgcolor: 'grey.100', boxShadow: 6 },
              width: 48,
              height: 48
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
        
        {currentPage < totalPages - 1 && (
          <IconButton 
            onClick={scrollRight}
            sx={{ 
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'white',
              boxShadow: 3,
              '&:hover': { bgcolor: 'grey.100', boxShadow: 6 },
              width: 48,
              height: 48
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}

        {/* News Cards - Horizontal Scroll */}
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            pb: 2
          }}
        >
          {filteredNews.map(news => (
            <Card
              key={news.id}
              sx={{
                minWidth: 320,
                maxWidth: 320,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid',
                borderColor: 'divider',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '0%',
                  bgcolor: 'secondary.main',
                  transition: 'height 0.3s ease',
                  zIndex: 1
                },
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  borderColor: 'secondary.main',
                  '&::before': {
                    height: '100%'
                  }
                }
              }}
              onClick={() => onArticleClick(news)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={news.image}
                  alt={news.title}
                  sx={{ objectFit: 'cover' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12
                  }}
                >
                  <Chip 
                    label={categories.find(c => c.id === news.category)?.label} 
                    size="small"
                    sx={{ 
                      bgcolor: 'secondary.main',
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                </Box>
              </Box>
              <CardContent sx={{ p: 2.5 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1, 
                    minHeight: 56,
                    fontSize: '1rem',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    color: 'text.primary'
                  }}
                >
                  {news.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2, 
                    minHeight: 48,
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {news.excerpt}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  pt: 1.5, 
                  borderTop: '1px solid', 
                  borderColor: 'divider' 
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                      {news.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <VisibilityIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                      {news.views}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Dots Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Box
              key={index}
              onClick={() => goToPage(index)}
              sx={{
                width: currentPage === index ? 32 : 10,
                height: 10,
                borderRadius: 5,
                bgcolor: currentPage === index ? 'secondary.main' : 'grey.300',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: currentPage === index ? 'secondary.dark' : 'grey.400'
                }
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
