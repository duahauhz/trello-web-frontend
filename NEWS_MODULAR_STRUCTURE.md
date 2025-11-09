# Trang News - Cấu Trúc Modular

## Tổng Quan
Đã tái cấu trúc trang **News** từ một file lớn (1000+ dòng) thành **cấu trúc modular** với các component nhỏ, dễ bảo trì.

## Cấu Trúc Thư Mục
```
src/
├── pages/
│   └── News.jsx (70 dòng - orchestrator chính)
└── components/
    └── news/
        ├── FeaturedNews.jsx (200 dòng)
        ├── ExerciseArticles.jsx (180 dòng)
        ├── MusicVideos.jsx (120 dòng)
        ├── ArticleDialog.jsx (150 dòng)
        └── VideoDialog.jsx (70 dòng)
```

## Chi Tiết Components

### 1. News.jsx (Orchestrator)
**Vai trò:** Component cha quản lý state và điều phối các component con

**State:**
- `selectedArticle`: Bài viết đang được chọn
- `selectedVideo`: Video đang được chọn
- `openArticleDialog`: Trạng thái mở dialog bài viết
- `openVideoDialog`: Trạng thái mở dialog video

**Handlers:**
- `handleOpenArticle()`: Mở dialog bài viết
- `handleCloseArticle()`: Đóng dialog bài viết
- `handleOpenVideo()`: Mở dialog video
- `handleCloseVideo()`: Đóng dialog video

**Children Components:**
- FeaturedNews
- ExerciseArticles
- MusicVideos
- ArticleDialog
- VideoDialog

---

### 2. FeaturedNews.jsx
**Chức năng:** Hiển thị tin nổi bật trong ngày với filter theo category

**Props:**
- `onArticleClick`: Function callback khi click vào bài viết

**Features:**
- 📰 4 bài tin nổi bật
- 🏷️ Filter theo category (Tất cả, Sức khỏe, Y khoa, Dinh dưỡng, Lối sống)
- ↔️ Horizontal scroll với nút điều hướng
- 📊 Hiển thị ngày đăng và lượt xem
- 🖼️ Ảnh Unsplash chất lượng cao

**Mock Data:**
1. "10 Thói Quen Tốt Cho Tim Mạch Mà Bạn Nên Biết"
2. "Chế Độ Dinh Dưỡng Khoa Học Cho Người Tiểu Đường"
3. "Phòng Ngừa Đột Quỵ: Những Điều Cần Biết"
4. "Tầm Quan Trọng Của Giấc Ngủ Đối Với Sức Khỏe"

---

### 3. ExerciseArticles.jsx
**Chức năng:** Hiển thị các bài tập phục hồi chức năng

**Props:**
- `onArticleClick`: Function callback khi click vào bài tập

**Features:**
- 💪 4 bài tập phục hồi
- ↔️ Horizontal scroll với nút điều hướng
- ⏱️ Hiển thị thời lượng tập
- 🎯 Hiển thị độ khó (Dễ, Trung bình, Khó)
- 🖼️ Ảnh minh họa chất lượng cao

**Mock Data:**
1. "Bài Tập Phục Hồi Chức Năng Sau Phẫu Thuật Gối"
2. "Yoga Trị Liệu Cho Đau Lưng Mãn Tính"
3. "Bài Tập Hô Hấp Cải Thiện Chức Năng Phổi"
4. "Vật Lý Trị Liệu Cho Tai Biến Mạch Máu Não"

---

### 4. MusicVideos.jsx
**Chức năng:** Hiển thị danh sách video âm nhạc giải trí

**Props:**
- `onVideoClick`: Function callback khi click vào video

**Features:**
- 🎵 5 video âm nhạc thư giãn
- ↔️ Horizontal scroll với nút điều hướng
- ▶️ Play button overlay khi hover
- ⏱️ Duration badge hiển thị thời lượng
- 📺 Thumbnail chất lượng cao

**Mock Data:**
1. "Nhạc Thiền Giảm Căng Thẳng" (30:00)
2. "Âm Thanh Thiên Nhiên Thư Giãn" (60:00)
3. "Nhạc Yoga Chữa Lành" (45:00)
4. "Nhạc Piano Êm Dịu" (180:00)
5. "Âm Nhạc Giúp Ngủ Ngon" (480:00)

---

### 5. ArticleDialog.jsx
**Chức năng:** Dialog hiển thị nội dung chi tiết bài viết/bài tập

**Props:**
- `open`: Boolean - Trạng thái mở/đóng
- `onClose`: Function - Callback khi đóng dialog
- `article`: Object - Dữ liệu bài viết

**Features:**
- 📖 Hiển thị full content HTML
- 🖼️ Ảnh full width
- 🏷️ Category chip
- 📅 Metadata (ngày, lượt xem)
- 💪 Support cả tin tức và bài tập (duration, difficulty)
- 🎨 Styling đẹp mắt cho content

**Article Data Structure:**
```javascript
{
  id: Number,
  title: String,
  category: String, // optional
  image: String,
  excerpt: String,
  date: String, // optional
  views: Number, // optional
  duration: String, // optional (for exercise)
  difficulty: String, // optional (for exercise)
  content: String (HTML)
}
```

---

### 6. VideoDialog.jsx
**Chức năng:** Dialog phát video YouTube

**Props:**
- `open`: Boolean - Trạng thái mở/đóng
- `onClose`: Function - Callback khi đóng dialog
- `video`: Object - Dữ liệu video

**Features:**
- 📺 YouTube iframe embed
- 🎬 Autoplay khi mở
- 📐 Responsive 16:9 aspect ratio
- 📝 Hiển thị description
- 🎨 Background đen chuyên nghiệp

**Video Data Structure:**
```javascript
{
  id: Number,
  title: String,
  thumbnail: String,
  youtubeId: String,
  duration: String,
  description: String
}
```

---

## Routing
**Path:** `/news`

**App.jsx:**
```jsx
import News from "./pages/News";

<Route path="/news" element={<News />} />
```

---

## Design System

### Colors
- **Primary:** Tin nổi bật (xanh dương)
- **Success:** Bài tập (xanh lá)
- **Secondary:** Âm nhạc (tím/hồng)

### Spacing
- Section margin bottom: `mb: 8`
- Container padding: `py: 4`
- Card gap: `gap: 3`

### Scrollbar
- Height: 8px
- Track: grey.200
- Thumb: primary/success/secondary color
- Border radius: 4px

### Card Hover Effect
```css
transform: translateY(-8px)
boxShadow: 6
transition: all 0.3s ease
```

---

## Tính Năng Nổi Bật

### ✅ Modular Architecture
- Mỗi section là một component độc lập
- Dễ dàng thêm/xóa/sửa từng phần
- Code dễ đọc, dễ bảo trì

### ✅ Responsive Design
- Container maxWidth="xl"
- Horizontal scroll trên mobile
- Card width tối ưu (380px)

### ✅ User Experience
- Smooth scroll animation
- Hover effects mượt mà
- Loading state sẵn sàng cho backend
- Dialog transitions đẹp (200ms delay)

### ✅ Backend Ready
- Mock data structure chuẩn
- Dễ dàng thay thế bằng API calls
- State management rõ ràng

---

## Sẵn Sàng Tích Hợp Backend

### Thay thế Mock Data:
```javascript
// FeaturedNews.jsx
const [featuredNews, setFeaturedNews] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news/featured');
      const data = await response.json();
      setFeaturedNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchNews();
}, []);
```

### API Endpoints (Dự kiến):
- `GET /api/news/featured` - Tin nổi bật
- `GET /api/news/featured?category=health` - Filter theo category
- `GET /api/exercises` - Bài tập phục hồi
- `GET /api/videos` - Video âm nhạc

---

## Lợi Ích Của Cấu Trúc Modular

1. **Maintainability:** Dễ sửa lỗi, không ảnh hưởng phần khác
2. **Reusability:** Có thể dùng lại components ở trang khác
3. **Testing:** Dễ viết unit tests cho từng component
4. **Performance:** Có thể lazy load từng component
5. **Collaboration:** Nhiều dev làm việc song song
6. **Scalability:** Dễ mở rộng thêm features

---

## So Sánh Trước/Sau

### Trước (Monolithic):
```
News.jsx: 1000+ dòng
- Khó đọc
- Khó maintain
- Khó test
- Khó mở rộng
```

### Sau (Modular):
```
News.jsx: 70 dòng (orchestrator)
+ FeaturedNews.jsx: 200 dòng
+ ExerciseArticles.jsx: 180 dòng
+ MusicVideos.jsx: 120 dòng
+ ArticleDialog.jsx: 150 dòng
+ VideoDialog.jsx: 70 dòng
────────────────────────────────
Total: 790 dòng (chia thành 6 files)
```

---

## Next Steps (Tích Hợp Backend)

1. ✅ Component structure - DONE
2. ✅ Routing - DONE
3. ⏭️ Thêm API service layer
4. ⏭️ Thêm loading states
5. ⏭️ Thêm error handling
6. ⏭️ Thêm pagination/infinite scroll
7. ⏭️ Thêm search functionality
8. ⏭️ Thêm favorites/bookmarks

---

## Files Changed
- ✅ Created: `src/components/news/FeaturedNews.jsx`
- ✅ Created: `src/components/news/ExerciseArticles.jsx`
- ✅ Created: `src/components/news/MusicVideos.jsx`
- ✅ Created: `src/components/news/ArticleDialog.jsx`
- ✅ Created: `src/components/news/VideoDialog.jsx`
- ✅ Refactored: `src/pages/News.jsx` (1000+ lines → 70 lines)
- ✅ Updated: `src/App.jsx` (Added /news route)

---

## Status: ✅ HOÀN THÀNH

Trang News đã được tái cấu trúc hoàn toàn theo kiến trúc modular, sẵn sàng hiển thị và tích hợp backend.
