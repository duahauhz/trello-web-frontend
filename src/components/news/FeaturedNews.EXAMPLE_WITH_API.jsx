// Example: FeaturedNews component with Backend Integration
// Copy this code to replace the mock data in FeaturedNews.jsx when backend is ready

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  Tabs,
  Tab,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getFeaturedNews, incrementViewCount } from '../../services/newsService';

export default function FeaturedNews({ onArticleClick }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef(null);
  
  // ========== NEW: State for API data ==========
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Categories remain the same
  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'health', label: 'Sức khỏe' },
    { id: 'medical', label: 'Y khoa' },
    { id: 'nutrition', label: 'Dinh dưỡng' },
    { id: 'lifestyle', label: 'Lối sống' }
  ];

  // ========== NEW: Fetch data from API ==========
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Call API with filter
        const data = await getFeaturedNews({ 
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          limit: 12 
        });
        
        setFeaturedNews(data.data || data); // Support both {data: [...]} and [...]
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Không thể tải tin tức. Vui lòng thử lại sau.');
        // Service will automatically fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory]); // Re-fetch when category changes

  // ========== NEW: Handle article click with analytics ==========
  const handleArticleClick = async (article) => {
    // Increment view count (fire and forget)
    try {
      await incrementViewCount(article.id, 'news');
    } catch (err) {
      // Silently fail for analytics
      console.error('Failed to increment view:', err);
    }
    
    // Open article dialog
    onArticleClick(article);
  };

  // Filter logic (can be removed if backend handles it)
  const filteredNews = selectedCategory === 'all' 
    ? featuredNews 
    : featuredNews.filter(news => news.category === selectedCategory);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  // Scroll handlers (keep as is)
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

  // ========== NEW: Loading State ==========
  if (loading) {
    return (
      <Box sx={{ mb: 8 }} id="featured-news">
        <Box 
          sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 4,
            p: 4,
            mb: 4,
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            📰 Tin Nổi Bật Trong Ngày
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      </Box>
    );
  }

  // ========== NEW: Error State ==========
  if (error && filteredNews.length === 0) {
    return (
      <Box sx={{ mb: 8 }} id="featured-news">
        <Box 
          sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 4,
            p: 4,
            mb: 4,
            color: 'white'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            📰 Tin Nổi Bật Trong Ngày
          </Typography>
        </Box>
        
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 8 }} id="featured-news">
      {/* Header with Gradient and Tabs */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            📰 Tin Nổi Bật Trong Ngày
          </Typography>
          
          {/* Category Tabs */}
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => {
              setSelectedCategory(newValue);
              setCurrentPage(0); // Reset to first page when category changes
            }}
            sx={{
              '& .MuiTab-root': { 
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 600,
                minHeight: 48
              },
              '& .Mui-selected': { 
                color: 'white !important',
                fontWeight: 700
              },
              '& .MuiTabs-indicator': { 
                backgroundColor: 'white',
                height: 3
              }
            }}
          >
            {categories.map((cat) => (
              <Tab key={cat.id} label={cat.label} value={cat.id} />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* News Cards Container */}
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

        {/* Cards Grid */}
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
          {filteredNews.map((news) => (
            <Card
              key={news.id}
              onClick={() => handleArticleClick(news)}
              sx={{
                flex: '0 0 320px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'rgba(102, 126, 234, 0.1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(102, 126, 234, 0.25)'
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={news.image}
                  alt={news.title}
                  sx={{ objectFit: 'cover' }}
                />
                <Chip
                  label={
                    news.category === 'health' ? 'Sức khỏe' :
                    news.category === 'medical' ? 'Y khoa' :
                    news.category === 'nutrition' ? 'Dinh dưỡng' :
                    news.category === 'lifestyle' ? 'Lối sống' : news.category
                  }
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    bgcolor: 'rgba(102, 126, 234, 0.9)',
                    color: 'white',
                    fontWeight: 700,
                    backdropFilter: 'blur(4px)'
                  }}
                />
              </Box>
              
              <CardContent>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: 56,
                    color: 'primary.main'
                  }}
                >
                  {news.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: 40
                  }}
                >
                  {news.excerpt}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {news.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <VisibilityIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {news.views}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
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
                bgcolor: currentPage === index ? 'primary.main' : 'grey.300',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: currentPage === index ? 'primary.dark' : 'grey.400'
                }
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
