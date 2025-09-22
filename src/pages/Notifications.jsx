// src/pages/Notifications.jsx
import {
  Box,
  Typography,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Divider
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const mockData = [
  {
    date: "Hôm nay",
    items: [
      { id: 1, title: "Lịch Khám 10:00 AM", type: "Lịch Khám", time: "2 phút trước" },
      { id: 2, title: "Ghi chú y tế mới", type: "Ghi chú y tế", time: "1 giờ trước" }
    ]
  },
  {
    date: "Hôm qua",
    items: [
      { id: 3, title: "Lịch Trình Thay đổi 3:00 PM", type: "Lịch Trình", time: "22 giờ trước" }
    ]
  },
  {
    date: "15 Tháng 4",
    items: [
      { id: 4, title: "Kết quả xét nghiệm", type: "Ghi chú y tế", time: "3 ngày trước" }
    ]
  }
];

export default function Notifications() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);

  const handleToggle = (id) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Header />

      <Box sx={{ p: 2 }}>
        {/* Nút quay lại */}
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" mb={2}>
          Thông báo
        </Typography>

        {/* Ô tìm kiếm */}
        <TextField
          placeholder="Tìm kiếm thông báo..."
          fullWidth
          variant="outlined"
          sx={{ mb: 3 }}
        />

        {/* Danh sách thông báo phân theo ngày */}
        {mockData.map((section) => (
          <Box key={section.date} sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {section.date}
            </Typography>
            <List disablePadding>
              {section.items.map((item) => (
                <Box key={item.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${item.type}: ${item.title}`}
                      secondary={item.time}
                    />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={() => handleToggle(item.id)}
                        checked={checked.includes(item.id)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </>
  );
}
