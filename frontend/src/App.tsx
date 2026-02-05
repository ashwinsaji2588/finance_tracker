import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import type { JSX } from 'react';

function Dashboard() {
  const userEmail = localStorage.getItem('userEmail');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome, {userEmail}!</p>
      <div className="card" style={{ marginTop: '2rem' }}>
        <p>Protected content will go here.</p>
        <div style={{ marginTop: '20px' }}></div>
        <button onClick={logout} className="btn" style={{ maxWidth: '200px', backgroundColor: '#ef4444' }}>Logout</button>
      </div>
    </div>
  );
}

// Simple Protected Route wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
