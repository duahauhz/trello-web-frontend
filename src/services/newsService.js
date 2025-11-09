// API Service for News Management
// This file contains all API calls related to news, articles, and videos

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

/**
 * Get all featured news with optional filters
 * @param {Object} filters - Filter options (category, limit, page, etc.)
 * @returns {Promise<Array>} List of featured news
 */
export const getFeaturedNews = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${BASE_URL}/news/featured?${queryParams}` : `${BASE_URL}/news/featured`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch featured news');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching featured news:', error);
    // Return mock data if API fails (fallback)
    return getMockFeaturedNews();
  }
};

/**
 * Get a single news article by ID
 * @param {number} id - Article ID
 * @returns {Promise<Object>} Article details
 */
export const getNewsById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/news/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news article');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news article:', error);
    throw error;
  }
};

/**
 * Get all exercise articles with optional filters
 * @param {Object} filters - Filter options (difficulty, duration, limit, page, etc.)
 * @returns {Promise<Array>} List of exercise articles
 */
export const getExerciseArticles = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${BASE_URL}/exercises?${queryParams}` : `${BASE_URL}/exercises`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch exercise articles');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercise articles:', error);
    // Return mock data if API fails (fallback)
    return getMockExerciseArticles();
  }
};

/**
 * Get all music videos with optional filters
 * @param {Object} filters - Filter options (type, duration, limit, page, etc.)
 * @returns {Promise<Array>} List of music videos
 */
export const getMusicVideos = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${BASE_URL}/music-videos?${queryParams}` : `${BASE_URL}/music-videos`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch music videos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching music videos:', error);
    // Return mock data if API fails (fallback)
    return getMockMusicVideos();
  }
};

/**
 * Increment view count for an article
 * @param {number} id - Article ID
 * @param {string} type - Type of content ('news', 'exercise', 'video')
 * @returns {Promise<Object>} Updated view count
 */
export const incrementViewCount = async (id, type = 'news') => {
  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to increment view count');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    // Silently fail for analytics
    return null;
  }
};

/**
 * Search across all news content
 * @param {string} query - Search query
 * @param {Object} filters - Additional filters
 * @returns {Promise<Object>} Search results
 */
export const searchNews = async (query, filters = {}) => {
  try {
    const params = new URLSearchParams({ q: query, ...filters });
    const response = await fetch(`${BASE_URL}/news/search?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to search news');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

// ============================================
// MOCK DATA (Fallback when API is not ready)
// ============================================

function getMockFeaturedNews() {
  return [
    {
      id: 1,
      title: '10 Thói Quen Tốt Cho Tim Mạch Mà Bạn Nên Biết',
      category: 'health',
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=500&fit=crop',
      excerpt: 'Khám phá những thói quen đơn giản giúp bảo vệ và tăng cường sức khỏe tim mạch của bạn...',
      date: '14/10/2025',
      views: 1234,
      content: `
        <h2>10 Thói Quen Tốt Cho Tim Mạch</h2>
        <p>Tim mạch là cơ quan quan trọng nhất của cơ thể, việc chăm sóc tim mạch là điều cần thiết để có một cuộc sống khỏe mạnh.</p>
        
        <h3>1. Tập thể dục đều đặn</h3>
        <p>Tập thể dục ít nhất 30 phút mỗi ngày giúp tăng cường tim mạch, cải thiện tuần hoàn máu và giảm nguy cơ mắc bệnh tim.</p>
        
        <h3>2. Ăn uống lành mạnh</h3>
        <p>Chế độ ăn giàu trái cây, rau xanh, ngũ cốc nguyên hạt và protein nạc giúp duy trì sức khỏe tim mạch tốt.</p>
      `
    },
    {
      id: 2,
      title: 'Chế Độ Dinh Dưỡng Khoa Học Cho Người Tiểu Đường',
      category: 'nutrition',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop',
      excerpt: 'Hướng dẫn chi tiết về chế độ ăn uống phù hợp giúp kiểm soát đường huyết hiệu quả...',
      date: '13/10/2025',
      views: 987,
      content: '<h2>Chế Độ Dinh Dưỡng Cho Người Tiểu Đường</h2><p>Chế độ ăn uống đóng vai trò quan trọng...</p>'
    }
  ];
}

function getMockExerciseArticles() {
  return [
    {
      id: 5,
      title: 'Bài Tập Phục Hồi Chức Năng Sau Phẫu Thuật Gối',
      image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&h=500&fit=crop',
      excerpt: 'Các bài tập giúp phục hồi chức năng vận động và giảm đau sau phẫu thuật...',
      duration: '15-20 phút',
      difficulty: 'Dễ',
      content: '<h2>Bài Tập Phục Hồi Sau Phẫu Thuật Gối</h2><p>Sau phẫu thuật gối...</p>'
    },
    {
      id: 6,
      title: 'Yoga Trị Liệu Cho Đau Lưng Mãn Tính',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
      excerpt: 'Những tư thế yoga giúp giảm đau và tăng cường sức mạnh cột sống...',
      duration: '20-30 phút',
      difficulty: 'Trung bình',
      content: '<h2>Yoga Cho Đau Lưng Mãn Tính</h2><p>Yoga là phương pháp hiệu quả...</p>'
    }
  ];
}

function getMockMusicVideos() {
  return [
    {
      id: 1,
      title: 'Nhạc Thiền Giảm Căng Thẳng',
      thumbnail: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&h=500&fit=crop',
      youtubeId: 'lFcSrYw-ARY',
      duration: '30:00',
      type: 'meditation',
      description: 'Nhạc thiền nhẹ nhàng giúp thư giãn tâm trí và giảm căng thẳng sau một ngày làm việc mệt mỏi.'
    },
    {
      id: 2,
      title: 'Âm Thanh Thiên Nhiên Thư Giãn',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop',
      youtubeId: '1ZYbU82GVz4',
      duration: '60:00',
      type: 'nature',
      description: 'Tiếng suối chảy, chim hót kết hợp âm nhạc giúp bạn thư giãn và ngủ ngon.'
    }
  ];
}
