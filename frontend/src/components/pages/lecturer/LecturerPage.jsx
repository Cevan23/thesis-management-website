import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LecturerPage = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <h1>Lecturer Page</h1>
      <p>This is the Lecturer page content.</p>
      <Button variant="primary" onClick={goToHomePage}>Go to Home Page</Button>
    </Container>
  );
}

export default LecturerPage;
