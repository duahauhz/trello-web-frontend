import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TimerIcon from '@mui/icons-material/Timer';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export default function ArticleDialog({ open, onClose, article }) {
  if (!article) return null;

  const isExercise = article.duration && article.difficulty;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          m: 0, 
          p: 3, 
          bgcolor: 'background.paper',
          borderBottom: '3px solid',
          borderColor: 'secondary.main'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            pr: 6, 
            lineHeight: 1.4,
            fontFamily: '"Playfair Display", serif',
            color: 'text.primary'
          }}
        >
          {article.title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: 'text.primary',
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 4 }}>
        {/* Article Image */}
        {article.image && (
          <Box
            component="img"
            src={article.image}
            alt={article.title}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 400,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        )}

        {/* Article Meta */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          {article.category && (
            <Chip 
              label={article.category === 'health' ? 'Sức khỏe' :
                     article.category === 'medical' ? 'Y khoa' :
                     article.category === 'nutrition' ? 'Dinh dưỡng' :
                     article.category === 'lifestyle' ? 'Lối sống' : article.category}
              sx={{ 
                bgcolor: 'secondary.main',
                color: 'white',
                fontWeight: 600
              }}
              size="small"
            />
          )}
          
          {article.date && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                {article.date}
              </Typography>
            </Box>
          )}
          
          {article.views && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                {article.views} lượt xem
              </Typography>
            </Box>
          )}

          {isExercise && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TimerIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {article.duration}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FitnessCenterIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {article.difficulty}
                </Typography>
              </Box>
            </>
          )}
        </Box>

        {/* Article Content */}
        <Box
          sx={{
            '& h2': {
              fontSize: '1.75rem',
              fontWeight: 700,
              fontFamily: '"Playfair Display", serif',
              color: 'text.primary',
              mb: 2,
              mt: 3
            },
            '& h3': {
              fontSize: '1.25rem',
              fontWeight: 600,
              fontFamily: '"Playfair Display", serif',
              color: 'text.primary',
              mb: 1.5,
              mt: 2
            },
            '& p': {
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'text.secondary',
              mb: 2
            },
            '& strong': {
              color: 'text.primary',
              fontWeight: 600
            }
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </DialogContent>
    </Dialog>
  );
}
