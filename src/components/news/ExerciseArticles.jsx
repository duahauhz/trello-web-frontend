import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimerIcon from '@mui/icons-material/Timer';

export default function ExerciseArticles({ onArticleClick }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const scrollRef = useRef(null);

  // Difficulty filters
  const difficulties = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Dễ', label: 'Dễ' },
    { id: 'Trung bình', label: 'Trung bình' },
    { id: 'Khó', label: 'Khó' }
  ];
  // Mock data - Bài tập phục hồi
  const exerciseArticles = [
    {
      id: 5,
      title: 'Bài Tập Phục Hồi Chức Năng Sau Phẫu Thuật Gối',
      image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=500&fit=crop',
      excerpt: 'Các bài tập giúp phục hồi chức năng vận động và giảm đau sau phẫu thuật...',
      duration: '15-20 phút',
      difficulty: 'Dễ',
      content: `
        <h2>Bài Tập Phục Hồi Sau Phẫu Thuật Gối</h2>
        <p>Sau phẫu thuật gối, việc phục hồi chức năng là rất quan trọng để lấy lại khả năng vận động bình thường.</p>
        
        <h3>Tuần 1-2: Giai đoạn đầu</h3>
        <p><strong>Bài 1: Duỗi gối thụ động</strong><br/>
        - Nằm ngửa, đặt gối dưới đầu gối<br/>
        - Từ từ duỗi thẳng gối, giữ 5-10 giây<br/>
        - Thực hiện 10-15 lần, 3 hiệp/ngày</p>
        
        <p><strong>Bài 2: Co duỗi cổ chân</strong><br/>
        - Nằm ngửa hoặc ngồi<br/>
        - Co và duỗi cổ chân<br/>
        - 20-30 lần, 3 hiệp/ngày</p>
        
        <h3>Tuần 3-4: Tăng cường</h3>
        <p><strong>Bài 3: Nâng chân thẳng</strong><br/>
        - Nằm ngửa, một chân duỗi thẳng<br/>
        - Nâng chân lên 15-20cm, giữ 5 giây<br/>
        - 10-15 lần, 2-3 hiệp/ngày</p>
        
        <p><strong>Bài 4: Uốn gối có hỗ trợ</strong><br/>
        - Ngồi trên ghế<br/>
        - Từ từ uốn gối về phía sau<br/>
        - 10-15 lần, 2 hiệp/ngày</p>
        
        <h3>Lưu ý quan trọng</h3>
        <p>- Không vội vàng, tập từ từ<br/>
        - Dừng ngay nếu đau nhiều<br/>
        - Tham khảo ý kiến bác sĩ trước khi tập</p>
      `
    },
    {
      id: 6,
      title: 'Yoga Trị Liệu Cho Đau Lưng Mãn Tính',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
      excerpt: 'Những tư thế yoga giúp giảm đau và tăng cường sức mạnh cột sống...',
      duration: '20-30 phút',
      difficulty: 'Trung bình',
      content: `
        <h2>Yoga Cho Đau Lưng Mãn Tính</h2>
        <p>Yoga là phương pháp hiệu quả giúp giảm đau lưng và cải thiện độ linh hoạt.</p>
        
        <h3>Tư thế 1: Con mèo - Con bò (Cat-Cow)</h3>
        <p>- Quỳ gối, tay chống đất<br/>
        - Hít vào, võng lưng xuống (Con bò)<br/>
        - Thở ra, gù lưng lên (Con mèo)<br/>
        - Lặp lại 10-15 lần</p>
        
        <h3>Tư thế 2: Tư thế em bé (Child's Pose)</h3>
        <p>- Quỳ gối, ngồi lên gót chân<br/>
        - Cúi người về phía trước, tay duỗi thẳng<br/>
        - Giữ 1-3 phút, thở đều</p>
        
        <h3>Tư thế 3: Xoắn nằm (Supine Twist)</h3>
        <p>- Nằm ngửa, gập hai gối<br/>
        - Đổ hai gối sang một bên<br/>
        - Giữ 1-2 phút mỗi bên</p>
        
        <h3>Lợi ích</h3>
        <p>- Giảm căng cơ lưng<br/>
        - Tăng độ linh hoạt<br/>
        - Cải thiện tư thế<br/>
        - Giảm stress</p>
      `
    },
    {
      id: 7,
      title: 'Bài Tập Hô Hấp Cải Thiện Chức Năng Phổi',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop',
      excerpt: 'Phương pháp rèn luyện hô hấp giúp tăng cường sức khỏe phổi...',
      duration: '10-15 phút',
      difficulty: 'Dễ',
      content: `
        <h2>Bài Tập Hô Hấp</h2>
        <p>Luyện tập hô hấp đúng cách giúp tăng cường sức khỏe phổi và cải thiện hệ hô hấp.</p>
        
        <h3>Bài 1: Thở bụng sâu</h3>
        <p>- Ngồi hoặc nằm thoải mái<br/>
        - Một tay trên bụng, một tay trên ngực<br/>
        - Hít sâu qua mũi, bụng phồng lên<br/>
        - Thở ra chậm qua miệng<br/>
        - Lặp lại 5-10 phút</p>
        
        <h3>Bài 2: Thở môi chu</h3>
        <p>- Hít vào qua mũi (đếm đến 2)<br/>
        - Thở ra qua môi chu (đếm đến 4)<br/>
        - Lặp lại 5-10 lần</p>
        
        <h3>Bài 3: Thở 4-7-8</h3>
        <p>- Hít vào đếm đến 4<br/>
        - Nín thở đếm đến 7<br/>
        - Thở ra đếm đến 8<br/>
        - Lặp lại 4-5 lần</p>
        
        <h3>Lợi ích</h3>
        <p>- Tăng dung tích phổi<br/>
        - Cải thiện oxy hóa máu<br/>
        - Giảm căng thẳng<br/>
        - Tăng cường năng lượng</p>
      `
    },
    {
      id: 8,
      title: 'Vật Lý Trị Liệu Cho Tai Biến Mạch Máu Não',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop',
      excerpt: 'Chương trình phục hồi chức năng toàn diện cho bệnh nhân sau đột quỵ...',
      duration: '30-45 phút',
      difficulty: 'Trung bình - Khó',
      content: `
        <h2>Vật Lý Trị Liệu Sau Đột Quỵ</h2>
        <p>Phục hồi chức năng vận động sau đột quỵ đòi hỏi sự kiên trì và hướng dẫn chuyên nghiệp.</p>
        
        <h3>Giai đoạn 1: Vận động thụ động</h3>
        <p><strong>Tuần 1-2</strong><br/>
        - Vận động các khớp bằng sự hỗ trợ<br/>
        - Phòng teo cơ và cứng khớp<br/>
        - Mỗi khớp 5-10 lần, 2-3 lần/ngày</p>
        
        <h3>Giai đoạn 2: Vận động chủ động</h3>
        <p><strong>Tuần 3-4</strong><br/>
        - Bắt đầu tự vận động<br/>
        - Nâng tay, chân nhẹ nhàng<br/>
        - Tập cầm nắm vật nhỏ</p>
        
        <h3>Giai đoạn 3: Tăng cường</h3>
        <p><strong>Tháng 2-3</strong><br/>
        - Luyện tập đi lại<br/>
        - Tập thăng bằng<br/>
        - Vận động phối hợp</p>
        
        <h3>Giai đoạn 4: Phục hồi chức năng</h3>
        <p><strong>Tháng 3-6</strong><br/>
        - Luyện tập các hoạt động sinh hoạt<br/>
        - Cải thiện vận động tinh<br/>
        - Tăng cường sức mạnh cơ</p>
        
        <h3>Lưu ý</h3>
        <p>- Cần sự hướng dẫn của chuyên gia<br/>
        - Kiên trì luyện tập<br/>
        - Không vội vàng, tăng dần cường độ</p>
      `
    }
  ];

  // Filter articles by difficulty
  const filteredArticles = selectedDifficulty === 'all' 
    ? exerciseArticles 
    : exerciseArticles.filter(article => article.difficulty.includes(selectedDifficulty));

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

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
    <Box sx={{ mb: 8 }} id="exercise-articles">
      {/* Header với gradient background */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
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
            💪 Bài Tập Phục Hồi Chức Năng
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.95, mb: 3 }}>
            Hướng dẫn các bài tập phục hồi và cải thiện sức khỏe
          </Typography>

          {/* Difficulty Filter */}
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {difficulties.map((difficulty) => (
              <Chip
                key={difficulty.id}
                label={difficulty.label}
                onClick={() => {
                  setSelectedDifficulty(difficulty.id);
                  setCurrentPage(0);
                }}
                sx={{
                  bgcolor: selectedDifficulty === difficulty.id 
                    ? 'rgba(255,255,255,0.3)' 
                    : 'rgba(255,255,255,0.15)',
                  color: 'white',
                  fontWeight: selectedDifficulty === difficulty.id ? 700 : 500,
                  border: selectedDifficulty === difficulty.id 
                    ? '2px solid white' 
                    : '2px solid transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.25)'
                  }
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Exercise Cards Container với Navigation */}
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

        {/* Exercise Cards */}
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
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              sx={{
                minWidth: 320,
                maxWidth: 320,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(17, 153, 142, 0.15)',
                border: '1px solid',
                borderColor: 'rgba(17, 153, 142, 0.1)',
                '&:hover': {
                  transform: 'translateY(-12px)',
                  boxShadow: '0 12px 28px rgba(17, 153, 142, 0.25)',
                  borderColor: 'rgba(17, 153, 142, 0.3)'
                }
              }}
              onClick={() => onArticleClick(article)}
            >
              <CardMedia
                component="img"
                height="180"
                image={article.image}
                alt={article.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ p: 2.5 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1.5, 
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
                  {article.title}
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
                  {article.excerpt}
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
                    <TimerIcon sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                      {article.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FitnessCenterIcon sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                      {article.difficulty}
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
                bgcolor: currentPage === index ? 'success.main' : 'grey.300',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: currentPage === index ? 'success.dark' : 'grey.400'
                }
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
