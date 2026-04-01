import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 68px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          background: '#0d0d1a',
          border: '4px solid #ef4444',
          boxShadow: '8px 8px 0px #991b1b',
          padding: '40px 32px',
        }}
      >
        {/* Pixel art creeper face */}
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '3rem',
            marginBottom: '8px',
            lineHeight: 1,
          }}
        >
          💀
        </div>

        <h1
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(1rem, 4vw, 1.8rem)',
            color: '#ef4444',
            marginBottom: '16px',
            textShadow: '4px 4px 0px #991b1b',
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(0.5rem, 2vw, 0.75rem)',
            color: '#FFD700',
            marginBottom: '24px',
            textShadow: '2px 2px 0px #b8960c',
            lineHeight: '1.8',
          }}
        >
          CHUNK NOT FOUND
        </h2>

        <p
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1.4rem',
            color: '#888',
            marginBottom: '8px',
          }}
        >
          This page seems to have fallen into the void.
        </p>

        <p
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1.2rem',
            color: '#555',
            marginBottom: '32px',
          }}
        >
          Or maybe a Creeper exploded it. Either way, it's gone.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              background: '#4CAF50',
              color: '#0d0d1a',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.65rem',
              padding: '14px 28px',
              textDecoration: 'none',
              border: '3px solid #2d7a2d',
              boxShadow: '4px 4px 0px #2d7a2d',
              display: 'inline-block',
              transition: 'transform 0.1s, box-shadow 0.1s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '6px 6px 0px #2d7a2d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '4px 4px 0px #2d7a2d';
            }}
          >
            RETURN TO SPAWN
          </Link>

          <p
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: '1rem',
              color: '#444',
              marginTop: '8px',
            }}
          >
            [Press F3 to debug... just kidding, click the button]
          </p>
        </div>
      </div>
    </div>
  );
}
