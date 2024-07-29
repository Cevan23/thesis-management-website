import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const StudentPage = () => {
  const navigate = useNavigate();
  const token = Cookie.get('token');
  const decodedToken = jwtDecode(token);
  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <h1>Student Page</h1>
      <p>This is the student page content.</p>
      <div>
        <p>Token: {token}</p>
        <p>Decoded Token: {JSON.stringify(decodedToken)}</p>
      </div>
      <Button variant="primary" onClick={goToHomePage}>Go to Home Page</Button>
    </Container>
  );
}

export default StudentPage;
