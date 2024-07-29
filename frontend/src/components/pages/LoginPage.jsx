import React, { useContext,useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { ExternalApi } from '../../api/api';
import Cookies from 'js-cookie';

const Login = () => {
  const { updateAuthState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const api = new ExternalApi();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const externalLoginPostRequest = {
      email,
      password,
    };
    try {
      const response = await api.externalLoginPost(externalLoginPostRequest);
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set('token', token, { expires: 5 });
        updateAuthState(response.data.role);
        setSuccess(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('An error occurred in Login. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
