import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      textAlign: 'center',
    }}>
      <div className="glass-card" style={{ maxWidth: '460px', width: '100%', padding: '48px 32px' }}>
        <div style={{ fontSize: '2.6rem', marginBottom: '16px', opacity: 0.7 }}>💀</div>

        <h1 style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(3.5rem, 10vw, 5rem)',
          color: '#ef4444',
          margin: '0 0 4px',
          lineHeight: 1,
          letterSpacing: '0.04em',
          opacity: 0.85,
        }}>
          404
        </h1>

        <h2 style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 700,
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '20px',
          letterSpacing: '0.14em',
        }}>
          CHUNK NOT FOUND
        </h2>

        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '6px',
          lineHeight: 1.5,
        }}>
          This page seems to have fallen into the void.
        </p>
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.05rem',
          color: 'rgba(255,255,255,0.22)',
          marginBottom: '32px',
        }}>
          Or maybe a Creeper exploded it.
        </p>

        <Link
          to="/"
          style={{
            display: 'inline-block',
            background: 'rgba(239,68,68,0.85)',
            color: 'white',
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 700,
            fontSize: '0.82rem',
            padding: '12px 28px',
            textDecoration: 'none',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: '8px',
            letterSpacing: '0.08em',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.85)'}
        >
          RETURN TO SPAWN
        </Link>

        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.15)',
          marginTop: '18px',
        }}>
          // chunk_error: coordinates_invalid
        </p>
      </div>
    </div>
  );
}
