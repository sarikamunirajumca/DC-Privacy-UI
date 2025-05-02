import React, { useState } from 'react';

const PrivacyRequestForm = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    requestInfo: false,
    correctInfo: false,
    deleteInfo: false,
    optOut: false,
    limitSPI: false,
  });
  const [showSummary, setShowSummary] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCardClick = (option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setShowSummary(true);
  };

  const confirmSubmit = () => {
    const data = {
      ...selectedOptions,
      email,
      timestamp: new Date().toISOString(),
    };
    // Simulate saving to localStorage
    localStorage.setItem('privacyRequest', JSON.stringify(data));
    setShowSummary(false);
    setSubmitted(true);
  };

  return (
    <div className="privacy-form-container">
      <h2>Your Privacy Rights</h2>

      {submitted && <p className="success">Request submitted successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div className="card-row">
          {['requestInfo', 'correctInfo', 'deleteInfo'].map((option) => (
            <div
              key={option}
              className={`card ${selectedOptions[option] ? 'selected' : ''}`}
              onClick={() => handleCardClick(option)}
            >
              <h3>
                {option === 'requestInfo' && 'Request my personal information'}
                {option === 'correctInfo' && 'Correct my personal information'}
                {option === 'deleteInfo' && 'Delete my personal information'}
              </h3>
              <p>
                {option === 'requestInfo' && 'You can request a copy of your personal information.'}
                {option === 'correctInfo' && 'You can amend inaccurate personal information.'}
                {option === 'deleteInfo' && 'You can request to delete collected personal data.'}
              </p>
            </div>
          ))}
        </div>

        <div className="checkbox-section">
          <div className="checkbox-option">
            <input
              type="checkbox"
              id="optOut"
              checked={selectedOptions.optOut}
              onChange={() => handleCardClick('optOut')}
            />
            <label htmlFor="optOut">Opt-out of Sale/Sharing of personal information</label>
            <p>Choose whether your information is shared with third parties.</p>
          </div>

          <div className="checkbox-option">
            <input
              type="checkbox"
              id="limitSPI"
              checked={selectedOptions.limitSPI}
              onChange={() => handleCardClick('limitSPI')}
            />
            <label htmlFor="limitSPI">Limit the use of Sensitive Personal Information (SPI)</label>
            <p>Limit the use of SPI to only what is necessary.</p>
          </div>
        </div>

        <div className="email-input">
          <label htmlFor="email">Your Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit">Proceed</button>
      </form>

      {showSummary && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Your Request</h3>
            <p><strong>Email:</strong> {email}</p>
            <ul>
              {Object.entries(selectedOptions)
                .filter(([_, val]) => val)
                .map(([key]) => (
                  <li key={key}>{key}</li>
              ))}
            </ul>
            <button onClick={confirmSubmit}>Confirm</button>
            <button onClick={() => setShowSummary(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyRequestForm;
