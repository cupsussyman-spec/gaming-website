import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import supabase from '../lib/supabase';
import api from '../api/axios';

export default function AuthCallback() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.access_token) {
        try {
          const res = await api.post('/auth/oauth', { access_token: session.access_token });
          login(res.data.token, res.data.user);
          navigate('/', { replace: true });
        } catch {
          navigate('/login', { replace: true });
        }
      } else {
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
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
