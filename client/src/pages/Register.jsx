import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import supabase from '../lib/supabase';
import AlertBox from '../components/AlertBox';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const validate = () => {
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      return 'Please fill in all fields.';
    }
    if (username.trim().length < 3) {
      return 'Username must be at least 3 characters long.';
    }
    if (username.trim().length > 20) {
      return 'Username must be 20 characters or less.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/register', {
        username: username.trim(),
        email: email.trim(),
        password,
      });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: '0.55rem',
    color: '#4CAF50',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 68px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#0d0d1a',
          border: '4px solid #4CAF50',
          boxShadow: '8px 8px 0px #2d7a2d',
          padding: '32px',
        }}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: '3px solid #4CAF50',
            marginBottom: '28px',
            paddingBottom: '16px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌱</div>
          <h1
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '1rem',
              color: '#4CAF50',
              margin: 0,
              textShadow: '3px 3px 0px #2d7a2d',
            }}
          >
            REGISTER
          </h1>
        </div>

        {error && (
          <div style={{ marginBottom: '20px' }}>
            <AlertBox message={error} type="error" />
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="username" style={labelStyle}>USERNAME</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pixel-input"
              placeholder="CreeperSlayer99"
              autoComplete="username"
              disabled={loading}
              maxLength={20}
            />
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '0.9rem', color: '#555', marginTop: '4px' }}>
              {username.length}/20 chars
            </div>
          </div>

          <div>
            <label htmlFor="email" style={labelStyle}>EMAIL</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pixel-input"
              placeholder="player@minecraft.net"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" style={labelStyle}>PASSWORD</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pixel-input"
              placeholder="Min. 6 characters"
              autoComplete="new-password"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" style={labelStyle}>CONFIRM PASSWORD</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pixel-input"
              placeholder="Repeat password"
              autoComplete="new-password"
              disabled={loading}
            />
            {confirmPassword && password !== confirmPassword && (
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '1rem', color: '#ef4444', marginTop: '4px' }}>
                Passwords do not match
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? '#2d7a2d' : '#4CAF50',
              color: '#0d0d1a',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.65rem',
              padding: '14px',
              border: '3px solid #2d7a2d',
              boxShadow: '4px 4px 0px #2d7a2d',
              cursor: loading ? 'wait' : 'pointer',
              marginTop: '8px',
              transition: 'transform 0.1s, box-shadow 0.1s',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '6px 6px 0px #2d7a2d';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '4px 4px 0px #2d7a2d';
            }}
          >
            {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '10px' }}>
          <div style={{ flex: 1, height: '2px', background: '#2a2a4a' }} />
          <span style={{ fontFamily: "'VT323', monospace", fontSize: '1rem', color: '#555' }}>OR</span>
          <div style={{ flex: 1, height: '2px', background: '#2a2a4a' }} />
        </div>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: '#fff',
            color: '#333',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.55rem',
            padding: '12px',
            border: '3px solid #aaa',
            boxShadow: '4px 4px 0px #888',
            cursor: 'pointer',
            transition: 'transform 0.1s, box-shadow 0.1s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '6px 6px 0px #888';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '4px 4px 0px #888';
          }}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '16px', height: '16px' }} />
          SIGN UP WITH GOOGLE
        </button>

        <div
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '2px solid #2a2a4a',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: "'VT323', monospace", fontSize: '1.2rem', color: '#888' }}>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{ color: '#4CAF50', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#FFD700'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#4CAF50'; }}
            >
              LOGIN HERE
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
