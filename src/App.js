import React, { useState } from "react";
import Welcome from "./Components/Welcome";
import EmailVerificationForm from "./Components/EmailVerification";
import PrivacyRequestForm from "./Components/PrivacyRequestform";
import axios from "axios";

function App() {
  const [step, setStep] = useState(1);
  const [requestId, setRequestId] = useState("");
  const [userData, setUserData] = useState({});

  const goToNext = (data) => {
    // Collect data from each step
    setUserData((prev) => ({ ...prev, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  // When PrivacyRequestForm is done, submit to backend
  const handleFinalSubmit = async (privacyData) => {
    const allData = { ...userData, ...privacyData };
    try {
      const res = await axios.post("/api/store-user-request", allData);
      setRequestId(res.data.requestId);
      setStep(4);
    } catch (err) {
      setRequestId("");
      setStep(4);
    }
  };

  return (
    <div>
      {step === 1 && <Welcome onNext={(data) => goToNext(data)} />}
      {step === 2 && <EmailVerificationForm onNext={(data) => goToNext(data)} />}
      {step === 3 && <PrivacyRequestForm onNext={handleFinalSubmit} />}
      {step === 4 && (
        <div style={{textAlign: 'center', marginTop: '60px', fontSize: '1.5rem', color: 'green'}}>
          Request placed successfully!<br/>
          {requestId && <div>Your Request ID: <b>{requestId}</b></div>}
        </div>
      )}
    </div>
  );
}

export default App;
