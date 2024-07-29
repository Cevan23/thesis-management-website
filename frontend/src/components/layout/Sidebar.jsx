import { useContext } from 'react';
import { Nav } from "react-bootstrap";
import "../../assets/styles/Sidebar.css";
import {} from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { role } = useContext(AuthContext);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="toggle-icon" onClick={toggleSidebar}>
        <FaChevronLeft />
      </div>
      <Nav defaultActiveKey="/home" className="flex-column">
        {role === "Student" && (
          <>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/student">Student</Nav.Link>
            <Nav.Link href="/student/thesis">Đề tài của bạn</Nav.Link>
            <Nav.Link href="/student/progress">
              Quản lí yêu cầu tiến độ
            </Nav.Link>
            <Nav.Link href="/student/register">Đăng kí đề tài</Nav.Link>
          </>
        )}
        {role === "Professor" && (
          <>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/teacher">Teacher</Nav.Link>
            <Nav.Link href="/teacher/thesis">Đề tài hướng dẫn</Nav.Link>
            <Nav.Link href="/teacher/approval">Phê duyệt đề tài</Nav.Link>
          </>
        )}
        {role === "Admin" && (
          <>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
            <Nav.Link href="/admin/students">Quản lý sinh viên</Nav.Link>
            <Nav.Link href="/admin/teachers">Quản lý giáo viên</Nav.Link>
            <Nav.Link href="/admin/theses">Quản lý đề tài</Nav.Link>
          </>
        )}
        {role === "External"  && (
          <>
            <Nav.Link href="/profile">Thông tin tài khoản</Nav.Link>
            <Nav.Link href="/logout">Đăng xuất</Nav.Link>
          </>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
