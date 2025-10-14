import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Chip,
  Divider,
  useTheme,
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const steps = ['Chọn ngày & giờ', 'Thông tin bệnh nhân', 'Xác nhận'];

export default function AppointmentBooking() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id: doctorId } = useParams(); // Route uses :id, rename to doctorId
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    reason: '',
    notes: ''
  });

  // Backend integration states
  const [doctor, setDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState({ dates: [], times: [] });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch doctor info and available slots
  useEffect(() => {
    const fetchDoctorAndSlots = async () => {
      try {
        setLoading(true);
        setError(null);

        // Mock data - will be replaced with API call
        const mockDoctor = {
          id: doctorId,
          name: 'Dr. Nguyễn Minh Khoa',
          specialty: 'Bác sĩ Tim mạch',
          image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop',
          consultationFee: 500000
        };

        const mockAvailableSlots = {
          dates: [
            { date: '2025-10-20', label: 'Thứ Hai, 20/10/2025' },
            { date: '2025-10-21', label: 'Thứ Ba, 21/10/2025' },
            { date: '2025-10-22', label: 'Thứ Tư, 22/10/2025' },
            { date: '2025-10-23', label: 'Thứ Năm, 23/10/2025' },
            { date: '2025-10-24', label: 'Thứ Sáu, 24/10/2025' }
          ],
          times: [
            '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
            '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
          ]
        };

        // TODO: Replace with actual API calls
        // Fetch doctor info
        // const doctorResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/doctors/${doctorId}`, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // });
        
        // if (!doctorResponse.ok) {
        //   throw new Error('Failed to fetch doctor information');
        // }
        
        // const doctorData = await doctorResponse.json();
        // setDoctor(doctorData.doctor);

        // Fetch available slots for this doctor
        // const slotsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/doctors/${doctorId}/available-slots`, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // });
        
        // if (!slotsResponse.ok) {
        //   throw new Error('Failed to fetch available slots');
        // }
        
        // const slotsData = await slotsResponse.json();
        // setAvailableSlots(slotsData);

        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        setDoctor(mockDoctor);
        setAvailableSlots(mockAvailableSlots);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Không thể tải thông tin. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctorAndSlots();
    } else {
      // Nếu không có doctorId, vẫn set loading = false
      setLoading(false);
      setError('Không tìm thấy thông tin bác sĩ');
    }
  }, [doctorId]);

  const handleNext = () => {
    if (activeStep === 0 && (!selectedDate || !selectedTime)) {
      setSnackbar({ open: true, message: 'Vui lòng chọn ngày và giờ khám', severity: 'warning' });
      return;
    }
    if (activeStep === 1 && (!patientInfo.fullName || !patientInfo.phone)) {
      setSnackbar({ open: true, message: 'Vui lòng điền đầy đủ thông tin bắt buộc', severity: 'warning' });
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      // Prepare appointment data matching backend schema
      const appointmentData = {
        doctorId: parseInt(doctorId),
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        patientName: patientInfo.fullName,
        patientPhone: patientInfo.phone,
        patientEmail: patientInfo.email || null,
        reason: patientInfo.reason,
        notes: patientInfo.notes || null,
        status: 'Pending' // Initial status
      };

      // TODO: Replace with actual API call
      // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/appointments`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(appointmentData)
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to create appointment');
      // }
      
      // const result = await response.json();
      // console.log('Appointment created:', result);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Appointment data to send:', appointmentData);

      setSnackbar({ 
        open: true, 
        message: 'Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.', 
        severity: 'success' 
      });
      
      // Redirect after success
      setTimeout(() => {
        navigate('/booking');
      }, 2000);

    } catch (err) {
      console.error('Error creating appointment:', err);
      setError('Không thể đặt lịch. Vui lòng thử lại sau.');
      setSnackbar({ 
        open: true, 
        message: 'Có lỗi xảy ra. Vui lòng thử lại.', 
        severity: 'error' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <Container maxWidth="md" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size={60} />
        </Container>
      </Box>
    );
  }

  // Error state
  if (error && !doctor) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button variant="outlined" onClick={() => navigate('/booking')}>
            Quay lại trang đặt lịch
          </Button>
        </Container>
      </Box>
    );
  }

  // Safety check - shouldn't render if no doctor data
  if (!doctor || !availableSlots.dates || !availableSlots.times) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Không tìm thấy thông tin bác sĩ. Vui lòng thử lại.
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
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Đặt lịch khám
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Vui lòng điền đầy đủ thông tin để đặt lịch khám
        </Typography>

        {/* Doctor Info */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Avatar
              src={doctor?.image}
              sx={{ width: 80, height: 80, border: `3px solid ${theme.palette.primary.main}` }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {doctor?.name}
              </Typography>
              <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                {doctor?.specialty}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary">
                Phí tư vấn
              </Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                {doctor?.consultationFee?.toLocaleString('vi-VN') || '0'} VNĐ
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Stepper */}
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step 1: Select Date & Time */}
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarMonthIcon color="primary" />
                Chọn ngày khám
              </Typography>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {availableSlots.dates.map((dateOption) => (
                  <Grid item xs={12} sm={6} key={dateOption.date}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: selectedDate === dateOption.date ? `2px solid ${theme.palette.primary.main}` : '1px solid',
                        borderColor: selectedDate === dateOption.date ? 'primary.main' : 'divider',
                        bgcolor: selectedDate === dateOption.date ? 'primary.light' + '10' : 'transparent',
                        '&:hover': { borderColor: 'primary.main' }
                      }}
                      onClick={() => setSelectedDate(dateOption.date)}
                    >
                      <CardContent>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {dateOption.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon color="primary" />
                Chọn giờ khám
              </Typography>
              <Grid container spacing={1.5}>
                {availableSlots.times.map((time) => (
                  <Grid item xs={4} sm={3} key={time}>
                    <Button
                      fullWidth
                      variant={selectedTime === time ? 'contained' : 'outlined'}
                      onClick={() => setSelectedTime(time)}
                      sx={{ fontWeight: 600 }}
                    >
                      {time}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Step 2: Patient Information */}
          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon color="primary" />
                Thông tin bệnh nhân
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    required
                    value={patientInfo.fullName}
                    onChange={(e) => setPatientInfo({ ...patientInfo, fullName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    required
                    value={patientInfo.phone}
                    onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={patientInfo.email}
                    onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Lý do khám"
                    multiline
                    rows={2}
                    value={patientInfo.reason}
                    onChange={(e) => setPatientInfo({ ...patientInfo, reason: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ghi chú thêm"
                    multiline
                    rows={3}
                    value={patientInfo.notes}
                    onChange={(e) => setPatientInfo({ ...patientInfo, notes: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Step 3: Confirmation */}
          {activeStep === 2 && (
            <Box>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Xác nhận thông tin đặt lịch
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Vui lòng kiểm tra lại thông tin trước khi xác nhận
                </Typography>
              </Box>

              <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2, mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Thông tin lịch khám
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Bác sĩ:</Typography>
                    <Typography variant="body2">{doctor?.name || 'N/A'}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Ngày khám:</Typography>
                    <Typography variant="body2">{availableSlots.dates.find(d => d.date === selectedDate)?.label || selectedDate}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Giờ khám:</Typography>
                    <Typography variant="body2">{selectedTime || 'N/A'}</Typography>
                  </Box>
                </Box>
              </Paper>

              <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Thông tin bệnh nhân
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Họ tên:</Typography>
                    <Typography variant="body2">{patientInfo.fullName}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Số điện thoại:</Typography>
                    <Typography variant="body2">{patientInfo.phone}</Typography>
                  </Box>
                  {patientInfo.email && (
                    <>
                      <Divider />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Email:</Typography>
                        <Typography variant="body2">{patientInfo.email}</Typography>
                      </Box>
                    </>
                  )}
                  {patientInfo.reason && (
                    <>
                      <Divider />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>Lý do khám:</Typography>
                        <Typography variant="body2" color="text.secondary">{patientInfo.reason}</Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Paper>

              <Alert severity="info" sx={{ mt: 3 }}>
                Chúng tôi sẽ gửi xác nhận qua SMS và email trong vòng 15 phút.
              </Alert>
            </Box>
          )}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{ flex: 1 }}
            >
              Quay lại
            </Button>
            <Button
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              variant="contained"
              sx={{ flex: 1 }}
            >
              {activeStep === steps.length - 1 ? (
                submitting ? <CircularProgress size={24} color="inherit" /> : 'Xác nhận đặt lịch'
              ) : (
                'Tiếp tục'
              )}
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
