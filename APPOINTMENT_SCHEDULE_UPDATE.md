# 📝 Cập nhật Component AppointmentSchedule

## ✨ Các cải tiến đã thực hiện

### 1. **Thiết kế Responsive & Compact**
- ✅ Thêm `maxWidth: 1400px` và padding responsive để component không tràn viền màn hình
- ✅ Tối ưu khoảng cách và kích thước cho màn hình nhỏ
- ✅ Grid layout responsive: 1 cột (mobile) → 2 cột (tablet) → 3 cột (desktop)

### 2. **Chức năng Xem Chi tiết**
- ✅ Dialog hiển thị đầy đủ thông tin lịch hẹn:
  - Thông tin bác sĩ (avatar, tên, chuyên khoa, trạng thái)
  - Ngày giờ khám
  - Địa điểm phòng khám
  - Số điện thoại bác sĩ
  - Ghi chú chuẩn bị
  - Thông tin bệnh nhân (tên, SĐT, lý do khám)
- ✅ Icon trực quan cho từng loại thông tin
- ✅ Layout 2 cột hiển thị thông tin rõ ràng

### 3. **Chức năng Hủy lịch**
- ✅ Dialog xác nhận trước khi hủy
- ✅ Hiển thị thông tin lịch hẹn cần hủy
- ✅ Alert cảnh báo màu vàng
- ✅ Xóa appointment khỏi danh sách sau khi hủy thành công
- ✅ Snackbar thông báo kết quả (success/error)

### 4. **Quản lý State**
- ✅ State management cho appointment list
- ✅ State cho dialog (chi tiết, hủy lịch)
- ✅ State cho snackbar notifications
- ✅ Xử lý xóa appointment khỏi list khi hủy

### 5. **Backend Integration Ready**
- ✅ Mock data có đầy đủ fields cần thiết cho API
- ✅ Props `appointments` để nhận data từ parent component
- ✅ useEffect để sync với props
- ✅ TODO comments cho API calls trong `handleConfirmCancel`
- ✅ Cấu trúc data mapping với backend schema

## 📦 API Service Files Đã Tạo

### 1. `src/services/appointmentService.js`
Chứa tất cả API calls liên quan đến appointments:
- `getAppointments()` - Lấy danh sách lịch hẹn
- `getAppointmentById(id)` - Chi tiết 1 lịch hẹn
- `createAppointment(data)` - Tạo lịch hẹn mới
- `updateAppointment(id, data)` - Cập nhật lịch hẹn
- `cancelAppointment(id)` - Hủy lịch hẹn
- `deleteAppointment(id)` - Xóa vĩnh viễn
- `getAvailableSlots(doctorId, date)` - Lấy khung giờ trống

### 2. `src/services/doctorService.js`
Chứa API calls liên quan đến doctors:
- `getDoctors(filters)` - Lấy danh sách bác sĩ với filters
- `getDoctorById(id)` - Chi tiết bác sĩ
- `getTopRatedDoctors(limit)` - Bác sĩ được đánh giá cao
- `getDoctorsBySpecialty(specialtyId)` - Bác sĩ theo chuyên khoa
- `getDoctorReviews(doctorId)` - Đánh giá của bác sĩ
- `getSpecialties()` - Danh sách chuyên khoa
- `searchDoctors(term)` - Tìm kiếm bác sĩ

## 🔧 Cách Tích hợp Backend

### Bước 1: Cấu hình API URL
Tạo file `.env`:
```env
REACT_APP_API_URL=http://localhost:3000/api
```

### Bước 2: Import Service
```javascript
import { getAppointments, cancelAppointment } from '../services/appointmentService';
```

### Bước 3: Thay thế Mock Data
Trong `AppointmentSchedule.jsx`, uncomment và sử dụng:
```javascript
useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointmentList(data);
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({
        open: true,
        message: 'Không thể tải danh sách lịch hẹn',
        severity: 'error'
      });
    }
  };
  
  fetchAppointments();
}, []);
```

### Bước 4: Kết nối API Hủy lịch
Trong `handleConfirmCancel`, thay thế TODO:
```javascript
const handleConfirmCancel = async () => {
  try {
    await cancelAppointment(selectedAppointment.id); // ← API call
    
    setAppointmentList(prev => prev.filter(apt => apt.id !== selectedAppointment.id));
    
    setSnackbar({
      open: true,
      message: 'Đã hủy lịch hẹn thành công',
      severity: 'success'
    });
    setCancelDialog(false);
    setSelectedAppointment(null);
  } catch (error) {
    setSnackbar({
      open: true,
      message: error.message || 'Không thể hủy lịch hẹn',
      severity: 'error'
    });
  }
};
```

## 📊 Data Structure

### Appointment Object
```javascript
{
  id: 1,
  doctorName: "Dr. Nguyễn Văn Anh",
  doctorImage: "url",
  specialty: "Bác sĩ Tim mạch",
  date: "25/10/2025",
  time: "09:00 AM",
  status: "Confirmed", // or "Pending"
  phone: "0901 234 567",
  location: "Phòng khám Tim mạch, Tầng 3",
  notes: "Mang theo kết quả xét nghiệm",
  patientName: "Nguyễn Văn A",
  patientPhone: "0912 345 678",
  reason: "Khám định kỳ tim mạch"
}
```

## 🎨 UI Components Sử dụng

- **Material-UI Components:**
  - `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`
  - `Snackbar`, `Alert`
  - `IconButton`, `Avatar`, `Chip`
  - `Typography`, `Divider`, `Box`
  
- **Icons:**
  - `CalendarTodayIcon` - Ngày khám
  - `AccessTimeIcon` - Giờ khám
  - `LocationOnIcon` - Địa điểm
  - `PhoneIcon` - Số điện thoại
  - `NotesIcon` - Ghi chú
  - `CloseIcon` - Đóng dialog

## 🔐 Authentication

API services đã được chuẩn bị sẵn Bearer token authentication:
```javascript
headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```

Cần implement:
1. Login flow để lưu token
2. Token refresh khi hết hạn
3. Logout để xóa token

## ⚡ Performance Optimizations

- ✅ useEffect chỉ chạy khi dependencies thay đổi
- ✅ Conditional rendering cho dialogs
- ✅ onClick handlers được memoize trong component con
- ✅ Không re-render không cần thiết với React.memo (có thể thêm)

## 🧪 Testing Checklist

- [ ] Test hiển thị danh sách appointments
- [ ] Test mở dialog chi tiết
- [ ] Test hiển thị đầy đủ thông tin trong dialog
- [ ] Test mở dialog hủy lịch
- [ ] Test xác nhận hủy lịch
- [ ] Test snackbar notifications
- [ ] Test responsive trên các màn hình
- [ ] Test với 0 appointments
- [ ] Test với > 3 appointments (nút "Xem thêm")
- [ ] Test API integration với backend thật

## 📱 Responsive Breakpoints

- **xs (mobile):** 1 cột
- **sm (tablet):** 2 cột
- **lg (desktop):** 3 cột
- **Container max-width:** 1400px
- **Padding:** 2 (mobile) → 3 (tablet+)

## 🚨 Error Handling

Component xử lý errors qua:
1. Try-catch blocks trong async functions
2. Snackbar hiển thị error messages
3. Console.error để debug
4. Graceful fallback với mock data

## 📝 TODOs

- [ ] Thêm loading skeleton khi fetch data
- [ ] Thêm empty state khi không có appointments
- [ ] Thêm pull-to-refresh trên mobile
- [ ] Thêm filters (theo ngày, theo bác sĩ, theo trạng thái)
- [ ] Thêm calendar view option
- [ ] Thêm export to calendar (ICS file)
- [ ] Thêm reminder notifications
- [ ] Thêm chức năng reschedule appointment
- [ ] Thêm video call button cho telemedicine
- [ ] Implement real-time updates với WebSocket

## 🎯 Next Steps

1. ✅ Component đã hoàn thiện về UI/UX
2. ✅ API services đã sẵn sàng
3. ⏳ Cần backend implement endpoints
4. ⏳ Test integration với backend
5. ⏳ Deploy và monitor production

---

**Tài liệu được tạo:** October 2025  
**Component:** `AppointmentSchedule.jsx`  
**Version:** 2.0 (với chi tiết & hủy lịch)
