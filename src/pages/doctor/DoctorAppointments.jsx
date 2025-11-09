import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Divider
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DoctorHeader from '../../components/DoctorHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';

const mockAppointments = [
  {
    id: 1,
    patient: { name: 'Nguyễn Thị B', avatar: 'https://i.pravatar.cc/150?img=1', age: 68, phone: '0912345678', email: 'nguyenb@email.com' },
    date: '2024-11-10',
    time: '09:00',
    type: 'Khám định kỳ',
    status: 'pending',
    symptoms: 'Đau ngực, khó thở',
    notes: ''
  },
  {
    id: 2,
    patient: { name: 'Trần Văn C', avatar: 'https://i.pravatar.cc/150?img=2', age: 72, phone: '0923456789', email: 'tranc@email.com' },
    date: '2024-11-10',
    time: '10:00',
    type: 'Tư vấn trực tuyến',
    status: 'confirmed',
    symptoms: 'Kiểm tra huyết áp',
    notes: ''
  },
  {
    id: 3,
    patient: { name: 'Lê Thị D', avatar: 'https://i.pravatar.cc/150?img=3', age: 65, phone: '0934567890', email: 'led@email.com' },
    date: '2024-11-10',
    time: '11:00',
    type: 'Tái khám',
    status: 'confirmed',
    symptoms: 'Theo dõi sau phẫu thuật',
    notes: ''
  },
  {
    id: 4,
    patient: { name: 'Phạm Văn E', avatar: 'https://i.pravatar.cc/150?img=4', age: 70, phone: '0945678901', email: 'phame@email.com' },
    date: '2024-11-10',
    time: '14:00',
    type: 'Khám bệnh',
    status: 'pending',
    symptoms: 'Đau khớp, mệt mỏi',
    notes: ''
  },
  {
    id: 5,
    patient: { name: 'Hoàng Thị F', avatar: 'https://i.pravatar.cc/150?img=5', age: 66, phone: '0956789012', email: 'hoangf@email.com' },
    date: '2024-11-11',
    time: '09:00',
    type: 'Khám định kỳ',
    status: 'confirmed',
    symptoms: 'Kiểm tra tim mạch định kỳ',
    notes: ''
  },
  {
    id: 6,
    patient: { name: 'Đỗ Văn G', avatar: 'https://i.pravatar.cc/150?img=6', age: 75, phone: '0967890123', email: 'dog@email.com' },
    date: '2024-11-09',
    time: '14:00',
    type: 'Khám bệnh',
    status: 'completed',
    symptoms: 'Đau đầu, chóng mặt',
    notes: 'Đã kê đơn thuốc'
  },
  {
    id: 7,
    patient: { name: 'Vũ Thị H', avatar: 'https://i.pravatar.cc/150?img=7', age: 69, phone: '0978901234', email: 'vuh@email.com' },
    date: '2024-11-08',
    time: '10:00',
    type: 'Tái khám',
    status: 'cancelled',
    symptoms: 'Kiểm tra sau điều trị',
    notes: 'Bệnh nhân hủy do bận việc gia đình'
  }
];

export default function DoctorAppointments() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [detailDialog, setDetailDialog] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionNote, setActionNote] = useState('');
  
  // State để quản lý appointments (fake database)
  const [appointments, setAppointments] = useState(mockAppointments);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event, appointment) => {
    setAnchorEl(event.currentTarget);
    setSelectedAppointment(appointment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetail = () => {
    setDetailDialog(true);
    handleMenuClose();
  };

  const handleAction = (type) => {
    setActionType(type);
    setActionDialog(true);
    handleMenuClose();
  };

  const handleConfirmAction = () => {
    if (!selectedAppointment) return;

    // Cập nhật trạng thái appointment trong fake database
    setAppointments(prevAppointments =>
      prevAppointments.map(apt => {
        if (apt.id === selectedAppointment.id) {
          let newStatus = apt.status;
          let newNotes = actionNote;

          if (actionType === 'confirm') {
            newStatus = 'confirmed';
          } else if (actionType === 'complete') {
            newStatus = 'completed';
            newNotes = actionNote || 'Đã hoàn thành khám';
          } else if (actionType === 'cancel') {
            newStatus = 'cancelled';
            newNotes = actionNote || 'Lịch hẹn đã bị hủy';
          }

          return { ...apt, status: newStatus, notes: newNotes };
        }
        return apt;
      })
    );

    // Reset states
    setActionDialog(false);
    setActionNote('');
    setSelectedAppointment(null);
    
    // Show success message
    console.log(`✅ ${actionType} appointment successfully`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'pending':
        return 'Chờ xác nhận';
      case 'completed':
        return 'Đã hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const filterAppointments = (status) => {
    if (status === 'all') return appointments;
    return appointments.filter(apt => apt.status === status);
  };

  const getTabData = () => {
    switch (tabValue) {
      case 0: return { status: 'all', label: 'Tất cả' };
      case 1: return { status: 'pending', label: 'Chờ xác nhận' };
      case 2: return { status: 'confirmed', label: 'Đã xác nhận' };
      case 3: return { status: 'completed', label: 'Đã hoàn thành' };
      case 4: return { status: 'cancelled', label: 'Đã hủy' };
      default: return { status: 'all', label: 'Tất cả' };
    }
  };

  const filteredAppointments = filterAppointments(getTabData().status);
  
  // Hàm xóa appointment
  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Bạn có chắc muốn xóa lịch hẹn này?')) {
      setAppointments(prevAppointments =>
        prevAppointments.filter(apt => apt.id !== appointmentId)
      );
      handleMenuClose();
      console.log(`🗑️ Đã xóa lịch hẹn #${appointmentId}`);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <DoctorHeader />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'secondary.main',
              fontWeight: 700,
              letterSpacing: '1.5px',
              display: 'block',
              mb: 1
            }}
          >
            QUẢN LÝ LỊCH HẸN
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: 'text.primary'
            }}
          >
            Lịch khám bệnh nhân
          </Typography>
        </Box>

        {/* Tabs & Table */}
        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              px: 2
            }}
          >
            <Tab label="Tất cả" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Chờ xác nhận" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Đã xác nhận" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Đã hoàn thành" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Đã hủy" sx={{ textTransform: 'none', fontWeight: 600 }} />
          </Tabs>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Bệnh nhân</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Ngày giờ</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Loại khám</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Triệu chứng</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Trạng thái</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                        Không có lịch hẹn nào
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {getTabData().label}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <TableRow
                      key={appointment.id}
                      sx={{
                        '&:hover': { bgcolor: '#fafafa' }
                      }}
                    >
                      <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={appointment.patient.avatar} alt={appointment.patient.name} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {appointment.patient.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {appointment.patient.age} tuổi
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(appointment.date).toLocaleDateString('vi-VN')}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {appointment.time}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{appointment.type}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 200 }}>
                        {appointment.symptoms}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(appointment.status)}
                        color={getStatusColor(appointment.status)}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => handleMenuOpen(e, appointment)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Actions Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleViewDetail}>
            <DescriptionIcon sx={{ mr: 2, fontSize: 20 }} />
            Xem chi tiết
          </MenuItem>
          {selectedAppointment?.status === 'pending' && (
            <MenuItem onClick={() => handleAction('confirm')}>
              <CheckCircleIcon sx={{ mr: 2, fontSize: 20, color: 'success.main' }} />
              Xác nhận lịch hẹn
            </MenuItem>
          )}
          {selectedAppointment?.status === 'confirmed' && (
            <MenuItem onClick={() => handleAction('complete')}>
              <CheckCircleIcon sx={{ mr: 2, fontSize: 20, color: 'info.main' }} />
              Hoàn thành khám
            </MenuItem>
          )}
          {(selectedAppointment?.status === 'pending' || selectedAppointment?.status === 'confirmed') && (
            <MenuItem onClick={() => handleAction('cancel')} sx={{ color: 'warning.main' }}>
              <CancelIcon sx={{ mr: 2, fontSize: 20 }} />
              Hủy lịch hẹn
            </MenuItem>
          )}
          {selectedAppointment?.type === 'Tư vấn trực tuyến' && selectedAppointment?.status === 'confirmed' && (
            <MenuItem onClick={() => {}}>
              <VideocamIcon sx={{ mr: 2, fontSize: 20, color: 'primary.main' }} />
              Bắt đầu tư vấn
            </MenuItem>
          )}
          <Divider />
          <MenuItem 
            onClick={() => handleDeleteAppointment(selectedAppointment?.id)} 
            sx={{ color: 'error.main' }}
          >
            <CancelIcon sx={{ mr: 2, fontSize: 20 }} />
            Xóa lịch hẹn
          </MenuItem>
        </Menu>

        {/* Detail Dialog */}
        <Dialog open={detailDialog} onClose={() => setDetailDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
            Chi tiết lịch hẹn
          </DialogTitle>
          <Divider />
          <DialogContent>
            {selectedAppointment && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar
                      src={selectedAppointment.patient.avatar}
                      alt={selectedAppointment.patient.name}
                      sx={{ width: 80, height: 80 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {selectedAppointment.patient.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedAppointment.patient.age} tuổi
                      </Typography>
                      <Chip
                        label={getStatusText(selectedAppointment.status)}
                        color={getStatusColor(selectedAppointment.status)}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={{ p: 2, bgcolor: '#fafafa' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Ngày khám
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {new Date(selectedAppointment.date).toLocaleDateString('vi-VN')}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <AccessTimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Giờ khám
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {selectedAppointment.time}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Số điện thoại
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {selectedAppointment.patient.phone}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Email
                            </Typography>
                            <Typography variant="body2" fontWeight={600} sx={{ wordBreak: 'break-word' }}>
                              {selectedAppointment.patient.email}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Loại khám
                  </Typography>
                  <Typography variant="body2">{selectedAppointment.type}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Triệu chứng
                  </Typography>
                  <Typography variant="body2">{selectedAppointment.symptoms}</Typography>
                </Grid>

                {selectedAppointment.notes && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                      Ghi chú
                    </Typography>
                    <Typography variant="body2">{selectedAppointment.notes}</Typography>
                  </Grid>
                )}
              </Grid>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setDetailDialog(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>

        {/* Action Dialog */}
        <Dialog open={actionDialog} onClose={() => setActionDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
            {actionType === 'confirm' && 'Xác nhận lịch hẹn'}
            {actionType === 'complete' && 'Hoàn thành khám'}
            {actionType === 'cancel' && 'Hủy lịch hẹn'}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              label="Ghi chú"
              multiline
              rows={4}
              fullWidth
              value={actionNote}
              onChange={(e) => setActionNote(e.target.value)}
              placeholder={
                actionType === 'cancel'
                  ? 'Lý do hủy lịch hẹn...'
                  : 'Ghi chú về lịch hẹn...'
              }
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setActionDialog(false)}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleConfirmAction}
              variant="contained"
              color={actionType === 'cancel' ? 'error' : 'secondary'}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
