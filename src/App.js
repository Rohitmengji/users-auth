import React from "react";
import { Route, Routes } from "react-router-dom";
import RegistrationComponent from "./components/RegistrationForm";
import LoginComponent from "./components/LoginComponent";
import VerificationComponent from "./components/VerifyPage";
import UserListComponent from "./components/UserListComponent";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Route for the registration page */}
        <Route path='/' element={<RegistrationComponent />} />

        {/* Route for the login page */}
        <Route path='/login' element={<LoginComponent />} />

        {/* Route for the email verification page */}
        <Route path='/verify' element={<VerificationComponent />} />

        {/* Route for the dashboard page */}
        <Route path='/dashboard' element={<Dashboard />} />

        {/* Route for the user list page */}
        <Route path='/users' element={<UserListComponent />} />
      </Routes>
    </div>
  );
};

export default App;
