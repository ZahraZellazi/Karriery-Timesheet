import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import './SignIn.scss';
import logo from '../assets/logo.png';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain at least one special character, and one uppercase letter';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:7050/login', { email, password });
        console.log('Login successful:', response.data);
        toast.success('Sign in successful!');
        setEmail('');
        setPassword('');
        setErrors({});
        navigate('/calendar'); 
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An error occurred.');
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="wrapperI">
      <div className="containerI">
        <img src={logo} alt="Logo" className="logo" />
        <div className="titleI">Karriery Time-sheet</div>
        <div className="form-containerI">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="text"
                  placeholder="Enter your email"
                  className={`inputI ${errors.email ? 'error' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={`inputI ${errors.password ? 'error' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>
            <button className="buttonI" type="submit">Sign In</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
