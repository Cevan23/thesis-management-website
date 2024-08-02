import { useState } from 'react';
import { ExternalApi } from '../../api/api';
import { Button } from '@material-tailwind/react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const api = new ExternalApi();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const externalSignupPostRequest = {
      email,
      password,
      name,
      lastname
    };

    try {
      const response = await api.externalSignupPost(externalSignupPostRequest);
      console.log(response.status);
      if (response.status === 201) {
        setSuccess('User created successfully!');
        setEmail('');
        setPassword('');
        setName('');
        setLastname('');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Email already exists.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
      </form>
      <Button type="submit" className="btn btn-primary">Sign Up</Button>
    </div>
  );
};

export default SignUp;
