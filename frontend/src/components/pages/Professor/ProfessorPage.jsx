import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfessorPage = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <h1>Lecturer Page</h1>
      <p>This is the Professor page content.</p>
      <Button variant="primary" onClick={goToHomePage}>Go to Home Page</Button>

      <Button variant="primary" onClick={() => navigate('/thesis')}>Create Thesis</Button>
    </Container>
  );
}

export default ProfessorPage;
