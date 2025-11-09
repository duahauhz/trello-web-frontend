# Backend Integration Guide - Support Module

## 📋 Overview

This document provides comprehensive guidance for backend developers to integrate the Support module with the API. All components are designed with backend integration in mind, following RESTful API principles and best practices.

## 🏗️ Architecture

The Support module follows a **service layer pattern** for clean separation of concerns:

```
Support.jsx (Main Page)
  └── Components Layer
      ├── SupportHero.jsx (Navigation)
      ├── FAQSection.jsx (FAQ Display)
      ├── ContactForm.jsx (User Input)
      ├── LiveChat.jsx (Real-time Chat)
      └── ContactInfo.jsx (Static Info)
  └── Service Layer
      └── supportService.js (API Integration)
```

## 📂 Database Schema Recommendations

### 1. Support Tickets Table

```sql
CREATE TABLE support_tickets (
  id VARCHAR(50) PRIMARY KEY,           -- e.g., 'TKT-2024001'
  user_id VARCHAR(50) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,        -- booking, account, medical, payment, technical, feedback, other
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'open',    -- open, in-progress, closed
  priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high
  assigned_to VARCHAR(50),              -- agent ID
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  closed_at TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (assigned_to) REFERENCES agents(id),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

### 2. Contact Requests Table

```sql
CREATE TABLE contact_requests (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  category VARCHAR(50) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',  -- pending, processing, completed
  created_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

### 3. Chat Sessions Table

```sql
CREATE TABLE chat_sessions (
  id VARCHAR(50) PRIMARY KEY,           -- e.g., 'CHAT-1234567890'
  user_id VARCHAR(50) NOT NULL,
  agent_id VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active',  -- active, closed
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (agent_id) REFERENCES agents(id),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);
```

### 4. Chat Messages Table

```sql
CREATE TABLE chat_messages (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id VARCHAR(50) NOT NULL,
  sender_type VARCHAR(10) NOT NULL,     -- user, agent, bot
  sender_id VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (session_id) REFERENCES chat_sessions(id),
  INDEX idx_session_id (session_id),
  INDEX idx_created_at (created_at)
);
```

### 5. FAQ Table

```sql
CREATE TABLE faq (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,        -- account, booking, payment, other
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  views INT DEFAULT 0,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  INDEX idx_category (category),
  INDEX idx_is_active (is_active),
  INDEX idx_order_index (order_index)
);
```

## 🔌 API Endpoints

### 1. Contact Form Submission

**Endpoint:** `POST /api/support/contact`

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "phone": "0912345678",
  "category": "booking",
  "subject": "Không thể đặt lịch khám",
  "message": "Tôi gặp lỗi khi đặt lịch khám..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "ticketId": "TKT-2024001",
  "message": "Yêu cầu của bạn đã được ghi nhận"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

**Controller Example (Node.js/Express):**
```javascript
router.post('/api/support/contact', async (req, res) => {
  try {
    const { name, email, phone, category, subject, message } = req.body;
    
    // Validation
    if (!name || !email || !category || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Generate ticket ID
    const ticketId = `TKT-${Date.now()}`;
    
    // Save to database
    await db.query(
      'INSERT INTO contact_requests (id, name, email, phone, category, subject, message) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [ticketId, name, email, phone, category, subject, message]
    );
    
    // Send notification email (optional)
    await sendEmail({
      to: email,
      subject: 'Xác nhận yêu cầu hỗ trợ',
      body: `Mã yêu cầu của bạn: ${ticketId}`
    });
    
    res.status(201).json({
      success: true,
      ticketId,
      message: 'Yêu cầu của bạn đã được ghi nhận'
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});
```

### 2. Get Support Tickets

**Endpoint:** `GET /api/support/tickets/:userId`

**Query Parameters:**
- `status` (optional): Filter by status (open, in-progress, closed)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:** `GET /api/support/tickets/USER123?status=open&page=1&limit=10`

**Response:**
```json
{
  "tickets": [
    {
      "id": "TKT-2024001",
      "subject": "Không thể đặt lịch khám",
      "category": "booking",
      "status": "open",
      "priority": "high",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 10,
  "totalPages": 2
}
```

### 3. Create Support Ticket

**Endpoint:** `POST /api/support/tickets`

**Request Body:**
```json
{
  "userId": "USER123",
  "subject": "Yêu cầu hỗ trợ",
  "category": "technical",
  "message": "Mô tả vấn đề...",
  "priority": "medium"
}
```

**Response:**
```json
{
  "id": "TKT-2024002",
  "userId": "USER123",
  "subject": "Yêu cầu hỗ trợ",
  "status": "open",
  "createdAt": "2024-01-15T11:00:00Z"
}
```

### 4. Update Support Ticket

**Endpoint:** `PATCH /api/support/tickets/:ticketId`

**Request Body:**
```json
{
  "status": "in-progress",
  "assignedTo": "AGENT001",
  "priority": "high"
}
```

**Response:**
```json
{
  "id": "TKT-2024001",
  "status": "in-progress",
  "assignedTo": "AGENT001",
  "updatedAt": "2024-01-15T12:00:00Z"
}
```

### 5. Get Chat Messages

**Endpoint:** `GET /api/support/chat/:sessionId`

**Query Parameters:**
- `limit` (optional): Number of messages (default: 50)
- `before` (optional): Get messages before this timestamp

**Example:** `GET /api/support/chat/CHAT-123456?limit=50`

**Response:**
```json
{
  "messages": [
    {
      "id": 1,
      "sessionId": "CHAT-123456",
      "senderType": "user",
      "senderId": "USER123",
      "message": "Xin chào, tôi cần hỗ trợ",
      "timestamp": "2024-01-15T10:00:00Z"
    },
    {
      "id": 2,
      "sessionId": "CHAT-123456",
      "senderType": "agent",
      "senderId": "AGENT001",
      "message": "Xin chào! Tôi có thể giúp gì cho bạn?",
      "timestamp": "2024-01-15T10:00:15Z"
    }
  ],
  "hasMore": false
}
```

### 6. Send Chat Message

**Endpoint:** `POST /api/support/chat/:sessionId`

**Request Body:**
```json
{
  "message": "Tôi cần trợ giúp về...",
  "sender": "user"
}
```

**Response:**
```json
{
  "id": 3,
  "sessionId": "CHAT-123456",
  "message": "Tôi cần trợ giúp về...",
  "sender": "user",
  "timestamp": "2024-01-15T10:01:00Z"
}
```

### 7. Start Chat Session

**Endpoint:** `POST /api/support/chat/start`

**Request Body:**
```json
{
  "userId": "USER123"
}
```

**Response:**
```json
{
  "sessionId": "CHAT-1234567890",
  "userId": "USER123",
  "startedAt": "2024-01-15T10:00:00Z"
}
```

### 8. Get FAQs

**Endpoint:** `GET /api/support/faq`

**Query Parameters:**
- `category` (optional): Filter by category

**Example:** `GET /api/support/faq?category=booking`

**Response:**
```json
{
  "faqs": [
    {
      "id": 1,
      "question": "Làm thế nào để đặt lịch khám bệnh?",
      "answer": "Bạn có thể đặt lịch khám bệnh bằng cách...",
      "category": "booking",
      "views": 150,
      "helpfulCount": 45
    }
  ]
}
```

## 🔒 Authentication & Authorization

All API endpoints should be protected with JWT authentication:

```javascript
// Middleware example
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Apply to routes
router.post('/api/support/tickets', authenticate, createTicket);
```

## 📨 Real-time Updates (WebSocket)

For LiveChat, consider implementing WebSocket for real-time messaging:

**WebSocket Events:**

```javascript
// Client -> Server
socket.emit('join-chat', { sessionId: 'CHAT-123456' });
socket.emit('send-message', { sessionId, message });

// Server -> Client
socket.on('new-message', (data) => {
  // { id, sender, message, timestamp }
});

socket.on('agent-joined', (data) => {
  // { agentId, agentName }
});

socket.on('typing', (data) => {
  // { isTyping: true }
});
```

**WebSocket Server Example (Socket.io):**

```javascript
io.on('connection', (socket) => {
  socket.on('join-chat', async ({ sessionId }) => {
    socket.join(sessionId);
    
    // Load previous messages
    const messages = await getChatMessages(sessionId);
    socket.emit('chat-history', messages);
  });
  
  socket.on('send-message', async ({ sessionId, message }) => {
    // Save message to database
    const savedMessage = await saveChatMessage(sessionId, message);
    
    // Broadcast to all users in the session
    io.to(sessionId).emit('new-message', savedMessage);
  });
});
```

## 📧 Email Notifications

Send email notifications for important events:

1. **Contact Form Submission** → Send confirmation email to user
2. **Ticket Created** → Notify user and support team
3. **Ticket Status Changed** → Notify user
4. **New Chat Message** → Email notification if user is offline

**Email Template Example:**

```javascript
const sendTicketConfirmation = async (email, ticketId) => {
  await sendEmail({
    to: email,
    subject: 'Xác nhận yêu cầu hỗ trợ',
    html: `
      <h2>Yêu cầu hỗ trợ đã được tiếp nhận</h2>
      <p>Mã yêu cầu: <strong>${ticketId}</strong></p>
      <p>Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
    `
  });
};
```

## 🔔 Push Notifications

Consider implementing push notifications for mobile apps:

```javascript
// When new message arrives
await sendPushNotification(userId, {
  title: 'Tin nhắn mới từ hỗ trợ',
  body: 'Bạn có tin nhắn mới từ đội ngũ hỗ trợ',
  data: { sessionId, ticketId }
});
```

## 📊 Analytics & Monitoring

Track important metrics:

1. **Response Time** → Average time to first response
2. **Resolution Time** → Average time to close ticket
3. **Satisfaction Rate** → User feedback after ticket closed
4. **FAQ Views** → Track which FAQs are most helpful
5. **Chat Volume** → Active chat sessions per hour

**Logging Example:**

```javascript
// Log ticket creation
logger.info('Ticket created', {
  ticketId,
  category,
  userId,
  timestamp: new Date()
});

// Track response time
const responseTime = new Date() - ticket.createdAt;
analytics.track('ticket_first_response', { ticketId, responseTime });
```

## 🧪 Testing Requirements

### Unit Tests

```javascript
describe('Contact Form API', () => {
  it('should create contact request successfully', async () => {
    const response = await request(app)
      .post('/api/support/contact')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        category: 'booking',
        message: 'Test message'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.ticketId).toBeDefined();
  });
  
  it('should reject invalid email', async () => {
    const response = await request(app)
      .post('/api/support/contact')
      .send({
        name: 'Test User',
        email: 'invalid-email',
        category: 'booking',
        message: 'Test message'
      });
    
    expect(response.status).toBe(400);
  });
});
```

### Integration Tests

Test the complete flow:
1. Create contact request
2. Verify database entry
3. Check email sent
4. Verify ticket accessible via GET endpoint

## 🚀 Deployment Checklist

- [ ] Database tables created
- [ ] API endpoints implemented and tested
- [ ] Authentication middleware configured
- [ ] WebSocket server setup (for LiveChat)
- [ ] Email service configured
- [ ] Rate limiting implemented
- [ ] Error logging configured
- [ ] CORS configured for frontend domain
- [ ] Environment variables set
- [ ] API documentation published (Swagger/OpenAPI)

## 📝 Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=healthcare_db
DB_USER=admin
DB_PASSWORD=***

# JWT
JWT_SECRET=***
JWT_EXPIRY=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=***
SMTP_PASS=***

# WebSocket
SOCKET_PORT=3001

# API
API_BASE_URL=http://localhost:3000/api
CORS_ORIGIN=http://localhost:5173
```

## 🔄 Integration Timeline

**Phase 1 (Week 1):**
- [ ] Setup database tables
- [ ] Implement Contact Form API
- [ ] Implement FAQ API

**Phase 2 (Week 2):**
- [ ] Implement Support Tickets API
- [ ] Add authentication
- [ ] Email notifications

**Phase 3 (Week 3):**
- [ ] Implement LiveChat WebSocket
- [ ] Real-time updates
- [ ] Testing & bug fixes

## 💡 Best Practices

1. **Input Validation** → Always validate and sanitize user input
2. **Error Handling** → Return meaningful error messages
3. **Rate Limiting** → Prevent abuse (e.g., max 10 contact form submissions/hour)
4. **Data Privacy** → Encrypt sensitive data, follow GDPR/privacy laws
5. **Caching** → Cache FAQ data (rarely changes)
6. **Pagination** → Always paginate list endpoints
7. **API Versioning** → Use `/api/v1/` for future compatibility

## 📞 Support

For questions about backend integration, contact:
- **Technical Lead:** [Email]
- **Documentation:** [Link to full API docs]
- **Slack Channel:** #backend-support

---

**Document Version:** 1.0  
**Last Updated:** January 2024  
**Status:** Ready for Implementation
