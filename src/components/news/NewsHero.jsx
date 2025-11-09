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
        bgcolor: 'background.paper',
        py: { xs: 8, md: 12 },
        position: 'relative',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        {/* Main Title */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant="overline"
            sx={{
              color: 'secondary.main',
              fontWeight: 600,
              letterSpacing: '0.15em',
              fontSize: '0.875rem',
              mb: 2,
              display: 'block'
            }}
          >
            TIN TỨC & SỨC KHỎE
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700, 
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              color: 'text.primary'
            }}
          >
            Kiến Thức Sức Khỏe
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 400,
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.8
            }}
          >
            Cập nhật tin tức y tế mới nhất, bài tập phục hồi và âm nhạc thư giãn
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)'
            },
            gap: 3
          }}
        >
          {/* Tin Nổi Bật */}
          <Box
            onClick={() => scrollToSection('featured-news')}
            sx={{
              bgcolor: 'background.default',
              borderRadius: '4px',
              p: 4,
              textAlign: 'center',
              border: '2px solid',
              borderColor: 'divider',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                bgcolor: 'secondary.main',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              },
              '&:hover': {
                transform: 'translateY(-8px)',
                borderColor: 'secondary.main',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                '&::before': {
                  opacity: 1
                }
              }
            }}
          >
            <NewspaperIcon sx={{ fontSize: 48, mb: 2, color: 'text.primary' }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                fontFamily: '"Playfair Display", serif'
              }}
            >
              Tin Nổi Bật
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Cập nhật tin tức y tế và sức khỏe mới nhất
            </Typography>
          </Box>

          {/* Bài Tập */}
          <Box
            onClick={() => scrollToSection('exercise-articles')}
            sx={{
              bgcolor: 'background.default',
              borderRadius: '4px',
              p: 4,
              textAlign: 'center',
              border: '2px solid',
              borderColor: 'divider',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                bgcolor: 'secondary.main',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              },
              '&:hover': {
                transform: 'translateY(-8px)',
                borderColor: 'secondary.main',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                '&::before': {
                  opacity: 1
                }
              }
            }}
          >
            <FitnessCenterIcon sx={{ fontSize: 48, mb: 2, color: 'text.primary' }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                fontFamily: '"Playfair Display", serif'
              }}
            >
              Bài Tập Phục Hồi
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Hướng dẫn các bài tập phục hồi chức năng
            </Typography>
          </Box>

          {/* Âm Nhạc */}
          <Box
            onClick={() => scrollToSection('music-videos')}
            sx={{
              bgcolor: 'background.default',
              borderRadius: '4px',
              p: 4,
              textAlign: 'center',
              border: '2px solid',
              borderColor: 'divider',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                bgcolor: 'secondary.main',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              },
              '&:hover': {
                transform: 'translateY(-8px)',
                borderColor: 'secondary.main',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                '&::before': {
                  opacity: 1
                }
              }
            }}
          >
            <MusicNoteIcon sx={{ fontSize: 48, mb: 2, color: 'text.primary' }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                fontFamily: '"Playfair Display", serif'
              }}
            >
              Âm Nhạc Thư Giãn
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Âm nhạc giúp thư giãn và phục hồi tinh thần
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
