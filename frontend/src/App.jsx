import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/signin/SignIn';
import UserTable from './components/adminpanel/dashboard/UserTable';
import MyCalendar from './components/calendar/CalendarComponent/MyCalendar';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/users" element={<UserTable />} />
      </Routes>
    </Router>
  );
}

export default App;
