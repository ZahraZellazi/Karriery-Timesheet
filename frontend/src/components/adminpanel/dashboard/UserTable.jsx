import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import './UserTable.css';
import Header from '../header/Header'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7050/users');
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleAdmin = async (id, currentStatus) => {
    try {
      const updatedUser = { isAdmin: !currentStatus };
      await axios.put(`http://localhost:7050/users/${id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isAdmin: !currentStatus } : user
        )
      );
    } catch (error) {
      console.error('Failed to update admin status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await axios.delete(`http://localhost:7050/users/${id}`);
        if (response.status === 200) {
          setUsers(users.filter((user) => user.id !== id));
        } else {
          console.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header /> 
      <div className="user-table-container">
        <div className="user-table-header">
          <h2>User Management</h2>
          <div className="user-table-actions">
            <button className="btn btn-add-user">Add New User</button>
          </div>
        </div>
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn-toggle-admin"
                    onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                    title={`Set ${user.firstname} as ${user.isAdmin ? 'user' : 'admin'}`}
                  >
                    <span className={user.isAdmin ? 'icon-admin' : 'icon-non-admin'}>
                      {user.isAdmin ? <FaToggleOn /> : <FaToggleOff />}
                    </span>
                  </button>
                </td>
                <td>
                  <button
                    className="btn-settings"
                    title="Edit User"
                    onClick={() => alert('Edit functionality not implemented yet.')}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="btn-delete"
                    title="Delete User"
                    onClick={() => handleDelete(user.id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
