import React from "react";
import { useNavigate } from "react-router-dom";
import UserList from "./UserListComponent";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    // Clear any user session or tokens
    // Redirect to the login page
    const token = localStorage.clear("token");
    navigate("/login");
    return token;
  };

  return (
    <div className='container mt-5'>
      <nav>
        
      <button className='btn btn-primary mt-1 float-end' onClick={handleLogout}>
        Logout
      </button>
      </nav>
      <h2>Welcome to the dashboard!</h2>
      <div className='mt-5'>
        <UserList />
      </div>
    </div>
  );
};

export default Dashboard;
