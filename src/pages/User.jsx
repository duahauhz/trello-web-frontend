import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Divider,
  Avatar
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import CakeIcon from '@mui/icons-material/Cake';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const InfoItem = ({ icon: Icon, label, value }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      p: 3,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      borderLeft: '3px solid transparent',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        borderLeftColor: 'secondary.main',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transform: 'translateX(4px)'
      }
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: '2px solid',
        borderColor: 'secondary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        bgcolor: 'rgba(231, 76, 60, 0.05)'
      }}
    >
      <Icon sx={{ fontSize: 24, color: 'secondary.main' }} />
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: 600,
          mb: 0.5,
          display: 'block'
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'text.primary',
          fontWeight: 600,
          fontSize: '1rem'
        }}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);

export default function User() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    avatar: user?.avatar || ''
  });

  const handleEditOpen = () => {
    setEditData({
      name: user?.name || '',
      age: user?.age || '',
      phone: user?.phone || '',
      email: user?.email || '',
      address: user?.address || ''
    });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditSave = () => {
    console.log('Saving changes:', editData);
    if (updateUser) {
      updateUser({
        ...user,
        ...editData
      });
    }
    setOpenEdit(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Button
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 4,
            color: 'text.secondary',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              color: 'secondary.main',
              bgcolor: 'rgba(231, 76, 60, 0.05)'
            }
          }}
        >
          Quay lại trang chủ
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          {/* Header Section */}
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
              THÔNG TIN CÁ NHÂN
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                Hồ sơ của tôi
              </Typography>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEditOpen}
                sx={{
                  bgcolor: 'secondary.main',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(231, 76, 60, 0.25)',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(231, 76, 60, 0.35)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Chỉnh sửa
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Profile Content */}
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Avatar Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                flexShrink: 0
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -8,
                    left: -8,
                    right: -8,
                    bottom: -8,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: 'divider',
                    opacity: 0.3
                  }
                }}
              >
                <Avatar
                  src={user?.avatar || 'https://i.pravatar.cc/300'}
                  alt={user?.name}
                  sx={{
                    width: 200,
                    height: 200,
                    border: '4px solid',
                    borderColor: '#ffffff',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                  }}
                />
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 0.5
                  }}
                >
                  {user?.name || 'Nguyễn Văn A'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Thành viên
                </Typography>
              </Box>
            </Box>

            {/* Information Section */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <InfoItem
                icon={CakeIcon}
                label="Tuổi"
                value={user?.age || '65'}
              />
              <InfoItem
                icon={PhoneIcon}
                label="Số điện thoại"
                value={user?.phone || '0123 456 789'}
              />
              <InfoItem
                icon={EmailIcon}
                label="Email"
                value={user?.email || 'a@example.com'}
              />
              <InfoItem
                icon={HomeIcon}
                label="Địa chỉ"
                value={user?.address || '123 Đường ABC, Quận XYZ, TP.HCM'}
              />
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Edit Dialog */}
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <PersonIcon sx={{ color: 'secondary.main' }} />
          Chỉnh sửa thông tin
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Avatar Preview */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                p: 3,
                bgcolor: '#fafafa',
                borderRadius: 2
              }}
            >
              <Avatar
                src={editData.avatar || 'https://i.pravatar.cc/150'}
                alt="Avatar"
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid',
                  borderColor: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Button
                component="label"
                variant="outlined"
                size="small"
                sx={{
                  color: 'text.secondary',
                  borderColor: 'divider',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    color: 'secondary.main'
                  }
                }}
              >
                Thay đổi ảnh
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setEditData({ ...editData, avatar: e.target.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
            </Box>

            {/* Form Fields */}
            <TextField
              label="Tên"
              fullWidth
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'secondary.main'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'secondary.main'
                  }
                }
              }}
            />
            <TextField
              label="Tuổi"
              fullWidth
              type="number"
              value={editData.age}
              onChange={(e) => setEditData({ ...editData, age: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'secondary.main'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'secondary.main'
                  }
                }
              }}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              value={editData.phone}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'secondary.main'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'secondary.main'
                  }
                }
              }}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'secondary.main'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'secondary.main'
                  }
                }
              }}
            />
            <TextField
              label="Địa chỉ"
              fullWidth
              multiline
              rows={3}
              value={editData.address}
              onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'secondary.main'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'secondary.main'
                  }
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleEditClose}
            sx={{
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            sx={{
              bgcolor: 'secondary.main',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'secondary.dark'
              }
            }}
          >
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
