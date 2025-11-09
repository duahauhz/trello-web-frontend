import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function VideoDialog({ open, onClose, video }) {
  if (!video) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
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
            fontFamily: '"Playfair Display", serif',
            color: 'text.primary'
          }}
        >
          {video.title}
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
      
      <DialogContent sx={{ p: 0, bgcolor: '#000' }}>
        {/* YouTube Video Player */}
        <Box
          sx={{
            position: 'relative',
            paddingTop: '56.25%', // 16:9 aspect ratio
            width: '100%',
            bgcolor: '#000'
          }}
        >
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              outline: 'none'
            }}
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
        
        {/* Video Description */}
        <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {video.description}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
