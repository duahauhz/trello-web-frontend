import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Chip,
  Button,
  Grid,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Mock data - Backend will provide via API
const topDoctors = [
  {
    id: 1,
    name: 'Dr. Nguyễn Minh Khoa',
    specialty: 'Bác sĩ Tim mạch',
    location: 'Hà Nội, Việt Nam',
    experience: '32 năm',
    rating: 4.9,
    reviews: 1842,
    patients: '25,000+',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop',
    availableToday: true,
    consultationFee: '500,000 VNĐ'
  },
  {
    id: 2,
    name: 'Dr. Trần Thị Hương',
    specialty: 'Bác sĩ Thần kinh',
    location: 'TP.HCM, Việt Nam',
    experience: '28 năm',
    rating: 4.8,
    reviews: 1523,
    patients: '20,000+',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop',
    availableToday: true,
    consultationFee: '450,000 VNĐ'
  },
  {
    id: 3,
    name: 'Dr. Phạm Văn Đức',
    specialty: 'Bác sĩ Chấn thương chỉnh hình',
    location: 'Hà Nội, Việt Nam',
    experience: '25 năm',
    rating: 4.9,
    reviews: 1698,
    patients: '18,500+',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop',
    availableToday: false,
    consultationFee: '400,000 VNĐ'
  },
  {
    id: 4,
    name: 'Dr. Lê Thị Mai',
    specialty: 'Bác sĩ Nhi khoa',
    location: 'Đà Nẵng, Việt Nam',
    experience: '30 năm',
    rating: 4.7,
    reviews: 1456,
    patients: '22,000+',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop',
    availableToday: true,
    consultationFee: '350,000 VNĐ'
  },
  {
    id: 5,
    name: 'Dr. Hoàng Văn Long',
    specialty: 'Bác sĩ Da liễu',
    location: 'TP.HCM, Việt Nam',
    experience: '26 năm',
    rating: 4.8,
    reviews: 1332,
    patients: '19,000+',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop',
    availableToday: true,
    consultationFee: '380,000 VNĐ'
  },
  {
    id: 6,
    name: 'Dr. Vũ Thị Lan',
    specialty: 'Bác sĩ Nội khoa',
    location: 'Hà Nội, Việt Nam',
    experience: '35 năm',
    rating: 4.9,
    reviews: 1789,
    patients: '30,000+',
    image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=300&h=300&fit=crop',
    availableToday: false,
    consultationFee: '420,000 VNĐ'
  }
];

const DoctorCard = ({ doctor }) => {
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
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Doctor Header */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Avatar
            src={doctor.image}
            sx={{
              width: 64,
              height: 64,
              border: '2px solid',
              borderColor: 'divider',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 700, 
                mb: 0.5,
                fontSize: '1rem',
                color: 'text.primary'
              }}
            >
              {doctor.name}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: 600, 
                display: 'block', 
                mb: 0.8,
                color: 'secondary.main',
                fontSize: '0.8rem'
              }}
            >
              {doctor.specialty}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Rating value={doctor.rating} precision={0.1} size="small" readOnly 
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#f39c12'
                  }
                }}
              />
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {doctor.rating}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ({doctor.reviews})
              </Typography>
            </Box>
          </Box>
          {doctor.availableToday && (
            <Chip
              label="Có lịch"
              size="small"
              sx={{ 
                height: 24, 
                fontSize: '0.7rem', 
                fontWeight: 600,
                bgcolor: 'rgba(46, 204, 113, 0.1)',
                color: '#27ae60',
                border: '1px solid rgba(46, 204, 113, 0.3)'
              }}
            />
          )}
        </Box>

        {/* Doctor Info */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1.2, 
            mb: 2,
            p: 2,
            bgcolor: 'rgba(0,0,0,0.02)',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <WorkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                Kinh nghiệm
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                {doctor.experience}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <ThumbUpIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                Bệnh nhân
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                {doctor.patients}
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', pl: 1 }}>
            📍 {doctor.location}
          </Typography>
        </Box>

        {/* Consultation Fee */}
        <Box
          sx={{
            p: 1.5,
            bgcolor: 'rgba(231, 76, 60, 0.04)',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'rgba(231, 76, 60, 0.15)',
            mb: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', display: 'block', mb: 0.3 }}>
            Phí tư vấn
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 700,
              color: 'secondary.main',
              fontSize: '1rem'
            }}
          >
            {doctor.consultationFee}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<CalendarMonthIcon sx={{ fontSize: 16 }} />}
            onClick={() => navigate(`/booking/appointment/${doctor.id}`)}
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              py: 1,
              fontSize: '0.85rem',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'secondary.dark',
                boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)'
              }
            }}
          >
            Đặt lịch
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/booking/doctor/${doctor.id}`)}
            sx={{ 
              minWidth: 'auto', 
              px: 2, 
              py: 1, 
              fontSize: '0.85rem',
              borderColor: 'divider',
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                borderColor: 'text.secondary',
                bgcolor: 'rgba(0,0,0,0.02)'
              }
            }}
          >
            Info
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function TopRatedDoctors() {
  const navigate = useNavigate();

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
          ĐỘI NGŨ BÁC SĨ
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
          Bác Sĩ Hàng Đầu
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7,
            mb: 3
          }}
        >
          Những bác sĩ được đánh giá cao với chuyên môn xuất sắc
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/booking/doctors')}
          sx={{
            borderColor: 'divider',
            color: 'text.primary',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1.2,
            '&:hover': {
              borderColor: 'secondary.main',
              color: 'secondary.main',
              bgcolor: 'rgba(231, 76, 60, 0.04)'
            }
          }}
        >
          Xem tất cả bác sĩ
        </Button>
      </Box>

      <Grid container spacing={3}>
        {topDoctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <DoctorCard doctor={doctor} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
