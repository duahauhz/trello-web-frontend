# Backend API Structure - Appointment System

## 📋 Tổng quan
Tài liệu này mô tả cấu trúc API backend cần thiết để hiển thị và quản lý lịch hẹn khám bệnh.

---

## 🔗 API Endpoints

### 1. GET /api/appointments
**Mục đích:** Lấy danh sách tất cả lịch hẹn của user

**Headers:**
```json
{
  "Authorization": "Bearer {token}",
  "Content-Type": "application/json"
}
```

**Query Parameters:**
- `status` (optional): Filter by status (Confirmed, Pending, Cancelled, Completed)
- `from_date` (optional): Filter appointments from this date (YYYY-MM-DD)
- `to_date` (optional): Filter appointments to this date (YYYY-MM-DD)
- `doctor_id` (optional): Filter by specific doctor

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "doctorId": 5,
      "doctorName": "Dr. Nguyễn Văn Anh",
      "doctorImage": "https://example.com/doctor-image.jpg",
      "specialty": "Bác sĩ Tim mạch",
      "date": "25/10/2025",
      "time": "09:00",
      "status": "Confirmed",
      "phone": "0901 234 567",
      "location": "Phòng khám Tim mạch, Tầng 3",
      "notes": "Mang theo kết quả xét nghiệm tim mạch gần nhất",
      "patientName": "Nguyễn Văn A",
      "patientPhone": "0912 345 678",
      "reason": "Khám định kỳ tim mạch",
      "createdAt": "2025-10-14T10:30:00Z"
    }
  ],
  "meta": {
    "total": 4,
    "page": 1,
    "perPage": 10
  }
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "Unauthorized - Token không hợp lệ hoặc đã hết hạn"
}
```

---

### 2. GET /api/appointments/:id
**Mục đích:** Lấy chi tiết một lịch hẹn cụ thể

**URL Parameters:**
- `id`: Appointment ID

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "doctorId": 5,
    "doctorName": "Dr. Nguyễn Văn Anh",
    "doctorImage": "https://example.com/doctor-image.jpg",
    "specialty": "Bác sĩ Tim mạch",
    "date": "25/10/2025",
    "time": "09:00",
    "status": "Confirmed",
    "phone": "0901 234 567",
    "location": "Phòng khám Tim mạch, Tầng 3",
    "notes": "Mang theo kết quả xét nghiệm tim mạch gần nhất",
    "patientName": "Nguyễn Văn A",
    "patientPhone": "0912 345 678",
    "patientEmail": "patient@example.com",
    "reason": "Khám định kỳ tim mạch",
    "createdAt": "2025-10-14T10:30:00Z",
    "updatedAt": "2025-10-14T10:30:00Z"
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Không tìm thấy lịch hẹn"
}
```

---

### 3. POST /api/appointments
**Mục đích:** Tạo lịch hẹn mới

**Request Body:**
```json
{
  "doctorId": 5,
  "date": "2025-10-25",
  "time": "09:00",
  "patientName": "Nguyễn Văn A",
  "patientPhone": "0912345678",
  "patientEmail": "patient@example.com",
  "reason": "Khám định kỳ tim mạch",
  "notes": "Có mang theo kết quả xét nghiệm"
}
```

**Validation Rules:**
- `doctorId`: Required, must exist in database
- `date`: Required, format YYYY-MM-DD, must be future date
- `time`: Required, format HH:mm
- `patientName`: Required, min 3 characters
- `patientPhone`: Required, valid phone format
- `patientEmail`: Optional, valid email format
- `reason`: Required, min 10 characters
- `notes`: Optional

**Response Success (201):**
```json
{
  "success": true,
  "message": "Đặt lịch thành công",
  "data": {
    "id": 5,
    "doctorId": 5,
    "doctorName": "Dr. Nguyễn Văn Anh",
    "specialty": "Bác sĩ Tim mạch",
    "date": "25/10/2025",
    "time": "09:00",
    "status": "Pending",
    "patientName": "Nguyễn Văn A",
    "patientPhone": "0912345678",
    "reason": "Khám định kỳ tim mạch",
    "createdAt": "2025-10-14T10:30:00Z"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": {
    "date": "Ngày khám phải là ngày trong tương lai",
    "time": "Khung giờ này đã được đặt"
  }
}
```

---

### 4. POST /api/appointments/:id/cancel
**Mục đích:** Hủy lịch hẹn

**URL Parameters:**
- `id`: Appointment ID

**Request Body (Optional):**
```json
{
  "reason": "Lý do hủy lịch"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Đã hủy lịch hẹn thành công",
  "data": {
    "id": 1,
    "status": "Cancelled",
    "cancelledAt": "2025-10-14T11:00:00Z",
    "cancelReason": "Lý do hủy lịch"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Không thể hủy lịch hẹn đã diễn ra hoặc đã hủy trước đó"
}
```

---

### 5. PUT /api/appointments/:id
**Mục đích:** Cập nhật thông tin lịch hẹn (reschedule)

**Request Body:**
```json
{
  "date": "2025-10-26",
  "time": "10:00",
  "notes": "Cập nhật ghi chú"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Cập nhật lịch hẹn thành công",
  "data": {
    "id": 1,
    "date": "26/10/2025",
    "time": "10:00",
    "updatedAt": "2025-10-14T11:30:00Z"
  }
}
```

---

### 6. GET /api/appointments/upcoming
**Mục đích:** Lấy các lịch hẹn sắp tới (trong 7 ngày)

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "doctorName": "Dr. Nguyễn Văn Anh",
      "specialty": "Bác sĩ Tim mạch",
      "date": "25/10/2025",
      "time": "09:00",
      "status": "Confirmed",
      "daysUntil": 11
    }
  ]
}
```

---

## 📊 Database Schema

### Table: appointments

```sql
CREATE TABLE appointments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  doctor_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  patient_name VARCHAR(255) NOT NULL,
  patient_phone VARCHAR(20) NOT NULL,
  patient_email VARCHAR(255),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') DEFAULT 'Pending',
  reason TEXT NOT NULL,
  notes TEXT,
  cancel_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  cancelled_at TIMESTAMP NULL,
  
  FOREIGN KEY (doctor_id) REFERENCES doctors(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_date (user_id, appointment_date),
  INDEX idx_doctor_date (doctor_id, appointment_date),
  INDEX idx_status (status)
);
```

---

## 🔄 Frontend Integration

### Cách sử dụng trong Frontend:

```javascript
// 1. Import useEffect và useState
import { useEffect, useState } from 'react';

// 2. Trong component AppointmentSchedule
useEffect(() => {
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/appointments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      
      const result = await response.json();
      setAppointmentList(result.data);
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({
        open: true,
        message: 'Không thể tải danh sách lịch hẹn',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  fetchAppointments();
}, []);

// 3. Cancel appointment
const handleConfirmCancel = async () => {
  try {
    setLoading(true);
    const response = await fetch(`/api/appointments/${selectedAppointment.id}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reason: 'Lý do hủy lịch'
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to cancel appointment');
    }
    
    // Update local state
    setAppointmentList(prev => prev.filter(apt => apt.id !== selectedAppointment.id));
    
    setSnackbar({
      open: true,
      message: 'Đã hủy lịch hẹn thành công',
      severity: 'success'
    });
  } catch (error) {
    setSnackbar({
      open: true,
      message: 'Không thể hủy lịch hẹn',
      severity: 'error'
    });
  } finally {
    setLoading(false);
  }
};
```

---

## 🔐 Authentication

Tất cả endpoints yêu cầu JWT token trong header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Token phải chứa:
- `userId`: ID của user
- `exp`: Expiration time
- `role`: User role (patient, doctor, admin)

---

## 📝 Status Flow

```
Pending → Confirmed → Completed
   ↓
Cancelled
```

- **Pending**: Mới tạo, chờ xác nhận
- **Confirmed**: Đã được xác nhận bởi phòng khám/bác sĩ
- **Completed**: Đã hoàn thành khám
- **Cancelled**: Đã bị hủy

---

## ⚡ Real-time Updates (Optional)

Sử dụng WebSocket để nhận thông báo real-time:

```javascript
const ws = new WebSocket('wss://api.example.com/ws/appointments');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'APPOINTMENT_CONFIRMED') {
    // Update appointment status in UI
    setAppointmentList(prev => 
      prev.map(apt => 
        apt.id === data.appointmentId 
          ? { ...apt, status: 'Confirmed' }
          : apt
      )
    );
    
    // Show notification
    setSnackbar({
      open: true,
      message: 'Lịch hẹn đã được xác nhận',
      severity: 'success'
    });
  }
};
```

---

## 🧪 Testing

### Test Cases:

1. **Fetch appointments**: Kiểm tra load danh sách thành công
2. **Empty state**: Kiểm tra khi không có lịch hẹn
3. **Cancel appointment**: Kiểm tra hủy lịch thành công
4. **Error handling**: Kiểm tra xử lý lỗi network
5. **Token expiration**: Kiểm tra khi token hết hạn
6. **Real-time dates**: Kiểm tra ngày giờ hiển thị đúng theo thời gian thực

---

## 📌 Notes

1. **Timezone**: Backend nên lưu timestamp theo UTC, frontend convert sang timezone local
2. **Date Format**: Backend trả về ISO 8601, frontend format theo locale
3. **Pagination**: Implement pagination cho danh sách dài
4. **Cache**: Cache appointments trong 5 phút để giảm tải server
5. **Retry**: Implement retry logic cho failed requests
6. **Optimistic Updates**: Update UI trước, sync với server sau

---

**Version:** 1.0  
**Last Updated:** October 2025  
**Contact:** Backend Team
