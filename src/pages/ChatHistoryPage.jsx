import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChatHistory from '../components/ai/ChatHistory';
import Header from '../components/Header';

export default function ChatHistoryPage() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <ChatHistory />
    </Box>
  );
}
