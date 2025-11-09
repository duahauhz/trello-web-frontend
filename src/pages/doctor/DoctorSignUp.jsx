import { useState } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Divider, 
  InputAdornment, 
  IconButton,
  MenuItem,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Chip,
  Alert
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VerifiedIcon from '@mui/icons-material/Verified';

const specialties = [
  'Khoa Tim Mạch',
  'Khoa Nội Tổng Hợp',
  'Khoa Thần Kinh',
  'Khoa Xương Khớp',
  'Khoa Nội Tiết',
  'Khoa Tai Mũi Họng',
  'Khoa Mắt',
  'Khoa Răng Hàm Mặt',
  'Khoa Da Liễu',
  'Khoa Dinh Dưỡng'
];

const steps = ['Thông tin cá nhân', 'Chứng chỉ hành nghề', 'Xác thực'];

export default function DoctorSignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    
    // Step 2: Professional Info
    specialty: '',
    licenseNumber: '',
    yearsOfExperience: '',
    workplace: '',
    education: '',
    bio: '',
    licenseImage: null,
    certificateImages: [],
    
    // Step 3: Additional
    consultationFee: '',
    languages: ['Tiếng Việt']
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleFileUpload = (field) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          [field]: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.fullName) newErrors.fullName = 'Vui lòng nhập họ tên';
      if (!formData.email) newErrors.email = 'Vui lòng nhập email';
      if (!formData.phone) newErrors.phone = 'Vui lòng nhập số điện thoại';
      if (!formData.password) newErrors.password = 'Vui lòng nhập mật khẩu';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu không khớp';
      }
      if (!formData.gender) newErrors.gender = 'Vui lòng chọn giới tính';
    }

    if (step === 1) {
      if (!formData.specialty) newErrors.specialty = 'Vui lòng chọn chuyên khoa';
      if (!formData.licenseNumber) newErrors.licenseNumber = 'Vui lòng nhập số chứng chỉ';
      if (!formData.workplace) newErrors.workplace = 'Vui lòng nhập nơi làm việc';
      if (!formData.licenseImage) newErrors.licenseImage = 'Vui lòng tải lên chứng chỉ hành nghề';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSignUp = () => {
    if (validateStep(activeStep)) {
      // Simulate API call
      const doctorData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: 'doctor',
        specialty: formData.specialty,
        licenseNumber: formData.licenseNumber,
        workplace: formData.workplace,
        yearsOfExperience: formData.yearsOfExperience,
        consultationFee: formData.consultationFee,
        avatar: 'https://i.pravatar.cc/150',
        verified: false, // Will be verified by admin
      };

      login(doctorData, 'fake-jwt-token-doctor');
      navigate('/doctor/dashboard');
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField 
              label="Họ và tên"
              placeholder="Nguyễn Văn A"
              fullWidth
              required
              value={formData.fullName}
              onChange={handleChange('fullName')}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Email"
                  placeholder="doctor@example.com"
                  type="email"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Số điện thoại"
                  placeholder="0912 345 678"
                  fullWidth
                  required
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Ngày sinh"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formData.dateOfBirth}
                  onChange={handleChange('dateOfBirth')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  select
                  label="Giới tính"
                  fullWidth
                  required
                  value={formData.gender}
                  onChange={handleChange('gender')}
                  error={!!errors.gender}
                  helperText={errors.gender}
                >
                  <MenuItem value="male">Nam</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                  <MenuItem value="other">Khác</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <TextField 
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange('password')}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField 
              label="Xác nhận mật khẩu"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Nhập lại mật khẩu"
              fullWidth
              required
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                Thông tin này sẽ được xác thực bởi quản trị viên để đảm bảo tính chính xác
              </Typography>
            </Alert>

            <TextField 
              select
              label="Chuyên khoa"
              fullWidth
              required
              value={formData.specialty}
              onChange={handleChange('specialty')}
              error={!!errors.specialty}
              helperText={errors.specialty}
            >
              {specialties.map((specialty) => (
                <MenuItem key={specialty} value={specialty}>
                  {specialty}
                </MenuItem>
              ))}
            </TextField>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Số chứng chỉ hành nghề"
                  placeholder="VD: 12345/BYT"
                  fullWidth
                  required
                  value={formData.licenseNumber}
                  onChange={handleChange('licenseNumber')}
                  error={!!errors.licenseNumber}
                  helperText={errors.licenseNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Số năm kinh nghiệm"
                  type="number"
                  fullWidth
                  value={formData.yearsOfExperience}
                  onChange={handleChange('yearsOfExperience')}
                />
              </Grid>
            </Grid>

            <TextField 
              label="Nơi làm việc hiện tại"
              placeholder="Bệnh viện ABC, Thành phố XYZ"
              fullWidth
              required
              value={formData.workplace}
              onChange={handleChange('workplace')}
              error={!!errors.workplace}
              helperText={errors.workplace}
            />

            <TextField 
              label="Học vấn"
              placeholder="Đại học Y Hà Nội, Bác sĩ chuyên khoa II..."
              fullWidth
              multiline
              rows={2}
              value={formData.education}
              onChange={handleChange('education')}
            />

            <TextField 
              label="Giới thiệu bản thân"
              placeholder="Mô tả ngắn gọn về kinh nghiệm và chuyên môn..."
              fullWidth
              multiline
              rows={4}
              value={formData.bio}
              onChange={handleChange('bio')}
            />

            {/* License Upload */}
            <Paper 
              sx={{ 
                p: 3, 
                border: '2px dashed',
                borderColor: errors.licenseImage ? 'error.main' : 'divider',
                bgcolor: '#fafafa',
                textAlign: 'center'
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Chứng chỉ hành nghề *
              </Typography>
              {formData.licenseImage ? (
                <Box>
                  <img 
                    src={formData.licenseImage} 
                    alt="License" 
                    style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                  />
                  <Button 
                    size="small" 
                    onClick={() => setFormData({ ...formData, licenseImage: null })}
                    sx={{ mt: 2 }}
                  >
                    Thay đổi
                  </Button>
                </Box>
              ) : (
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Tải lên chứng chỉ
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileUpload('licenseImage')}
                  />
                </Button>
              )}
              {errors.licenseImage && (
                <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                  {errors.licenseImage}
                </Typography>
              )}
            </Paper>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Alert severity="success" icon={<VerifiedIcon />}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Xác thực tài khoản bác sĩ
              </Typography>
              <Typography variant="body2">
                Tài khoản của bạn sẽ được xem xét và xác thực trong vòng 24-48 giờ
              </Typography>
            </Alert>

            <TextField 
              label="Phí tư vấn (VNĐ)"
              type="number"
              placeholder="300000"
              fullWidth
              value={formData.consultationFee}
              onChange={handleChange('consultationFee')}
              InputProps={{
                endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
              }}
            />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Thông tin xác nhận
              </Typography>
              <Paper sx={{ p: 3, bgcolor: '#fafafa' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Họ tên</Typography>
                    <Typography variant="body2" fontWeight={600}>{formData.fullName}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Email</Typography>
                    <Typography variant="body2" fontWeight={600}>{formData.email}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Chuyên khoa</Typography>
                    <Typography variant="body2" fontWeight={600}>{formData.specialty}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Số chứng chỉ</Typography>
                    <Typography variant="body2" fontWeight={600}>{formData.licenseNumber}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">Nơi làm việc</Typography>
                    <Typography variant="body2" fontWeight={600}>{formData.workplace}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>

            <Box sx={{ 
              p: 3, 
              bgcolor: 'rgba(231, 76, 60, 0.05)', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Bằng việc đăng ký, bạn đồng ý với:
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  <Box component="span" sx={{ color: 'secondary.main', cursor: 'pointer', fontWeight: 600 }}>
                    Điều khoản dịch vụ dành cho bác sĩ
                  </Box>
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  <Box component="span" sx={{ color: 'secondary.main', cursor: 'pointer', fontWeight: 600 }}>
                    Quy định về đạo đức nghề nghiệp
                  </Box>
                </Typography>
                <Typography component="li" variant="body2">
                  <Box component="span" sx={{ color: 'secondary.main', cursor: 'pointer', fontWeight: 600 }}>
                    Chính sách bảo mật thông tin
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

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
        <Box sx={{ mb: 3 }}>
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

        {/* Main Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'rgba(231, 76, 60, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LocalHospitalIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
              </Box>
            </Box>
            <Typography 
              variant="h3"
              sx={{ 
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                mb: 1,
                color: 'text.primary'
              }}
            >
              Đăng ký Bác sĩ
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                color: 'text.secondary',
                mb: 1
              }}
            >
              Tham gia đội ngũ bác sĩ chuyên nghiệp của chúng tôi
            </Typography>
            <Chip 
              label="Xác thực trong 24-48h" 
              size="small" 
              icon={<VerifiedIcon />}
              sx={{ 
                bgcolor: 'rgba(231, 76, 60, 0.1)', 
                color: 'secondary.main',
                fontWeight: 600
              }} 
            />
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          {renderStepContent(activeStep)}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ 
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Quay lại
            </Button>
            <Box sx={{ flex: 1 }} />
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSignUp}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4
                }}
              >
                Hoàn tất đăng ký
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleNext}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4
                }}
              >
                Tiếp tục
              </Button>
            )}
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Sign In Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              component="span"
              sx={{ color: 'text.secondary' }}
            >
              Đã có tài khoản bác sĩ?{' '}
            </Typography>
            <Button 
              onClick={() => navigate('/doctor/signin')}
              sx={{ 
                textTransform: 'none',
                color: 'secondary.main',
                fontWeight: 600,
                p: 0,
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline'
                }
              }}
            >
              Đăng nhập ngay
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
