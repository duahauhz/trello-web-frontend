import { Box } from '@mui/material';
import Header from '../components/Header';
import ChatInterface from '../components/ai/ChatInterface';

export default function AISS1() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <ChatInterface />
    </Box>
  );
}