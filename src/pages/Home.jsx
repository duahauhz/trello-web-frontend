import { Box } from '@mui/material'
import Header from "../components/Header"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Testimonials from "../components/Testimonials"

export default function Home() {
  const handleScrollToFeatures = () => {
    const featuresElement = document.querySelector('#features');
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      <Hero onScrollClick={handleScrollToFeatures} />
      <Box id="features">
        <Features />
      </Box>
      <Testimonials />
    </Box>
  );
}
