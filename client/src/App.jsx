import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import CategoryTips from './pages/CategoryTips';
import Login from './pages/Login';
import Register from './pages/Register';
import Submit from './pages/Submit';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import AuthCallback from './pages/AuthCallback';
import Chat from './pages/Chat';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '60px' }}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<Home />} />
        <Route path="/tips/:category" element={<CategoryTips />} />
        <Route
          path="/submit"
          element={
            <ProtectedRoute>
              <Submit />
            </ProtectedRoute>
          }
        />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
