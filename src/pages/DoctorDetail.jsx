import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Rating,
  Chip,
  Button,
  Grid,
  Paper,
  Divider,
  useTheme,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

export default function DoctorDetail() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams(); // Changed from doctorId to id to match route
  
  const [doctor, setDoctor] = useState(null);
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctor details from backend
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Mock data - will be replaced with API call
        const mockDoctor = {
          id: id,
          name: 'Dr. Nguyễn Minh Khoa',
          specialty: 'Bác sĩ Tim mạch cao cấp',
          location: 'Bệnh viện Đa khoa Trung ương, Hà Nội',
          experience: 32,
          rating: 4.9,
          reviews: 1842,
          patients: '25,000+',
          image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
          availableToday: true,
          consultationFee: 500000,
          education: [
            'Bác sĩ Đa khoa - Đại học Y Hà Nội (1992)',
            'Thạc sĩ Tim mạch - Đại học Y Hà Nội (1997)',
            'Tiến sĩ Y khoa - Johns Hopkins University, USA (2005)'
          ],
          languages: ['Tiếng Việt', 'English', 'Français'],
          services: [
            'Khám và tư vấn bệnh tim mạch',
            'Siêu âm tim Doppler',
            'Điện tâm đồ 12 chuyển đạo',
            'Holter điện tâm đồ 24h',
            'Theo dõi huyết áp 24h',
            'Tư vấn phòng ngừa bệnh tim mạch'
          ],
          specializations: [
            'Suy tim',
            'Rối loạn nhịp tim',
            'Bệnh mạch vành',
            'Tăng huyết áp',
            'Bệnh van tim'
          ],
          about: 'Bác sĩ Nguyễn Minh Khoa là chuyên gia hàng đầu trong lĩnh vực tim mạch với hơn 32 năm kinh nghiệm. Ông đã điều trị thành công cho hơn 25,000 bệnh nhân và được đánh giá cao về chuyên môn cũng như thái độ tận tâm với bệnh nhân.',
          workingHours: [
            { day: 'Thứ 2 - Thứ 6', time: '08:00 - 17:00' },
            { day: 'Thứ 7', time: '08:00 - 12:00' },
            { day: 'Chủ nhật', time: 'Nghỉ' }
          ]
        };

        const mockReviews = [
          {
            id: 1,
            patientName: 'Nguyễn Văn A',
            rating: 5,
            date: '15/10/2025',
            comment: 'Bác sĩ rất tận tâm và chuyên nghiệp. Giải thích rõ ràng và dễ hiểu về tình trạng bệnh.'
          },
          {
            id: 2,
            patientName: 'Trần Thị B',
            rating: 5,
            date: '12/10/2025',
            comment: 'Khám rất kỹ càng, cho lời khuyên hữu ích. Rất hài lòng với dịch vụ.'
          }
        ];

        // TODO: Replace with actual API call
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/doctors/${id}`, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // });
        
        // if (!response.ok) {
        //   throw new Error('Failed to fetch doctor details');
        // }
        
        // const data = await response.json();
        // setDoctor(data.doctor);
        // setRecentReviews(data.reviews || []);

        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        setDoctor(mockDoctor);
        setRecentReviews(mockReviews);

      } catch (err) {
        console.error('Error fetching doctor details:', err);
        setError('Không thể tải thông tin bác sĩ. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctorDetails();
    } else {
      // Nếu không có id, vẫn set loading = false
      setLoading(false);
      setError('Không tìm thấy thông tin bác sĩ');
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size={60} />
        </Container>
      </Box>
    );
  }

  // Error state
  if (error || !doctor) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || 'Không tìm thấy thông tin bác sĩ'}
          </Alert>
          <Button variant="outlined" onClick={() => navigate('/booking')}>
            Quay lại trang đặt lịch
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Doctor Header */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  src={doctor.image}
                  sx={{
                    width: 200,
                    height: 200,
                    mx: 'auto',
                    mb: 2,
                    border: `4px solid ${theme.palette.primary.main}`
                  }}
                />
                {doctor.availableToday && (
                  <Chip
                    label="Có lịch hôm nay"
                    color="success"
                    sx={{ mb: 2, fontWeight: 600 }}
                  />
                )}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<CalendarMonthIcon />}
                  onClick={() => navigate(`/booking/appointment/${doctor.id}`)}
                  sx={{ borderRadius: 2, fontWeight: 600, mb: 2 }}
                >
                  Đặt lịch khám
                </Button>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  Phí tư vấn: {doctor.consultationFee.toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {doctor.name}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                {doctor.specialty}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Rating value={doctor.rating} precision={0.1} readOnly />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {doctor.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({doctor.reviews} đánh giá)
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon color="primary" />
                  <Typography variant="body1">{doctor.location}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkIcon color="primary" />
                  <Typography variant="body1">{doctor.experience} năm kinh nghiệm</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MedicalServicesIcon color="primary" />
                  <Typography variant="body1">{doctor.patients} bệnh nhân đã khám</Typography>
                </Box>
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {doctor.about}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Education */}
            <Card sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SchoolIcon color="primary" />
                  Học vấn
                </Typography>
                <List>
                  {doctor.education.map((edu, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={edu} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Services */}
            <Card sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MedicalServicesIcon color="primary" />
                  Dịch vụ khám bệnh
                </Typography>
                <List>
                  {doctor.services.map((service, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={service} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StarIcon color="primary" />
                  Đánh giá gần đây
                </Typography>
                {recentReviews.map((review) => (
                  <Box key={review.id} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {review.patientName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Box>
                    <Rating value={review.rating} size="small" readOnly sx={{ mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {review.comment}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Specializations */}
            <Card sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Chuyên môn
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {doctor.specializations.map((spec, index) => (
                    <Chip key={index} label={spec} color="primary" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LanguageIcon color="primary" />
                  Ngôn ngữ
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {doctor.languages.map((lang, index) => (
                    <Chip key={index} label={lang} />
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Giờ làm việc
                </Typography>
                {doctor.workingHours.map((schedule, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {schedule.day}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {schedule.time}
                      </Typography>
                    </Box>
                    {index < doctor.workingHours.length - 1 && <Divider sx={{ my: 1 }} />}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
