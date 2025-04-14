import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import Signup from '@/pages/Signup/Signup';
import Fogot from '@/pages/Login/Fogot';
import Profile from '@/pages/Profile/Profile'; // Thêm import

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fogot-pass" element={<Fogot />} />
        <Route path="/profile" element={<Profile />} /> {/* Thêm dòng này */}
      </Routes>
    </Router>
  );
};

export default App;
