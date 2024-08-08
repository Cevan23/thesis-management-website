import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserList from './User/UserList';

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <UserList />
    </Container>
  );
}

export default AdminPage;
