import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/signin/SignIn';
import UserTable from './components/adminpanel/dashboard/UserTable';
import Calendar from './components/adminpanel/calendar/Calendar';
import Header from './components/shared/header/Header';
import './index.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <div className='container'>
      {children}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/calendar"
          element={
            <Layout>
              <Calendar />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              <UserTable />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
