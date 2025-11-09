import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Chip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';

export default function LiveChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Xin chào! Tôi là trợ lý ảo. Tôi có thể giúp gì cho bạn?',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickQuestions = [
    'Làm sao để đặt lịch?',
    'Chi phí khám bệnh?',
    'Hủy lịch hẹn?',
    'Tư vấn trực tuyến?'
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: 'Cảm ơn bạn đã liên hệ. Đội ngũ hỗ trợ sẽ phản hồi trong giây lát...',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    setMessage(question);
    handleSendMessage();
  };

  return (
    <Box sx={{ mb: 12 }} id="live-chat-section">
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
            <SupportAgentIcon sx={{ fontSize: 32 }} />
            Trò Chuyện Trực Tiếp
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.95 }}>
            Nhận hỗ trợ ngay lập tức từ đội ngũ chuyên viên
          </Typography>
        </Box>
      </Box>

      {/* Chat Container */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          maxWidth: 800,
          mx: 'auto'
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #00acc1 0%, #0097a7 100%)',
            color: 'white',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
            <SupportAgentIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Hỗ Trợ Trực Tuyến
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              ● Đang hoạt động
            </Typography>
          </Box>
        </Box>

        {/* Messages Area */}
        <Box
          sx={{
            height: 400,
            overflowY: 'auto',
            p: 3,
            bgcolor: 'grey.50',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                gap: 1,
                alignItems: 'flex-end'
              }}
            >
              {msg.sender === 'bot' && (
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  <SupportAgentIcon sx={{ fontSize: 20 }} />
                </Avatar>
              )}
              
              <Box>
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: 400,
                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'white',
                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2,
                    borderBottomRightRadius: msg.sender === 'user' ? 0 : 2,
                    borderBottomLeftRadius: msg.sender === 'bot' ? 0 : 2
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Paper>
                <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
                  {msg.time}
                </Typography>
              </Box>

              {msg.sender === 'user' && (
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'success.main' }}>
                  <PersonIcon sx={{ fontSize: 20 }} />
                </Avatar>
              )}
            </Box>
          ))}
        </Box>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              Câu hỏi nhanh:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {quickQuestions.map((q, idx) => (
                <Chip
                  key={idx}
                  label={q}
                  onClick={() => handleQuickQuestion(q)}
                  size="small"
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Input Area */}
        <Box
          sx={{
            p: 2,
            bgcolor: 'white',
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            gap: 1
          }}
        >
          <TextField
            fullWidth
            placeholder="Nhập tin nhắn..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            variant="outlined"
            size="small"
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark'
              },
              '&:disabled': {
                bgcolor: 'grey.300'
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>

      {/* Info Note */}
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          mt: 2,
          maxWidth: 800,
          mx: 'auto'
        }}
      >
        💡 <strong>Lưu ý:</strong> Thời gian phản hồi trung bình: 2-5 phút. Đối với các vấn đề phức tạp, 
        vui lòng sử dụng form liên hệ để được hỗ trợ tốt nhất.
      </Typography>
    </Box>
  );
}
