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
  useTheme,
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
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 2.5,
        border: `1.5px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: theme.shadows[4],
          borderColor: theme.palette.primary.main
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Avatar
              src={appointment.doctorImage}
              sx={{
                width: 48,
                height: 48,
                border: `2px solid ${theme.palette.primary.main}`
              }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.3 }}>
                {appointment.doctorName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {appointment.specialty}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={appointment.status === 'Confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
            color={appointment.status === 'Confirmed' ? 'success' : 'warning'}
            size="small"
            sx={{ fontWeight: 600, fontSize: '0.7rem' }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarTodayIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
            <Typography variant="caption">{appointment.date}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
            <Typography variant="caption">{appointment.time}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => onViewDetail(appointment)}
            sx={{ borderRadius: 1.5, py: 0.5, fontSize: '0.75rem' }}
          >
            Chi tiết
          </Button>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => onCancel(appointment)}
            color="error"
            sx={{ borderRadius: 1.5, py: 0.5, fontSize: '0.75rem' }}
          >
            Hủy lịch
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function AppointmentSchedule({ appointments = [] }) {
  const theme = useTheme();
  
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
  const [loading, setLoading] = useState(false);
  
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
      setLoading(true);
      
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
    } finally {
      setLoading(false);
    }
  };

  const displayedAppointments = showAll ? appointmentList : appointmentList.slice(0, 3);

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 3px 8px ${theme.palette.primary.main}40`
            }}
          >
            <CalendarTodayIcon sx={{ color: 'white', fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.3 }}>
              Lịch khám sắp tới
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bạn có {appointmentList.length} lịch hẹn
            </Typography>
          </Box>
        </Box>
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setShowAll(!showAll)}
            endIcon={
              <ExpandMoreIcon
                sx={{
                  transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              />
            }
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderWidth: 2,
              '&:hover': { borderWidth: 2 }
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
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Chi tiết lịch hẹn
            </Typography>
            <IconButton onClick={() => setDetailDialog(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          {selectedAppointment && (
            <Box>
              {/* Doctor Info */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Avatar
                  src={selectedAppointment.doctorImage}
                  sx={{ width: 80, height: 80, border: `3px solid ${theme.palette.primary.main}` }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {selectedAppointment.doctorName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {selectedAppointment.specialty}
                  </Typography>
                  <Chip
                    label={selectedAppointment.status === 'Confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                    color={selectedAppointment.status === 'Confirmed' ? 'success' : 'warning'}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Appointment Details */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <CalendarTodayIcon sx={{ fontSize: 20, color: theme.palette.primary.main, mt: 0.3 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Ngày khám
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedAppointment.date}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <AccessTimeIcon sx={{ fontSize: 20, color: theme.palette.primary.main, mt: 0.3 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Thời gian
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedAppointment.time}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <LocationOnIcon sx={{ fontSize: 20, color: theme.palette.primary.main, mt: 0.3 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Địa điểm
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedAppointment.location}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <PhoneIcon sx={{ fontSize: 20, color: theme.palette.primary.main, mt: 0.3 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Số điện thoại bác sĩ
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedAppointment.phone}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <NotesIcon sx={{ fontSize: 20, color: theme.palette.primary.main, mt: 0.3 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
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
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Thông tin bệnh nhân
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDetailDialog(false)} variant="outlined">
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
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Xác nhận hủy lịch
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedAppointment && (
            <Box>
              <Alert severity="warning" sx={{ mb: 2 }}>
                Bạn có chắc chắn muốn hủy lịch hẹn này không?
              </Alert>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Avatar
                  src={selectedAppointment.doctorImage}
                  sx={{ width: 50, height: 50 }}
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
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
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setCancelDialog(false)} variant="outlined">
            Không
          </Button>
          <Button onClick={handleConfirmCancel} variant="contained" color="error">
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
