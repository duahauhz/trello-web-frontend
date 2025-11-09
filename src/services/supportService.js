// Support Service - API Integration Layer
// Handles all support-related API calls with mock data fallback

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== CONTACT FORM ====================

/**
 * Submit a contact/support request
 * @param {Object} data - Contact form data
 * @param {string} data.name - User's full name
 * @param {string} data.email - User's email
 * @param {string} data.phone - User's phone (optional)
 * @param {string} data.category - Category of request
 * @param {string} data.subject - Subject (optional)
 * @param {string} data.message - Message content
 * @returns {Promise<Object>} - Response with ticket ID
 */
export async function submitContactForm(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/support/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Failed to submit contact form');
    
    return await response.json();
  } catch (error) {
    console.error('API Error - Contact Form:', error);
    
    // Fallback to mock response
    await delay(1000);
    return {
      success: true,
      ticketId: `TKT-${Date.now()}`,
      message: 'Yêu cầu của bạn đã được ghi nhận'
    };
  }
}

// ==================== SUPPORT TICKETS ====================

/**
 * Get support tickets for a user
 * @param {string} userId - User ID
 * @param {Object} options - Query options
 * @param {string} options.status - Filter by status (open, in-progress, closed)
 * @param {number} options.page - Page number
 * @param {number} options.limit - Items per page
 * @returns {Promise<Object>} - Tickets data
 */
export async function getSupportTickets(userId, options = {}) {
  try {
    const params = new URLSearchParams();
    if (options.status) params.append('status', options.status);
    if (options.page) params.append('page', options.page);
    if (options.limit) params.append('limit', options.limit);

    const response = await fetch(
      `${API_BASE_URL}/support/tickets/${userId}?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) throw new Error('Failed to fetch tickets');
    
    return await response.json();
  } catch (error) {
    console.error('API Error - Get Tickets:', error);
    
    // Fallback to mock data
    await delay(800);
    return {
      tickets: mockTickets,
      total: mockTickets.length,
      page: options.page || 1,
      limit: options.limit || 10
    };
  }
}

/**
 * Create a new support ticket
 * @param {Object} data - Ticket data
 * @returns {Promise<Object>} - Created ticket
 */
export async function createSupportTicket(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/support/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Failed to create ticket');
    
    return await response.json();
  } catch (error) {
    console.error('API Error - Create Ticket:', error);
    
    // Fallback to mock response
    await delay(1000);
    return {
      id: `TKT-${Date.now()}`,
      ...data,
      status: 'open',
      createdAt: new Date().toISOString()
    };
  }
}

/**
 * Update ticket status
 * @param {string} ticketId - Ticket ID
 * @param {Object} updates - Update data
 * @returns {Promise<Object>} - Updated ticket
 */
export async function updateSupportTicket(ticketId, updates) {
  try {
    const response = await fetch(`${API_BASE_URL}/support/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) throw new Error('Failed to update ticket');
    
    return await response.json();
  } catch (error) {
    console.error('API Error - Update Ticket:', error);
    
    // Fallback to mock response
    await delay(500);
    return {
      id: ticketId,
      ...updates,
      updatedAt: new Date().toISOString()
    };
  }
}

// ==================== LIVE CHAT ====================

/**
 * Get chat messages for a session
 * @param {string} sessionId - Chat session ID
 * @param {number} limit - Number of messages to fetch
 * @returns {Promise<Array>} - Array of messages
 */
export async function getChatMessages(sessionId, limit = 50) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/support/chat/${sessionId}?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) throw new Error('Failed to fetch chat messages');
    
    return await response.json();
  } catch (error) {
    console.error('API Error - Get Chat Messages:', error);
    
    // Fallback to mock data
    await delay(500);
    return mockChatMessages;
  }
}

/**
 * Send a chat message
 * @param {string} sessionId - Chat session ID
 * @param {string} message - Message content
 * @param {string} sender - Sender type (user/agent)
 * @returns {Promise<Object>} - Sent message
 */
export async function sendChatMessage(sessionId, message, sender = 'user') {
  try {
    const response = await fetch(`${API_BASE_URL}/support/chat/${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, sender })
    });

    if (!response.ok) throw new Error('Failed to send message');
    
    return await response.json();
  } catch (error) {
    console.error('API Error - Send Chat Message:', error);
    
    // Fallback to mock response
    await delay(300);
    return {
      id: Date.now(),
      sessionId,
      message,
      sender,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Start a new chat session
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Session data
 */
export async function startChatSession(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/support/chat/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId })
    });

    if (!response.ok) throw new Error('Failed to start chat session');
    
    return await response.json();
  } catch (error) {
    console.error('API Error - Start Chat Session:', error);
    
    // Fallback to mock response
    await delay(500);
    return {
      sessionId: `CHAT-${Date.now()}`,
      userId,
      startedAt: new Date().toISOString()
    };
  }
}

// ==================== FAQ ====================

/**
 * Get FAQ items
 * @param {string} category - Category filter (optional)
 * @returns {Promise<Array>} - Array of FAQ items
 */
export async function getFAQs(category = 'all') {
  try {
    const url = category === 'all' 
      ? `${API_BASE_URL}/support/faq`
      : `${API_BASE_URL}/support/faq?category=${category}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error('Failed to fetch FAQs');
    
    return await response.json();
  } catch (error) {
    console.error('API Error - Get FAQs:', error);
    
    // Fallback to mock data (from FAQSection component)
    await delay(300);
    return mockFAQs;
  }
}

// ==================== MOCK DATA ====================

const mockTickets = [
  {
    id: 'TKT-2024001',
    subject: 'Không thể đặt lịch khám',
    category: 'booking',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    messages: []
  },
  {
    id: 'TKT-2024002',
    subject: 'Thanh toán không thành công',
    category: 'payment',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    messages: []
  },
  {
    id: 'TKT-2024003',
    subject: 'Cập nhật thông tin cá nhân',
    category: 'account',
    status: 'closed',
    priority: 'low',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    messages: []
  }
];

const mockChatMessages = [
  {
    id: 1,
    sender: 'agent',
    message: 'Xin chào! Tôi có thể giúp gì cho bạn?',
    timestamp: new Date().toISOString()
  }
];

const mockFAQs = [
  {
    id: 1,
    question: 'Làm thế nào để đặt lịch khám bệnh?',
    answer: 'Bạn có thể đặt lịch khám bệnh bằng cách truy cập trang "Đặt Lịch", chọn chuyên khoa, bác sĩ và thời gian phù hợp.',
    category: 'booking'
  },
  {
    id: 2,
    question: 'Tôi có thể thanh toán bằng những phương thức nào?',
    answer: 'Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, Momo, ZaloPay và thanh toán trực tiếp tại cơ sở.',
    category: 'payment'
  }
];

export default {
  submitContactForm,
  getSupportTickets,
  createSupportTicket,
  updateSupportTicket,
  getChatMessages,
  sendChatMessage,
  startChatSession,
  getFAQs
};
