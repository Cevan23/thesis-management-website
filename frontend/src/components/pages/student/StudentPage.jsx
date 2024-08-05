import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import CustomTable from "../../share/Table/CustomTable";

const StudentPage = () => {
  const navigate = useNavigate();
  const token = Cookie.get('token');
  const decodedToken = JSON.stringify(jwtDecode(token).role);
  const goToHomePage = () => {
    navigate('/');
  };
  
  return (
    <Container className="mt-4">
      <h1>Student Page</h1>
      <p>This is the student page content.</p>
      <div>
        <p>Token: {token}</p>
        <p>Decoded Token: {decodedToken}</p>
      </div>
      <CustomTable />
      <Button variant="primary" onClick={goToHomePage}>Go to Home Page</Button>
      
    </Container>
  );
}

export default StudentPage;
