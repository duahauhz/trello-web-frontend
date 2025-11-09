# 🚪 THÊM CHỨC NĂNG ĐĂNG XUẤT CHO BỆNH NHÂN

## 📋 TỔNG QUAN
Đã thêm chức năng đăng xuất cho Header của Bệnh nhân, tương tự như Header của Bác sĩ.

---

## ✅ CÁC THAY ĐỔI

### **Header.jsx** (Bệnh nhân)

#### 1. **Thêm imports**
```javascript
import LogoutIcon from "@mui/icons-material/Logout";
import { Menu, MenuItem, Divider } from "@mui/material";
```

#### 2. **Thêm state và handlers**
```javascript
const { user, logout } = useAuth();
const [anchorEl, setAnchorEl] = useState(null);

const handleAvatarClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

const handleProfileClick = () => {
  navigate("/user");
  handleMenuClose();
};

const handleLogout = () => {
  logout();
  handleMenuClose();
  navigate("/");
};
```

#### 3. **Dropdown Menu cho Desktop**
Click vào Avatar sẽ hiển thị menu với 2 options:
- **Trang cá nhân**: Chuyển đến `/user`
- **Đăng xuất** (màu đỏ): Đăng xuất và về trang chủ

```jsx
<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
>
  <MenuItem onClick={handleProfileClick}>
    <Avatar>{user?.name?.charAt(0)}</Avatar>
    Trang cá nhân
  </MenuItem>
  <Divider />
  <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
    <LogoutIcon />
    Đăng xuất
  </MenuItem>
</Menu>
```

#### 4. **Nút Đăng xuất cho Mobile**
Thêm vào cuối Drawer menu:
```jsx
{user && (
  <>
    <Divider />
    <ListItem>
      <ListItemButton onClick={handleLogout}>
        <LogoutIcon />
        Đăng xuất
      </ListItemButton>
    </ListItem>
  </>
)}
```

---

## 🎨 THIẾT KẾ

### **Desktop View**
```
┌─────────────────────────────────────────────────┐
│  FAQ  🔔    🏥 SeniorCare    🌙  Xin chào, User 📷│
├─────────────────────────────────────────────────┤
│   Trang chủ   Tin tức   Đặt lịch   AI   Hỗ trợ  │
└─────────────────────────────────────────────────┘
                                              ↓ Click
                                    ┌─────────────────┐
                                    │ 👤 Trang cá nhân │
                                    ├─────────────────┤
                                    │ 🚪 Đăng xuất     │
                                    └─────────────────┘
```

### **Mobile View**
```
┌──────────────────────────┐
│ ☰  🏥 SeniorCare    📷   │
└──────────────────────────┘
     ↓ Click ☰
┌──────────────────────────┐
│ Menu                  ✕  │
├──────────────────────────┤
│ 📷 User                  │
│ 🌙 Dark Mode             │
├──────────────────────────┤
│ Trang chủ                │
│ Tin tức                  │
│ Đặt lịch khám            │
│ AI Companion             │
│ Hỗ trợ                   │
│ FAQ                      │
│ Thông báo          🔴    │
├──────────────────────────┤
│ 🚪 Đăng xuất             │ ← NEW!
└──────────────────────────┘
```

---

## 🔧 CHỨC NĂNG

### **Desktop**
1. **Click Avatar** → Hiển thị dropdown menu
2. **Chọn "Trang cá nhân"** → Navigate to `/user`
3. **Chọn "Đăng xuất"** → Logout → Navigate to `/`

### **Mobile**
1. **Click ☰** → Mở drawer menu
2. **Scroll xuống cuối**
3. **Click "Đăng xuất"** → Logout → Close drawer → Navigate to `/`

---

## 🎯 UX IMPROVEMENTS

### **Trước ❌**
- Không có cách nào để đăng xuất từ giao diện
- Phải vào `/user` rồi tìm nút đăng xuất
- Trải nghiệm không nhất quán với Doctor Portal

### **Sau ✅**
- ✅ Click avatar hiển thị menu dropdown
- ✅ Nút đăng xuất dễ thấy (màu đỏ)
- ✅ Có trên cả Desktop và Mobile
- ✅ Nhất quán với Doctor Header
- ✅ Icon LogoutIcon rõ ràng

---

## 🎨 STYLING

### **Menu Dropdown**
```css
minWidth: 200px
border: 1px solid divider
marginTop: 1.5 (12px)
```

### **Đăng xuất Item**
```css
color: error.main (#e74c3c)
icon: LogoutIcon (20px)
fontWeight: 600
```

### **Mobile Button**
```css
padding: 1.5 (12px vertical)
color: error.main
fullWidth
```

---

## 📊 SO SÁNH PATIENT vs DOCTOR HEADER

| Feature | Patient ✅ | Doctor ✅ |
|---------|-----------|-----------|
| Logo | SeniorCare | SeniorCare DOCTOR PORTAL |
| Avatar Border | Gray | Red (#e74c3c) |
| Name Display | "Xin chào, [Name]" | "BS. [Name]" + specialty |
| Menu Items | Trang chủ, Tin tức, Đặt lịch, AI, Hỗ trợ | Dashboard, Lịch hẹn, Bệnh nhân, Cài đặt |
| Dropdown Menu | Trang cá nhân, Đăng xuất | Cài đặt, Đăng xuất |
| Logout Icon | ✅ LogoutIcon | ✅ LogoutIcon |
| Logout Color | ✅ Red | ✅ Red |

---

## ✅ CHECKLIST

- [x] Import LogoutIcon
- [x] Import Menu, MenuItem, Divider
- [x] Add anchorEl state
- [x] Update handleAvatarClick to open menu
- [x] Add handleMenuClose
- [x] Add handleProfileClick
- [x] Add handleLogout with logout() from AuthContext
- [x] Add Desktop dropdown menu
- [x] Add Mobile logout button
- [x] Style logout items with error.main
- [x] Test no errors

---

## 🚀 CÁCH SỬ DỤNG

### **Desktop**
1. Đăng nhập bệnh nhân
2. Click vào Avatar (góc phải trên)
3. Chọn "Đăng xuất"
4. ✅ Đã đăng xuất và về trang chủ

### **Mobile**
1. Đăng nhập bệnh nhân
2. Click ☰ menu
3. Scroll xuống cuối
4. Click "Đăng xuất"
5. ✅ Đã đăng xuất và về trang chủ

---

## 🎉 KẾT QUẢ

✅ **Patient Header** giờ có chức năng đăng xuất hoàn chỉnh
✅ **Nhất quán** với Doctor Header
✅ **Dễ sử dụng** trên cả Desktop và Mobile
✅ **Styling** professional với màu đỏ error
✅ **No errors** - Code clean

**Ngày hoàn thành:** 9/11/2024  
**Version:** 2.1.0
