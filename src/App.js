import React, { useState } from 'react';
import Welcome from './Components/Welcome';
import EmailVerificationForm from './Components/EmailVerification.js';
import PrivacyRequestForm from './Components/PrivacyRequestform.js';

function App() {
  const [step, setStep] = useState(1);

  const goToNext = () => setStep(step + 1);

  return (
    <div>
      {step === 1 && <Welcome onNext={goToNext} />}
      {step === 2 && <EmailVerificationForm onNext={goToNext} />}
      {step === 3 && <PrivacyRequestForm />}
    </div>
  );
}

export default App;
