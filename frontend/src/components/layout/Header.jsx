import React, { useState,useEffect } from "react";
import { Navbar, Form, FormControl, Button, Image } from "react-bootstrap";
import avatarImage from "../../assets/img/avatar.jpg";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Header = ({ toggleSidebar }) => {
  
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const token = Cookie.get("token");
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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Button className="mr-4" variant="outline-light" onClick={toggleSidebar}>
        ☰
      </Button>
      <Navbar.Brand href="#home">Thesis Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="d-flex ml-auto">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <div className="ml-auto">
          <button
            className="flex items-center focus:outline-none"
            onClick={toggleDropdown}
          >
            <Image
              src={avatarImage}
              roundedCircle
              width="30"
              height="30"
              alt="Avatar"
              className="rounded-full"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
              {role && (
                <>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
