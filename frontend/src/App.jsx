import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/signin/SignIn';
import MyCalendar from './components/calendar/MyCalendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<SignIn />} /> 
        <Route path="/calendar" element={<MyCalendar />} />
      </Routes>
    </Router>
  );
}

export default App;
