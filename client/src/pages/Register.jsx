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
    fontFamily: "'Exo 2', sans-serif",
    fontWeight: 600,
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.5)',
    display: 'block',
    marginBottom: '8px',
    letterSpacing: '0.08em',
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px 100px',
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '420px',
        padding: '36px 32px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌱</div>
          <h1 style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 800,
            fontSize: '1.6rem',
            color: 'white',
            margin: 0,
            letterSpacing: '0.06em',
          }}>
            CREATE ACCOUNT
          </h1>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '6px',
          }}>
            Join the knowledge base
          </p>
        </div>

        {error && (
          <div style={{ marginBottom: '20px' }}>
            <AlertBox message={error} type="error" />
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '0.85rem', color: 'rgba(255,255,255,0.2)', marginTop: '4px' }}>
              {username.length}/20
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
              background: loading ? 'rgba(34,197,94,0.4)' : 'rgba(34,197,94,0.8)',
              color: 'white',
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 700,
              fontSize: '0.85rem',
              padding: '13px',
              border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: '8px',
              cursor: loading ? 'wait' : 'pointer',
              letterSpacing: '0.08em',
              marginTop: '6px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'rgba(34,197,94,1)'; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'rgba(34,197,94,0.8)'; }}
          >
            {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontFamily: "'VT323', monospace", fontSize: '1rem', color: 'rgba(255,255,255,0.25)' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 600,
            fontSize: '0.8rem',
            padding: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            cursor: 'pointer',
            letterSpacing: '0.06em',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '16px', height: '16px' }} />
          SIGN UP WITH GOOGLE
        </button>

        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.35)',
          textAlign: 'center',
          marginTop: '20px',
        }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{ color: '#f97316', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fb923c'}
            onMouseLeave={e => e.currentTarget.style.color = '#f97316'}
          >
            LOGIN HERE
          </Link>
        </p>
      </div>
    </div>
  );
}
