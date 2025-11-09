# Backend Integration Guide - News Module

## 📋 Tổng Quan

Hệ thống News hiện tại đã được thiết kế **sẵn sàng** để tích hợp với Backend. Tất cả mock data đã được tách riêng vào service layer, giúp việc chuyển đổi sang API thật rất đơn giản.

---

## 🎯 API Endpoints Cần Thiết

### 1. **Featured News (Tin Nổi Bật)**

#### GET `/api/news/featured`
Lấy danh sách tin nổi bật

**Query Parameters:**
- `category` (optional): `all`, `health`, `medical`, `nutrition`, `lifestyle`
- `limit` (optional): Số lượng bài viết (default: 10)
- `page` (optional): Số trang (default: 1)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "10 Thói Quen Tốt Cho Tim Mạch",
      "category": "health",
      "image": "https://example.com/image.jpg",
      "excerpt": "Mô tả ngắn...",
      "date": "2025-10-14T00:00:00Z",
      "views": 1234,
      "content": "<html content>"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

#### GET `/api/news/:id`
Lấy chi tiết một bài viết

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "10 Thói Quen Tốt Cho Tim Mạch",
    "category": "health",
    "image": "https://example.com/image.jpg",
    "excerpt": "Mô tả ngắn...",
    "date": "2025-10-14T00:00:00Z",
    "views": 1234,
    "content": "<html content>",
    "author": {
      "id": 1,
      "name": "Dr. Nguyễn Văn A",
      "avatar": "https://example.com/avatar.jpg"
    },
    "tags": ["tim mạch", "sức khỏe"]
  }
}
```

---

### 2. **Exercise Articles (Bài Tập Phục Hồi)**

#### GET `/api/exercises`
Lấy danh sách bài tập phục hồi

**Query Parameters:**
- `difficulty` (optional): `Dễ`, `Trung bình`, `Khó`
- `duration` (optional): Thời gian tập (phút)
- `limit` (optional): Số lượng (default: 10)
- `page` (optional): Số trang (default: 1)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "title": "Bài Tập Phục Hồi Chức Năng Sau Phẫu Thuật Gối",
      "image": "https://example.com/exercise.jpg",
      "excerpt": "Các bài tập giúp phục hồi...",
      "duration": "15-20 phút",
      "difficulty": "Dễ",
      "content": "<html content>",
      "videoUrl": "https://example.com/video.mp4" // optional
    }
  ],
  "pagination": {
    "total": 30,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

---

### 3. **Music Videos (Âm Nhạc Giải Trí)**

#### GET `/api/music-videos`
Lấy danh sách video âm nhạc

**Query Parameters:**
- `type` (optional): `meditation`, `nature`, `yoga`, `piano`, `sleep`
- `duration` (optional): Thời gian (phút)
- `limit` (optional): Số lượng (default: 10)
- `page` (optional): Số trang (default: 1)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Nhạc Thiền Giảm Căng Thẳng",
      "thumbnail": "https://example.com/thumbnail.jpg",
      "youtubeId": "lFcSrYw-ARY",
      "duration": "30:00",
      "type": "meditation",
      "description": "Nhạc thiền nhẹ nhàng..."
    }
  ],
  "pagination": {
    "total": 20,
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
}
```

---

### 4. **Analytics (Tùy chọn)**

#### POST `/api/news/:id/view`
Tăng lượt xem cho bài viết

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "views": 1235
  }
}
```

#### POST `/api/exercises/:id/view`
Tăng lượt xem cho bài tập

#### POST `/api/music-videos/:id/view`
Tăng lượt xem cho video

---

### 5. **Search (Tùy chọn)**

#### GET `/api/news/search`
Tìm kiếm toàn bộ nội dung

**Query Parameters:**
- `q` (required): Từ khóa tìm kiếm
- `type` (optional): `news`, `exercise`, `video`, `all` (default: all)
- `limit` (optional): Số lượng (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "news": [...],
    "exercises": [...],
    "videos": [...]
  },
  "total": 15
}
```

---

## 🔧 Cách Tích Hợp Backend

### Bước 1: Cấu hình API URL

Thêm vào file `.env`:
```env
REACT_APP_API_URL=http://localhost:3000/api
# hoặc production URL
REACT_APP_API_URL=https://api.yourdomain.com/api
```

### Bước 2: Sử dụng Service trong Components

**Hiện tại** (Mock data):
```jsx
// FeaturedNews.jsx
const featuredNews = [
  { id: 1, title: "...", ... }
];
```

**Sau khi tích hợp** (API data):
```jsx
// FeaturedNews.jsx
import { useEffect, useState } from 'react';
import { getFeaturedNews } from '../../services/newsService';

export default function FeaturedNews({ onArticleClick }) {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedNews({ 
          category: selectedCategory,
          limit: 12 
        });
        setFeaturedNews(data);
      } catch (err) {
        setError(err.message);
        // Fallback sẽ tự động dùng mock data
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [selectedCategory]);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  // ... rest of component
}
```

### Bước 3: Áp dụng tương tự cho các components khác

**ExerciseArticles.jsx:**
```jsx
import { getExerciseArticles } from '../../services/newsService';

useEffect(() => {
  const fetchExercises = async () => {
    const data = await getExerciseArticles({ 
      difficulty: selectedDifficulty,
      limit: 12 
    });
    setExerciseArticles(data);
  };
  fetchExercises();
}, [selectedDifficulty]);
```

**MusicVideos.jsx:**
```jsx
import { getMusicVideos } from '../../services/newsService';

useEffect(() => {
  const fetchVideos = async () => {
    const data = await getMusicVideos({ 
      type: selectedType,
      limit: 12 
    });
    setMusicVideos(data);
  };
  fetchVideos();
}, [selectedType]);
```

---

## 📊 Database Schema Đề Xuất

### Table: `news`
```sql
CREATE TABLE news (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  category ENUM('health', 'medical', 'nutrition', 'lifestyle') NOT NULL,
  image_url VARCHAR(500),
  excerpt TEXT,
  content TEXT,
  author_id INT,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at TIMESTAMP,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  
  FOREIGN KEY (author_id) REFERENCES users(id),
  INDEX idx_category (category),
  INDEX idx_status (status),
  INDEX idx_published_at (published_at)
);
```

### Table: `exercises`
```sql
CREATE TABLE exercises (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  excerpt TEXT,
  content TEXT,
  duration VARCHAR(50), -- "15-20 phút"
  difficulty ENUM('Dễ', 'Trung bình', 'Khó') NOT NULL,
  video_url VARCHAR(500),
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_difficulty (difficulty)
);
```

### Table: `music_videos`
```sql
CREATE TABLE music_videos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  thumbnail_url VARCHAR(500),
  youtube_id VARCHAR(50),
  duration VARCHAR(20), -- "30:00"
  type ENUM('meditation', 'nature', 'yoga', 'piano', 'sleep') NOT NULL,
  description TEXT,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_type (type)
);
```

---

## ✅ Ưu Điểm Của Cấu Trúc Hiện Tại

### 1. **Separation of Concerns**
- ✅ Business logic tách biệt khỏi UI
- ✅ Service layer độc lập
- ✅ Components chỉ lo về presentation

### 2. **Easy to Switch**
- ✅ Chỉ cần thay đổi 1 file service
- ✅ Không cần sửa components
- ✅ Mock data làm fallback tự động

### 3. **Error Handling Built-in**
- ✅ Try-catch sẵn trong service
- ✅ Tự động fallback nếu API lỗi
- ✅ Console logging để debug

### 4. **Flexible Filtering**
- ✅ Query parameters hỗ trợ đầy đủ
- ✅ Frontend filter hoạt động ngay
- ✅ Backend filter tích hợp dễ dàng

---

## 🚀 Checklist Tích Hợp

### Frontend (Đã hoàn thành)
- [x] Service layer đã tạo
- [x] Mock data đã tách riêng
- [x] Error handling đã có
- [x] Filter logic đã implement
- [x] UI components sẵn sàng

### Backend (Cần làm)
- [ ] Tạo API endpoints theo spec
- [ ] Setup database schema
- [ ] Implement CRUD operations
- [ ] Add pagination support
- [ ] Add filtering logic
- [ ] Setup CORS cho frontend
- [ ] Add authentication (nếu cần)

### Testing
- [ ] Test API endpoints
- [ ] Test pagination
- [ ] Test filters
- [ ] Test error cases
- [ ] Load testing

---

## 📝 Example Backend Controller (Node.js/Express)

```javascript
// controllers/newsController.js
const News = require('../models/News');

exports.getFeaturedNews = async (req, res) => {
  try {
    const { category = 'all', limit = 10, page = 1 } = req.query;
    
    const query = {};
    if (category !== 'all') {
      query.category = category;
    }
    query.status = 'published';
    
    const skip = (page - 1) * limit;
    
    const news = await News.find(query)
      .sort({ published_at: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await News.countDocuments(query);
    
    res.json({
      success: true,
      data: news,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('author', 'name avatar');
      
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }
    
    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.incrementView = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    
    res.json({
      success: true,
      data: {
        id: news._id,
        views: news.views
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

---

## 🎉 Kết Luận

**Cấu trúc hiện tại ĐÃ SẴN SÀNG cho Backend!**

### Dễ dàng tích hợp vì:
1. ✅ Service layer đã tách biệt hoàn toàn
2. ✅ Mock data có thể dùng làm fallback
3. ✅ Error handling đã được xử lý
4. ✅ API structure đã được định nghĩa rõ ràng
5. ✅ Chỉ cần thêm `useEffect` và `useState` vào components

### Thời gian ước tính:
- **Frontend**: 2-3 giờ (thêm useEffect, loading states)
- **Backend**: 1-2 ngày (tạo API, database, testing)
- **Testing & Integration**: 1 ngày

**TỔNG CỘNG: 2-3 ngày** để có hệ thống hoàn chỉnh với Backend thật!
