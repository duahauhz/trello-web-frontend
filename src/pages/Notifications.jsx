// src/pages/Notifications.jsx
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Chip,
  Fade,
  Tooltip,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const notificationTypes = {
  appointment: { label: "Lịch khám", icon: <EventNoteIcon color="primary" /> },
  note: { label: "Ghi chú y tế", icon: <NotificationsActiveIcon color="success" /> },
  system: { label: "Hệ thống", icon: <NotificationsActiveIcon color="info" /> },
};

const initialNotifications = [
  {
    id: 1,
    type: "appointment",
    title: "Lịch Khám: Khám định kỳ 10:00 AM",
    content: "Bạn có lịch khám định kỳ với Bác sĩ Nguyễn Văn A tại Phòng 203.",
    time: "2 phút trước",
    read: false,
    editable: true,
    dateGroup: "Hôm nay",
  },
  {
    id: 2,
    type: "note",
    title: "Ghi chú y tế: Cập nhật thông tin thuốc",
    content: "Cập nhật danh sách thuốc mới: Paracetamol 500mg - 2 viên/ngày, Vitamin C 1000mg - 1 viên/ngày.",
    time: "1 giờ trước",
    read: false,
    editable: true,
    dateGroup: "Hôm nay",
  },
  {
    id: 3,
    type: "system",
    title: "Hệ thống: Cập nhật thông tin",
    content: "Vui lòng cập nhật thông tin cá nhân và số điện thoại liên hệ của người thân để đảm bảo liên lạc khi cần thiết.",
    time: "3 giờ trước",
    read: false,
    editable: false,
    dateGroup: "Hôm nay",
  },
  {
    id: 4,
    type: "appointment",
    title: "Lịch Trình: Thay đổi lịch khám 3:00 PM",
    content: "Lịch khám của bạn đã được điều chỉnh sang 3:00 PM theo yêu cầu. Bác sĩ Trần Thị B sẽ là người phụ trách khám.",
    time: "22 giờ trước",
    read: true,
    editable: true,
    dateGroup: "Hôm qua",
  },
  {
    id: 5,
    type: "note",
    title: "Ghi chú y tế: Kết quả xét nghiệm máu",
    content: "Kết quả xét nghiệm máu của bạn đã có. Tất cả các chỉ số đều trong ngưỡng bình thường.",
    time: "1 ngày trước",
    read: true,
    editable: true,
    dateGroup: "Hôm qua",
  },
  {
    id: 6,
    type: "system",
    title: "Hệ thống: Nhắc lịch tái khám",
    content: "Nhắc nhở: Lịch tái khám định kỳ của bạn sẽ đến trong 3 ngày tới. Vui lòng xác nhận tham dự.",
    time: "2 ngày trước",
    read: true,
    editable: false,
    dateGroup: "Hôm qua",
  },
  {
    id: 7,
    type: "appointment",
    title: "Lịch Khám: Kết quả chẩn đoán",
    content: "Bác sĩ đã cập nhật kết quả chẩn đoán của bạn. Vui lòng xem chi tiết trong hồ sơ bệnh án.",
    time: "3 ngày trước",
    read: true,
    editable: true,
    dateGroup: "20 Tháng 9",
  },
  {
    id: 8,
    type: "note",
    title: "Ghi chú y tế: Đơn thuốc mới",
    content: "Đơn thuốc mới đã được cập nhật vào hệ thống. Vui lòng kiểm tra và xác nhận trước khi đến nhận thuốc.",
    time: "4 ngày trước",
    read: true,
    editable: true,
    dateGroup: "19 Tháng 9",
  },
  {
    id: 9,
    type: "system",
    title: "Hệ thống: Cập nhật chính sách",
    content: "Chính sách bảo mật đã được cập nhật. Vui lòng đọc và xác nhận để tiếp tục sử dụng dịch vụ.",
    time: "5 ngày trước",
    read: true,
    editable: false,
    dateGroup: "18 Tháng 9",
  },
  {
    id: 10,
    type: "appointment",
    title: "Lịch Khám: Tư vấn trực tuyến",
    content: "Buổi tư vấn trực tuyến với Bác sĩ Lê Văn C đã được xác nhận vào ngày 25/09/2023.",
    time: "1 tuần trước",
    read: true,
    editable: true,
    dateGroup: "16 Tháng 9",
  }
];

const ScrollBox = styled(Box)(() => ({
  maxHeight: 'calc(100vh - 180px)', // Reduced from 250px to fit content better
  overflowY: "auto",
  paddingRight: 4,
  scrollbarWidth: "thin",
  scrollbarColor: "#0288d1 rgba(2, 136, 209, 0.1)",
  '&::-webkit-scrollbar': {
    width: 6,
    background: 'rgba(2, 136, 209, 0.1)',
    borderRadius: 10,
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#0288d1',
    borderRadius: 10,
    '&:hover': {
      background: '#0277bd',
    }
  },
  '&::-webkit-scrollbar-track': {
    margin: '4px 0',
  }
}));

export default function Notifications() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [data, setData] = useState(initialNotifications);
  const [deleteId, setDeleteId] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');

  // Lọc theo search và loại
  const filtered = data.filter(n =>
    (typeFilter === 'all' || n.type === typeFilter) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()))
  );

  // Nhóm theo ngày
  const groups = Array.from(new Set(filtered.map(n => n.dateGroup)));

  // Xử lý edit
  const handleEdit = (id) => {
    const notif = data.find(n => n.id === id);
    setEditId(id);
    setEditContent(notif.content);
  };
  const handleEditSave = () => {
    setData(data.map(n => n.id === editId ? { ...n, content: editContent } : n));
    setEditId(null);
  };

  // Xử lý xóa
  const handleDelete = (id) => setDeleteId(id);
  const handleDeleteConfirm = () => {
    setData(data.filter(n => n.id !== deleteId));
    setDeleteId(null);
  };

  // Đánh dấu đã đọc
  const markAsRead = (id) => {
    setData(data.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <>
      <Header />

      <Box sx={{ 
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgb(10, 25, 41)' : '#ffffff',
        height: "calc(100vh - 64px)", // Changed from minHeight to height
        pb: 0,
        pt: 2, // Reduced from 4 to 2
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ 
          maxWidth: 800, 
          width: '100%',
          mx: "auto", 
          mb: 0,
          position: 'relative', 
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="h4" fontWeight={700} color="#0b1d46ff" mb={2} sx={{ textAlign: 'end' }} margin={5}>
            Thông báo
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Tìm kiếm thông báo..."
              size="small"
              fullWidth
              value={search}
              onChange={e => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: "#00838f" }} />, sx: { bgcolor: "#fff", borderRadius: 2 },
              }}
            />
            <Chip 
              label="Tất cả" 
              color={typeFilter==='all' ? 'primary' : 'default'} 
              clickable 
              onClick={()=>setTypeFilter('all')} 
              sx={{
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.08)' : '#e3f2fd',
                borderColor: (theme) => theme.palette.mode === 'dark' ? '#1976d2' : '#1976d2',
                color: (theme) => typeFilter==='all' 
                  ? '#fff'
                  : (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#1565c0'),
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.12)' : '#bbdefb',
                  boxShadow: '0 2px 8px rgba(25,118,210,0.15)'
                }
              }}
            />
            <Chip 
              label="Lịch khám" 
              color={typeFilter==='appointment' ? 'primary' : 'default'} 
              clickable 
              onClick={()=>setTypeFilter('appointment')} 
              sx={{
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.08)' : '#e3f2fd',
                borderColor: (theme) => theme.palette.mode === 'dark' ? '#1976d2' : '#1976d2',
                color: (theme) => typeFilter==='appointment' 
                  ? '#fff'
                  : (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#1565c0'),
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.12)' : '#bbdefb',
                  boxShadow: '0 2px 8px rgba(25,118,210,0.15)'
                }
              }}
            />
            <Chip 
              label="Ghi chú y tế" 
              color={typeFilter==='note' ? 'primary' : 'default'} 
              clickable 
              onClick={()=>setTypeFilter('note')} 
              sx={{
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.08)' : '#e3f2fd',
                borderColor: (theme) => theme.palette.mode === 'dark' ? '#1976d2' : '#1976d2',
                color: (theme) => typeFilter==='note' 
                  ? '#fff'
                  : (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#1565c0'),
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.12)' : '#bbdefb',
                  boxShadow: '0 2px 8px rgba(25,118,210,0.15)'
                }
              }}
            />
            <Chip 
              label="Hệ thống" 
              color={typeFilter==='system' ? 'primary' : 'default'} 
              clickable 
              onClick={()=>setTypeFilter('system')} 
              sx={{
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.08)' : '#e3f2fd',
                borderColor: (theme) => theme.palette.mode === 'dark' ? '#1976d2' : '#1976d2',
                color: (theme) => typeFilter==='system' 
                  ? '#fff'
                  : (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#1565c0'),
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.12)' : '#bbdefb',
                  boxShadow: '0 2px 8px rgba(25,118,210,0.15)'
                }
              }}
            />
          </Box>
          {/* Timeline hiệu ứng + scroll đẹp */}
          <ScrollBox>
            {groups.map(group => (
              <Box key={group} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} color="#00838f" mb={1}>
                  {group}
                </Typography>
                {filtered.filter(n => n.dateGroup === group).map(n => (
                  <Fade in key={n.id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: (theme) => theme.palette.mode === 'dark' 
                          ? (n.read ? 'rgba(0, 136, 255, 0.08)' : 'rgba(0, 136, 255, 0.15)') 
                          : (n.read ? '#f5f9ff' : '#e3f2fd'),
                        borderRadius: 2,
                        boxShadow: n.read 
                          ? 'none' 
                          : (theme) => `0 2px 12px ${theme.palette.mode === 'dark' 
                              ? 'rgba(0,136,255,0.1)' 
                              : 'rgba(30,136,229,0.08)'}`,
                        p: 2,
                        mb: 1.5,
                        position: "relative",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          bgcolor: (theme) => theme.palette.mode === 'dark'
                            ? 'rgba(0, 136, 255, 0.2)'
                            : '#e3f2fd',
                          boxShadow: (theme) => `0 8px 32px ${
                            theme.palette.mode === 'dark'
                              ? 'rgba(0,136,255,0.25)'
                              : 'rgba(30,136,229,0.15)'
                          }`,
                          ".notif-actions": { 
                            opacity: 1, 
                            pointerEvents: "auto",
                            transform: 'translateX(0)'
                          },
                        },
                      }}
                      onClick={() => markAsRead(n.id)}
                    >
                      <Avatar sx={{ 
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1976d2' : '#1976d2',
                        mr: 2, 
                        boxShadow: (theme) => `0 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(25,118,210,0.3)' : 'rgba(25,118,210,0.2)'}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
                        '&:hover': { 
                          transform: 'scale(1.08) rotate(-6deg)',
                          boxShadow: (theme) => `0 4px 12px ${theme.palette.mode === 'dark' ? 'rgba(25,118,210,0.4)' : 'rgba(25,118,210,0.3)'}`,
                        } 
                      }}>
                        {notificationTypes[n.type]?.icon}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          fontWeight={600} 
                          sx={{ 
                            color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#0d47a1',
                            mb: 0.5
                          }}
                        >
                          {n.title}
                        </Typography>
                        <Typography 
                          fontSize={15} 
                          sx={{ 
                            color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)',
                            lineHeight: 1.5
                          }}
                        >
                          {n.content}
                        </Typography>
                        <Typography 
                          fontSize={13} 
                          sx={{ 
                            color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                            mt: 0.5
                          }}
                        >
                          {n.time}
                        </Typography>
                      </Box>
                      {!n.read && (
                        <Tooltip title="Chưa đọc">
                          <FiberManualRecordIcon sx={{ 
                            color: '#2196f3', 
                            fontSize: 12, 
                            mr: 1,
                            animation: 'pulse 2s infinite',
                            '@keyframes pulse': {
                              '0%': { opacity: 1 },
                              '50%': { opacity: 0.5 },
                              '100%': { opacity: 1 },
                            }
                          }} />
                        </Tooltip>
                      )}
                      <Box className="notif-actions" sx={{
                        opacity: 0, 
                        pointerEvents: "none", 
                        display: "flex", 
                        gap: 1, 
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        transform: 'translateX(10px)'
                      }}>
                        {n.editable && (
                          <IconButton 
                            size="small" 
                            color="primary" 
                            onClick={e => { e.stopPropagation(); handleEdit(n.id); }}
                            sx={{
                              bgcolor: 'rgba(25, 118, 210, 0.08)',
                              '&:hover': {
                                bgcolor: 'rgba(25, 118, 210, 0.15)',
                              }
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={e => { e.stopPropagation(); handleDelete(n.id); }}
                          sx={{
                            bgcolor: 'rgba(211, 47, 47, 0.08)',
                            '&:hover': {
                              bgcolor: 'rgba(211, 47, 47, 0.15)',
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Fade>
                ))}
              </Box>
            ))}
          </ScrollBox>
        </Box>
        {/* Dialog edit */}
        <Dialog open={!!editId} onClose={() => setEditId(null)}>
          <DialogTitle>Chỉnh sửa thông báo</DialogTitle>
          <DialogContent>
            <TextField
              label="Nội dung thông báo"
              fullWidth
              multiline
              minRows={3}
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditId(null)}>Hủy</Button>
            <Button variant="contained" onClick={handleEditSave}>Lưu</Button>
          </DialogActions>
        </Dialog>
        {/* Dialog xác nhận xóa */}
        <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>Bạn có chắc muốn xóa thông báo này?</DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)}>Hủy</Button>
            <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Xóa</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
