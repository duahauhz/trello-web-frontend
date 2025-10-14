import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Box, Button, IconButton, Container, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ChatHistoryCard = ({ chat, onView, onDelete }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8]
        }
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={chat.image}
        alt={chat.title}
        sx={{
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
      />
      <CardContent sx={{ p: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1,
            color: theme.palette.primary.main,
            fontWeight: 600 
          }}
        >
          {chat.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {chat.category}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<VisibilityIcon />}
            onClick={onView}
            size="small"
            sx={{
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              }
            }}
          >
            Xem thêm
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteOutlineIcon />}
            onClick={onDelete}
            size="small"
            sx={{
              color: theme.palette.grey[600],
              borderColor: theme.palette.grey[300],
              '&:hover': {
                bgcolor: theme.palette.error.light,
                color: theme.palette.error.main,
                borderColor: theme.palette.error.main,
              }
            }}
          >
            Xoá
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function ChatHistory() {
  const theme = useTheme();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = 300;
      const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // This would come from your backend API
  const chatHistory = [
    {
      id: 1,
      title: 'Tư vấn sức khỏe',
      image: '/ai-feature.jpg',
      category: 'AI Sức Khỏe',
      lastMessage: 'Thảo luận về chế độ dinh dưỡng cho người cao tuổi',
      timestamp: '2023-10-11T10:30:00'
    },
    {
      id: 2,
      title: 'Chuyện gia đình',
      image: '/booking-feature.jpg',
      category: 'AI gia đình',
      lastMessage: 'Chia sẻ về kỷ niệm với các cháu',
      timestamp: '2023-10-10T15:45:00'
    },
    {
      id: 3,
      title: 'Hồi ức quê nhà',
      image: '/support-feature.jpg',
      category: 'AI quê hương',
      lastMessage: 'Nhớ về những ngày xưa ở quê',
      timestamp: '2023-10-09T09:20:00'
    }
  ];

  const handleView = (chatId) => {
    navigate(`/ai/history/${chatId}`);
  };

  const handleDelete = (chatId) => {
    // Call your backend API to delete the chat
    console.log('Delete chat:', chatId);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 6
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            color: theme.palette.primary.main,
            fontWeight: 700,
            position: 'relative',
            mb: 2
          }}
        >
          Lịch sử cuộc trò chuyện
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}
        >
          Xem lại những cuộc trò chuyện đã qua và tiếp tục cuộc trò chuyện bất kỳ lúc nào
        </Typography>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 4,
          overflow: 'hidden',
          bgcolor: 'background.default',
          position: 'relative'
        }}
      >
        <Box 
          sx={{ 
            position: 'relative',
            px: { xs: 2, sm: 4, md: 6 },
            py: 4,
          }}
        >
          <IconButton
            onClick={() => handleScroll('left')}
            sx={{
              position: 'absolute',
              left: { xs: -8, sm: 8 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              boxShadow: theme.shadows[2],
              zIndex: 2,
              '&:hover': {
                bgcolor: theme.palette.primary.light,
                color: 'white'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box
            ref={containerRef}
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
            {chatHistory.map((chat) => (
              <Box
                key={chat.id}
                sx={{
                  minWidth: {
                    xs: '280px',
                    sm: '320px',
                    md: '360px'
                  },
                  maxWidth: '360px',
                  flexShrink: 0
                }}
              >
                <ChatHistoryCard
                  chat={chat}
                  onView={() => handleView(chat.id)}
                  onDelete={() => handleDelete(chat.id)}
                />
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={() => handleScroll('right')}
            sx={{
              position: 'absolute',
              right: { xs: -8, sm: 8 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              boxShadow: theme.shadows[2],
              zIndex: 2,
              '&:hover': {
                bgcolor: theme.palette.primary.light,
                color: 'white'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Paper>
    </Container>
  );
}