import React, { useState } from "react";

function Welcome({ onNext }) {
  const [selectedState, setSelectedState] = useState("");
  const [requestFor, setRequestFor] = useState("");
  const [isAffirmed, setIsAffirmed] = useState("");

  const handleNext = () => {
    if (!selectedState || !requestFor || isAffirmed === "") {
      alert("Please fill out all fields before continuing.");
      return;
    }
    onNext();
  };

  const states = [
    "New South Wales",
    "Victoria",
    "Queensland",
    "Western Australia",
    "South Australia",
    "Tasmania",
    "Australian Capital Territory",
    "Northern Territory"
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "40px", maxWidth: "1200px", margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Left Section */}
        <div style={{ flex: 1, paddingRight: "40px" }}>
          <h2>Privacy at Digital Citizenship</h2>
          <p>
            We value the trust that you place in us when you give us personal information. The
            information you share with us allows us to provide the services you need and want
            while giving you the best user experience.
          </p>
          <p>
            You can make certain requests regarding the collection, use, and sharing of your
            personal information. The requests available to you may vary by state. We will
            fulfill these requests as determined by your state of residence.
          </p>
          <p>
            To make a request regarding your personal information, please provide the details
            below to proceed.
          </p>
          <a href="#" style={{ color: "#0056b3" }}>Frequently Asked Questions</a>
        </div>

        {/* Right Section */}
        <div style={{
          flex: 1,
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "30px",
          backgroundColor: "#f9f9f9"
        }}>
          <h3>Create privacy request</h3>
          <p>Please tell us your state of residence so we can determine your rights.</p>

          {/* State of residence */}
          <label style={{ display: "block", marginTop: "20px", marginBottom: "5px" }}>
            State of residence
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #aaa",
              borderRadius: "4px"
            }}
          >
            <option value="">-- Select State --</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          {/* Request for */}
          <label style={{ display: "block", marginTop: "20px", marginBottom: "5px" }}>
            Request for
          </label>
          <select
            value={requestFor}
            onChange={(e) => setRequestFor(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #aaa",
              borderRadius: "4px"
            }}
          >
            <option value="">-- Select Option --</option>
            <option value="myself">Myself</option>
            <option value="someone_else">Someone else</option>
          </select>

          {/* Affirmation */}
          <p style={{ marginTop: "20px" }}>
            I affirm that I'm a {selectedState || "[State]"} resident as defined by applicable law.
          </p>
          <label>
            <input
              type="radio"
              name="affirm"
              value="yes"
              checked={isAffirmed === "yes"}
              onChange={() => setIsAffirmed("yes")}
            />
            {" "}Yes
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              name="affirm"
              value="no"
              checked={isAffirmed === "no"}
              onChange={() => setIsAffirmed("no")}
            />
            {" "}No
          </label>

          {/* Button */}
          <button
            onClick={handleNext}
            style={{
              marginTop: "30px",
              padding: "12px 20px",
              backgroundColor: "#0071ce",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Create privacy request
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: "60px", textAlign: "center" }}>
        <p>Questions or concerns?</p>
        <button style={{
          padding: "10px 16px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "20px",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Get Help
        </button>
      </div>
    </div>
  );
}

export default Welcome;
