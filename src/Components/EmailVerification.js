import React, { useState } from 'react';

const EmailVerificationForm = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const [skip, setSkip] = useState(false);

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '40px'
      }}
    >
      <h2>Provide your email address</h2>
      <p>
        Your email address is required to process and communicate with you about your request
        electronically. We will not use your email address for other purposes.
      </p>

      {!skip && (
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '10px',
            margin: '20px 0',
            fontSize: '16px',
            border: '1px solid #aaa',
            borderRadius: '4px'
          }}
        />
      )}

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '14px' }}>
          <input
            type="checkbox"
            checked={skip}
            onChange={() => setSkip(!skip)}
            style={{ marginRight: '8px' }}
          />
          Continue without email
        </label>
      </div>

      <button
        onClick={onNext}
        style={{
          padding: '12px 20px',
          backgroundColor: '#0071ce',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Get Code
      </button>
    </div>
  );
};

export default EmailVerificationForm;
