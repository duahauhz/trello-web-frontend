import { Grid, Typography, Card, CardActionArea, Box, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { keyframes } from '@mui/system';

const topics = [
  {
    id: 'health',
    title: 'Trò chuyện về sức khỏe',
    description: 'Trò đổi những thông tin về các vấn đề sức khỏe như: tuổi già, gout ngọc, tim mạch, xương khớp.',
    icon: '❤️💊',
    bgColor: '#ffebee'
  },
  {
    id: 'family',
    title: 'Trò chuyện về gia đình',
    description: 'Chia sẻ cảm xúc, chuyện con cháu và những khoảnh khắc đẹp đời sống gia đình.',
    icon: '👨‍👩‍👧‍👦',
    bgColor: '#e8f5e9'
  },
  {
    id: 'hometown',
    title: 'Trò chuyện về quê hương cội nguồn',
    description: 'Ôn lại ký ức tuổi thơ, những nơi quê nhà và những câu chuyện truyền thống.',
    icon: '🏡',
    bgColor: '#fff3e0'
  },
  {
    id: 'spirit',
    title: 'Trò chuyện về tâm linh, lễ hội',
    description: 'Trò chuyện về tín ngưỡng, lễ hội và những giá trị tinh thần đáng quý.',
    icon: '🙏',
    bgColor: '#e3f2fd'
  },
  {
    id: 'memories',
    title: 'Trò chuyện về con cháu, kỉ niệm xưa',
    description: 'Công AI gợi nhớ những kỷ niệm đẹp, hình ảnh cũ và các chuyện thời trẻ.',
    icon: '👵🏻📸',
    bgColor: '#f3e5f5'
  },
  {
    id: 'hobbies',
    title: 'Trò chuyện về chủ đề yêu thích',
    description: 'Chọn chủ đề bạn thích - từ ẩm thực, phim ảnh đến cây cảnh - và trò chuyện thoải mái cùng AI.',
    icon: '🎯',
    bgColor: '#e0f7fa'
  }
];

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const shine = keyframes`
  0% {
    background-position: -100px;
  }
  40%, 100% {
    background-position: 140px;
  }
`;

export default function TopicSelection() {
  const navigate = useNavigate();


  const handleTopicSelect = (topicId) => {
    navigate(`/ai/chat/${topicId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper 
        elevation={0}
        sx={{ 
          bgcolor: 'transparent',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            animation: `${shine} 5s infinite linear`
          }
        }}
      >
        <Box 
          sx={{ 
            p: { xs: 2, md: 6 },
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center', 
              mb: 6,
              background: 'linear-gradient(45deg, #0097a7, #4DD0E1)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #0097a7, transparent)',
                borderRadius: '2px'
              }
            }}
      >
        Lựa chọn chủ đề bạn muốn tâm sự
      </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {topics.map((topic) => (
              <Grid item xs={12} sm={6} md={4} key={topic.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'all 0.4s ease',
                    background: `linear-gradient(135deg, ${topic.bgColor}80, ${topic.bgColor}40)`,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    animation: `${float} 6s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: `0 20px 40px ${topic.bgColor}40`,
                      '& .icon': {
                        transform: 'scale(1.2) rotate(10deg)',
                      }
                    }
                  }}
                >
                  <CardActionArea 
                    onClick={() => handleTopicSelect(topic.id)}
                    sx={{ 
                      height: '100%', 
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Box 
                      className="icon"
                      sx={{ 
                        fontSize: '4rem',
                        textAlign: 'center',
                        mb: 3,
                        transition: 'transform 0.4s ease',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                      }}
                    >
                      {topic.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 2,
                        background: 'linear-gradient(45deg, #0097a7, #4DD0E1)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 700,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {topic.title}
                    </Typography>
                    <Typography 
                      variant="body1"
                      sx={{ 
                        textAlign: 'center',
                        color: 'text.secondary',
                        lineHeight: 1.6
                      }}
                    >
                      {topic.description}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}