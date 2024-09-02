import React, { useState } from 'react';
import './UserModal.css';

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '', 
    isAdmin: false,
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const validateInputs = () => {
    const { firstname, lastname, email, password, confirmPassword } = userData;

    if (!firstname) return 'First name is required';
    if (!lastname) return 'Last name is required';
    if (!email) return 'Email is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }

    if (!password) return 'Password is required';

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters long, contain at least one special character, and one uppercase letter';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateInputs();
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError('');

    try {
      await onAddUser({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        password: userData.password, 
        isAdmin: userData.isAdmin,
      });
      onClose(); 
    } catch (error) {
      setValidationError('Failed to add user. Please try again.'); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={userData.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={userData.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
          {validationError && <p className="error-message">{validationError}</p>}
          <label>
            <input
              type="checkbox"
              checked={userData.isAdmin}
              onChange={() => setUserData({ ...userData, isAdmin: !userData.isAdmin })}
            />
            Admin
          </label>
          <button type="submit">Add User</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
