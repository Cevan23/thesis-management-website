import { Container, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfessorList = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [headers, setHeaders] = useState([]);
  const [professorList, setProfessorList] = useState();
  const [loading, setLoading] = useState(false);
  const [originalList, setOriginalList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <h1>Professor List</h1>
      <div >
        <div className="row d-flex justify-content-between">
          <Button className="col-lg-3" style={{ maxWidth: '120px' , minWidth: '100px', maxHeight: '50px', minHeight: '40px'}} onClick={() => navigate("/admin/professor/0")}>
            Add New
          </Button>
          <div class="col-md-9" style={{ maxWidth: '500px' , padding: '20px' , minWidth: '400px'}}>
            <div>
              <span>
                <i class="bi bi-search"></i>
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
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
