import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Categories for support requests
  const categories = [
    { value: 'booking', label: 'Đặt Lịch Khám' },
    { value: 'account', label: 'Tài Khoản' },
    { value: 'medical', label: 'Vấn Đề Y Tế' },
    { value: 'payment', label: 'Thanh Toán' },
    { value: 'technical', label: 'Kỹ Thuật' },
    { value: 'feedback', label: 'Góp Ý' },
    { value: 'other', label: 'Khác' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      setError('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await submitSupportRequest(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mb: 12 }} id="contact-section">
      {/* Header */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #00acc1 0%, #0097a7 100%)',
          borderRadius: 4,
          p: 4,
          mb: 4,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(50%, -50%)'
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ContactSupportIcon sx={{ fontSize: 32 }} />
            Gửi Yêu Cầu Hỗ Trợ
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.95 }}>
            Chúng tôi sẽ phản hồi trong vòng 24 giờ
          </Typography>
        </Box>
      </Box>

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          bgcolor: 'white',
          borderRadius: 3,
          p: 4,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}
      >
        {/* Success Message */}
        {success && (
          <Alert 
            icon={<CheckCircleIcon fontSize="inherit" />}
            severity="success" 
            sx={{ mb: 3 }}
          >
            Yêu cầu của bạn đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              name="name"
              label="Họ và Tên"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              variant="outlined"
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              variant="outlined"
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="phone"
              label="Số Điện Thoại (Tùy chọn)"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              variant="outlined"
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Danh Mục</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
                label="Danh Mục"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Subject */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="subject"
              label="Tiêu Đề (Tùy chọn)"
              value={formData.subject}
              onChange={handleChange}
              disabled={loading}
              variant="outlined"
            />
          </Grid>

          {/* Message */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="message"
              label="Nội Dung"
              multiline
              rows={6}
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              variant="outlined"
              placeholder="Mô tả chi tiết vấn đề của bạn..."
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
              sx={{
                px: 4,
                py: 1.5,
                background: 'linear-gradient(135deg, #00acc1 0%, #0097a7 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0097a7 0%, #00838f 100%)'
                }
              }}
            >
              {loading ? 'Đang Gửi...' : 'Gửi Yêu Cầu'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
