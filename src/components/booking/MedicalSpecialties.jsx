import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
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
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        border: '1px solid',
        borderColor: 'divider',
        borderLeft: '3px solid',
        borderLeftColor: 'transparent',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          borderLeftColor: 'secondary.main',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)',
          '& .specialty-icon': {
            transform: 'scale(1.1)',
            color: 'secondary.main'
          }
        }
      }}
    >
      <CardActionArea onClick={() => navigate(`/booking/specialty/${specialty.id}`)}>
        {/* Icon Header */}
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'rgba(0,0,0,0.01)'
          }}
        >
          <Box
            className="specialty-icon"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '2px solid',
              borderColor: 'divider',
              color: 'text.secondary',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '& svg': {
                fontSize: 32
              }
            }}
          >
            {specialty.icon}
          </Box>
        </Box>
        
        <CardContent sx={{ p: 2.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 1,
              color: 'text.primary',
              fontSize: '1.1rem',
              textAlign: 'center'
            }}
          >
            {specialty.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2, 
              fontSize: '0.875rem',
              lineHeight: 1.6,
              textAlign: 'center'
            }}
          >
            {specialty.description}
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Chip
              label={`${specialty.doctorCount} bác sĩ`}
              size="small"
              sx={{
                bgcolor: 'rgba(231, 76, 60, 0.08)',
                color: 'secondary.main',
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 24,
                border: '1px solid',
                borderColor: 'rgba(231, 76, 60, 0.2)'
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default function MedicalSpecialties() {
  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3 } }}>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography 
          variant="overline"
          sx={{
            color: 'secondary.main',
            fontWeight: 600,
            letterSpacing: '0.15em',
            fontSize: '0.875rem',
            mb: 1,
            display: 'block'
          }}
        >
          CHUYÊN KHOA
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: 'text.primary',
            mb: 1,
            fontSize: { xs: '1.75rem', md: '2.25rem' }
          }}
        >
          Chuyên Khoa Khám Bệnh
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}
        >
          Chọn chuyên khoa phù hợp để tìm bác sĩ chuyên môn cao
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {specialties.map((specialty) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={specialty.id}>
            <SpecialtyCard specialty={specialty} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
