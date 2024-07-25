import React from 'react';
import { Nav } from 'react-bootstrap';
import '../../assets/styles/Sidebar.css';
import {  } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="toggle-icon" onClick={toggleSidebar}>
         <FaChevronLeft /> 
      </div>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="/student">Student</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/signup">Sign Up</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
