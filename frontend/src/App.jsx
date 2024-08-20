import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import MyCalendar from './components/MyCalendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/calendar" element={<MyCalendar />} />
      </Routes>
    </Router>
  );
}

export default App;
