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
  useTheme,
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
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2.5,
        transition: 'all 0.3s ease',
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[6],
          borderColor: theme.palette.primary.main
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
          <Avatar
            src={doctor.image}
            sx={{
              width: 64,
              height: 64,
              border: `2px solid ${theme.palette.primary.main}`
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.3 }}>
              {doctor.name}
            </Typography>
            <Typography variant="caption" color="primary" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
              {doctor.specialty}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Rating value={doctor.rating} precision={0.1} size="small" readOnly />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
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
              color="success"
              size="small"
              sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600 }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <WorkIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
            <Typography variant="caption">
              <strong>Kinh nghiệm:</strong> {doctor.experience}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <ThumbUpIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
            <Typography variant="caption">
              <strong>Bệnh nhân:</strong> {doctor.patients}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            📍 {doctor.location}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 1.2,
            bgcolor: theme.palette.grey[50],
            borderRadius: 1.5,
            mb: 1.5,
            textAlign: 'center'
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
            Phí tư vấn
          </Typography>
          <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 700 }}>
            {doctor.consultationFee}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<CalendarMonthIcon sx={{ fontSize: 16 }} />}
            onClick={() => navigate(`/booking/appointment/${doctor.id}`)}
            sx={{
              borderRadius: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              py: 0.8,
              fontSize: '0.8rem'
            }}
          >
            Đặt lịch
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/booking/doctor/${doctor.id}`)}
            sx={{ borderRadius: 1.5, minWidth: 'auto', px: 1.5, py: 0.8, fontSize: '0.75rem' }}
          >
            Info
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function TopRatedDoctors() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              color: theme.palette.primary.main
            }}
          >
            Bác sĩ được đánh giá cao nhất
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
            Những bác sĩ hàng đầu với chuyên môn cao
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={() => navigate('/booking/doctors')}
          sx={{
            borderRadius: 2,
            px: 2.5,
            py: 0.8,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '0.875rem'
          }}
        >
          Xem tất cả
        </Button>
      </Box>

      <Grid container spacing={2}>
        {topDoctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <DoctorCard doctor={doctor} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
