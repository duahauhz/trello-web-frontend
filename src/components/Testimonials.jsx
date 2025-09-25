import React, { useState } from "react";

const reviews = [
  {
    id: 1,
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face",
    text: "Người già là kho tàng kinh nghiệm quý báu của gia đình và xã hội. Họ từng trải qua nhiều biến cố, tích lũy được kiến thức và bài học sống. Tuy nhiên, tuổi già cũng đi kèm với sức khỏe giảm sút, cần sự quan tâm và chăm sóc tận tình từ con cháu.",
    name: "Jessie Owner",
    role: "Founder, XYZ Company",
  },
  {
    id: 2,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    text: "Cuộc sống của người già thường gắn liền với sự cô đơn khi con cháu bận rộn. Vì vậy, việc trò chuyện, lắng nghe họ mỗi ngày mang lại niềm vui tinh thần to lớn. Chỉ những cử chỉ nhỏ như hỏi thăm, dắt đi dạo cũng giúp họ cảm thấy hạnh phúc.",
    name: "Maria Garcia",
    role: "Healthcare Specialist",
  },
  {
    id: 3,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
    text: "Trong xã hội hiện đại, nhu cầu chăm sóc sức khỏe và hỗ trợ tinh thần cho người cao tuổi ngày càng được chú trọng. Các trung tâm dưỡng lão, câu lạc bộ người già hay hoạt động cộng đồng là cầu nối giúp họ gắn kết, sống vui vẻ, có thêm động lực.",
    name: "David Chen",
    role: "Senior Care Director",
  },
  {
    id: 4,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    text: "Dịch vụ chăm sóc người cao tuổi tại đây thực sự tuyệt vời. Đội ngũ nhân viên chuyên nghiệp, tận tâm và luôn quan tâm đến từng chi tiết nhỏ nhất. Gia đình tôi hoàn toàn yên tâm khi gửi gắm người thân ở đây.",
    name: "Lisa Thompson",
    role: "Family Member",
  },
  {
    id: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    text: "Môi trường ở đây rất ấm cúng và thân thiện. Các hoạt động được tổ chức đa dạng, giúp người cao tuổi có cuộc sống vui vẻ và ý nghĩa. Tôi rất hài lòng với chất lượng dịch vụ.",
    name: "Robert Wilson",
    role: "Senior Resident",
  },
  {
    id: 6,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    text: "Sự chăm sóc và quan tâm từ đội ngũ nhân viên làm tôi cảm thấy như đang ở nhà. Họ không chỉ chăm sóc sức khỏe mà còn lắng nghe và chia sẻ, tạo nên một môi trường sống thật sự ấm áp.",
    name: "Emily Rodriguez",
    role: "Satisfied Customer",
  }
];

export default function TestimonialsCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + itemsPerPage < reviews.length;

  const nextSlide = () => {
    if (canGoNext) {
      setStartIndex(prev => prev + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (canGoPrev) {
      setStartIndex(prev => prev - itemsPerPage);
    }
  };

  const goToPage = (pageIndex) => {
    setStartIndex(pageIndex * itemsPerPage);
  };

  const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #e0f7fa 0%, #b3e5fc 100%)',
      padding: '4rem 1rem',
      minHeight: '600px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#0f766e',
            marginBottom: '1rem'
          }}>
            Đánh giá của khách hàng
          </h2>
          <div style={{
            width: '96px',
            height: '4px',
            background: 'linear-gradient(90deg, #14b8a6, #06b6d4)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Carousel Container */}
        <div style={{ position: 'relative' }}>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: canGoPrev ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              cursor: canGoPrev ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (canGoPrev) {
                e.target.style.background = 'white';
                e.target.style.transform = 'translateY(-50%) scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (canGoPrev) {
                e.target.style.background = 'rgba(255,255,255,0.9)';
                e.target.style.transform = 'translateY(-50%) scale(1)';
              }
            }}
          >
            <svg 
              width="24" 
              height="24" 
              fill="none" 
              stroke="#0f766e" 
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: canGoNext ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              cursor: canGoNext ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (canGoNext) {
                e.target.style.background = 'white';
                e.target.style.transform = 'translateY(-50%) scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (canGoNext) {
                e.target.style.background = 'rgba(255,255,255,0.9)';
                e.target.style.transform = 'translateY(-50%) scale(1)';
              }
            }}
          >
            <svg 
              width="24" 
              height="24" 
              fill="none" 
              stroke="#0f766e" 
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            padding: '0 1rem'
          }}>
            {currentReviews.map((review) => (
              <div
                key={review.id}
                style={{
                  background: 'linear-gradient(135deg, #abe4e0ff 0%, #0891b2 100%)',
                  color: 'white',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  minHeight: '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-8px)';
                  e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                }}
              >
                {/* Avatar và User Info */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <img
                    src={review.avatar}
                    alt={review.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid rgba(255,255,255,0.2)'
                    }}
                  />
                  <div style={{ marginLeft: '1rem' }}>
                    <h4 style={{ 
                      fontWeight: '600', 
                      fontSize: '1.125rem',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {review.name}
                    </h4>
                    <p style={{ 
                      color: 'rgba(255,255,255,0.8)', 
                      fontSize: '0.875rem',
                      margin: 0
                    }}>
                      {review.role}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <div style={{ marginBottom: '1rem', flex: 1 }}>
                  <p style={{ 
                    color: 'rgba(255,255,255,0.95)', 
                    lineHeight: '1.6',
                    margin: 0,
                    fontSize: '0.95rem'
                  }}>
                    "{review.text}"
                  </p>
                </div>

                {/* Rating Stars */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between' 
                }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="20"
                        height="20"
                        fill="#fbbf24"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>
                    5.0
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '2rem',
            gap: '8px'
          }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                style={{
                  width: i === currentPage ? '32px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: i === currentPage ? '#0f766e' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (i !== currentPage) {
                    e.target.style.background = '#64748b';
                  }
                }}
                onMouseLeave={(e) => {
                  if (i !== currentPage) {
                    e.target.style.background = '#94a3b8';
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Logo */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: '24px',
            padding: '12px 24px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #14b8a6, #ffffffff)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '16px',
                height: '16px',
                background: 'white',
                borderRadius: '50%'
              }}></div>
            </div>
            <span style={{
              color: '#0f766e',
              fontWeight: 'bold',
              fontSize: '1.25rem'
            }}>
              SeniorCare
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}