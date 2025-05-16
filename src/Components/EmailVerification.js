import React, { useState } from 'react';
import axios from 'axios';

const EmailVerificationForm = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const [skip, setSkip] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async () => {
    try {
      const res = await axios.post('/api/send-otp', { email });
      setOtpSent(true);
      setMessage('OTP sent to your email.');
    } catch (err) {
      setMessage('Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('/api/verify-otp', { email, otp });
      if (res.data.success) {
        setMessage('Email verified successfully!');
        onNext && onNext({ email });
      } else {
        setMessage('Invalid OTP.');
      }
    } catch (err) {
      setMessage('Verification failed.');
    }
  };

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

      {(!skip && !otpSent) && (
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

      {otpSent && (
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
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

      {(!otpSent) && (
        <button
          onClick={handleSendOtp}
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
      )}
      {otpSent && (
        <button
          onClick={handleVerifyOtp}
          style={{
            padding: '12px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Verify OTP
        </button>
      )}
      {message && <div style={{ marginTop: '20px', color: '#d9534f' }}>{message}</div>}
    </div>
  );
};

export default EmailVerificationForm;
