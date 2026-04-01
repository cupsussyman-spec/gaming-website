import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const navLinkStyle = {
    fontFamily: "'VT323', monospace",
    fontSize: '1.3rem',
    color: 'white',
    textDecoration: 'none',
    padding: '4px 8px',
    position: 'relative',
    transition: 'color 0.1s',
  };

  return (
    <nav
      style={{
        background: '#0d0d1a',
        borderBottom: '4px solid #4CAF50',
        boxShadow: '0 4px 0px #2d7a2d',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '60px',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.7rem',
            color: '#4CAF50',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#FFD700'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#4CAF50'; }}
        >
          ⛏ CRAFTEDWISDOM
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="hidden md:flex">
          <Link
            to="/"
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#4CAF50';
              e.currentTarget.style.borderBottom = '2px solid #4CAF50';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderBottom = 'none';
            }}
          >
            HOME
          </Link>
          <Link
            to="/submit"
            style={navLinkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#4CAF50';
              e.currentTarget.style.borderBottom = '2px solid #4CAF50';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderBottom = 'none';
            }}
          >
            SUBMIT TIP
          </Link>
        </div>

        {/* Auth buttons - desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="hidden md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to={`/profile/${user.username}`}
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: '1.2rem',
                  color: '#FFD700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  border: '2px solid #b8960c',
                  padding: '4px 10px',
                  boxShadow: '2px 2px 0px #b8960c',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-1px, -1px)';
                  e.currentTarget.style.boxShadow = '3px 3px 0px #b8960c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '2px 2px 0px #b8960c';
                }}
              >
                👤 {user.username}
              </Link>
              <button
                onClick={handleLogout}
                className="pixel-btn"
                style={{
                  background: 'transparent',
                  color: '#4CAF50',
                  fontFamily: "'VT323', monospace",
                  fontSize: '1.2rem',
                  padding: '4px 12px',
                }}
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="pixel-btn"
                style={{
                  color: '#4CAF50',
                  fontFamily: "'VT323', monospace",
                  fontSize: '1.2rem',
                  padding: '4px 12px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                style={{
                  background: '#4CAF50',
                  color: '#0d0d1a',
                  fontFamily: "'VT323', monospace",
                  fontSize: '1.2rem',
                  padding: '4px 12px',
                  textDecoration: 'none',
                  border: '3px solid #2d7a2d',
                  boxShadow: '3px 3px 0px #2d7a2d',
                  display: 'inline-block',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '5px 5px 0px #2d7a2d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '3px 3px 0px #2d7a2d';
                }}
              >
                REGISTER
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: 'none',
            border: '2px solid #4CAF50',
            color: '#4CAF50',
            padding: '6px 10px',
            cursor: 'pointer',
            fontFamily: "'VT323', monospace",
            fontSize: '1.4rem',
            boxShadow: '2px 2px 0px #2d7a2d',
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? 'X' : '≡'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: '#0d0d1a',
            borderTop: '2px solid #2d7a2d',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
          className="md:hidden"
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            style={{ ...navLinkStyle, fontSize: '1.4rem' }}
          >
            HOME
          </Link>
          <Link
            to="/submit"
            onClick={() => setMenuOpen(false)}
            style={{ ...navLinkStyle, fontSize: '1.4rem' }}
          >
            SUBMIT TIP
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to={`/profile/${user.username}`}
                onClick={() => setMenuOpen(false)}
                style={{ ...navLinkStyle, fontSize: '1.4rem', color: '#FFD700' }}
              >
                👤 {user.username}
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: '2px solid #4CAF50',
                  color: '#4CAF50',
                  fontFamily: "'VT323', monospace",
                  fontSize: '1.4rem',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: '2px 2px 0px #2d7a2d',
                }}
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                style={{ ...navLinkStyle, fontSize: '1.4rem', color: '#4CAF50' }}
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                style={{ ...navLinkStyle, fontSize: '1.4rem', color: '#4CAF50' }}
              >
                REGISTER
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
