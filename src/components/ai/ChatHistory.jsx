import React from 'react';
import { Typography, Card, CardContent, CardMedia, Box, Button, IconButton, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ChatHistoryCard = ({ chat, onView, onDelete }) => {
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
        overflow: 'hidden',
        '&:hover': {
          borderLeftColor: 'secondary.main',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)',
          '& .chat-image': {
            transform: 'scale(1.05)'
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', height: 160, overflow: 'hidden', bgcolor: 'rgba(0,0,0,0.02)' }}>
        <CardMedia
          component="img"
          height="160"
          image={chat.image}
          alt={chat.title}
          className="chat-image"
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </Box>
      <CardContent sx={{ p: 2.5 }}>
        <Typography 
          variant="overline"
          sx={{
            color: 'secondary.main',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            display: 'block',
            mb: 0.5
          }}
        >
          {chat.category}
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1.5,
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: 'text.primary',
            fontSize: '1.1rem'
          }}
        >
          {chat.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2.5,
            fontSize: '0.875rem',
            lineHeight: 1.6,
            minHeight: '2.6em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {chat.lastMessage}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<VisibilityIcon sx={{ fontSize: 18 }} />}
            onClick={onView}
            fullWidth
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              py: 1,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'secondary.dark',
                boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)'
              }
            }}
          >
            Xem
          </Button>
          <IconButton
            onClick={onDelete}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              width: 40,
              height: 40,
              flexShrink: 0,
              '&:hover': {
                borderColor: 'error.main',
                color: 'error.main',
                bgcolor: 'rgba(244, 67, 54, 0.04)'
              }
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function ChatHistory() {
  const navigate = useNavigate();
  const containerRef = React.useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = 350;
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
      lastMessage: 'Thảo luận về chế độ dinh dưỡng ',
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
          LỊCH SỬ
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
          Lịch Sử Cuộc Trò Chuyện
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
          Xem lại những cuộc trò chuyện đã qua và tiếp tục bất kỳ lúc nào
        </Typography>
      </Box>

      {/* Scrollable Cards Container */}
      <Box 
        sx={{ 
          position: 'relative',
          px: { xs: 5, md: 6 }
        }}
      >
        {/* Left Arrow */}
        <IconButton
          onClick={() => handleScroll('left')}
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
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Cards Container */}
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
                  xs: '85%',
                  sm: '340px',
                  md: '360px'
                },
                maxWidth: {
                  xs: '85%',
                  sm: '340px',
                  md: '360px'
                },
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

        {/* Right Arrow */}
        <IconButton
          onClick={() => handleScroll('right')}
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
            }
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Container>
  );
}