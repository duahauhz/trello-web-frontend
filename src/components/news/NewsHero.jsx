import { Box, Container, Typography } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function NewsHero() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 12,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '500px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920&h=400&fit=crop") center/cover',
          opacity: 0.15,
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, mb: 20 }}>
        {/* Main Title */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              mb: 2,
              fontSize: { xs: '2rem', md: '3.5rem' },
              textShadow: '2px 4px 8px rgba(0,0,0,0.3)'
            }}
          >
            🌟 Tin Tức & Sức Khỏe
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 400,
              opacity: 0.95,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Cập nhật tin tức y tế mới nhất, bài tập phục hồi và âm nhạc thư giãn
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 3,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {/* Tin Nổi Bật */}
          <Box
            onClick={() => scrollToSection('featured-news')}
            sx={{
              flex: '1 1 250px',
              maxWidth: 300,
              bgcolor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-8px)',
                bgcolor: 'rgba(255,255,255,0.25)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }
            }}
          >
            <NewspaperIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Tin Nổi Bật
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Cập nhật tin tức y tế và sức khỏe mới nhất
            </Typography>
          </Box>

          {/* Bài Tập */}
          <Box
            onClick={() => scrollToSection('exercise-articles')}
            sx={{
              flex: '1 1 250px',
              maxWidth: 300,
              bgcolor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-8px)',
                bgcolor: 'rgba(255,255,255,0.25)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }
            }}
          >
            <FitnessCenterIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Bài Tập Phục Hồi
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Hướng dẫn các bài tập phục hồi chức năng
            </Typography>
          </Box>

          {/* Âm Nhạc */}
          <Box
            onClick={() => scrollToSection('music-videos')}
            sx={{
              flex: '1 1 250px',
              maxWidth: 300,
              bgcolor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-8px)',
                bgcolor: 'rgba(255,255,255,0.25)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }
            }}
          >
            <MusicNoteIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Âm Nhạc Thư Giãn
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Âm nhạc giúp thư giãn và phục hồi tinh thần
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
