import React, { useState } from "react";
import "./assets/styles/App.css";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import HomePage from "./components/pages/HomePage";
import Sutudent from "./components/pages/student/StudentPage";
import LecturerPage from "./components/pages/lecturer/LecturerPage";
import AdminPage from "./components/pages/admin/AdminPage";
import Profile from "./components/pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Login from "./components/pages/LoginPage";
import SignUp from "./components/pages/SignUpPage";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App" >
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`content ${isSidebarOpen ? "shifted" : ""}`}>
        <Router>
          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="/student" element={<Sutudent />} />
            <Route path="/lecturer" element={<LecturerPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </main>
      <Footer />
    </div>
  );
};

export default App;
