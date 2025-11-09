import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function MusicVideos({ onVideoClick }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedType, setSelectedType] = useState('all');
  const scrollRef = useRef(null);

  // Music type filters
  const musicTypes = [
    { id: 'all', label: 'Tất cả' },
    { id: 'meditation', label: 'Thiền' },
    { id: 'nature', label: 'Thiên nhiên' },
    { id: 'yoga', label: 'Yoga' },
    { id: 'piano', label: 'Piano' },
    { id: 'sleep', label: 'Ngủ ngon' }
  ];

  // Mock data - Âm nhạc giải trí (updated with type)
  const musicVideos = [
    {
      id: 1,
      title: 'Nhạc Thiền Giảm Căng Thẳng',
      thumbnail: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&h=500&fit=crop',
      youtubeId: 'lFcSrYw-ARY',
      duration: '30:00',
      type: 'meditation',
      description: 'Nhạc thiền nhẹ nhàng giúp thư giãn tâm trí và giảm căng thẳng sau một ngày làm việc mệt mỏi.'
    },
    {
      id: 2,
      title: 'Âm Thanh Thiên Nhiên Thư Giãn',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop',
      youtubeId: '1ZYbU82GVz4',
      duration: '60:00',
      type: 'nature',
      description: 'Tiếng suối chảy, chim hót kết hợp âm nhạc giúp bạn thư giãn và ngủ ngon.'
    },
    {
      id: 3,
      title: 'Nhạc Yoga Chữa Lành',
      thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&h=500&fit=crop',
      youtubeId: '3jWRrafhO7M',
      duration: '45:00',
      type: 'yoga',
      description: 'Nhạc dành cho tập yoga và thiền, giúp cân bằng năng lượng và chữa lành cơ thể.'
    },
    {
      id: 4,
      title: 'Nhạc Piano Êm Dịu',
      thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=500&fit=crop',
      youtubeId: '4oStw0r33so',
      duration: '180:00',
      type: 'piano',
      description: 'Những bản nhạc piano nhẹ nhàng giúp tập trung làm việc và học tập hiệu quả.'
    },
    {
      id: 5,
      title: 'Âm Nhạc Giúp Ngủ Ngon',
      thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=500&fit=crop',
      youtubeId: 'tNkZsRW7h2c',
      duration: '480:00',
      type: 'sleep',
      description: 'Nhạc ngủ 8 tiếng liên tục giúp bạn có giấc ngủ sâu và chất lượng.'
    }
  ];

  // Filter videos by type
  const filteredVideos = selectedType === 'all' 
    ? musicVideos 
    : musicVideos.filter(video => video.type === selectedType);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);

  // Scroll handlers with pagination
  const scrollLeft = () => {
    const container = scrollRef.current;
    if (container) {
      const newPage = Math.max(0, currentPage - 1);
      setCurrentPage(newPage);
      container.scrollTo({
        left: newPage * container.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    if (container) {
      const newPage = Math.min(totalPages - 1, currentPage + 1);
      setCurrentPage(newPage);
      container.scrollTo({
        left: newPage * container.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const goToPage = (pageIndex) => {
    const container = scrollRef.current;
    if (container) {
      setCurrentPage(pageIndex);
      container.scrollTo({
        left: pageIndex * container.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box sx={{ mb: 8 }} id="music-videos">
      {/* Header với gradient background */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          borderRadius: 4,
          p: 4,
          mb: 4,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(50%, -50%)'
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            🎵 Âm Nhạc Giải Trí
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.95, mb: 3 }}>
            Âm nhạc giúp thư giãn và phục hồi tinh thần
          </Typography>

          {/* Music Type Filter */}
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {musicTypes.map((type) => (
              <Chip
                key={type.id}
                label={type.label}
                onClick={() => {
                  setSelectedType(type.id);
                  setCurrentPage(0);
                }}
                sx={{
                  bgcolor: selectedType === type.id 
                    ? 'rgba(255,255,255,0.3)' 
                    : 'rgba(255,255,255,0.15)',
                  color: 'white',
                  fontWeight: selectedType === type.id ? 700 : 500,
                  border: selectedType === type.id 
                    ? '2px solid white' 
                    : '2px solid transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.25)'
                  }
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Video Cards Container với Navigation */}
      <Box sx={{ position: 'relative' }}>
        {/* Navigation Buttons */}
        {currentPage > 0 && (
          <IconButton 
            onClick={scrollLeft}
            sx={{ 
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'white',
              boxShadow: 3,
              '&:hover': { bgcolor: 'grey.100', boxShadow: 6 },
              width: 48,
              height: 48
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
        
        {currentPage < totalPages - 1 && (
          <IconButton 
            onClick={scrollRight}
            sx={{ 
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'white',
              boxShadow: 3,
              '&:hover': { bgcolor: 'grey.100', boxShadow: 6 },
              width: 48,
              height: 48
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}

        {/* Video Cards */}
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            pb: 2
          }}
        >
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              sx={{
                minWidth: 320,
                maxWidth: 320,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(250, 112, 154, 0.15)',
                border: '1px solid',
                borderColor: 'rgba(250, 112, 154, 0.1)',
                '&:hover': {
                  transform: 'translateY(-12px)',
                  boxShadow: '0 12px 28px rgba(250, 112, 154, 0.25)',
                  borderColor: 'rgba(250, 112, 154, 0.3)',
                  '& .play-overlay': {
                    opacity: 1
                  }
                }
              }}
              onClick={() => onVideoClick(video)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={video.thumbnail}
                  alt={video.title}
                  sx={{ objectFit: 'cover' }}
                />
                {/* Play Button Overlay */}
                <Box
                  className="play-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0,0,0,0.6)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <PlayCircleOutlineIcon 
                    sx={{ 
                      fontSize: 64, 
                      color: 'white',
                      filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))'
                    }} 
                  />
                </Box>
                {/* Duration Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    bgcolor: 'rgba(0,0,0,0.85)',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  ⏱️ {video.duration}
                </Box>
              </Box>
              <Box sx={{ p: 2.5 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    fontSize: '1rem',
                    lineHeight: 1.4,
                    minHeight: 44,
                    color: 'text.primary'
                  }}
                >
                  {video.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: 42
                  }}
                >
                  {video.description}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Dots Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 3 }}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Box
              key={index}
              onClick={() => goToPage(index)}
              sx={{
                width: currentPage === index ? 32 : 10,
                height: 10,
                borderRadius: 5,
                bgcolor: currentPage === index ? '#fa709a' : 'grey.300',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: currentPage === index ? '#e85d87' : 'grey.400'
                }
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
