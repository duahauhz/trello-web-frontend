import { Box, Fab, Paper, Typography, IconButton, TextField, Avatar } from '@mui/material';
import { useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MinimizeIcon from '@mui/icons-material/Minimize';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Xin chào! Chúng tôi có thể giúp gì cho bạn?',
      sender: 'bot',
      time: '10:30'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: message,
          sender: 'user',
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: 'Cảm ơn bạn đã liên hệ. Nhân viên hỗ trợ sẽ phản hồi trong giây lát.',
            sender: 'bot',
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Fab
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            bgcolor: 'secondary.main',
            color: '#fff',
            width: 64,
            height: 64,
            boxShadow: '0 4px 20px rgba(231, 76, 60, 0.4)',
            '&:hover': {
              bgcolor: 'secondary.dark',
              transform: 'scale(1.05)',
              boxShadow: '0 6px 24px rgba(231, 76, 60, 0.5)'
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1000
          }}
        >
          <ChatIcon sx={{ fontSize: 32 }} />
        </Fab>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            width: { xs: 'calc(100vw - 32px)', sm: 400 },
            height: isMinimized ? 'auto' : { xs: 'calc(100vh - 100px)', sm: 600 },
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            overflow: 'hidden',
            zIndex: 1000,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'secondary.main',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor: '#fff',
                  color: 'secondary.main',
                  width: 40,
                  height: 40
                }}
              >
                <ChatIcon />
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    lineHeight: 1.2
                  }}
                >
                  Hỗ trợ trực tuyến
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.9
                  }}
                >
                  Đang hoạt động
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton
                onClick={() => setIsMinimized(!isMinimized)}
                sx={{
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <MinimizeIcon />
              </IconButton>
              <IconButton
                onClick={() => setIsOpen(false)}
                sx={{
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Chat Messages */}
          {!isMinimized && (
            <>
              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  overflowY: 'auto',
                  bgcolor: '#fafafa',
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
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        maxWidth: '75%',
                        bgcolor: msg.sender === 'user' ? 'secondary.main' : '#fff',
                        color: msg.sender === 'user' ? '#fff' : 'text.primary',
                        borderRadius: 2,
                        border: msg.sender === 'bot' ? '1px solid' : 'none',
                        borderColor: 'divider'
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.6,
                          wordBreak: 'break-word'
                        }}
                      >
                        {msg.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 0.5,
                          display: 'block',
                          opacity: 0.7,
                          fontSize: '0.7rem'
                        }}
                      >
                        {msg.time}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>

              {/* Chat Input */}
              <Box
                sx={{
                  p: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  bgcolor: '#fff'
                }}
              >
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'secondary.main'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'secondary.main'
                        }
                      }
                    }}
                  />
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    sx={{
                      bgcolor: 'secondary.main',
                      color: '#fff',
                      '&:hover': {
                        bgcolor: 'secondary.dark'
                      },
                      '&.Mui-disabled': {
                        bgcolor: 'action.disabledBackground'
                      }
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            </>
          )}
        </Paper>
      )}
    </>
  );
}
