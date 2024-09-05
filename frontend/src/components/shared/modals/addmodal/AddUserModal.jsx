import React, { useState } from "react";
import "./UserModal.css";

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const [validationError, setValidationError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (name === "password") {
      const strength = evaluatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const evaluatePasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[!@#$&*]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
      case 2:
        return "Weak";
      case 3:
        return "Medium";
      case 4:
      case 5:
        return "Strong";
      default:
        return "Weak"; 
    }
  };

  const validateInputs = () => {
    const { firstname, lastname, email, password, confirmPassword } = userData;

    if (!firstname) return "First name is required";
    if (!lastname) return "Last name is required";
    if (!email) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email address";
    }

    if (!password) return "Password is required";

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long, contain at least one special character, and one uppercase letter";
    }

    if (password !== confirmPassword) {
      return "Passwords must match exactly (case-sensitive)";
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

    setValidationError(""); 

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
      setValidationError("Failed to add user. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="add-user-modal-overlay">
      <div className="add-user-modal-content">
        <button className="add-user-modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            value={userData.firstname}
            onChange={handleChange}
            required
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            value={userData.lastname}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            onFocus={() => {
              if (userData.password.length > 0) {
                setIsPasswordFocused(true);
              }
            }}
            onBlur={() => {
              if (userData.password.length === 0) {
                setIsPasswordFocused(false);
              }
            }}
            required
          />
          {isPasswordFocused && userData.password.length > 0 && passwordStrength && (
            <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
              Password Strength: {passwordStrength}
            </p>
          )}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
          {validationError && (
            <p className="error-message">{validationError}</p>
          )}
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={userData.isAdmin}
              onChange={() =>
                setUserData({ ...userData, isAdmin: !userData.isAdmin })
              }
            />
            <span>Admin</span>
          </label>

          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
