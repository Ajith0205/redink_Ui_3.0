import React from 'react'
import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_Url } from '../Service/Constant';
import '../Style/Login.css';
import { useNavigate } from 'react-router-dom';
function Login() {
   const [inputs, setInputs] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic form validation
    if (!inputs.username || !inputs.password) {
      setErrors({ message: 'Please fill in all fields' });
      setLoading(false);
      return;
    }

    // Clear any previous errors
    setErrors({});

    // Make the API call to login
    axios({
      method: 'post',
      url: Base_Url + 'user/login',
      data: inputs,
    })
      .then((response) => {
        console.log('Login Response', response.data);
        if (response.data.status) {
          // Login successful, navigate to the dashboard
          const id = response.data.response.id;

          // Store token, id, and role in localStorage
          const { Authorization, role } = response.data.response;
          localStorage.setItem('token', Authorization);
          localStorage.setItem('id', id);
          localStorage.setItem('role', role);

          navigate('/home');
        } else {
          // Login failed, display error message
          setErrors({ message: 'Invalid email or password' });
        }
      })
      .catch((error) => {
        console.log(error);
        setErrors({ message: 'An error occurred. Please try again later.' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errors.message && <p className="error-message">{errors.message}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );

  
}

export default Login
