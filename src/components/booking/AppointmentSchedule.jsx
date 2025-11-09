import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Avatar,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotesIcon from '@mui/icons-material/Notes';

// Component for single appointment card
const AppointmentCard = ({ appointment, onViewDetail, onCancel }) => {
  return (
    <Card
      sx={{
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
        {/* Doctor Info & Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1.5, flex: 1 }}>
            <Avatar
              src={appointment.doctorImage}
              sx={{
                width: 56,
                height: 56,
                border: '2px solid',
                borderColor: 'divider',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}
            />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 0.5,
                  color: 'text.primary',
                  fontSize: '0.95rem'
                }}
              >
                {appointment.doctorName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                <LocalHospitalIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  {appointment.specialty}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Chip
            icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
            label={appointment.status === 'Confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
            size="small"
            sx={{
              height: 24,
              fontSize: '0.7rem',
              fontWeight: 600,
              bgcolor: appointment.status === 'Confirmed'
                ? 'rgba(231, 76, 60, 0.08)'
                : 'rgba(243, 156, 18, 0.1)',
              color: appointment.status === 'Confirmed'
                ? 'secondary.main'
                : '#f39c12',
              border: '1px solid',
              borderColor: appointment.status === 'Confirmed'
                ? 'secondary.main'
                : '#f39c12',
              '& .MuiChip-icon': {
                color: 'inherit'
              }
            }}
          />
        </Box>

        {/* Date & Time Info */}
        <Box 
          sx={{ 
            display: 'flex',
            gap: 2,
            p: 1.5,
            bgcolor: 'rgba(0,0,0,0.02)',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            mb: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
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
              <CalendarTodayIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.65rem', mb: 0.2 }}>
                Ngày
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                {appointment.date}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
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
              <AccessTimeIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.65rem', mb: 0.2 }}>
                Giờ
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                {appointment.time}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => onViewDetail(appointment)}
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              py: 1,
              fontSize: '0.8rem',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'secondary.dark',
                boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)'
              }
            }}
          >
            Chi tiết
          </Button>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => onCancel(appointment)}
            sx={{
              borderColor: 'divider',
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 600,
              py: 1,
              fontSize: '0.8rem',
              '&:hover': {
                borderColor: 'text.secondary',
                bgcolor: 'rgba(0,0,0,0.02)'
              }
            }}
          >
            Hủy lịch
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function AppointmentSchedule({ appointments = [] }) {
  // Helper function to generate future dates
  const getFutureDate = (daysFromNow) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // Helper function to format time
  const formatTime = (hour, minute = 0) => {
    return new Date(2025, 0, 1, hour, minute).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Mock data with real future dates - Backend will provide this via API
  // Backend API endpoint: GET /api/appointments
  // Expected response format: Array of appointment objects
  const mockAppointments = [
    {
      id: 1,
      doctorId: 5, // Backend doctor ID
      doctorName: 'Dr. Nguyễn Văn Anh',
      specialty: 'Bác sĩ Tim mạch',
      date: getFutureDate(11), // 11 days from now
      time: formatTime(9, 0), // 09:00
      status: 'Confirmed',
      doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop',
      phone: '0901 234 567',
      location: 'Phòng khám Tim mạch, Tầng 3',
      notes: 'Mang theo kết quả xét nghiệm tim mạch gần nhất',
      patientName: 'Nguyễn Văn A',
      patientPhone: '0912 345 678',
      reason: 'Khám định kỳ tim mạch',
      createdAt: new Date().toISOString() // When booking was made
    },
    {
      id: 2,
      doctorId: 12,
      doctorName: 'Dr. Trần Thị Bích',
      specialty: 'Bác sĩ Nội khoa',
      date: getFutureDate(12), // 12 days from now
      time: formatTime(14, 0), // 14:00
      status: 'Pending',
      doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop',
      phone: '0902 345 678',
      location: 'Phòng khám Nội tổng quát, Tầng 2',
      notes: 'Nhớ nhịn ăn trước 6 tiếng',
      patientName: 'Nguyễn Văn A',
      patientPhone: '0912 345 678',
      reason: 'Khám sức khỏe tổng quát',
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      doctorId: 8,
      doctorName: 'Dr. Lê Văn Cường',
      specialty: 'Bác sĩ Da liễu',
      date: getFutureDate(14), // 14 days from now
      time: formatTime(10, 30), // 10:30
      status: 'Confirmed',
      doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop',
      phone: '0903 456 789',
      location: 'Phòng khám Da liễu, Tầng 4',
      notes: 'Không cần chuẩn bị gì',
      patientName: 'Nguyễn Văn A',
      patientPhone: '0912 345 678',
      reason: 'Điều trị mụn',
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      doctorId: 15,
      doctorName: 'Dr. Phạm Minh Đức',
      specialty: 'Bác sĩ Thần kinh',
      date: getFutureDate(16), // 16 days from now
      time: formatTime(15, 30), // 15:30
      status: 'Confirmed',
      doctorImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop',
      phone: '0904 567 890',
      location: 'Phòng khám Thần kinh, Tầng 5',
      notes: 'Mang theo phim chụp CT/MRI nếu có',
      patientName: 'Nguyễn Văn A',
      patientPhone: '0912 345 678',
      reason: 'Tư vấn đau đầu mãn tính',
      createdAt: new Date().toISOString()
    }
  ];
  
  const [showAll, setShowAll] = useState(false);
  const [detailDialog, setDetailDialog] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Initialize with mock data or props
  const [appointmentList, setAppointmentList] = useState(
    appointments.length > 0 ? appointments : mockAppointments
  );

  // TODO: Fetch appointments from backend when component mounts
  // useEffect(() => {
  //   const fetchAppointments = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch('/api/appointments', {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });
  //       const data = await response.json();
  //       setAppointmentList(data);
  //     } catch (error) {
  //       console.error('Error fetching appointments:', error);
  //       setSnackbar({
  //         open: true,
  //         message: 'Không thể tải danh sách lịch hẹn',
  //         severity: 'error'
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   
  //   fetchAppointments();
  // }, []);

  const handleViewDetail = (appointment) => {
    setSelectedAppointment(appointment);
    setDetailDialog(true);
  };

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setCancelDialog(true);
  };

  const handleConfirmCancel = async () => {
    try {
      // TODO: Call API to cancel appointment
      // await fetch(`/api/appointments/${selectedAppointment.id}/cancel`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      
      // Remove from list (local state update)
      setAppointmentList(prev => prev.filter(apt => apt.id !== selectedAppointment.id));
      
      setSnackbar({
        open: true,
        message: 'Đã hủy lịch hẹn thành công',
        severity: 'success'
      });
      setCancelDialog(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Error canceling appointment:', error);
      setSnackbar({
        open: true,
        message: 'Không thể hủy lịch hẹn. Vui lòng thử lại.',
        severity: 'error'
      });
    }
  };

  const displayedAppointments = showAll ? appointmentList : appointmentList.slice(0, 3);

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
          LỊCH KHÁM CỦA BẠN
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
          Lịch Hẹn Sắp Tới
        </Typography>
        <Typography 
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}
        >
          {appointmentList.length > 0 
            ? `Bạn có ${appointmentList.length} lịch hẹn đang chờ` 
            : 'Bạn chưa có lịch hẹn nào'}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {displayedAppointments.map((appointment) => (
          <Grid item xs={12} sm={6} lg={4} key={appointment.id}>
            <AppointmentCard 
              appointment={appointment}
              onViewDetail={handleViewDetail}
              onCancel={handleCancelClick}
            />
          </Grid>
        ))}
      </Grid>

      {appointmentList.length > 3 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={() => setShowAll(!showAll)}
            endIcon={
              <ExpandMoreIcon
                sx={{
                  transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            }
            sx={{
              borderColor: 'divider',
              color: 'text.primary',
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              '&:hover': {
                borderColor: 'secondary.main',
                color: 'secondary.main',
                bgcolor: 'rgba(231, 76, 60, 0.04)'
              }
            }}
          >
            {showAll ? 'Thu gọn' : `Xem thêm ${appointmentList.length - 3} lịch hẹn`}
          </Button>
        </Box>
      )}

      {/* Detail Dialog */}
      <Dialog
        open={detailDialog}
        onClose={() => setDetailDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            pb: 2,
            borderBottom: '2px solid',
            borderColor: 'secondary.main'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: 'text.primary'
              }}
            >
              Chi tiết lịch hẹn
            </Typography>
            <IconButton 
              onClick={() => setDetailDialog(false)} 
              size="small"
              sx={{
                '&:hover': {
                  bgcolor: 'rgba(231, 76, 60, 0.08)',
                  color: 'secondary.main'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedAppointment && (
            <Box>
              {/* Doctor Info */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Avatar
                  src={selectedAppointment.doctorImage}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    border: '2px solid',
                    borderColor: 'divider',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {selectedAppointment.doctorName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {selectedAppointment.specialty}
                  </Typography>
                  <Chip
                    label={selectedAppointment.status === 'Confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      bgcolor: selectedAppointment.status === 'Confirmed'
                        ? 'rgba(231, 76, 60, 0.08)'
                        : 'rgba(243, 156, 18, 0.1)',
                      color: selectedAppointment.status === 'Confirmed'
                        ? 'secondary.main'
                        : '#f39c12',
                      border: '1px solid',
                      borderColor: selectedAppointment.status === 'Confirmed'
                        ? 'secondary.main'
                        : '#f39c12'
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Appointment Details */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1,
                      bgcolor: 'rgba(231, 76, 60, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <CalendarTodayIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.3 }}>
                      Ngày khám
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedAppointment.date}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1,
                      bgcolor: 'rgba(231, 76, 60, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.3 }}>
                      Thời gian
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedAppointment.time}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1,
                      bgcolor: 'rgba(231, 76, 60, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <LocationOnIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.3 }}>
                      Địa điểm
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedAppointment.location}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1,
                      bgcolor: 'rgba(231, 76, 60, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.3 }}>
                      Số điện thoại bác sĩ
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedAppointment.phone}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1,
                      bgcolor: 'rgba(231, 76, 60, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <NotesIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.3 }}>
                      Ghi chú
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedAppointment.notes}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Patient Info */}
              <Box>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.75rem'
                  }}
                >
                  Thông tin bệnh nhân
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Họ và tên:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {selectedAppointment.patientName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Số điện thoại:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {selectedAppointment.patientPhone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Lý do khám:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {selectedAppointment.reason}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
          <Button 
            onClick={() => setDetailDialog(false)} 
            variant="outlined"
            sx={{
              borderColor: 'divider',
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              '&:hover': {
                borderColor: 'text.secondary',
                bgcolor: 'rgba(0,0,0,0.02)'
              }
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={cancelDialog}
        onClose={() => setCancelDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '2px solid', borderColor: 'secondary.main', pb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700 
            }}
          >
            Xác nhận hủy lịch
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedAppointment && (
            <Box>
              <Alert 
                severity="warning" 
                sx={{ 
                  mb: 2,
                  border: '1px solid',
                  borderColor: '#f39c12',
                  '& .MuiAlert-icon': {
                    color: '#f39c12'
                  }
                }}
              >
                Bạn có chắc chắn muốn hủy lịch hẹn này không?
              </Alert>
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  alignItems: 'center', 
                  p: 2, 
                  bgcolor: 'rgba(0,0,0,0.02)',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1
                }}
              >
                <Avatar
                  src={selectedAppointment.doctorImage}
                  sx={{ 
                    width: 50, 
                    height: 50,
                    border: '2px solid',
                    borderColor: 'divider'
                  }}
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.3 }}>
                    {selectedAppointment.doctorName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedAppointment.date} - {selectedAppointment.time}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
          <Button 
            onClick={() => setCancelDialog(false)} 
            variant="outlined"
            sx={{
              borderColor: 'divider',
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 600,
              flex: 1,
              '&:hover': {
                borderColor: 'text.secondary',
                bgcolor: 'rgba(0,0,0,0.02)'
              }
            }}
          >
            Không
          </Button>
          <Button 
            onClick={handleConfirmCancel} 
            variant="contained"
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              flex: 1,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'secondary.dark',
                boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)'
              }
            }}
          >
            Xác nhận hủy
          </Button>
        </DialogActions>
      </Dialog>

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
