import  {useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import UserDetail from './UserDetail';

const UserList = () => {
    

    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleCreateClick = () => {
        setSelectedUserId(null);
    };

    const handleDetailClick = (userId) => {
        setSelectedUserId(userId);
    };

    const handleSave = (user) => {
        console.log('User saved:', user);
        // Refresh the user list or perform other actions after saving
    };

    return (
        <Container className="mt-4">
            <h1>User List</h1>
            <p>This is the User List content.</p>
            <div className='p-1 border border-dark'>
                {/* Display the list of users */}
            </div>
            <div className='p-1 border border-dark'>
            <Button onClick={handleCreateClick}>Create User</Button>
            <Button onClick={() => handleDetailClick('60d2c7f4f1b3c5d4f9b1e1d7')}>Edit User</Button>
            <UserDetail userId={selectedUserId} />
        </div>
            <Button variant="primary">Go to Home Page</Button>
        </Container>
    );
}

export default UserList;