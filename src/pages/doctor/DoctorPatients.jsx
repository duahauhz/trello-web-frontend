import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs
} from '@mui/material';
import DoctorHeader from '../../components/DoctorHeader';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HistoryIcon from '@mui/icons-material/History';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const mockPatients = [
  {
    id: 1,
    name: 'Nguyễn Thị B',
    avatar: 'https://i.pravatar.cc/150?img=1',
    age: 68,
    gender: 'Nữ',
    phone: '0912345678',
    email: 'nguyenb@email.com',
    address: '123 Đường ABC, Q.1, TP.HCM',
    bloodType: 'O+',
    lastVisit: '2024-11-05',
    totalVisits: 12,
    status: 'active',
    medicalHistory: [
      { date: '2024-11-05', diagnosis: 'Kiểm tra định kỳ', doctor: 'BS. Nguyễn Văn A' },
      { date: '2024-10-15', diagnosis: 'Đau ngực nhẹ', doctor: 'BS. Nguyễn Văn A' },
      { date: '2024-09-20', diagnosis: 'Tăng huyết áp', doctor: 'BS. Nguyễn Văn A' }
    ],
    prescriptions: [
      { date: '2024-11-05', medication: 'Thuốc huyết áp', dosage: '1 viên/ngày', duration: '30 ngày' },
      { date: '2024-10-15', medication: 'Vitamin D', dosage: '2 viên/ngày', duration: '60 ngày' }
    ],
    conditions: ['Tăng huyết áp', 'Cholesterol cao']
  },
  {
    id: 2,
    name: 'Trần Văn C',
    avatar: 'https://i.pravatar.cc/150?img=2',
    age: 72,
    gender: 'Nam',
    phone: '0923456789',
    email: 'tranc@email.com',
    address: '456 Đường XYZ, Q.2, TP.HCM',
    bloodType: 'A+',
    lastVisit: '2024-11-03',
    totalVisits: 8,
    status: 'active',
    medicalHistory: [
      { date: '2024-11-03', diagnosis: 'Đau khớp', doctor: 'BS. Nguyễn Văn A' },
      { date: '2024-10-10', diagnosis: 'Kiểm tra tim mạch', doctor: 'BS. Nguyễn Văn A' }
    ],
    prescriptions: [
      { date: '2024-11-03', medication: 'Thuốc giảm đau khớp', dosage: '3 viên/ngày', duration: '15 ngày' }
    ],
    conditions: ['Viêm khớp', 'Tim mạch ổn định']
  },
  {
    id: 3,
    name: 'Lê Thị D',
    avatar: 'https://i.pravatar.cc/150?img=3',
    age: 65,
    gender: 'Nữ',
    phone: '0934567890',
    email: 'led@email.com',
    address: '789 Đường DEF, Q.3, TP.HCM',
    bloodType: 'B+',
    lastVisit: '2024-10-28',
    totalVisits: 15,
    status: 'active',
    medicalHistory: [
      { date: '2024-10-28', diagnosis: 'Tái khám sau phẫu thuật', doctor: 'BS. Nguyễn Văn A' },
      { date: '2024-09-15', diagnosis: 'Phẫu thuật tim', doctor: 'BS. Trần Văn B' }
    ],
    prescriptions: [
      { date: '2024-10-28', medication: 'Thuốc chống đông máu', dosage: '1 viên/ngày', duration: '90 ngày' }
    ],
    conditions: ['Sau phẫu thuật tim', 'Đái tháo đường type 2']
  },
  {
    id: 4,
    name: 'Phạm Văn E',
    avatar: 'https://i.pravatar.cc/150?img=4',
    age: 70,
    gender: 'Nam',
    phone: '0945678901',
    email: 'phame@email.com',
    address: '321 Đường GHI, Q.4, TP.HCM',
    bloodType: 'AB+',
    lastVisit: '2024-10-20',
    totalVisits: 6,
    status: 'inactive',
    medicalHistory: [
      { date: '2024-10-20', diagnosis: 'Kiểm tra sức khỏe tổng quát', doctor: 'BS. Nguyễn Văn A' }
    ],
    prescriptions: [],
    conditions: ['Khỏe mạnh']
  }
];

export default function DoctorPatients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [detailDialog, setDetailDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  
  // State quản lý danh sách bệnh nhân (fake database)
  const [patients, setPatients] = useState(mockPatients);
  
  // State cho form thêm/sửa bệnh nhân
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Nam',
    phone: '',
    email: '',
    address: '',
    bloodType: 'O+',
    conditions: []
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetail = (patient) => {
    setSelectedPatient(patient);
    setDetailDialog(true);
  };
  
  // Hàm thêm bệnh nhân mới
  const handleAddPatient = () => {
    setFormData({
      name: '',
      age: '',
      gender: 'Nam',
      phone: '',
      email: '',
      address: '',
      bloodType: 'O+',
      conditions: []
    });
    setAddDialog(true);
  };
  
  // Hàm lưu bệnh nhân mới
  const handleSaveNewPatient = () => {
    const newPatient = {
      id: patients.length + 1,
      name: formData.name,
      avatar: `https://i.pravatar.cc/150?img=${patients.length + 1}`,
      age: parseInt(formData.age),
      gender: formData.gender,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      bloodType: formData.bloodType,
      lastVisit: new Date().toISOString().split('T')[0],
      totalVisits: 0,
      status: 'active',
      medicalHistory: [],
      prescriptions: [],
      conditions: formData.conditions
    };
    
    setPatients([...patients, newPatient]);
    setAddDialog(false);
    console.log('✅ Đã thêm bệnh nhân mới:', newPatient);
  };
  
  // Hàm chỉnh sửa bệnh nhân
  const handleEditPatient = () => {
    if (!selectedPatient) return;
    
    setFormData({
      name: selectedPatient.name,
      age: selectedPatient.age.toString(),
      gender: selectedPatient.gender,
      phone: selectedPatient.phone,
      email: selectedPatient.email,
      address: selectedPatient.address,
      bloodType: selectedPatient.bloodType,
      conditions: selectedPatient.conditions || []
    });
    
    setDetailDialog(false);
    setEditDialog(true);
  };
  
  // Hàm lưu chỉnh sửa
  const handleSaveEdit = () => {
    setPatients(prevPatients =>
      prevPatients.map(patient => {
        if (patient.id === selectedPatient.id) {
          return {
            ...patient,
            name: formData.name,
            age: parseInt(formData.age),
            gender: formData.gender,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            bloodType: formData.bloodType,
            conditions: formData.conditions
          };
        }
        return patient;
      })
    );
    
    setEditDialog(false);
    setSelectedPatient(null);
    console.log('✅ Đã cập nhật thông tin bệnh nhân');
  };
  
  // Hàm xóa bệnh nhân
  const handleDeletePatient = (patientId) => {
    if (window.confirm('Bạn có chắc muốn xóa bệnh nhân này?')) {
      setPatients(prevPatients =>
        prevPatients.filter(patient => patient.id !== patientId)
      );
      setDetailDialog(false);
      setSelectedPatient(null);
      console.log(`🗑️ Đã xóa bệnh nhân #${patientId}`);
    }
  };
  
  // Hàm xử lý thay đổi form
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const InfoRow = ({ icon: Icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: 'rgba(231, 76, 60, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon sx={{ fontSize: 20, color: 'secondary.main' }} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

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
            QUẢN LÝ BỆNH NHÂN
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: 'text.primary'
              }}
            >
              Danh sách bệnh nhân
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PersonIcon />}
              onClick={handleAddPatient}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 3
              }}
            >
              Thêm bệnh nhân
            </Button>
          </Box>
        </Box>

        {/* Search Bar */}
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
          <TextField
            fullWidth
            placeholder="Tìm kiếm theo tên, số điện thoại, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: 'secondary.main' }}>
                {patients.length}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Tổng bệnh nhân
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#2ecc71' }}>
                {patients.filter(p => p.status === 'active').length}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Đang điều trị
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#3498db' }}>
                {patients.reduce((sum, p) => sum + p.totalVisits, 0)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Tổng lượt khám
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#f39c12' }}>
                {patients.filter(p => {
                  const lastVisit = new Date(p.lastVisit);
                  const daysDiff = (Date.now() - lastVisit) / (1000 * 60 * 60 * 24);
                  return daysDiff <= 7;
                }).length}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Khám tuần này
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Patient Cards */}
        <Grid container spacing={3}>
          {filteredPatients.map((patient) => (
            <Grid item xs={12} sm={6} md={4} key={patient.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderLeft: '4px solid',
                  borderLeftColor: patient.status === 'active' ? 'secondary.main' : 'divider',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardContent>
                  {/* Avatar & Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar
                      src={patient.avatar}
                      alt={patient.name}
                      sx={{ width: 60, height: 60 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {patient.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label={`${patient.age} tuổi`}
                          size="small"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                        <Chip
                          label={patient.gender}
                          size="small"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* Info */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <PhoneIcon sx={{ fontSize: 14 }} />
                      {patient.phone}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <CalendarTodayIcon sx={{ fontSize: 14 }} />
                      Khám gần nhất: {new Date(patient.lastVisit).toLocaleDateString('vi-VN')}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <MedicalServicesIcon sx={{ fontSize: 14 }} />
                      {patient.totalVisits} lượt khám
                    </Typography>
                  </Box>

                  {/* Conditions */}
                  {patient.conditions.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      {patient.conditions.slice(0, 2).map((condition, index) => (
                        <Chip
                          key={index}
                          label={condition}
                          size="small"
                          sx={{
                            mr: 0.5,
                            mb: 0.5,
                            bgcolor: 'rgba(231, 76, 60, 0.1)',
                            color: 'secondary.main',
                            fontSize: '0.7rem'
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  {/* Action Button */}
                  <Button
                    fullWidth
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => handleViewDetail(patient)}
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
                    Xem hồ sơ
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Patient Detail Dialog */}
        <Dialog
          open={detailDialog}
          onClose={() => setDetailDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
            Hồ sơ bệnh nhân
          </DialogTitle>
          <Divider />
          <DialogContent>
            {selectedPatient && (
              <Box>
                {/* Patient Info Header */}
                <Box sx={{ display: 'flex', gap: 3, mb: 4, p: 3, bgcolor: '#fafafa', borderRadius: 2 }}>
                  <Avatar
                    src={selectedPatient.avatar}
                    alt={selectedPatient.name}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, mb: 1 }}>
                      {selectedPatient.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip label={`${selectedPatient.age} tuổi`} size="small" />
                      <Chip label={selectedPatient.gender} size="small" />
                      <Chip label={`Nhóm máu: ${selectedPatient.bloodType}`} size="small" color="error" />
                      <Chip
                        label={selectedPatient.status === 'active' ? 'Đang điều trị' : 'Không hoạt động'}
                        size="small"
                        color={selectedPatient.status === 'active' ? 'success' : 'default'}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Contact Info */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={12} md={6}>
                    <InfoRow icon={PhoneIcon} label="Số điện thoại" value={selectedPatient.phone} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InfoRow icon={EmailIcon} label="Email" value={selectedPatient.email} />
                  </Grid>
                  <Grid item xs={12}>
                    <InfoRow icon={HomeIcon} label="Địa chỉ" value={selectedPatient.address} />
                  </Grid>
                </Grid>

                {/* Tabs */}
                <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
                  <Tab icon={<HistoryIcon />} label="Lịch sử khám" sx={{ textTransform: 'none' }} />
                  <Tab icon={<LocalPharmacyIcon />} label="Đơn thuốc" sx={{ textTransform: 'none' }} />
                  <Tab icon={<DescriptionIcon />} label="Bệnh lý" sx={{ textTransform: 'none' }} />
                </Tabs>

                {/* Tab Content */}
                {tabValue === 0 && (
                  <List>
                    {selectedPatient.medicalHistory.map((record, index) => (
                      <Box key={index}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemText
                            primary={record.diagnosis}
                            secondary={
                              <>
                                <Typography component="span" variant="body2" color="text.primary">
                                  {record.doctor}
                                </Typography>
                                {' — ' + new Date(record.date).toLocaleDateString('vi-VN')}
                              </>
                            }
                          />
                        </ListItem>
                        {index < selectedPatient.medicalHistory.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </List>
                )}

                {tabValue === 1 && (
                  <List>
                    {selectedPatient.prescriptions.map((prescription, index) => (
                      <Box key={index}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemText
                            primary={prescription.medication}
                            secondary={
                              <>
                                Liều lượng: {prescription.dosage} • Thời gian: {prescription.duration}
                                <br />
                                Ngày kê: {new Date(prescription.date).toLocaleDateString('vi-VN')}
                              </>
                            }
                          />
                        </ListItem>
                        {index < selectedPatient.prescriptions.length - 1 && <Divider />}
                      </Box>
                    ))}
                    {selectedPatient.prescriptions.length === 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                        Chưa có đơn thuốc nào
                      </Typography>
                    )}
                  </List>
                )}

                {tabValue === 2 && (
                  <Box>
                    {selectedPatient.conditions.map((condition, index) => (
                      <Chip
                        key={index}
                        label={condition}
                        sx={{
                          mr: 1,
                          mb: 1,
                          bgcolor: 'rgba(231, 76, 60, 0.1)',
                          color: 'secondary.main'
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => handleDeletePatient(selectedPatient?.id)} 
              sx={{ textTransform: 'none', fontWeight: 600, mr: 'auto' }}
              color="error"
            >
              Xóa bệnh nhân
            </Button>
            <Button onClick={() => setDetailDialog(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
              Đóng
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleEditPatient}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Chỉnh sửa
            </Button>
            <Button variant="contained" color="secondary" sx={{ textTransform: 'none', fontWeight: 600 }}>
              Tạo lịch hẹn
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Patient Dialog */}
        <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
            Thêm bệnh nhân mới
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tuổi"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleFormChange('age', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Giới tính"
                  value={formData.gender}
                  onChange={(e) => handleFormChange('gender', e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Nhóm máu"
                  value={formData.bloodType}
                  onChange={(e) => handleFormChange('bloodType', e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={formData.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  value={formData.address}
                  onChange={(e) => handleFormChange('address', e.target.value)}
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setAddDialog(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
              Hủy
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleSaveNewPatient}
              disabled={!formData.name || !formData.age || !formData.phone || !formData.email}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Thêm bệnh nhân
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Patient Dialog */}
        <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
            Chỉnh sửa thông tin bệnh nhân
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tuổi"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleFormChange('age', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Giới tính"
                  value={formData.gender}
                  onChange={(e) => handleFormChange('gender', e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Nhóm máu"
                  value={formData.bloodType}
                  onChange={(e) => handleFormChange('bloodType', e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={formData.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  value={formData.address}
                  onChange={(e) => handleFormChange('address', e.target.value)}
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setEditDialog(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
              Hủy
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleSaveEdit}
              disabled={!formData.name || !formData.age || !formData.phone || !formData.email}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Lưu thay đổi
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
