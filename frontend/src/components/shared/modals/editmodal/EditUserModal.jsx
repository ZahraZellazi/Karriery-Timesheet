import React, { useState, useEffect } from 'react';
import './EditUserModal.css'; 

const EditUserModal = ({ isOpen, onClose, onUpdateUser, user }) => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    isAdmin: false,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ ...userData, id: user.id });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-user-modal-overlay">
      <div className="add-user-modal-content">
        <button className="add-user-modal-close" onClick={onClose}>✖</button>
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={userData.firstname}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={userData.lastname}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={userData.isAdmin}
              onChange={() => setUserData({ ...userData, isAdmin: !userData.isAdmin })}
            />
            Admin
          </label>
          <button type="submit">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
