import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginComponent.css";

const LoginComponent = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const navigateRegister = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    try {
      const loginData = {
        email_or_mobile: emailOrMobile,
        password: password,
      };

      console.log(
        loginData.email_or_mobile,
        "email",
        loginData.password,
        "PASSWORD"
      );

      const response = await axios.post(
        "https://dsf.uhm.mybluehost.me/ecommerceapi/public/api/login",
        loginData
      );

      console.log(response, "im from login page");
      // Handle the API response here
      if (response.status === 200) {
        const token = response.data.data.token;
        // Store the token in local storage
        localStorage.setItem("token", token);
        // Redirect or perform any desired action
        navigate("/dashboard");
        alert("Successfully logged in.");
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login </h2>
      <input
        type='text'
        name='emailOrMobile'
        value={emailOrMobile}
        onChange={(e) => setEmailOrMobile(e.target.value)}
        placeholder='Email or Mobile'
      />
      <input
        type='password'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button className='login-button' onClick={handleLogin}>
        Login
      </button>
      <button className='register-button' onClick={navigateRegister}>
        Sign Up
      </button>
    </div>
  );
};

export default LoginComponent;
