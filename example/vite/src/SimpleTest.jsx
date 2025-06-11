import React from 'react';

function SimpleTest() {
  return (
    <div style={{ 
      padding: '20px', 
      border: '2px dashed #ccc', 
      borderRadius: '8px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <h4>Simple Test Component</h4>
      <p>This component tests basic plugin functionality</p>
      <button onClick={() => console.log('Test button clicked!')}>
        Test Button
      </button>
    </div>
  );
}

export default SimpleTest; 