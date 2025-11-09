import { Box } from '@mui/material';
import Header from '../components/Header';
import SupportHero from '../components/support/SupportHero';
import FAQSection from '../components/support/FAQSection';
import ContactForm from '../components/support/ContactForm';
import LiveChat from '../components/support/LiveChat';
import ContactInfo from '../components/support/ContactInfo';

export default function Support() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Header />
      
      {/* Hero Section - White */}
      <Box sx={{ bgcolor: '#ffffff' }}>
        <SupportHero />
      </Box>
      
      {/* Contact Info Section - Light Gray */}
      <Box sx={{ bgcolor: '#fafafa' }}>
        <ContactInfo />
      </Box>
      
      {/* FAQ Section - White */}
      <Box id="faq-section" sx={{ bgcolor: '#ffffff' }}>
        <FAQSection />
      </Box>
      
      {/* Contact Form - Light Gray */}
      <Box id="contact-section" sx={{ bgcolor: '#fafafa' }}>
        <ContactForm />
      </Box>
      
      {/* Live Chat - Fixed Position */}
      <LiveChat />
    </Box>
  );
}
