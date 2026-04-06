import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const linkStyle = {
    fontFamily: "'Exo 2', sans-serif",
    fontWeight: 600,
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    letterSpacing: '0.06em',
    padding: '6px 2px',
    transition: 'color 0.2s',
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 200,
      background: 'rgba(7, 5, 8, 0.6)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 800,
          fontSize: '1.1rem',
          color: 'white',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ color: '#ef4444', fontSize: '1rem' }}>⛏</span>
          <span>CRAFT</span><span style={{ color: '#f97316' }}>WISDOM</span>
        </Link>

        {/* Desktop nav links */}
        <div style={{ alignItems: 'center', gap: '28px' }} className="nav-desktop">
          {location.pathname !== '/' && (
            <Link to="/" style={linkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            >HOME</Link>
          )}
          <Link to="/submit" style={linkStyle}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          >SUBMIT TIP</Link>
        </div>

        {/* Desktop auth */}
        <div style={{ alignItems: 'center', gap: '12px' }} className="nav-desktop">
          {isAuthenticated ? (
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  color: 'white',
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
              >
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <span style={{ fontSize: '0.9rem' }}>👤</span>
                )}
                {user.username}
                <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>▾</span>
              </button>

              {profileOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  background: 'rgba(15, 10, 20, 0.96)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  minWidth: '170px',
                  overflow: 'hidden',
                  zIndex: 300,
                }}>
                  <Link
                    to={`/profile/${user.username}`}
                    onClick={() => setProfileOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '12px 16px',
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.85)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="" style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : '👤'}
                    PROFILE
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      width: '100%',
                      padding: '12px 16px',
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      color: 'rgba(239,68,68,0.85)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    ⏻ LOGOUT
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 600,
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                padding: '7px 14px',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '7px',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
              >
                LOGIN
              </Link>
              <Link to="/register" style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: '0.85rem',
                color: 'white',
                textDecoration: 'none',
                padding: '7px 18px',
                background: 'rgba(239,68,68,0.85)',
                borderRadius: '7px',
                border: '1px solid rgba(239,68,68,0.5)',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.85)'}
              >
                REGISTER
              </Link>
            </>
          )}
        </div>

        {/* Mobile logo area only — navigation is in bottom nav */}
        <div className="nav-mobile-btn" style={{ alignItems: 'center', gap: '10px' }}>
          {isAuthenticated ? (
            <Link to={`/profile/${user.username}`} style={{ display: 'flex', alignItems: 'center' }}>
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.2)' }} />
              ) : (
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>👤</div>
              )}
            </Link>
          ) : (
            <Link to="/login" style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 600,
              fontSize: '0.8rem',
              color: 'white',
              textDecoration: 'none',
              padding: '6px 14px',
              background: 'rgba(239,68,68,0.8)',
              borderRadius: '6px',
            }}>LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
