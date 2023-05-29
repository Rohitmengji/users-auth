import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const VerifyPage = () => {
    const { verifyToken } = useParams();
    const [mobilecode, setMobileCode ] = useState('')
  const [emailCode, setEmailCode] = useState("");
  const [emailVerificationRequired, setEmailVerificationRequired] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await axios.get(
          `https://dsf.uhm.mybluehost.me/ecommerceapi/public/api/verify/${verifyToken}`,
          {
            headers: {
              Accept: "application/vnd.api+json",
              "Content-Type": "application/vnd.api+json",
            },
          }
        );

        const { status, data } = response.data;

        if (status === 200) {
          setEmailVerificationRequired(data.emailVerificationrequired);
        } else {
          alert("Verification token is not valid. Go back to login page.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching verification status:", error);
        alert("An error occurred while verifying the token.");
        navigate("/login");
      }
    };

    fetchVerificationStatus();
  }, [verifyToken, navigate]);

  const handleVerify = async () => {
    try {
      const response = await axios.post(
        `https://dsf.uhm.mybluehost.me/ecommerceapi/public/api/verify/${verifyToken}`,
        {
          email_code: emailCode,
        },
        {
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
          },
        }
      );

      const { status, message } = response.data;

      if (status === 200) {
        alert(message);
        navigate("/login");
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error during verification:", error);
      alert("An error occurred during verification.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(
        "https://dsf.uhm.mybluehost.me/ecommerceapi/public/api/resend-verification-code",
        { token: verifyToken },
        {
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
          },
        }
      );

      const { status, message, data } = response.data;

      if (status === 200) {
        alert(message);
        const newVerifyToken = data.verify_token;
        navigate(`/verify/${newVerifyToken}`);
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("An error occurred while resending OTP.");
    }
  };

  return (
    <div>
      <h2>Verification Page</h2>
      <label htmlFor='emailCode'>Email OTP:</label>
      <input
        type='text'
        id='emailCode'
        value={emailCode}
        onChange={(e) => setEmailCode(e.target.value)}
      />

      {emailVerificationRequired && (
        <>
          <label htmlFor='mobileCode'>Mobile OTP:</label>
          <input
            type='text'
            id='mobileCode'
            value={mobilecode}
            onChange={(e) => setMobileCode(e.target.value)}
          />
        </>
      )}

      <button onClick={handleVerify}>Verify</button>

      <button onClick={handleResendOTP}>Resend OTP</button>
    </div>
  );
};

export default VerifyPage;
