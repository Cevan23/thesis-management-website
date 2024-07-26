import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const StudentPage = () => {
  const navigate = useNavigate();
  const token = Cookies.get('jwt');
  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <h1>Student Page</h1>
      <p>This is the student page content.</p>
      <div>
        <p>Token: {token}</p>
      </div>
      <Button variant="primary" onClick={goToHomePage}>Go to Home Page</Button>
    </Container>
  );
}

export default StudentPage;
