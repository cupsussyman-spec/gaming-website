import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import supabase from '../lib/supabase';
import AlertBox from '../components/AlertBox';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email: email.trim(), password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
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
        maxWidth: '400px',
        padding: '36px 32px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⛏</div>
          <h1 style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 800,
            fontSize: '1.6rem',
            color: 'white',
            margin: 0,
            letterSpacing: '0.06em',
          }}>
            WELCOME BACK
          </h1>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '6px',
          }}>
            Sign in to your account
          </p>
        </div>

        {error && (
          <div style={{ marginBottom: '20px' }}>
            <AlertBox message={error} type="error" />
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? 'rgba(239,68,68,0.5)' : 'rgba(239,68,68,0.85)',
              color: 'white',
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 700,
              fontSize: '0.85rem',
              padding: '13px',
              border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: '8px',
              cursor: loading ? 'wait' : 'pointer',
              letterSpacing: '0.08em',
              marginTop: '4px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'rgba(239,68,68,1)'; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'rgba(239,68,68,0.85)'; }}
          >
            {loading ? 'SIGNING IN...' : 'LOGIN'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontFamily: "'VT323', monospace", fontSize: '1rem', color: 'rgba(255,255,255,0.25)' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
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
          CONTINUE WITH GOOGLE
        </button>

        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.35)',
          textAlign: 'center',
          marginTop: '20px',
        }}>
          No account?{' '}
          <Link
            to="/register"
            style={{ color: '#f97316', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fb923c'}
            onMouseLeave={e => e.currentTarget.style.color = '#f97316'}
          >
            REGISTER HERE
          </Link>
        </p>

        <p style={{ fontFamily: "'VT323', monospace", fontSize: '0.85rem', color: 'rgba(255,255,255,0.18)', textAlign: 'center', marginTop: '8px' }}>
          Demo: craftmaster@example.com / password123
        </p>
      </div>
    </div>
  );
}
