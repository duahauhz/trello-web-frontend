import { Grid, Typography, Card, CardActionArea, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const topics = [
  {
    id: 'health',
    title: 'Trò chuyện về sức khỏe',
    description: 'Trao đổi những thông tin về các vấn đề sức khỏe như: tuổi già, gout ngọc, tim mạch, xương khớp.',
    icon: '❤️',
  },
  {
    id: 'family',
    title: 'Trò chuyện về gia đình',
    description: 'Chia sẻ cảm xúc, chuyện con cháu và những khoảnh khắc đẹp đời sống gia đình.',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    id: 'hometown',
    title: 'Trò chuyện về quê hương',
    description: 'Ôn lại ký ức tuổi thơ, những nơi quê nhà và những câu chuyện truyền thống.',
    icon: '🏡',
  },
  {
    id: 'spirit',
    title: 'Trò chuyện về tâm linh',
    description: 'Trò chuyện về tín ngưỡng, lễ hội và những giá trị tinh thần đáng quý.',
    icon: '🙏',
  },
  {
    id: 'memories',
    title: 'Trò chuyện về kỷ niệm xưa',
    description: 'Gợi nhớ những kỷ niệm đẹp, hình ảnh cũ và các chuyện thời trẻ.',
    icon: '📸',
  },
  {
    id: 'hobbies',
    title: 'Trò chuyện về sở thích',
    description: 'Chọn chủ đề bạn thích - từ ẩm thực, phim ảnh đến cây cảnh - và trò chuyện thoải mái.',
    icon: '🎯',
  }
];

export default function TopicSelection() {
  const navigate = useNavigate();

  const handleTopicSelect = (topicId) => {
    navigate(`/ai/chat/${topicId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
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
          CHỦ ĐỀ TÂM SỰ
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: 'text.primary',
            mb: 2,
            fontSize: { xs: '1.75rem', md: '2.25rem' }
          }}
        >
          Lựa Chọn Chủ Đề Bạn Muốn Tâm Sự
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.7
          }}
        >
          Chọn một chủ đề để bắt đầu cuộc trò chuyện với trợ lý AI thông minh
        </Typography>
      </Box>

      {/* Topic Cards Grid */}
      <Grid container spacing={3}>
        {topics.map((topic, index) => (
          <Grid item xs={12} sm={6} md={4} key={topic.id}>
            <Card 
              sx={{ 
                height: '100%',
                position: 'relative',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '0%',
                  bgcolor: 'secondary.main',
                  transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                },
                '&:hover': {
                  borderColor: 'secondary.main',
                  boxShadow: '0 8px 24px rgba(231, 76, 60, 0.12)',
                  transform: 'translateY(-4px)',
                  '&::before': {
                    height: '100%'
                  },
                  '& .topic-icon': {
                    transform: 'scale(1.1) rotate(-5deg)',
                    bgcolor: 'rgba(231, 76, 60, 0.08)'
                  },
                  '& .topic-number': {
                    color: 'secondary.main'
                  }
                }
              }}
            >
              <CardActionArea 
                onClick={() => handleTopicSelect(topic.id)}
                sx={{ 
                  height: '100%', 
                  p: 3.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  position: 'relative'
                }}
              >
                {/* Topic Number */}
                <Typography
                  className="topic-number"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: 'rgba(0,0,0,0.03)',
                    lineHeight: 1,
                    transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>

                {/* Icon Container */}
                <Box 
                  className="topic-icon"
                  sx={{ 
                    width: 72,
                    height: 72,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.25rem',
                    bgcolor: 'rgba(0,0,0,0.02)',
                    border: '2px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    mb: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {topic.icon}
                </Box>

                {/* Title */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 1.5,
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    color: 'text.primary',
                    fontSize: '1.25rem',
                    lineHeight: 1.3
                  }}
                >
                  {topic.title}
                </Typography>

                {/* Description */}
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    fontSize: '0.875rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {topic.description}
                </Typography>

                {/* Hover Indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transform: 'translate(8px, 8px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '.MuiCard-root:hover &': {
                      opacity: 1,
                      transform: 'translate(0, 0)',
                      borderColor: 'secondary.main',
                      color: 'secondary.main'
                    }
                  }}
                >
                  →
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}