import { Nav } from "react-bootstrap";
import "../../assets/styles/Sidebar.css";
import {} from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const token = Cookie.get("token");
  const logout = () => {
    Cookie.remove('token');
    window.location.href = '/login';
  };
  const [role, setRole] = useState("");
  useEffect(() => {
    if (!token) return;
    try {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role || "");
    } catch (error) {
      console.error("Error decoding token:", error);
      setRole("");
    }
  }, [token]);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="toggle-icon" onClick={toggleSidebar}>
        <FaChevronLeft />
      </div>

      <Nav defaultActiveKey="/home" className="flex-column">
        <>
          <Nav.Link href="*">Home</Nav.Link>
          {role === "Student" && (
            <>
              <Nav.Link href="/student">Student</Nav.Link>
              <Nav.Link onClick={logout} href="/login">Sing out</Nav.Link>
            </>
          )}
          {role === "Professor" && (
            <>
              <Nav.Link href="/professor">Professor</Nav.Link>
              <Nav.Link onClick={logout} href="/login">Sing out</Nav.Link>
            </>
          )}
          {role === "Admin" && (
            <>
              <Nav.Link href="/admin">Admin</Nav.Link>
              <Nav.Link href="/admin/user">User Management</Nav.Link>
              <Nav.Link href="/admin/professor">Professor Management</Nav.Link>
              <Nav.Link onClick={logout} href="/login">Sing out</Nav.Link>
            </>
          )}
          {role === "" && (
            <>
              <Nav.Link onClick={logout} href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sing Up</Nav.Link>
            </>
          )}
        </>
      </Nav>
    </div>
  );
};

export default Sidebar;
