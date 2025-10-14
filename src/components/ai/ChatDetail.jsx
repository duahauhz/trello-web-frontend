import React from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Avatar,
  Divider,
  IconButton,
  TextField,
  Button,
  Chip,
  CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Mock data - Replace with API calls from backend
const getMockChatData = (chatId) => {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/chat-history/${chatId}`);
  // const data = await response.json();
  
  const chatHistories = {
    '1': {
      id: 1,
      title: 'Tư vấn sức khỏe',
      category: 'AI Sức Khỏe',
      createdAt: '2023-10-11T10:30:00',
      messages: [
        {
          id: 1,
          text: "Xin chào! Tôi là trợ lý AI về sức khỏe. Bạn có thắc mắc gì về sức khỏe không?",
          sender: "ai",
          timestamp: "2023-10-11T10:30:00"
        },
        {
          id: 2,
          text: "Tôi muốn hỏi về chế độ dinh dưỡng cho người cao tuổi",
          sender: "user",
          timestamp: "2023-10-11T10:31:00"
        },
        {
          id: 3,
          text: "Vâng, tôi sẽ tư vấn cho bạn về chế độ dinh dưỡng phù hợp. Đầu tiên, người cao tuổi cần đảm bảo đủ protein và canxi. Protein giúp duy trì khối lượng cơ, còn canxi quan trọng cho sức khỏe xương.",
          sender: "ai",
          timestamp: "2023-10-11T10:32:00"
        },
        {
          id: 4,
          text: "Vậy nên ăn những thực phẩm gì?",
          sender: "user",
          timestamp: "2023-10-11T10:33:00"
        },
        {
          id: 5,
          text: "Tôi khuyên bạn nên ăn:\n\n• Sữa, yaourt và các sản phẩm từ sữa\n• Cá hồi, cá thu giàu omega-3\n• Rau xanh đậm như cải bó xôi, cải xanh\n• Đậu và các loại hạt\n• Trứng\n• Thịt nạc\n\nNên ăn nhiều bữa nhỏ trong ngày thay vì ít bữa lớn.",
          sender: "ai",
          timestamp: "2023-10-11T10:34:00"
        }
      ]
    },
    '2': {
      id: 2,
      title: 'Chuyện gia đình',
      category: 'AI gia đình',
      createdAt: '2023-10-10T15:45:00',
      messages: [
        {
          id: 1,
          text: "Chào bạn! Hãy chia sẻ với tôi về gia đình của bạn nhé.",
          sender: "ai",
          timestamp: "2023-10-10T15:45:00"
        },
        {
          id: 2,
          text: "Tôi có 3 người con và 5 người cháu",
          sender: "user",
          timestamp: "2023-10-10T15:46:00"
        },
        {
          id: 3,
          text: "Thật tuyệt vời! Gia đình đông con là một niềm hạnh phúc lớn. Các cháu có thường xuyên đến thăm bạn không?",
          sender: "ai",
          timestamp: "2023-10-10T15:47:00"
        }
      ]
    },
    '3': {
      id: 3,
      title: 'Hồi ức quê nhà',
      category: 'AI quê hương',
      createdAt: '2023-10-09T09:20:00',
      messages: [
        {
          id: 1,
          text: "Xin chào! Hãy kể cho tôi nghe về quê hương của bạn.",
          sender: "ai",
          timestamp: "2023-10-09T09:20:00"
        },
        {
          id: 2,
          text: "Quê tôi ở miền Tây, nơi có nhiều vườn trái cây và sông nước",
          sender: "user",
          timestamp: "2023-10-09T09:21:00"
        }
      ]
    }
  };

  return chatHistories[chatId] || chatHistories['1'];
};

const Message = ({ message }) => {
  const theme = useTheme();
  const isAI = message.sender === 'ai';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isAI ? 'flex-start' : 'flex-end',
        mb: 3,
        gap: 1.5,
        alignItems: 'flex-start'
      }}
    >
      {isAI && (
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            width: 36,
            height: 36,
            fontSize: '0.9rem'
          }}
        >
          AI
        </Avatar>
      )}
      <Box sx={{ maxWidth: '70%', display: 'flex', flexDirection: 'column' }}>
        <Paper
          elevation={isAI ? 0 : 2}
          sx={{
            p: 2,
            bgcolor: isAI ? theme.palette.grey[100] : theme.palette.primary.main,
            color: isAI ? 'text.primary' : 'white',
            borderRadius: 2,
            border: isAI ? `1px solid ${theme.palette.divider}` : 'none',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            {message.text}
          </Typography>
        </Paper>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mt: 0.5,
            px: 1,
            alignSelf: isAI ? 'flex-start' : 'flex-end'
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString('vi-VN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Typography>
      </Box>
      {!isAI && (
        <Avatar
          sx={{
            bgcolor: theme.palette.secondary.main,
            width: 36,
            height: 36,
            fontSize: '0.9rem'
          }}
        >
          U
        </Avatar>
      )}
    </Box>
  );
};

export default function ChatDetail() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [newMessage, setNewMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [chatInfo, setChatInfo] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSending, setIsSending] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  // Load chat data from backend
  React.useEffect(() => {
    const loadChatData = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/chat-history/${id}`);
        // const data = await response.json();
        
        // For now, use mock data
        const data = getMockChatData(id);
        setChatInfo({
          title: data.title,
          category: data.category,
          createdAt: data.createdAt
        });
        setMessages(data.messages);
      } catch (error) {
        console.error('Error loading chat data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChatData();
  }, [id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    
    setIsSending(true);
    
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    try {
      // TODO: Replace with actual API call to send message and get AI response
      // const response = await fetch(`/api/chat/${id}/message`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: newMessage })
      // });
      // const aiResponse = await response.json();
      
      // Simulate AI response
      setTimeout(() => {
        const aiMessage = {
          id: messages.length + 2,
          text: "Cảm ơn bạn đã chia sẻ. Tôi hiểu điều bạn đang nói. Bạn có muốn tôi giải thích thêm về điều gì không?",
          sender: 'ai',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsSending(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, height: 'calc(100vh - 64px)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: 'calc(100vh - 64px)' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          height: 'calc(100vh - 128px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 3,
        }}
      >
        {/* Header */}
        <Box 
          sx={{ 
            p: 2.5, 
            borderBottom: 1, 
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: theme.palette.background.default
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={() => navigate('/ai')}
              sx={{ 
                '&:hover': { bgcolor: theme.palette.action.hover }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {chatInfo?.title}
              </Typography>
              <Chip 
                label={chatInfo?.category}
                size="small"
                sx={{ 
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  fontWeight: 500
                }}
              />
            </Box>
          </Box>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Messages */}
        <Box 
          sx={{ 
            p: 3,
            flexGrow: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: theme.palette.grey[50],
            '&::-webkit-scrollbar': {
              width: '8px'
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: theme.palette.grey[300],
              borderRadius: '4px',
              '&:hover': {
                bgcolor: theme.palette.grey[400]
              }
            }
          }}
        >
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          {isSending && (
            <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 36,
                  height: 36,
                }}
              >
                AI
              </Avatar>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: theme.palette.grey[100],
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: theme.palette.primary.main,
                      animation: 'pulse 1.4s infinite',
                      animationDelay: '0s'
                    }} 
                  />
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: theme.palette.primary.main,
                      animation: 'pulse 1.4s infinite',
                      animationDelay: '0.2s'
                    }} 
                  />
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: theme.palette.primary.main,
                      animation: 'pulse 1.4s infinite',
                      animationDelay: '0.4s'
                    }} 
                  />
                </Box>
              </Paper>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input */}
        <Box 
          sx={{ 
            p: 2.5, 
            borderTop: 1, 
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            gap: 1.5,
            alignItems: 'flex-end'
          }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn của bạn..."
              disabled={isSending}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: theme.palette.grey[50]
                }
              }}
            />
            <IconButton 
              onClick={handleSend}
              disabled={!newMessage.trim() || isSending}
              sx={{ 
                bgcolor: theme.palette.primary.main,
                color: '#fff',
                width: 48,
                height: 48,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark
                },
                '&:disabled': {
                  bgcolor: theme.palette.grey[300],
                  color: theme.palette.grey[500]
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
            <IconButton 
              size="small"
              sx={{ 
                color: 'text.secondary',
                '&:hover': { 
                  bgcolor: theme.palette.action.hover,
                  color: theme.palette.primary.main
                }
              }}
            >
              <MicIcon />
            </IconButton>
            <IconButton 
              size="small"
              sx={{ 
                color: 'text.secondary',
                '&:hover': { 
                  bgcolor: theme.palette.action.hover,
                  color: theme.palette.primary.main
                }
              }}
            >
              <AttachFileIcon />
            </IconButton>
            <IconButton 
              size="small"
              sx={{ 
                color: 'text.secondary',
                '&:hover': { 
                  bgcolor: theme.palette.action.hover,
                  color: theme.palette.primary.main
                }
              }}
            >
              <EmojiEmotionsIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Add animation for typing indicator */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}
      </style>
    </Container>
  );
}