import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SideMenu from './components/SideMenu';

function App() {
  // Simple handler to simulate login
  const handleLogin = () => {
    console.log('User logged in successfully');
  };

  return (
    <Router>
      <Routes>
        {/* Redirect to Login page by default */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {/* Redirect to Dashboard first after login */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Home route for later use */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
