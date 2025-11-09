import { Box, Container, Typography, Paper, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

export default function LoginSelect() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fafafa',
        py: 4
      }}
    >
      <Container maxWidth="md">
        {/* Back Button */}
        <Box sx={{ mb: 4 }}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              border: '2px solid',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'secondary.main',
                color: 'secondary.main'
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 2,
              color: 'text.primary'
            }}
          >
            Chào mừng đến với SeniorCare
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400
            }}
          >
            Vui lòng chọn loại tài khoản để đăng nhập
          </Typography>
        </Box>

        {/* Login Options */}
        <Grid container spacing={4}>
          {/* Patient Login */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                textAlign: 'center',
                border: '2px solid',
                borderColor: 'divider',
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#3498db',
                  boxShadow: '0 8px 24px rgba(52, 152, 219, 0.15)',
                  transform: 'translateY(-8px)'
                }
              }}
              onClick={() => navigate('/signin')}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  bgcolor: 'rgba(52, 152, 219, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  mb: 3
                }}
              >
                <PersonIcon sx={{ fontSize: 60, color: '#3498db' }} />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  mb: 2,
                  color: 'text.primary'
                }}
              >
                Bệnh nhân
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  lineHeight: 1.8
                }}
              >
                Đăng nhập để đặt lịch khám, tư vấn sức khỏe với AI, xem tin tức y tế và nhiều hơn nữa
              </Typography>

              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  bgcolor: '#3498db',
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                  fontSize: '1rem',
                  '&:hover': {
                    bgcolor: '#2980b9'
                  }
                }}
              >
                Đăng nhập Bệnh nhân
              </Button>

              <Button
                variant="text"
                size="small"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/signup');
                }}
                sx={{
                  mt: 2,
                  textTransform: 'none',
                  color: 'text.secondary',
                  '&:hover': {
                    color: '#3498db'
                  }
                }}
              >
                Chưa có tài khoản? Đăng ký ngay
              </Button>
            </Paper>
          </Grid>

          {/* Doctor Login */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                textAlign: 'center',
                border: '2px solid',
                borderColor: 'divider',
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'secondary.main',
                  boxShadow: '0 8px 24px rgba(231, 76, 60, 0.15)',
                  transform: 'translateY(-8px)'
                }
              }}
              onClick={() => navigate('/doctor/signin')}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  bgcolor: 'rgba(231, 76, 60, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  mb: 3
                }}
              >
                <LocalHospitalIcon sx={{ fontSize: 60, color: 'secondary.main' }} />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  mb: 2,
                  color: 'text.primary'
                }}
              >
                Bác sĩ
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  lineHeight: 1.8
                }}
              >
                Cổng thông tin dành cho bác sĩ để quản lý lịch hẹn, bệnh nhân và thực hiện tư vấn trực tuyến
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                  fontSize: '1rem'
                }}
              >
                Đăng nhập Bác sĩ
              </Button>

              <Button
                variant="text"
                size="small"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/doctor/signup');
                }}
                sx={{
                  mt: 2,
                  textTransform: 'none',
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'secondary.main'
                  }
                }}
              >
                Chưa có tài khoản? Đăng ký ngay
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Info Note */}
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            💡 <strong>Gợi ý:</strong> Nếu bạn là bệnh nhân, chọn "Bệnh nhân". Nếu bạn là bác sĩ có chứng chỉ hành nghề, chọn "Bác sĩ"
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
