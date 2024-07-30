import "./assets/styles/App.css";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import HomePage from "./components/pages/HomePage";
import Student from "./components/pages/student/StudentPage";
import ProfessorPage from "./components/pages/Professor/ProfessorPage";
import AdminPage from "./components/pages/admin/AdminPage";
import Profile from "./components/pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Login from "./components/pages/LoginPage";
import SignUp from "./components/pages/SignUpPage";
import ThesisDetail from "./components/pages/Professor/Thesis/ThesisDetail";
import { useState } from "react";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <Router>
        <div className="App">
          <Header toggleSidebar={toggleSidebar} />
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <main className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
            <Routes>
              <Route path="*" element={<HomePage />} />
              <Route path="/student" element={<Student />} />
              <Route path="/professor" element={<ProfessorPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/thesis" element={<ThesisDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
};

export default App;
