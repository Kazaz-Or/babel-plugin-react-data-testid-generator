import React from 'react';

const cardStyles = {
  background: 'white',
  borderRadius: '15px',
  padding: '25px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  border: '1px solid #e9ecef',
};

const cardHoverEffect = (e) => {
  e.target.style.transform = 'translateY(-5px)';
  e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
};

const cardLeaveEffect = (e) => {
  e.target.style.transform = 'translateY(0)';
  e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
};

export function UserCard({ name, email, avatar }) {
  return (
    <div
      style={cardStyles}
      onMouseEnter={cardHoverEffect}
      onMouseLeave={cardLeaveEffect}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{avatar}</div>
        <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{name}</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{email}</p>
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        gap: '10px' 
      }}>
        <button style={{
          background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
          color: '#333',
          flex: 1,
        }}>
          View Profile
        </button>
        <button style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
          color: 'white',
          flex: 1,
        }}>
          Message
        </button>
      </div>
    </div>
  );
}

export function ProductCard({ title, price, description }) {
  return (
    <div
      style={cardStyles}
      onMouseEnter={cardHoverEffect}
      onMouseLeave={cardLeaveEffect}
    >
      <div style={{ marginBottom: '15px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
          borderRadius: '8px',
          padding: '40px 20px',
          textAlign: 'center',
          marginBottom: '15px',
          fontSize: '2rem'
        }}>
          📦
        </div>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{title}</h3>
        <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
          {description}
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#28a745' 
          }}>
            {price}
          </span>
          <button style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            color: 'white',
          }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 