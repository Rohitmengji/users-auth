import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const RegistrationComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  const handleRegistration = async () => {
    try {
      const registrationData = {
        name,
        email,
        mobile,
        password,
        confirm_password: confirmPassword,
      };
      console.log(registrationData, "registrationData");

      const response = await axios.post(
        `https://dsf.uhm.mybluehost.me/ecommerceapi/public/api/registration?name=${registrationData.name}&email=${registrationData.email}&mobile=${registrationData.mobile}&password=${registrationData.password}&confirm_password=${registrationData.confirm_password}`,
        {
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
          },
        }
      );
      const token = response.data.data.verifyToken;
      console.log(token, response.data?.data, "resoponse from form");
      checkIfTokenValid(token);
      console.log(response.data, "This is the response from Axios");
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTokenValid = async (token) => {
    const checkToken = await axios.get(
      `https://dsf.uhm.mybluehost.me/ecommerceapi/public/api/verify/{${token}}`
    );

    console.log("checkToken", checkToken);
    alert(checkToken?.data?.message, "token valid message");
  };

  return (
    <div className='registration-container'>
      <h2>Registration</h2>
      <input
        className='registration-input'
        type='text'
        value={name}
        name='name'
        onChange={(e) => setName(e.target.value)}
        placeholder='Name'
      />
      <input
        className='registration-input'
        type='email'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <input
        className='registration-input'
        type='number'
        name='mobile'
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder='Mobile'
      />
      <input
        className='registration-input'
        type='password'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <input
        type='password'
        className='registration-input'
        name='confirmPassword'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder='Confirm Password'
      />
      <button className='registration-button' onClick={handleRegistration}>
        Register
      </button>
      <button className='registration-button' onClick={navigateLogin}>
        Login
      </button>
    </div>
  );
};

export default RegistrationComponent;
