import {
  Box,
  Container,
  Typography,
  IconButton,
  TextField,
  Chip,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../components/Header';
import { useState } from 'react';

const notificationTypes = {
  appointment: { 
    label: 'Lịch khám', 
    icon: EventNoteIcon,
    color: '#e74c3c'
  },
  note: { 
    label: 'Ghi chú y tế', 
    icon: NotificationsActiveIcon,
    color: '#f39c12'
  },
  system: { 
    label: 'Hệ thống', 
    icon: SystemUpdateAltIcon,
    color: '#95a5a6'
  },
};

const initialNotifications = [
  {
    id: 1,
    type: 'appointment',
    title: 'Lịch Khám: Khám định kỳ 10:00 AM',
    content: 'Bạn có lịch khám định kỳ với Bác sĩ Nguyễn Văn A tại Phòng 203.',
    time: '2 phút trước',
    read: false,
    editable: true,
    dateGroup: 'Hôm nay',
  },
  {
    id: 2,
    type: 'note',
    title: 'Ghi chú y tế: Cập nhật thông tin thuốc',
    content: 'Cập nhật danh sách thuốc mới: Paracetamol 500mg - 2 viên/ngày, Vitamin C 1000mg - 1 viên/ngày.',
    time: '1 giờ trước',
    read: false,
    editable: true,
    dateGroup: 'Hôm nay',
  },
  {
    id: 3,
    type: 'system',
    title: 'Hệ thống: Cập nhật thông tin',
    content: 'Vui lòng cập nhật thông tin cá nhân và số điện thoại liên hệ của người thân.',
    time: '3 giờ trước',
    read: false,
    editable: false,
    dateGroup: 'Hôm nay',
  },
  {
    id: 4,
    type: 'appointment',
    title: 'Lịch Trình: Thay đổi lịch khám 3:00 PM',
    content: 'Lịch khám của bạn đã được điều chỉnh sang 3:00 PM theo yêu cầu.',
    time: '22 giờ trước',
    read: true,
    editable: true,
    dateGroup: 'Hôm qua',
  },
  {
    id: 5,
    type: 'note',
    title: 'Ghi chú y tế: Kết quả xét nghiệm máu',
    content: 'Kết quả xét nghiệm máu của bạn đã có. Tất cả các chỉ số đều bình thường.',
    time: '1 ngày trước',
    read: true,
    editable: true,
    dateGroup: 'Hôm qua',
  }
];

export default function Notifications() {
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [data, setData] = useState(initialNotifications);
  const [deleteId, setDeleteId] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = data.filter(n =>
    (typeFilter === 'all' || n.type === typeFilter) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()))
  );

  const groups = Array.from(new Set(filtered.map(n => n.dateGroup)));

  const handleEdit = (id) => {
    const notif = data.find(n => n.id === id);
    setEditId(id);
    setEditContent(notif.content);
  };

  const handleEditSave = () => {
    setData(data.map(n => n.id === editId ? { ...n, content: editContent } : n));
    setEditId(null);
  };

  const handleDelete = (id) => setDeleteId(id);

  const handleDeleteConfirm = () => {
    setData(data.filter(n => n.id !== deleteId));
    setDeleteId(null);
  };

  const markAsRead = (id) => {
    setData(data.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = data.filter(n => !n.read).length;

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Page Header */}
        <Box sx={{ mb: 6 }}>
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
            THÔNG BÁO
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
              Trung tâm thông báo
            </Typography>
            {unreadCount > 0 && (
              <Chip
                label={unreadCount + ' chưa đọc'}
                sx={{
                  bgcolor: 'secondary.main',
                  color: '#fff',
                  fontWeight: 600
                }}
              />
            )}
          </Box>
        </Box>

        {/* Search and Filters */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <TextField
            placeholder="Tìm kiếm thông báo..."
            size="small"
            fullWidth
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'secondary.main'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'secondary.main'
                }
              }
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label="Tất cả"
              clickable
              onClick={() => setTypeFilter('all')}
              sx={{
                bgcolor: typeFilter === 'all' ? 'secondary.main' : '#ffffff',
                color: typeFilter === 'all' ? '#fff' : 'text.primary',
                border: '1px solid',
                borderColor: typeFilter === 'all' ? 'secondary.main' : 'divider',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: typeFilter === 'all' ? 'secondary.dark' : '#fafafa'
                }
              }}
            />
            <Chip
              label="Lịch khám"
              clickable
              onClick={() => setTypeFilter('appointment')}
              sx={{
                bgcolor: typeFilter === 'appointment' ? 'secondary.main' : '#ffffff',
                color: typeFilter === 'appointment' ? '#fff' : 'text.primary',
                border: '1px solid',
                borderColor: typeFilter === 'appointment' ? 'secondary.main' : 'divider',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: typeFilter === 'appointment' ? 'secondary.dark' : '#fafafa'
                }
              }}
            />
            <Chip
              label="Ghi chú y tế"
              clickable
              onClick={() => setTypeFilter('note')}
              sx={{
                bgcolor: typeFilter === 'note' ? 'secondary.main' : '#ffffff',
                color: typeFilter === 'note' ? '#fff' : 'text.primary',
                border: '1px solid',
                borderColor: typeFilter === 'note' ? 'secondary.main' : 'divider',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: typeFilter === 'note' ? 'secondary.dark' : '#fafafa'
                }
              }}
            />
            <Chip
              label="Hệ thống"
              clickable
              onClick={() => setTypeFilter('system')}
              sx={{
                bgcolor: typeFilter === 'system' ? 'secondary.main' : '#ffffff',
                color: typeFilter === 'system' ? '#fff' : 'text.primary',
                border: '1px solid',
                borderColor: typeFilter === 'system' ? 'secondary.main' : 'divider',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: typeFilter === 'system' ? 'secondary.dark' : '#fafafa'
                }
              }}
            />
          </Box>
        </Paper>

        {/* Notifications List */}
        {groups.map(group => (
          <Box key={group} sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: 'text.primary',
                mb: 2
              }}
            >
              {group}
            </Typography>
            
            {filtered.filter(n => n.dateGroup === group).map(n => {
              const IconComponent = notificationTypes[n.type]?.icon;
              const iconColor = notificationTypes[n.type]?.color;
              
              return (
                <Paper
                  key={n.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderLeft: '3px solid',
                    borderLeftColor: n.read ? 'transparent' : 'secondary.main',
                    borderRadius: 2,
                    bgcolor: n.read ? '#ffffff' : 'rgba(231, 76, 60, 0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderLeftColor: 'secondary.main',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      '.notif-actions': {
                        opacity: 1
                      }
                    }
                  }}
                  onClick={() => markAsRead(n.id)}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        bgcolor: 'rgba(231, 76, 60, 0.05)'
                      }}
                    >
                      {IconComponent && <IconComponent sx={{ fontSize: 24, color: iconColor }} />}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: '"Playfair Display", serif',
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          color: 'text.primary',
                          mb: 0.5
                        }}
                      >
                        {n.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.7,
                          mb: 1
                        }}
                      >
                        {n.content}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.disabled',
                          fontSize: '0.75rem'
                        }}
                      >
                        {n.time}
                      </Typography>
                    </Box>

                    <Box
                      className="notif-actions"
                      sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'flex-start',
                        opacity: 0,
                        transition: 'opacity 0.3s'
                      }}
                    >
                      {n.editable && (
                        <IconButton
                          size="small"
                          onClick={e => {
                            e.stopPropagation();
                            handleEdit(n.id);
                          }}
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              color: 'secondary.main',
                              bgcolor: 'rgba(231, 76, 60, 0.08)'
                            }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton
                        size="small"
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(n.id);
                        }}
                        sx={{
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'error.main',
                            bgcolor: 'rgba(211, 47, 47, 0.08)'
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        ))}

        {filtered.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: 'text.secondary',
                mb: 1
              }}
            >
              Không tìm thấy thông báo
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Edit Dialog */}
      <Dialog
        open={!!editId}
        onClose={() => setEditId(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700
          }}
        >
          Chỉnh sửa thông báo
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            label="Nội dung thông báo"
            fullWidth
            multiline
            rows={4}
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
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
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setEditId(null)}
            sx={{
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleEditSave}
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

      {/* Delete Dialog */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700
          }}
        >
          Xác nhận xóa
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Bạn có chắc chắn muốn xóa thông báo này không?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setDeleteId(null)}
            sx={{
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
            sx={{
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
