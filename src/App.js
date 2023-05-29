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
        <Route path='/' element={<RegistrationComponent />} />
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/verify' element={<VerificationComponent />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/users' element={<UserListComponent />} />
      </Routes>
    </div>
  );
};

export default App;
