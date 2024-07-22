import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <h1>Admin Page</h1>
      <p>This is the Admin page content.</p>
      <Button variant="primary" onClick={goToHomePage}>Go to Home Page</Button>
    </Container>
  );
}

export default AdminPage;
