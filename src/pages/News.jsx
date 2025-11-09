import { useState } from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/Header';
import NewsHero from '../components/news/NewsHero';
import FeaturedNews from '../components/news/FeaturedNews';
import ExerciseArticles from '../components/news/ExerciseArticles';
import MusicVideos from '../components/news/MusicVideos';
import ArticleDialog from '../components/news/ArticleDialog';
import VideoDialog from '../components/news/VideoDialog';

export default function News() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [openArticleDialog, setOpenArticleDialog] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);

  // Handlers for articles
  const handleOpenArticle = (article) => {
    setSelectedArticle(article);
    setOpenArticleDialog(true);
  };

  const handleCloseArticle = () => {
    setOpenArticleDialog(false);
    setTimeout(() => setSelectedArticle(null), 200);
  };

  // Handlers for videos
  const handleOpenVideo = (video) => {
    setSelectedVideo(video);
    setOpenVideoDialog(true);
  };

  const handleCloseVideo = () => {
    setOpenVideoDialog(false);
    setTimeout(() => setSelectedVideo(null), 200);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Header />
      <NewsHero />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Featured News Section */}
        <Box sx={{ mb: 12 }}>
          <FeaturedNews onArticleClick={handleOpenArticle} />
        </Box>

        {/* Exercise Articles Section */}
        <Box sx={{ mb: 12 }}>
          <ExerciseArticles onArticleClick={handleOpenArticle} />
        </Box>

        {/* Music Videos Section */}
        <Box sx={{ mb: 8 }}>
          <MusicVideos onVideoClick={handleOpenVideo} />
        </Box>
      </Container>

      {/* Article Dialog */}
      <ArticleDialog 
        open={openArticleDialog}
        onClose={handleCloseArticle}
        article={selectedArticle}
      />

      {/* Video Dialog */}
      <VideoDialog 
        open={openVideoDialog}
        onClose={handleCloseVideo}
        video={selectedVideo}
      />
    </Box>
  );
}
