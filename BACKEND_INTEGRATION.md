# 🏥 Tài liệu Backend Integration - Hệ thống Đặt lịch khám

## 📋 Tổng quan

Tài liệu này mô tả chi tiết cách backend có thể tích hợp với hệ thống đặt lịch khám, bao gồm các API endpoints cần thiết và cấu trúc dữ liệu.

---

## 🔗 API Endpoints Cần Thiết

### 1. **Quản lý Lịch hẹn (Appointments)**

#### GET `/api/appointments`
**Mục đích:** Lấy danh sách lịch hẹn của user

**Request Headers:**
```json
{
  "Authorization": "Bearer {token}"
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "doctorName": "Dr. Nguyễn Văn A",
      "doctorImage": "url_to_image",
      "specialty": "Bác sĩ Tim mạch",
      "date": "25/10/2025",
      "time": "09:00 AM",
      "status": "Confirmed", // "Confirmed", "Pending", "Cancelled"
      "hospital": "Bệnh viện Đa khoa Trung ương"
    }
  ]
}
```

#### POST `/api/appointments`
**Mục đích:** Tạo lịch hẹn mới

**Request Body:**
```json
{
  "doctorId": 1,
  "date": "2025-10-25",
  "time": "09:00",
  "reason": "Khám định kỳ",
  "notes": "Ghi chú thêm..."
}
```

#### DELETE `/api/appointments/:id`
**Mục đích:** Hủy lịch hẹn

---

### 2. **Quản lý Chuyên khoa (Specialties)**

#### GET `/api/specialties`
**Mục đích:** Lấy danh sách tất cả chuyên khoa

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cardiology",
      "name": "Tim mạch",
      "description": "Chuyên khoa tim mạch",
      "doctorCount": 24,
      "icon": "favorite",
      "color": "#e74c3c"
    }
  ]
}
```

---

### 3. **Quản lý Bác sĩ (Doctors)**

#### GET `/api/doctors`
**Mục đích:** Lấy danh sách bác sĩ (có filter và sort)

**Query Parameters:**
- `specialty`: ID chuyên khoa
- `search`: Từ khóa tìm kiếm
- `sortBy`: rating | experience | price-low | price-high
- `minRating`: Đánh giá tối thiểu
- `minExperience`: Kinh nghiệm tối thiểu (năm)
- `maxExperience`: Kinh nghiệm tối đa (năm)
- `availableToday`: true | false
- `minPrice`: Giá tối thiểu
- `maxPrice`: Giá tối đa

**Response:**
```json
{
  "success": true,
  "total": 156,
  "data": [
    {
      "id": 1,
      "name": "Dr. Nguyễn Văn A",
      "image": "url_to_image",
      "specialty": "Bác sĩ tim mạch cao cấp",
      "specialtyId": "cardiology",
      "experience": 15,
      "rating": 4.8,
      "reviews": 245,
      "availableToday": true,
      "consultationFee": 500000,
      "hospital": "Bệnh viện Đa khoa Trung ương",
      "languages": ["Tiếng Việt", "English"],
      "education": "Đại học Y Hà Nội",
      "nextAvailable": "14:00 - Hôm nay"
    }
  ]
}
```

#### GET `/api/doctors/:id`
**Mục đích:** Lấy thông tin chi tiết bác sĩ

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Dr. Nguyễn Văn A",
    "image": "url_to_image",
    "specialty": "Bác sĩ tim mạch cao cấp",
    "experience": 15,
    "rating": 4.8,
    "reviews": 245,
    "consultationFee": 500000,
    "hospital": "Bệnh viện Đa khoa Trung ương",
    "about": "Mô tả chi tiết về bác sĩ...",
    "education": [
      {
        "degree": "Tiến sĩ Y khoa",
        "institution": "Đại học Y Hà Nội",
        "year": 2008
      }
    ],
    "certifications": ["Chứng chỉ hành nghề", "Chứng chỉ chuyên khoa"],
    "workingHours": {
      "monday": ["09:00-12:00", "14:00-17:00"],
      "tuesday": ["09:00-12:00", "14:00-17:00"]
    },
    "availableSlots": [
      {
        "date": "2025-10-25",
        "slots": ["09:00", "09:30", "10:00", "14:00"]
      }
    ]
  }
}
```

#### GET `/api/doctors/top-rated`
**Mục đích:** Lấy danh sách bác sĩ được đánh giá cao nhất

**Query Parameters:**
- `limit`: Số lượng bác sĩ (mặc định: 6)

---

### 4. **Quản lý Đánh giá (Reviews)**

#### GET `/api/reviews`
**Mục đích:** Lấy danh sách đánh giá từ bệnh nhân

**Query Parameters:**
- `limit`: Số lượng đánh giá
- `doctorId`: Lọc theo bác sĩ (optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "patientName": "Nguyễn Thị B",
      "patientImage": "url_to_image",
      "patientRole": "Khách hàng thân thiết",
      "rating": 5,
      "date": "2025-10-15",
      "comment": "Dịch vụ rất tốt...",
      "treatment": "Tư vấn sức khỏe trực tuyến",
      "doctorId": 1,
      "doctorName": "Dr. Nguyễn Văn A"
    }
  ]
}
```

#### POST `/api/reviews`
**Mục đích:** Tạo đánh giá mới

**Request Body:**
```json
{
  "appointmentId": 123,
  "doctorId": 1,
  "rating": 5,
  "comment": "Rất hài lòng với dịch vụ..."
}
```

---

## 📊 Cấu trúc Database đề xuất

### Table: `appointments`
```sql
CREATE TABLE appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  doctor_id INT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') DEFAULT 'Pending',
  reason TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);
```

### Table: `doctors`
```sql
CREATE TABLE doctors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(500),
  specialty_id VARCHAR(50) NOT NULL,
  specialty_name VARCHAR(255) NOT NULL,
  experience INT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INT DEFAULT 0,
  consultation_fee INT NOT NULL,
  hospital VARCHAR(255),
  education TEXT,
  about TEXT,
  languages JSON,
  available_today BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (specialty_id) REFERENCES specialties(id)
);
```

### Table: `specialties`
```sql
CREATE TABLE specialties (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(7),
  doctor_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table: `reviews`
```sql
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  doctor_id INT NOT NULL,
  appointment_id INT,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  treatment VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id),
  FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);
```

### Table: `available_slots`
```sql
CREATE TABLE available_slots (
  id INT PRIMARY KEY AUTO_INCREMENT,
  doctor_id INT NOT NULL,
  slot_date DATE NOT NULL,
  slot_time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE,
  appointment_id INT,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id),
  FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  UNIQUE KEY unique_slot (doctor_id, slot_date, slot_time)
);
```

---

## 🔐 Authentication & Authorization

Tất cả các API cần xác thực user qua JWT token:

```javascript
// Frontend gửi request
const response = await fetch('/api/appointments', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});
```

---

## 📡 Ví dụ Integration trong Frontend

### 1. Lấy danh sách lịch hẹn
```javascript
// File: AppointmentSchedule.jsx
React.useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setAppointments(data.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  
  fetchAppointments();
}, []);
```

### 2. Tìm kiếm bác sĩ với filter
```javascript
// File: SpecialtyDoctors.jsx
React.useEffect(() => {
  const fetchDoctors = async () => {
    const params = new URLSearchParams({
      specialty: specialtyId,
      search: searchTerm,
      sortBy: sortBy,
      minRating: filters.rating,
      minExperience: filters.experience[0],
      maxExperience: filters.experience[1],
      availableToday: filters.availableToday,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1]
    });
    
    const response = await fetch(`/api/doctors?${params}`);
    const data = await response.json();
    setDoctors(data.data);
  };
  
  fetchDoctors();
}, [specialtyId, searchTerm, sortBy, filters]);
```

### 3. Tạo lịch hẹn mới
```javascript
const handleBookAppointment = async (doctorId, date, time) => {
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        doctorId,
        date,
        time,
        reason: selectedReason,
        notes: additionalNotes
      })
    });
    
    const data = await response.json();
    if (data.success) {
      alert('Đặt lịch thành công!');
      navigate('/booking');
    }
  } catch (error) {
    console.error('Error booking appointment:', error);
  }
};
```

### 4. Gửi đánh giá
```javascript
const handleSubmitReview = async () => {
  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        appointmentId,
        doctorId,
        rating: selectedRating,
        comment: reviewText
      })
    });
    
    const data = await response.json();
    if (data.success) {
      alert('Cảm ơn bạn đã đánh giá!');
    }
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};
```

---

## 🎯 Các điểm quan trọng cần lưu ý

1. **Validation**: Backend cần validate tất cả input từ frontend
2. **Rate Limiting**: Giới hạn số request để tránh spam
3. **Caching**: Cache dữ liệu ít thay đổi (specialties, doctor info)
4. **Pagination**: Implement pagination cho danh sách dài
5. **Error Handling**: Trả về error messages rõ ràng
6. **Notifications**: Gửi email/SMS xác nhận lịch hẹn
7. **Time Zone**: Xử lý múi giờ chính xác
8. **Availability**: Kiểm tra slot còn trống trước khi book

---

## 🚀 Flow hoàn chỉnh đặt lịch khám

1. User vào trang `/booking`
2. Xem lịch hẹn sắp tới
3. Chọn chuyên khoa → Navigate đến `/booking/specialty/:id`
4. Tìm kiếm và filter bác sĩ
5. Click "Đặt lịch" → Navigate đến `/booking/doctor/:id`
6. Chọn ngày giờ khám
7. Điền thông tin và xác nhận
8. Backend tạo appointment và trả về confirmation
9. User nhận thông báo qua email/SMS
10. Sau khám, user có thể đánh giá bác sĩ

---

## 📞 Support

Nếu có thắc mắc về integration, vui lòng liên hệ team frontend để được hỗ trợ!
