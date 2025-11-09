import { Box, Container } from '@mui/material';
import Header from '../components/Header';
import SupportHero from '../components/support/SupportHero';
import FAQSection from '../components/support/FAQSection';
import ContactForm from '../components/support/ContactForm';
import LiveChat from '../components/support/LiveChat';

export default function Support() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <SupportHero />
      
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        {/* FAQ Section */}
        <FAQSection />
        
        {/* Contact Form */}
        <ContactForm />
        
        {/* Live Chat */}
        <LiveChat />
      </Container>
    </Box>
  );
}
