import React, { useState } from "react";
import axios from "axios";


function MiddleSection() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
 


  const handleSignup = async () => {
    if (!mobile) {
      setMessage("Please enter your mobile number.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:3002/api/auth/signup", {
        username: mobile,
        email: `${mobile}@example.com`,
        password: "defaultPassword123", // optional: replace with OTP later
      });

      setMessage("Signup successful. OTP sent!");
      setShowOtpInput(true); // Show OTP input after signup success
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:3002/api/auth/verify-otp", {
        username: mobile,
        otp: otp,
      });

      setMessage("OTP verified! Signup complete.");
      setShowOtpInput(false);
      
    } catch (error) {
      setMessage(
        error.response?.data?.message || "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* Left image section */}
        <div className="col-md-6 mb-4 mb-md-0 text-center">
          <img src="media/images/signup.png" style={{ width: "95%" }} alt="Signup" />
        </div>

        {/* Right form section */}
        <div className="col-md-6 px-5">
          <h1 className="mb-3">Signup now</h1>
          <p className="mb-4">Or track your existing application</p>

          <input
            className="form-control"
            style={{ width: "50%" }}
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled={showOtpInput} // disable mobile input after signup
          />

          <br />

          {!showOtpInput && (
            <button
              className="p-2 btn btn-primary fs-5 mb-3"
              style={{ width: "20%", margin: "0 auto" }}
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Processing..." : "Get OTP"}
            </button>
          )}

          {showOtpInput && (
            <>
              <input
                className="form-control"
                style={{ width: "50%" }}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <br />
              <button
                className="p-2 btn btn-success fs-5 mb-3"
                style={{ width: "20%", margin: "0 auto" }}
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {message && <p>{message}</p>}

          <p>
            By proceeding, you agree to the Zerodha{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              terms
            </a>{" "}
            &{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              privacy policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MiddleSection;
