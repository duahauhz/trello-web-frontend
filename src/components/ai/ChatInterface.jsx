import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  IconButton, 
  Paper, 
  Avatar, 
  useTheme,
  Tabs,
  Tab,
  LinearProgress,
  Chip,
  Button,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VideocamIcon from '@mui/icons-material/Videocam';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { useParams } from 'react-router-dom';

const Message = ({ text, isUser, avatar, timestamp }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        mb: 2.5,
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start'
      }}
    >
      <Avatar
        src={avatar}
        sx={{
          width: 36,
          height: 36,
          bgcolor: isUser ? theme.palette.secondary.main : theme.palette.primary.main,
          flexShrink: 0
        }}
      >
        {isUser ? 'U' : 'AI'}
      </Avatar>
      <Box sx={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: isUser ? theme.palette.primary.main : 'background.paper',
            color: isUser ? '#fff' : 'text.primary',
            border: isUser ? 'none' : '1px solid',
            borderColor: 'divider',
            wordBreak: 'break-word'
          }}
        >
          <Typography variant="body1">{text}</Typography>
        </Paper>
        {timestamp && (
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              px: 1,
              alignSelf: isUser ? 'flex-end' : 'flex-start' 
            }}
          >
            {timestamp}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default function ChatInterface() {
  const theme = useTheme();
  const { topicId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock data for statistics
  const [statistics] = useState({
    happiness: 85,
    stress: 23
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock initial greeting based on topic
  useEffect(() => {
    const topicGreetings = {
      health: "Xin chào! Tôi là trợ lý AI về sức khỏe. Bạn có thắc mắc gì về sức khỏe không?",
      family: "Chào bạn! Hãy chia sẻ với tôi về gia đình của bạn nhé.",
      hometown: "Xin chào! Hãy kể cho tôi nghe về quê hương của bạn.",
      spirit: "Chào bạn! Tôi có thể chia sẻ với bạn về các vấn đề tâm linh và lễ hội.",
      memories: "Xin chào! Hãy cùng ôn lại những kỷ niệm đẹp nhé.",
      hobbies: "Chào bạn! Hãy chia sẻ về sở thích của bạn nhé."
    };

    const greeting = topicGreetings[topicId] || "Xin chào! Tôi có thể giúp gì cho bạn?";
    
    setMessages([
      {
        text: greeting,
        isUser: false,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      },
      {
        text: "Hello! What's your name?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      },
      {
        text: "Maybe we better...",
        isUser: true,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      },
      {
        text: "Hi there! I'm an AI chatbot here to help. I hope everyone's opinion is please start!",
        isUser: false,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [topicId]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const newMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);

    // Here you would typically make an API call to your backend
    // For now we'll simulate the AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Cảm ơn bạn đã chia sẻ. Tôi hiểu điều bạn đang nói và muốn tìm hiểu thêm.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)',
      display: 'flex',
      bgcolor: theme.palette.grey[50],
      gap: 2,
      p: 2
    }}>
      {/* Left Side - Video/Content Area */}
      <Box sx={{ 
        flex: '1 1 65%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        {/* Main Content/Video Area */}
        <Paper 
          elevation={3}
          sx={{ 
            flex: 1,
            borderRadius: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#f5f5f5',
            position: 'relative'
          }}
        >
          {/* Video/Content Placeholder */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#e0e0e0',
              position: 'relative',
              backgroundImage: 'url(/api/placeholder/800/600)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* This is where backend will push video/content */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0,0,0,0.3)'
              }}
            >
              <VideocamIcon sx={{ fontSize: 80, color: 'white', opacity: 0.7 }} />
            </Box>

            {/* Video Controls */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <IconButton sx={{ color: 'white' }}>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}>
                <PlayArrowIcon />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <SkipNextIcon />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <VolumeUpIcon />
              </IconButton>
              <Box sx={{ flex: 1 }} />
              <Typography variant="caption" sx={{ color: 'white' }}>
                00:00 / 00:00
              </Typography>
            </Box>
          </Box>

          {/* Status Bar */}
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'error.main' }} />
              <Typography variant="body2" fontWeight={600}>
                LIVE - 00:15:32
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              "Thank you everyone for joining the design critique meeting. I want everyone's opinion to please start!"
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Right Side - Chat Panel */}
      <Paper 
        elevation={3}
        sx={{ 
          flex: '0 0 35%',
          maxWidth: '450px',
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper'
        }}
      >
        {/* Chat Header with Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                minHeight: 56,
                textTransform: 'none',
                fontWeight: 600
              }
            }}
          >
            <Tab label={`Messages (${messages.length})`} />
            <Tab label="Participants" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {activeTab === 0 ? (
          <>
            {/* Messages Area */}
            <Box sx={{ 
              flex: 1, 
              p: 2.5, 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: theme.palette.grey[50]
            }}>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  text={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                  avatar={message.isUser ? "/user-avatar.jpg" : "/ai-avatar.png"}
                />
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box sx={{ 
              p: 2, 
              borderTop: 1, 
              borderColor: 'divider',
              bgcolor: 'background.paper'
            }}>
              <Box sx={{ 
                display: 'flex', 
                gap: 1,
                alignItems: 'flex-end'
              }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write message here"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: theme.palette.grey[50]
                    }
                  }}
                />
                <IconButton 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    color: '#fff',
                    borderRadius: 2,
                    width: 40,
                    height: 40,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark
                    },
                    '&:disabled': {
                      bgcolor: theme.palette.grey[300]
                    }
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
              
              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 1, mt: 1.5, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                    size="small"
                    onClick={() => setIsRecording(!isRecording)}
                    sx={{ 
                      color: isRecording ? 'error.main' : 'text.secondary',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <MicIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <AttachFileIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <EmojiEmotionsIcon />
                  </IconButton>
                </Box>
                {isRecording && (
                  <Chip 
                    label="Recording..." 
                    color="error" 
                    size="small"
                    icon={<Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: 'error.dark',
                      animation: 'pulse 1.5s infinite'
                    }} />}
                  />
                )}
              </Box>
            </Box>
          </>
        ) : (
          // Participants Tab
          <Box sx={{ flex: 1, p: 2.5, overflowY: 'auto' }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Statistics
            </Typography>
            
            {/* Use of Graphics Statistics */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                mb: 2, 
                bgcolor: theme.palette.primary.main,
                color: 'white',
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Use of Graphics
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption">Happiness</Typography>
                  <Typography variant="caption">{statistics.happiness}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={statistics.happiness}
                  sx={{
                    height: 6,
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'white'
                    }
                  }}
                />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption">Stress</Typography>
                  <Typography variant="caption">{statistics.stress}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={statistics.stress}
                  sx={{
                    height: 6,
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'white'
                    }
                  }}
                />
              </Box>
            </Paper>

            <Divider sx={{ my: 2 }} />

            {/* Participant List */}
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Participants (3)
            </Typography>
            
            {[
              { name: 'Jack', status: 'approved', avatar: 'J' },
              { name: 'Sarah', status: 'better', avatar: 'S' },
              { name: 'Lisa', status: 'speaking', avatar: 'L' }
            ].map((participant, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 2,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: theme.palette.grey[50],
                  '&:hover': {
                    bgcolor: theme.palette.grey[100]
                  }
                }}
              >
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  {participant.avatar}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {participant.name}
                  </Typography>
                  <Chip 
                    label={participant.status}
                    size="small"
                    sx={{ 
                      mt: 0.5,
                      height: 20,
                      fontSize: '0.7rem',
                      bgcolor: theme.palette.primary.main,
                      color: 'white'
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      {/* Add pulse animation for recording indicator */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </Box>
  );
}