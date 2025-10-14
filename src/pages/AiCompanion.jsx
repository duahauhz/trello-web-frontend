import { Box } from '@mui/material';
import TopicSelection from '../components/ai/TopicSelection';
import ChatHistory from '../components/ai/ChatHistory';
import Header from '../components/Header';
import Hero from '../components/Hero';

export default function AiCompanion() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Hero />
      <TopicSelection />
      <ChatHistory />
    </Box>
  );
}
