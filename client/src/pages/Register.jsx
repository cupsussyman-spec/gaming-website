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
    if (!username.trim() || !email.trim() || !password || !confirmPassword) return 'Please fill in all fields.';
    if (username.trim().length < 3) return 'Username must be at least 3 characters.';
    if (username.trim().length > 20) return 'Username must be 20 characters or less.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { username: username.trim(), email: email.trim(), password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 42px 12px 14px',
    background: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px 100px',
      backgroundImage: "url('/login-bg.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '360px',
        background: 'rgba(30,30,35,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '20px',
        padding: '36px 28px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.45)',
      }}>
        <h1 style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 700,
          fontSize: '1.9rem',
          color: 'white',
          margin: '0 0 24px',
          textAlign: 'center',
        }}>Register</h1>

        {error && <div style={{ marginBottom: '16px' }}><AlertBox message={error} type="error" /></div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              disabled={loading}
              maxLength={20}
              style={inputStyle}
            />
            <img src="https://minecraft.wiki/images/End_Crystal_(Slateless).gif" alt="icon" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '22px', height: '22px', imageRendering: 'pixelated', pointerEvents: 'none' }} />
          </div>

          <div style={{ position: 'relative' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              disabled={loading}
              style={inputStyle}
            />
            <span style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.55)', fontSize: '1rem', pointerEvents: 'none' }}>✉️</span>
          </div>

          <div style={{ position: 'relative' }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="new-password"
              disabled={loading}
              style={inputStyle}
            />
            <span style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.55)', fontSize: '1rem', pointerEvents: 'none' }}>🔒</span>
          </div>

          <div style={{ position: 'relative' }}>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              autoComplete="new-password"
              disabled={loading}
              style={{
                ...inputStyle,
                borderColor: confirmPassword && password !== confirmPassword ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.25)',
              }}
            />
            <span style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.55)', fontSize: '1rem', pointerEvents: 'none' }}>🔒</span>
          </div>
          {confirmPassword && password !== confirmPassword && (
            <div style={{ color: '#fca5a5', fontSize: '0.8rem', marginTop: '-8px' }}>Passwords do not match</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              background: 'white',
              color: '#111',
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 700,
              fontSize: '0.95rem',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'wait' : 'pointer',
              marginTop: '4px',
              transition: 'opacity 0.2s',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '18px 0', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
        </div>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: 'rgba(255,255,255,0.12)',
            color: 'white',
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 600,
            fontSize: '0.85rem',
            padding: '11px',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '16px', height: '16px' }} />
          Sign up with Google
        </button>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: '20px', marginBottom: 0 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'white', fontWeight: 700, textDecoration: 'none' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
