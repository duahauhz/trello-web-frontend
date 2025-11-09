import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  TextField, 
  IconButton, 
  Paper, 
  Avatar, 
  Tabs,
  Tab,
  LinearProgress,
  Chip,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VideocamIcon from '@mui/icons-material/Videocam';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { useParams } from 'react-router-dom';

const Message = ({ text, isUser, avatar, timestamp }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start'
      }}
    >
      <Avatar
        src={avatar}
        sx={{
          width: 40,
          height: 40,
          bgcolor: isUser ? 'secondary.main' : '#1a1a1a',
          flexShrink: 0,
          border: '2px solid',
          borderColor: 'divider',
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          fontSize: '0.875rem'
        }}
      >
        {isUser ? 'U' : 'AI'}
      </Avatar>
      <Box sx={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: isUser ? 'secondary.main' : 'background.paper',
            color: isUser ? '#fff' : 'text.primary',
            border: '1px solid',
            borderColor: isUser ? 'secondary.main' : 'divider',
            borderLeft: isUser ? 'none' : '3px solid',
            borderLeftColor: isUser ? 'transparent' : 'secondary.main',
            wordBreak: 'break-word',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: isUser ? '0 4px 12px rgba(231, 76, 60, 0.15)' : '0 4px 12px rgba(0,0,0,0.08)'
            }
          }}
        >
          <Typography 
            variant="body1"
            sx={{ 
              lineHeight: 1.7,
              fontSize: '0.9375rem'
            }}
          >
            {text}
          </Typography>
        </Paper>
        {timestamp && (
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              px: 1,
              alignSelf: isUser ? 'flex-end' : 'flex-start',
              fontSize: '0.75rem',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {timestamp}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
  avatar: PropTypes.string,
  timestamp: PropTypes.string
};

export default function ChatInterface() {
  const { topicId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const [statistics] = useState({
    happiness: 85,
    stress: 23,
    engagement: 92
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      { text: greeting, isUser: false, timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) },
      { text: "Hello!", isUser: false, timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }
    ]);
  }, [topicId]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);

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
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', bgcolor: '#fafafa', gap: 3, p: 3 }}>
      <Box sx={{ flex: '1 1 65%', display: 'flex', flexDirection: 'column' }}>
        <Paper elevation={0} sx={{ flex: 1, borderRadius: 2, overflow: 'hidden', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#1a1a1a', position: 'relative', backgroundImage: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(0,0,0,0.95) 100%)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
              <Box sx={{ width: 120, height: 120, borderRadius: 3, border: '3px solid', borderColor: 'secondary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(231, 76, 60, 0.1)' }}>
                <VideocamIcon sx={{ fontSize: 60, color: 'secondary.main' }} />
              </Box>
              <Typography variant="h6" sx={{ color: 'white', fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>
                Video Stream Ready
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', maxWidth: 400, px: 3 }}>
                AI video interaction will be displayed here once backend is connected
              </Typography>
            </Box>
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)', display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton size="small" sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'secondary.main' } }}>
                <SkipPreviousIcon fontSize="small" />
              </IconButton>
              <IconButton sx={{ color: 'white', bgcolor: 'secondary.main', width: 48, height: 48, '&:hover': { bgcolor: 'secondary.dark' } }}>
                <PlayArrowIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'secondary.main' } }}>
                <SkipNextIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'secondary.main' } }}>
                <VolumeUpIcon fontSize="small" />
              </IconButton>
              <Box sx={{ flex: 1 }} />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.5px' }}>
                00:00 / 00:00
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'secondary.main', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: '1px' }}>LIVE SESSION</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.875rem' }}>00:15:32</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', lineHeight: 1.6, pl: 0.5 }}>
              AI companion is ready to listen and respond with empathy
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Paper elevation={0} sx={{ flex: '0 0 35%', maxWidth: '450px', borderRadius: 2, overflow: 'hidden', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#fafafa' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ '& .MuiTab-root': { minHeight: 56, textTransform: 'none', fontWeight: 600, fontFamily: '"Playfair Display", serif', fontSize: '0.9375rem', color: 'text.secondary', '&.Mui-selected': { color: 'secondary.main' } }, '& .MuiTabs-indicator': { height: 3, bgcolor: 'secondary.main' } }}>
            <Tab label={`Conversation (${messages.length})`} />
            <Tab label="Analytics" />
          </Tabs>
        </Box>
        {activeTab === 0 ? (
          <>
            <Box sx={{ flex: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-track': { bgcolor: 'transparent' }, '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0,0,0,0.1)', borderRadius: '4px', '&:hover': { bgcolor: 'rgba(0,0,0,0.2)' } } }}>
              {messages.map((message, index) => (
                <Message key={index} text={message.text} isUser={message.isUser} timestamp={message.timestamp} avatar={message.isUser ? "/user-avatar.jpg" : "/ai-avatar.png"} />
              ))}
              <div ref={messagesEndRef} />
            </Box>
            <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider', bgcolor: '#fafafa' }}>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
                <TextField fullWidth multiline maxRows={3} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type your message here..." size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#ffffff', fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'secondary.main' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'secondary.main', borderWidth: '2px' } } }} />
                <IconButton onClick={handleSend} disabled={!inputValue.trim()} sx={{ bgcolor: 'secondary.main', color: '#fff', borderRadius: 2, width: 44, height: 44, flexShrink: 0, '&:hover': { bgcolor: 'secondary.dark', transform: 'scale(1.05)' }, '&:disabled': { bgcolor: 'rgba(0,0,0,0.12)', color: 'rgba(0,0,0,0.26)' }, transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  <SendIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" onClick={() => setIsRecording(!isRecording)} sx={{ color: isRecording ? 'secondary.main' : 'text.secondary', border: '1px solid', borderColor: isRecording ? 'secondary.main' : 'divider', '&:hover': { bgcolor: isRecording ? 'rgba(231, 76, 60, 0.08)' : 'action.hover', borderColor: 'secondary.main' } }}>
                    <MicIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'text.secondary', border: '1px solid', borderColor: 'divider', '&:hover': { borderColor: 'secondary.main', color: 'secondary.main' } }}>
                    <AttachFileIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'text.secondary', border: '1px solid', borderColor: 'divider', '&:hover': { borderColor: 'secondary.main', color: 'secondary.main' } }}>
                    <EmojiEmotionsIcon fontSize="small" />
                  </IconButton>
                </Box>
                {isRecording && (
                  <Chip label="Recording..." size="small" sx={{ bgcolor: 'secondary.main', color: 'white', fontWeight: 600, fontSize: '0.75rem', height: 28, '& .MuiChip-icon': { color: 'white' } }} icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'white', animation: 'pulse 1.5s infinite' }} />} />
                )}
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ flex: 1, p: 3, overflowY: 'auto', bgcolor: '#ffffff' }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: '1.2px', mb: 3, display: 'block' }}>
              Emotion Analytics
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderLeft: '3px solid', borderLeftColor: '#f39c12', borderRadius: 2, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transform: 'translateX(4px)' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>Happiness Level</Typography>
                  <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#f39c12' }}>{statistics.happiness}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={statistics.happiness} sx={{ height: 8, borderRadius: 1, bgcolor: 'rgba(243, 156, 18, 0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#f39c12', borderRadius: 1 } }} />
              </Paper>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderLeft: '3px solid', borderLeftColor: 'secondary.main', borderRadius: 2, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transform: 'translateX(4px)' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>Stress Level</Typography>
                  <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: 'secondary.main' }}>{statistics.stress}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={statistics.stress} sx={{ height: 8, borderRadius: 1, bgcolor: 'rgba(231, 76, 60, 0.1)', '& .MuiLinearProgress-bar': { bgcolor: 'secondary.main', borderRadius: 1 } }} />
              </Paper>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderLeft: '3px solid', borderLeftColor: '#1a1a1a', borderRadius: 2, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transform: 'translateX(4px)' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>Engagement Score</Typography>
                  <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#1a1a1a' }}>{statistics.engagement}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={statistics.engagement} sx={{ height: 8, borderRadius: 1, bgcolor: 'rgba(26, 26, 26, 0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#1a1a1a', borderRadius: 1 } }} />
              </Paper>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: '1.2px', mb: 2, display: 'block' }}>
              AI Insights
            </Typography>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: '#fafafa' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, fontStyle: 'italic' }}>
                Real-time emotion analysis and conversation insights will be displayed here once AI backend is connected. 
                The system will track sentiment, engagement patterns, and provide personalized recommendations.
              </Typography>
            </Paper>
          </Box>
        )}
      </Paper>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }`}</style>
    </Box>
  );
}
