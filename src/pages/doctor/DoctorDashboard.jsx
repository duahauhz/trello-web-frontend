import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  Chip,
  IconButton,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DoctorHeader from '../../components/DoctorHeader';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      height: '100%',
      border: '1px solid',
      borderColor: 'divider',
      borderLeft: '4px solid',
      borderLeftColor: color,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transform: 'translateY(-4px)'
      }
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: 'text.primary', mt: 1 }}>
          {value}
        </Typography>
      </Box>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '12px',
          bgcolor: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon sx={{ fontSize: 28, color }} />
      </Box>
    </Box>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subtitle}
    </Typography>
  </Paper>
);

export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock data
  const stats = {
    todayAppointments: 8,
    totalPatients: 234,
    monthlyRevenue: '45.5M',
    completionRate: 95
  };

  const upcomingAppointments = [
    {
      id: 1,
      patientName: 'Nguyễn Thị B',
      time: '09:00 - 09:30',
      type: 'Khám định kỳ',
      status: 'pending',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      patientName: 'Trần Văn C',
      time: '10:00 - 10:30',
      type: 'Tư vấn trực tuyến',
      status: 'confirmed',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 3,
      patientName: 'Lê Thị D',
      time: '11:00 - 11:30',
      type: 'Khám bệnh',
      status: 'pending',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 4,
      patientName: 'Phạm Văn E',
      time: '14:00 - 14:30',
      type: 'Tái khám',
      status: 'confirmed',
      avatar: 'https://i.pravatar.cc/150?img=4'
    }
  ];

  const recentActivities = [
    { text: 'Hoàn thành khám cho bệnh nhân Nguyễn Văn A', time: '30 phút trước', type: 'success' },
    { text: 'Lịch hẹn mới từ Trần Thị B', time: '1 giờ trước', type: 'info' },
    { text: 'Bệnh nhân Lê Văn C đã đánh giá 5 sao', time: '2 giờ trước', type: 'success' },
    { text: 'Lịch hẹn bị hủy từ Phạm Thị D', time: '3 giờ trước', type: 'warning' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
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
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <DoctorHeader />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Welcome Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{
                  width: 80,
                  height: 80,
                  border: '4px solid',
                  borderColor: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    mb: 1
                  }}
                >
                  Chào bác sĩ {user?.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={user?.specialty}
                    size="small"
                    sx={{ bgcolor: 'rgba(231, 76, 60, 0.1)', color: 'secondary.main', fontWeight: 600 }}
                  />
                  <Chip
                    label={`${user?.yearsOfExperience} năm kinh nghiệm`}
                    size="small"
                    variant="outlined"
                  />
                  {user?.verified && (
                    <Chip
                      label="Đã xác thực"
                      size="small"
                      icon={<CheckCircleIcon />}
                      color="success"
                      sx={{ fontWeight: 600 }}
                    />
                  )}
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    color: 'secondary.main'
                  }
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    color: 'secondary.main'
                  }
                }}
                onClick={() => navigate('/doctor/settings')}
              >
                <SettingsIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Lịch hôm nay"
              value={stats.todayAppointments}
              subtitle="Còn 5 lịch chờ khám"
              icon={CalendarTodayIcon}
              color="#e74c3c"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Tổng bệnh nhân"
              value={stats.totalPatients}
              subtitle="+12 bệnh nhân mới tháng này"
              icon={PeopleIcon}
              color="#3498db"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Doanh thu tháng"
              value={stats.monthlyRevenue}
              subtitle="+15% so với tháng trước"
              icon={AttachMoneyIcon}
              color="#2ecc71"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Tỷ lệ hoàn thành"
              value={`${stats.completionRate}%`}
              subtitle="Xuất sắc!"
              icon={TrendingUpIcon}
              color="#f39c12"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Upcoming Appointments */}
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'secondary.main',
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      display: 'block'
                    }}
                  >
                    LỊCH HẸN
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700
                    }}
                  >
                    Lịch khám hôm nay
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/doctor/appointments')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      color: 'secondary.main'
                    }
                  }}
                >
                  Xem tất cả
                </Button>
              </Box>

              <List sx={{ p: 0 }}>
                {upcomingAppointments.map((appointment, index) => (
                  <Box key={appointment.id}>
                    <ListItem
                      sx={{
                        px: 0,
                        py: 2,
                        '&:hover': {
                          bgcolor: '#fafafa',
                          borderRadius: 2
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={appointment.avatar} alt={appointment.patientName} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {appointment.patientName}
                            </Typography>
                            <Chip
                              label={getStatusText(appointment.status)}
                              size="small"
                              color={getStatusColor(appointment.status)}
                              sx={{ height: 20, fontSize: '0.7rem' }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <AccessTimeIcon sx={{ fontSize: 14 }} />
                              {appointment.time}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              • {appointment.type}
                            </Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          sx={{ textTransform: 'none', minWidth: '100px' }}
                        >
                          Bắt đầu khám
                        </Button>
                        <IconButton size="small">
                          <ArrowForwardIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                    {index < upcomingAppointments.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Recent Activities & Quick Actions */}
          <Grid item xs={12} lg={4}>
            {/* Quick Actions */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  mb: 3
                }}
              >
                Thao tác nhanh
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CalendarTodayIcon />}
                  onClick={() => navigate('/doctor/schedule')}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1.5,
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      color: 'secondary.main'
                    }
                  }}
                >
                  Quản lý lịch làm việc
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<PeopleIcon />}
                  onClick={() => navigate('/doctor/patients')}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1.5,
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      color: 'secondary.main'
                    }
                  }}
                >
                  Danh sách bệnh nhân
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  startIcon={<EventIcon />}
                  onClick={() => navigate('/doctor/appointments')}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1.5
                  }}
                >
                  Xem tất cả lịch hẹn
                </Button>
              </Box>
            </Paper>

            {/* Recent Activities */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  mb: 3
                }}
              >
                Hoạt động gần đây
              </Typography>
              <List sx={{ p: 0 }}>
                {recentActivities.map((activity, index) => (
                  <Box key={index}>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {activity.text}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {activity.time}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
