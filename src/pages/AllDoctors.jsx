import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Avatar,
  Rating,
  Chip,
  Button,
  useTheme,
  IconButton,
  Drawer,
  Slider,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

// Mock data - will be replaced with backend API
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Nguyễn Minh Khoa',
    specialty: 'Bác sĩ Tim mạch',
    location: 'Hà Nội, Việt Nam',
    experience: 32,
    rating: 4.9,
    reviews: 1842,
    patients: '25,000+',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop',
    availableToday: true,
    consultationFee: 500000
  },
  {
    id: 2,
    name: 'Dr. Trần Thị Hương',
    specialty: 'Bác sĩ Thần kinh',
    location: 'TP.HCM, Việt Nam',
    experience: 28,
    rating: 4.8,
    reviews: 1523,
    patients: '20,000+',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop',
    availableToday: true,
    consultationFee: 450000
  },
  {
    id: 3,
    name: 'Dr. Phạm Văn Đức',
    specialty: 'Bác sĩ Chấn thương chỉnh hình',
    location: 'Hà Nội, Việt Nam',
    experience: 25,
    rating: 4.9,
    reviews: 1698,
    patients: '18,500+',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop',
    availableToday: false,
    consultationFee: 400000
  },
  {
    id: 4,
    name: 'Dr. Lê Thị Mai',
    specialty: 'Bác sĩ Nhi khoa',
    location: 'Đà Nẵng, Việt Nam',
    experience: 30,
    rating: 4.7,
    reviews: 1456,
    patients: '22,000+',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop',
    availableToday: true,
    consultationFee: 350000
  },
  {
    id: 5,
    name: 'Dr. Hoàng Văn Long',
    specialty: 'Bác sĩ Da liễu',
    location: 'TP.HCM, Việt Nam',
    experience: 26,
    rating: 4.8,
    reviews: 1332,
    patients: '19,000+',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop',
    availableToday: true,
    consultationFee: 380000
  },
  {
    id: 6,
    name: 'Dr. Vũ Thị Lan',
    specialty: 'Bác sĩ Nội khoa',
    location: 'Hà Nội, Việt Nam',
    experience: 35,
    rating: 4.9,
    reviews: 1789,
    patients: '30,000+',
    image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=300&h=300&fit=crop',
    availableToday: false,
    consultationFee: 420000
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
              width: 70,
              height: 70,
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
            </Box>
          </Box>
          {doctor.availableToday && (
            <Chip
              label="Có lịch"
              color="success"
              size="small"
              sx={{ height: 22, fontSize: '0.7rem' }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <WorkIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
            <Typography variant="caption">
              {doctor.experience} năm kinh nghiệm
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <ThumbUpIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
            <Typography variant="caption">
              {doctor.patients} bệnh nhân
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
            {doctor.consultationFee.toLocaleString('vi-VN')} VNĐ
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
            sx={{ borderRadius: 1.5, px: 1.5, py: 0.8, fontSize: '0.75rem' }}
          >
            Info
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function AllDoctors() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    experience: [0, 40],
    rating: 0,
    priceRange: [0, 1000000],
    availableToday: false
  });
  
  // Backend integration states
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO: Replace with actual API call
        // Build query params based on filters
        // const queryParams = new URLSearchParams({
        //   search: searchTerm,
        //   sortBy: sortBy,
        //   minExperience: filters.experience[0],
        //   maxExperience: filters.experience[1],
        //   minRating: filters.rating,
        //   minPrice: filters.priceRange[0],
        //   maxPrice: filters.priceRange[1],
        //   availableToday: filters.availableToday
        // });
        
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/doctors?${queryParams}`, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // });
        
        // if (!response.ok) {
        //   throw new Error('Failed to fetch doctors');
        // }
        
        // const data = await response.json();
        // setDoctors(data.doctors);

        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        setDoctors(mockDoctors);

      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Không thể tải danh sách bác sĩ. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [searchTerm, sortBy, filters]);

  const filteredDoctors = doctors
    .filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(doctor => doctor.experience >= filters.experience[0] && doctor.experience <= filters.experience[1])
    .filter(doctor => doctor.rating >= filters.rating)
    .filter(doctor => doctor.consultationFee >= filters.priceRange[0] && doctor.consultationFee <= filters.priceRange[1])
    .filter(doctor => !filters.availableToday || doctor.availableToday)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experience - a.experience;
      if (sortBy === 'price-low') return a.consultationFee - b.consultationFee;
      if (sortBy === 'price-high') return b.consultationFee - a.consultationFee;
      return 0;
    });

  // Loading state
  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <Container maxWidth="xl" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size={60} />
        </Container>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Thử lại
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Tất cả bác sĩ
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tìm kiếm và đặt lịch với các bác sĩ chuyên môn cao
          </Typography>
        </Box>

        {/* Search and Filter Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Tìm kiếm bác sĩ theo tên hoặc chuyên khoa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ flex: 1 }}
          />
          
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              size="medium"
            >
              <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
              <MenuItem value="experience">Kinh nghiệm nhiều nhất</MenuItem>
              <MenuItem value="price-low">Giá thấp đến cao</MenuItem>
              <MenuItem value="price-high">Giá cao đến thấp</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setFilterOpen(true)}
            sx={{ minWidth: 120 }}
          >
            Bộ lọc
          </Button>
        </Box>

        {/* Results */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Tìm thấy {filteredDoctors.length} bác sĩ
        </Typography>

        <Grid container spacing={2.5}>
          {filteredDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </Grid>
          ))}
        </Grid>

        {/* Filter Drawer */}
        <Drawer
          anchor="right"
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
        >
          <Box sx={{ width: 320, p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Bộ lọc tìm kiếm
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Kinh nghiệm (năm)
              </Typography>
              <Slider
                value={filters.experience}
                onChange={(e, newValue) => setFilters({ ...filters, experience: newValue })}
                valueLabelDisplay="auto"
                min={0}
                max={40}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Đánh giá tối thiểu
              </Typography>
              <Slider
                value={filters.rating}
                onChange={(e, newValue) => setFilters({ ...filters, rating: newValue })}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                step={0.5}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Phí tư vấn (VNĐ)
              </Typography>
              <Slider
                value={filters.priceRange}
                onChange={(e, newValue) => setFilters({ ...filters, priceRange: newValue })}
                valueLabelDisplay="auto"
                min={0}
                max={1000000}
                step={50000}
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.availableToday}
                  onChange={(e) => setFilters({ ...filters, availableToday: e.target.checked })}
                />
              }
              label="Chỉ bác sĩ có lịch hôm nay"
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setFilters({ experience: [0, 40], rating: 0, priceRange: [0, 1000000], availableToday: false })}
              >
                Đặt lại
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setFilterOpen(false)}
              >
                Áp dụng
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
}
