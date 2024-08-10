import { Container, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchComponent from "../../../share/Search/Search";

const ProfessorList = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [headers, setHeaders] = useState([]);
  const [professorList, setProfessorList] = useState();
  const [loading, setLoading] = useState(false);
  const [originalList, setOriginalList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Thực hiện tìm kiếm hoặc xử lý dữ liệu với query
  };

  return (
    <div>
      <h1>Professor List</h1>
    
        <div className="d-flex flex-row-reverse ">
          <button
            className="col-lg-3 btn btn-primary"
            style={{ maxWidth: "120px", minWidth: "100px", minHeight: "35px",  marginLeft: "36px", marginRight: "10px" }}
            onClick={() => navigate("/admin/professor/0")}
          >
            <i class="bi bi-plus-lg"></i>
            Add New
          </button>
          <SearchComponent onSearch={handleSearch} />
        </div>
   
      <div>
        <Container>
          <span>Table</span>
        </Container>
      </div>
    </div>
  );
};

export default ProfessorList;
