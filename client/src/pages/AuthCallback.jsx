import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import supabase from '../lib/supabase';
import api from '../api/axios';

export default function AuthCallback() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let done = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (done) return;
      if (session?.access_token) {
        done = true;
        subscription.unsubscribe();
        clearTimeout(fallbackTimer);
        try {
          const res = await api.post('/auth/oauth', { access_token: session.access_token });
          login(res.data.token, res.data.user);
          navigate('/', { replace: true });
        } catch {
          navigate('/login', { replace: true });
        }
      }
    });

    // Fallback: if no session fires within 10s, redirect to login
    const fallbackTimer = setTimeout(() => {
      if (!done) {
        done = true;
        subscription.unsubscribe();
        navigate('/login', { replace: true });
      }
    }, 10000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '0.8rem',
          color: '#4CAF50',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⛏</div>
        SIGNING IN...
      </div>
    </div>
  );
}
