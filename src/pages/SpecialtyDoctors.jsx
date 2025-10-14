import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  useTheme,
  Paper,
  IconButton,
  Drawer,
  Slider
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/Header';

// Mock data - Backend will provide via API
const getDoctorsBySpecialty = (specialtyId) => {
  // This would be: const response = await fetch(`/api/doctors?specialty=${specialtyId}`);
  return [
    {
      id: 1,
      name: 'Dr. Nguyễn Văn Hoàng',
      specialty: 'Bác sĩ tim mạch cao cấp',
      experience: 15,
      rating: 4.8,
      reviews: 245,
      availableToday: true,
      consultationFee: 500000,
      hospital: 'Bệnh viện Đa khoa Trung ương',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop',
      languages: ['Tiếng Việt', 'English'],
      education: 'Đại học Y Hà Nội',
      nextAvailable: '14:00 - Hôm nay'
    },
    {
      id: 2,
      name: 'Dr. Trần Thị Hương',
      specialty: 'Chuyên gia tim mạch',
      experience: 12,
      rating: 4.9,
      reviews: 312,
      availableToday: true,
      consultationFee: 450000,
      hospital: 'Bệnh viện Bạch Mai',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop',
      languages: ['Tiếng Việt'],
      education: 'Đại học Y Dược TP.HCM',
      nextAvailable: '16:30 - Hôm nay'
    },
    {
      id: 3,
      name: 'Dr. Phạm Minh Khoa',
      specialty: 'Chuyên gia chẩn đoán hình ảnh tim',
      experience: 20,
      rating: 4.7,
      reviews: 189,
      availableToday: false,
      consultationFee: 600000,
      hospital: 'Bệnh viện Chợ Rẫy',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop',
      languages: ['Tiếng Việt', 'English', '中文'],
      education: 'Đại học Y Hà Nội',
      nextAvailable: '09:00 - Ngày mai'
    },
    {
      id: 4,
      name: 'Dr. Lê Thị Mai',
      specialty: 'Bác sĩ tim mạch nhi',
      experience: 18,
      rating: 4.9,
      reviews: 278,
      availableToday: true,
      consultationFee: 480000,
      hospital: 'Bệnh viện Nhi Trung ương',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop',
      languages: ['Tiếng Việt', 'English'],
      education: 'Đại học Y Dược TP.HCM',
      nextAvailable: '10:00 - Hôm nay'
    }
  ];
};

const DoctorCard = ({ doctor }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        border: `1px solid ${theme.palette.divider}`,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
          borderColor: theme.palette.primary.main
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Avatar
            src={doctor.image}
            sx={{
              width: 100,
              height: 100,
              border: `3px solid ${theme.palette.primary.main}`
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {doctor.name}
              </Typography>
              {doctor.availableToday && (
                <Chip
                  label="Có lịch hôm nay"
                  color="success"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Box>
            <Typography variant="body2" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
              {doctor.specialty}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
              <Rating value={doctor.rating} precision={0.1} size="small" readOnly />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {doctor.rating}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ({doctor.reviews})
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              📍 {doctor.hospital}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              🎓 {doctor.education}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          <Chip label={`${doctor.experience} năm kinh nghiệm`} size="small" variant="outlined" />
          {doctor.languages.map((lang) => (
            <Chip key={lang} label={lang} size="small" variant="outlined" />
          ))}
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: theme.palette.grey[50],
            borderRadius: 2,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Phí tư vấn
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              {doctor.consultationFee.toLocaleString('vi-VN')} VNĐ
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" color="text.secondary">
              Lịch khám tiếp theo
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: doctor.availableToday ? 'success.main' : 'warning.main' }}>
              {doctor.nextAvailable}
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<CalendarMonthIcon />}
            onClick={() => navigate(`/booking/doctor/${doctor.id}`)}
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Đặt lịch ngay
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/booking/doctor/${doctor.id}/info`)}
            sx={{ borderRadius: 2, px: 2 }}
          >
            Info
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function SpecialtyDoctors() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { specialtyId } = useParams();
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('rating');
  const [filterDrawerOpen, setFilterDrawerOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({
    experience: [0, 30],
    rating: 0,
    availableToday: false,
    priceRange: [0, 1000000]
  });

  // Load doctors from backend
  const [doctors, setDoctors] = React.useState([]);
  
  React.useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchDoctors = async () => {
    //   const response = await fetch(`/api/doctors?specialty=${specialtyId}`);
    //   const data = await response.json();
    //   setDoctors(data);
    // };
    // fetchDoctors();
    
    setDoctors(getDoctorsBySpecialty(specialtyId));
  }, [specialtyId]);

  // Filter and sort doctors
  const filteredDoctors = doctors
    .filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesExperience = doctor.experience >= filters.experience[0] && 
                               doctor.experience <= filters.experience[1];
      const matchesRating = doctor.rating >= filters.rating;
      const matchesAvailability = !filters.availableToday || doctor.availableToday;
      const matchesPrice = doctor.consultationFee >= filters.priceRange[0] && 
                          doctor.consultationFee <= filters.priceRange[1];
      
      return matchesSearch && matchesExperience && matchesRating && matchesAvailability && matchesPrice;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'price-low':
          return a.consultationFee - b.consultationFee;
        case 'price-high':
          return b.consultationFee - a.consultationFee;
        default:
          return 0;
      }
    });

  const specialtyNames = {
    cardiology: 'Tim mạch',
    neurology: 'Thần kinh',
    pediatrics: 'Nhi khoa',
    // Add more...
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Back button and header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/booking')}
            sx={{ mb: 2 }}
          >
            Quay lại
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Bác sĩ {specialtyNames[specialtyId] || 'Chuyên khoa'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tìm thấy {filteredDoctors.length} bác sĩ
          </Typography>
        </Box>

        {/* Search and filters */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm theo tên bác sĩ hoặc chuyên khoa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sắp xếp theo</InputLabel>
                <Select
                  value={sortBy}
                  label="Sắp xếp theo"
                  onChange={(e) => setSortBy(e.target.value)}
                  startAdornment={<SortIcon sx={{ ml: 1, mr: -0.5 }} />}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
                  <MenuItem value="experience">Kinh nghiệm nhiều nhất</MenuItem>
                  <MenuItem value="price-low">Giá thấp đến cao</MenuItem>
                  <MenuItem value="price-high">Giá cao đến thấp</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setFilterDrawerOpen(true)}
                sx={{ 
                  height: 56, 
                  borderRadius: 3,
                  fontWeight: 600
                }}
              >
                Bộ lọc
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Active filters */}
        {(filters.rating > 0 || filters.availableToday) && (
          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            {filters.rating > 0 && (
              <Chip
                label={`Đánh giá ≥ ${filters.rating} sao`}
                onDelete={() => setFilters({ ...filters, rating: 0 })}
                color="primary"
              />
            )}
            {filters.availableToday && (
              <Chip
                label="Có lịch hôm nay"
                onDelete={() => setFilters({ ...filters, availableToday: false })}
                color="primary"
              />
            )}
          </Box>
        )}

        {/* Doctors list */}
        <Grid container spacing={3}>
          {filteredDoctors.map((doctor) => (
            <Grid item xs={12} key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </Grid>
          ))}
        </Grid>

        {filteredDoctors.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Không tìm thấy bác sĩ phù hợp
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Vui lòng thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </Typography>
          </Box>
        )}
      </Container>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400 }, p: 3 }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Bộ lọc tìm kiếm
          </Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Số năm kinh nghiệm
          </Typography>
          <Slider
            value={filters.experience}
            onChange={(e, newValue) => setFilters({ ...filters, experience: newValue })}
            valueLabelDisplay="auto"
            min={0}
            max={30}
            marks={[
              { value: 0, label: '0 năm' },
              { value: 30, label: '30+ năm' }
            ]}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Đánh giá tối thiểu
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {[0, 3, 4, 4.5, 5].map((rating) => (
              <Chip
                key={rating}
                label={rating === 0 ? 'Tất cả' : `${rating}+ sao`}
                onClick={() => setFilters({ ...filters, rating })}
                color={filters.rating === rating ? 'primary' : 'default'}
                variant={filters.rating === rating ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Khoảng giá
          </Typography>
          <Slider
            value={filters.priceRange}
            onChange={(e, newValue) => setFilters({ ...filters, priceRange: newValue })}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${(value/1000).toFixed(0)}K`}
            min={0}
            max={1000000}
            step={50000}
            marks={[
              { value: 0, label: '0đ' },
              { value: 1000000, label: '1tr' }
            ]}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Chip
            label="Có lịch hôm nay"
            onClick={() => setFilters({ ...filters, availableToday: !filters.availableToday })}
            color={filters.availableToday ? 'primary' : 'default'}
            variant={filters.availableToday ? 'filled' : 'outlined'}
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setFilters({
              experience: [0, 30],
              rating: 0,
              availableToday: false,
              priceRange: [0, 1000000]
            })}
          >
            Đặt lại
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setFilterDrawerOpen(false)}
          >
            Áp dụng
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
