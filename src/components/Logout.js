import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      if (token) {
        await axios.post(
          "https://dsf.uhm.mybluehost.me/ecommerceapi/public/api/logout",
          
          {
            headers: {
              Accept: "application/vnd.api+json",
              "Content-Type": "application/vnd.api+json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Remove the token from local storage
      localStorage.removeItem("token");

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Logout failed:", error.response.data.message);
      } else {
        console.error("Logout failed:", error);
      }

      // Redirect to the login page even if logout fails
      navigate("/login");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutComponent;
