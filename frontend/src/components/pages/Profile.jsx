import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <Container className="mt-4">
      <h2>Profile</h2>
      <form className="space-x-4 space-y-4 space-x-reverse">
        <div className="space-x-4 space-y-4 space-x-reverse">
          <label>Email:</label>
          <input type="email" name="email" readOnly />
        </div>
        <div className="space-x-4 space-y-4 space-x-reverse">
          <label>Password:</label>
          <input type="password" name="password" className="caret-pink-500 border-2 border-rose-600"/>
        </div>
        <div className="space-x-4 space-y-4 space-x-reverse">
          <label>First Name:</label>
          <input type="text" name="name" className="caret-pink-500 border-2 border-rose-600"/>
        </div>
        <div className="space-x-4 space-y-4 space-x-reverse">
          <label>Last Name:</label>
          <input type="text" name="lastname"  className="caret-pink-500 border-2 border-rose-600"/>
        </div>
        <div className="space-x-4 space-y-4 space-x-reverse"> 
          <label>Role:</label>
          <input type="text" name="role" readOnly />
        </div>
        <div className="flex-1 space-x-2" >
          <Button className="space-x-2 caret-pink-500" variant="primary" onClick={goToHomePage}>
            Go to Home Page
          </Button>

          <Button className="space-x-2 caret-pink-500" variant="primary" onClick={goToHomePage}>
            Update Profile
          </Button>
        </div>
        
      </form>
    </Container>
  );
};

export default Profile;
