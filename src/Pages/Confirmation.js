import React from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-8 text-center">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Request Submitted!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your privacy request has been successfully submitted. You will receive an update via email once it is processed.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Confirmation;
