import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  useTheme,
  CardActionArea,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HealingIcon from '@mui/icons-material/Healing';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import SpaIcon from '@mui/icons-material/Spa';

const specialties = [
  {
    id: 'cardiology',
    name: 'Tim mạch',
    icon: <FavoriteIcon sx={{ fontSize: 32 }} />,
    color: '#e74c3c',
    description: 'Chuyên khoa tim mạch',
    doctorCount: 24,
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&h=400&fit=crop&crop=center'
  },
  {
    id: 'neurology',
    name: 'Thần kinh',
    icon: <PsychologyIcon sx={{ fontSize: 32 }} />,
    color: '#9b59b6',
    description: 'Chuyên khoa thần kinh',
    doctorCount: 18,
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&h=400&fit=crop&crop=center'
  },
  {
    id: 'pediatrics',
    name: 'Nhi khoa',
    icon: <ChildCareIcon sx={{ fontSize: 32 }} />,
    color: '#3498db',
    description: 'Chuyên khoa trẻ em',
    doctorCount: 32,
    image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=600&h=400&fit=crop&crop=center'
  },
  {
    id: 'ophthalmology',
    name: 'Mắt',
    icon: <VisibilityIcon sx={{ fontSize: 32 }} />,
    color: '#1abc9c',
    description: 'Chuyên khoa mắt',
    doctorCount: 15,
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&h=400&fit=crop&crop=center'
  },
  {
    id: 'orthopedics',
    name: 'Chấn thương chỉnh hình',
    icon: <HealingIcon sx={{ fontSize: 32 }} />,
    color: '#f39c12',
    description: 'Chuyên khoa xương khớp',
    doctorCount: 21,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&crop=center'
  },
  {
    id: 'general',
    name: 'Nội tổng quát',
    icon: <LocalHospitalIcon sx={{ fontSize: 32 }} />,
    color: '#e67e22',
    description: 'Khám tổng quát',
    doctorCount: 28,
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&h=400&fit=crop&crop=center'
  },
  {
    id: 'dermatology',
    name: 'Da liễu',
    icon: <SpaIcon sx={{ fontSize: 32 }} />,
    color: '#16a085',
    description: 'Chuyên khoa da liễu',
    doctorCount: 19,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop&crop=center'
  },
  {
    id: 'vaccination',
    name: 'Tiêm chủng',
    icon: <VaccinesIcon sx={{ fontSize: 32 }} />,
    color: '#27ae60',
    description: 'Dịch vụ tiêm chủng',
    doctorCount: 12,
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop&crop=center'
  }
];

const SpecialtyCard = ({ specialty }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2.5,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        position: 'relative',
        boxShadow: theme.shadows[1],
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 6px 16px ${specialty.color}35`,
          '& .specialty-image': {
            transform: 'scale(1.05)',
          },
          '& .specialty-overlay': {
            opacity: 0.75
          }
        }
      }}
    >
      <CardActionArea onClick={() => navigate(`/booking/specialty/${specialty.id}`)}>
        {/* Background Image */}
        <Box
          sx={{
            height: 120,
            position: 'relative',
            overflow: 'hidden',
            bgcolor: specialty.color
          }}
        >
          <Box
            component="img"
            src={specialty.image}
            alt={specialty.name}
            className="specialty-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = `linear-gradient(135deg, ${specialty.color}dd, ${specialty.color}99)`;
            }}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'transform 0.3s ease'
            }}
          />
          <Box
            className="specialty-overlay"
            sx={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${specialty.color}bb, ${specialty.color}77)`,
              opacity: 0.7,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                color: 'white',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }}
            >
              {specialty.icon}
            </Box>
          </Box>
        </Box>
        
        <CardContent sx={{ p: 1.8 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 0.6,
              color: specialty.color,
              fontSize: '0.95rem'
            }}
          >
            {specialty.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 1, 
              fontSize: '0.8rem',
              lineHeight: 1.4
            }}
          >
            {specialty.description}
          </Typography>
          <Chip
            label={`${specialty.doctorCount} bác sĩ`}
            size="small"
            sx={{
              bgcolor: `${specialty.color}20`,
              color: specialty.color,
              fontWeight: 600,
              fontSize: '0.7rem',
              height: 22
            }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default function MedicalSpecialties() {
  const theme = useTheme();

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3 } }}>
      <Box sx={{ textAlign: 'center', mb: 3.5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: theme.palette.primary.main
          }}
        >
          Chuyên khoa khám bệnh
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Chọn chuyên khoa phù hợp để tìm bác sĩ chuyên môn cao
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {specialties.map((specialty) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={specialty.id}>
            <SpecialtyCard specialty={specialty} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
