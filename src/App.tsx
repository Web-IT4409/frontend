import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import Signup from '@/pages/Signup/Signup';
import Fogot from '@/pages/Login/Fogot';
import Profile from '@/pages/Profile/Profile';
import Friends from '@/pages/Friends/Friends';
import PostDetail from '@/pages/PostDetail/PostDetail';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fogot-pass" element={<Fogot />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
