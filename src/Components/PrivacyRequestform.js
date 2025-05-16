import React, { useState } from 'react';

const PrivacyRequestForm = ({ onNext }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    requestInfo: false,
    correctInfo: false,
    deleteInfo: false,
    optOut: false,
    limitSPI: false,
  });
  const [showSummary, setShowSummary] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCardClick = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSummary(true);
  };

  const confirmSubmit = () => {
    const selectedTypes = Object.entries(selectedOptions)
      .filter(([key, val]) => val)
      .map(([key]) => key);
    const data = {
      requestType: selectedTypes,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('privacyRequest', JSON.stringify(data));
    setShowSummary(false);
    setSubmitted(true);
    onNext(data);
  };

  return (
    <div className="privacy-form-container" style={{ fontFamily: "Arial, sans-serif", padding: "30px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Your Privacy Rights</h2>

      {submitted && <p style={{ color: "green" }}>Request submitted successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
          {[
            { key: "requestInfo", title: "Request my personal information", desc: "You can request a copy of your personal information we hold about you." },
            { key: "correctInfo", title: "Correct my personal information", desc: "You can request to amend inaccurate personal information we have collected about you." },
            { key: "deleteInfo", title: "Delete my personal information", desc: "You can request to delete the personal information we have collected about you." }
          ].map(({ key, title, desc }) => (
            <button
              type="button"
              key={key}
              onClick={() => handleCardClick(key)}
              style={{
                flex: "1 1 250px",
                padding: "20px",
                border: selectedOptions[key] ? "2px solid #0071ce" : "1px solid #ccc",
                backgroundColor: selectedOptions[key] ? "#e6f0ff" : "#fff",
                borderRadius: "10px",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>{title}</h3>
              <p style={{ margin: 0 }}>{desc}</p>
            </button>
          ))}
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.optOut}
              onChange={() => handleCardClick('optOut')}
            />
            <strong style={{ marginLeft: "10px" }}>Opt-out of Sale/Sharing of personal information</strong>
          </label>
          <p style={{ marginLeft: "25px", fontSize: "14px" }}>
            You can choose whether your information is shared with third parties or used for targeted advertising.
          </p>

          <label>
            <input
              type="checkbox"
              checked={selectedOptions.limitSPI}
              onChange={() => handleCardClick('limitSPI')}
            />
            <strong style={{ marginLeft: "10px" }}>Limit the use of Sensitive Personal Information (SPI)</strong>
          </label>
          <p style={{ marginLeft: "25px", fontSize: "14px" }}>
            You can choose to limit our use and disclosure of your SPI to necessary services only.
          </p>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#0071ce",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Proceed
        </button>
      </form>

      {showSummary && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{
            backgroundColor: "#fff", padding: "30px", borderRadius: "10px", width: "90%", maxWidth: "400px"
          }}>
            <h3>Confirm Your Request</h3>
            <ul>
              {Object.entries(selectedOptions)
                .filter(([_, val]) => val)
                .map(([key]) => (
                  <li key={key}>{key}</li>
                ))}
            </ul>
            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button onClick={confirmSubmit} style={{ marginRight: "10px", backgroundColor: "#0071ce", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px" }}>
                Confirm
              </button>
              <button onClick={() => setShowSummary(false)} style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyRequestForm;
