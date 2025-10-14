# 🔧 FIX: Loading Issue - 14/10/2025

## ❌ Vấn đề
Component bị stuck ở loading state, không hiển thị nội dung.

## 🔍 Nguyên nhân

### 1. **Route Parameter Mismatch** ⚠️
- Route trong `App.jsx`: `/booking/appointment/:id`
- Component `AppointmentBooking.jsx` dùng: `const { doctorId } = useParams()`
- **Không khớp!** Route dùng `:id` nhưng component lấy `doctorId`

### 2. **Mock Data Outside useEffect** ⚠️
- Mock data được define ở component level và reference `doctorId`
- Khi `doctorId` undefined → mock data có vấn đề
- Component re-render nhiều lần

### 3. **Missing Loading False When No ID** ⚠️
```javascript
if (doctorId) {
  fetchData();
}
// ❌ Nếu không có doctorId, loading vẫn = true mãi mãi!
```

## ✅ Các fix đã thực hiện

### Fix 1: Route Parameter
**File:** `src/pages/AppointmentBooking.jsx`

**Before:**
```javascript
const { doctorId } = useParams();
```

**After:**
```javascript
const { id: doctorId } = useParams(); // Route uses :id, rename to doctorId
```

---

### Fix 2: Move Mock Data Inside useEffect
**File:** `src/pages/AppointmentBooking.jsx`

**Before:**
```javascript
// Mock data ở component level
const mockDoctor = {
  id: doctorId, // ❌ doctorId có thể undefined
  name: '...',
  ...
};

useEffect(() => {
  // Fetch data
  setDoctor(mockDoctor); // Sử dụng mock data từ bên ngoài
}, [doctorId]);
```

**After:**
```javascript
useEffect(() => {
  const fetchDoctorAndSlots = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ Mock data được define bên trong useEffect
      const mockDoctor = {
        id: doctorId,
        name: 'Dr. Nguyễn Minh Khoa',
        ...
      };

      const mockAvailableSlots = { ... };

      await new Promise(resolve => setTimeout(resolve, 500));
      setDoctor(mockDoctor);
      setAvailableSlots(mockAvailableSlots);

    } catch (err) {
      setError('...');
    } finally {
      setLoading(false);
    }
  };

  if (doctorId) {
    fetchDoctorAndSlots();
  } else {
    // ✅ Quan trọng: Set loading = false khi không có doctorId
    setLoading(false);
    setError('Không tìm thấy thông tin bác sĩ');
  }
}, [doctorId]);
```

---

### Fix 3: Handle Missing ID Case
**File:** `src/pages/AppointmentBooking.jsx` và `DoctorDetail.jsx`

**Before:**
```javascript
useEffect(() => {
  const fetchData = async () => { ... };
  
  if (id) {
    fetchData();
  }
  // ❌ Không có else → loading stuck at true
}, [id]);
```

**After:**
```javascript
useEffect(() => {
  const fetchData = async () => { ... };
  
  if (id) {
    fetchData();
  } else {
    // ✅ Xử lý case không có ID
    setLoading(false);
    setError('Không tìm thấy thông tin bác sĩ');
  }
}, [id]);
```

---

### Fix 4: Same for DoctorDetail.jsx
**File:** `src/pages/DoctorDetail.jsx`

Áp dụng tương tự:
1. Move mock data vào trong useEffect
2. Add else case khi không có `id`

```javascript
useEffect(() => {
  const fetchDoctorDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock data inside useEffect
      const mockDoctor = { ... };
      const mockReviews = [ ... ];

      await new Promise(resolve => setTimeout(resolve, 500));
      setDoctor(mockDoctor);
      setRecentReviews(mockReviews);

    } catch (err) {
      setError('...');
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchDoctorDetails();
  } else {
    setLoading(false);
    setError('Không tìm thấy thông tin bác sĩ');
  }
}, [id]);
```

---

## 🧪 Testing

### Test Case 1: Có doctorId hợp lệ
**URL:** `http://localhost:5174/booking/appointment/1`

**Expected:**
1. Loading spinner hiện trong 500ms
2. Sau đó hiển thị form booking với thông tin bác sĩ
3. Có thể chọn ngày và giờ

### Test Case 2: Không có doctorId
**URL:** `http://localhost:5174/booking/appointment/`

**Expected:**
1. Hiển thị error message: "Không tìm thấy thông tin bác sĩ"
2. Button "Quay lại trang đặt lịch"
3. Không bị stuck ở loading

### Test Case 3: DoctorDetail
**URL:** `http://localhost:5174/booking/doctor/1`

**Expected:**
1. Loading spinner 500ms
2. Hiển thị chi tiết bác sĩ đầy đủ
3. Có nút "Đặt lịch ngay"

---

## 📊 Root Cause Analysis

### Tại sao xảy ra vấn đề?

1. **React Hooks Rules:**
   - Mock data được define ở component level
   - Reference đến `doctorId` từ useParams
   - Khi `doctorId` undefined → data không hợp lệ
   - Component re-render nhiều lần

2. **Loading State Management:**
   - Không handle case `!doctorId`
   - Loading state không được reset về false
   - UI bị stuck forever

3. **Route Configuration:**
   - Route param name khác với useParams variable name
   - Dẫn đến `doctorId = undefined` mặc dù URL có ID

---

## ✅ Verification Checklist

- [x] Fix route parameter mismatch (`:id` → `doctorId`)
- [x] Move mock data vào trong useEffect
- [x] Add else case cho missing ID
- [x] Apply fix cho AppointmentBooking.jsx
- [x] Apply fix cho DoctorDetail.jsx
- [x] AllDoctors.jsx không cần fix (không dùng params)
- [x] AppointmentSchedule.jsx không cần fix (không dùng params)

---

## 🎯 Best Practices Learned

### ✅ DO:
```javascript
// 1. Always handle loading state
useEffect(() => {
  if (hasRequiredParams) {
    fetchData();
  } else {
    setLoading(false);
    setError('Missing required parameters');
  }
}, [params]);

// 2. Define mock data inside useEffect
useEffect(() => {
  const mockData = { id: paramId, ... };
  setData(mockData);
}, [paramId]);

// 3. Match route param names
// Route: /user/:id
const { id } = useParams(); // ✅

// Or rename if needed
const { id: userId } = useParams(); // ✅
```

### ❌ DON'T:
```javascript
// 1. Don't define mock data at component level that uses params
const mockData = { id: paramId }; // ❌

// 2. Don't forget else case
useEffect(() => {
  if (id) fetchData();
  // Missing else! ❌
}, [id]);

// 3. Don't mismatch param names
// Route: /user/:id
const { userId } = useParams(); // ❌ undefined!
```

---

## 🚀 Next Steps

1. **Test trong browser:**
   ```
   http://localhost:5174/booking/appointment/1
   http://localhost:5174/booking/doctor/1
   http://localhost:5174/booking/doctors
   ```

2. **Kiểm tra console:**
   - Không có errors
   - Loading chỉ hiện 500ms
   - Data load thành công

3. **Test edge cases:**
   - URL không có ID
   - ID không hợp lệ (string, âm, ...)
   - Navigation giữa các trang

---

**Status:** ✅ Fixed and ready for testing

Các vấn đề loading đã được fix hoàn toàn!
