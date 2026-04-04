import { useNavigate } from 'react-router-dom';

const WISDOM_COLORS = ['#ef4444', '#ec4899', '#a855f7', '#8b5cf6', '#84cc16', '#22c55e'];

const CATEGORIES = [
  {
    name: 'Redstone',
    color: '#ef4444',
    icon: '⚡',
    desc: 'Circuits & Contraptions',
    // Dark left, warm red glow on the right (redstone city)
    cardBg: `
      linear-gradient(to right,
        rgba(8,5,10,0.98) 0%,
        rgba(8,5,10,0.92) 35%,
        rgba(20,5,5,0.75) 60%,
        rgba(40,8,5,0.55) 80%,
        rgba(60,12,5,0.45) 100%
      )`,
    cardAccent: `radial-gradient(ellipse at 85% 50%, rgba(200,30,10,0.55) 0%, rgba(120,15,5,0.3) 40%, transparent 70%)`,
  },
  {
    name: 'Combat',
    color: '#8b5cf6',
    icon: '⚔',
    desc: 'PvP & PvE Tactics',
    cardBg: `
      linear-gradient(to right,
        rgba(8,5,10,0.98) 0%,
        rgba(8,5,10,0.92) 35%,
        rgba(5,10,20,0.75) 60%,
        rgba(5,15,30,0.55) 80%,
        rgba(5,20,40,0.45) 100%
      )`,
    cardAccent: `radial-gradient(ellipse at 85% 50%, rgba(0,200,200,0.35) 0%, rgba(0,100,130,0.2) 40%, transparent 70%)`,
  },
  {
    name: 'Building',
    color: '#22c55e',
    icon: '🏗',
    desc: 'Architecture & Design',
    cardBg: `
      linear-gradient(to right,
        rgba(8,5,10,0.98) 0%,
        rgba(8,5,10,0.92) 35%,
        rgba(5,15,10,0.75) 60%,
        rgba(5,25,12,0.55) 80%,
        rgba(5,35,15,0.45) 100%
      )`,
    cardAccent: `radial-gradient(ellipse at 85% 50%, rgba(20,160,60,0.38) 0%, rgba(10,90,30,0.22) 40%, transparent 70%)`,
  },
  {
    name: 'Farming',
    color: '#84cc16',
    icon: '🌾',
    desc: 'Automation & Resources',
    cardBg: `
      linear-gradient(to right,
        rgba(8,5,10,0.98) 0%,
        rgba(8,5,10,0.92) 35%,
        rgba(10,14,5,0.75) 60%,
        rgba(15,20,5,0.55) 80%,
        rgba(20,30,5,0.45) 100%
      )`,
    cardAccent: `radial-gradient(ellipse at 85% 50%, rgba(110,190,10,0.38) 0%, rgba(60,110,5,0.22) 40%, transparent 70%)`,
  },
  {
    name: 'Survival',
    color: '#f97316',
    icon: '🧭',
    desc: 'Exploration & Strategy',
    cardBg: `
      linear-gradient(to right,
        rgba(8,5,10,0.98) 0%,
        rgba(8,5,10,0.92) 35%,
        rgba(20,10,5,0.75) 60%,
        rgba(35,15,5,0.55) 80%,
        rgba(50,20,5,0.45) 100%
      )`,
    cardAccent: `radial-gradient(ellipse at 85% 50%, rgba(200,90,5,0.42) 0%, rgba(110,45,5,0.24) 40%, transparent 70%)`,
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>

      {/* ── Hero ─────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px 20px 80px',
        background: `
          linear-gradient(to bottom,
            rgba(5,3,8,0.45) 0%,
            rgba(5,3,8,0.55) 50%,
            rgba(5,3,8,0.85) 85%,
            rgba(5,3,8,1) 100%
          )`,
        backgroundImage: `
          linear-gradient(to bottom,
            rgba(5,3,8,0.45) 0%,
            rgba(5,3,8,0.55) 50%,
            rgba(5,3,8,0.85) 85%,
            rgba(5,3,8,1) 100%
          ),
          url('/hero-bg.png')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        overflow: 'hidden',
      }}>
        {/* Corner coordinates */}
        <span style={{
          position: 'absolute', top: '16px', left: '20px',
          fontFamily: "'VT323', monospace",
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.22)',
          letterSpacing: '0.06em',
        }}>K:-256 Y:128 Z:512</span>
        <span style={{
          position: 'absolute', top: '16px', right: '20px',
          fontFamily: "'VT323', monospace",
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.22)',
          letterSpacing: '0.06em',
        }}>X:256 Y:128 Z::512</span>

        {/* CRYSTAL LEGACY badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px',
        }}>
          <div style={{ width: '48px', height: '1px', background: 'rgba(239,68,68,0.6)' }} />
          <span style={{
            fontFamily: "'VT323', monospace",
            fontSize: '0.9rem',
            color: 'rgba(239,68,68,0.8)',
            letterSpacing: '0.35em',
          }}>CRYSTAL LEGACY</span>
          <div style={{ width: '48px', height: '1px', background: 'rgba(239,68,68,0.6)' }} />
        </div>

        {/* CRAFT */}
        <h1 style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(3rem, 11vw, 7rem)',
          color: 'white',
          margin: 0,
          lineHeight: 1,
          letterSpacing: '0.04em',
        }}>CRAFT</h1>

        {/* WISDOM — each letter different color */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          {'WISDOM'.split('').map((l, i) => (
            <span key={i} style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(3rem, 11vw, 7rem)',
              color: WISDOM_COLORS[i],
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}>{l}</span>
          ))}
        </div>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '400px',
          lineHeight: 1.6,
          margin: '0 0 16px',
        }}>
          The ultimate knowledge repository for Minecraft pros. Tips, tricks, and techniques across every dimension.
        </p>

        {/* Coordinates */}
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '0.82rem',
          color: 'rgba(255,255,255,0.22)',
          letterSpacing: '0.14em',
        }}>
          X:0 Y:128 Z:0 — OVERWORLD
        </p>

        {/* SELECT_CATEGORY label at bottom */}
        <p style={{
          position: 'absolute', bottom: '28px', left: '24px',
          fontFamily: "'VT323', monospace",
          fontSize: '0.82rem',
          color: 'rgba(255,255,255,0.28)',
          letterSpacing: '0.18em',
          margin: 0,
        }}>
          // SELECT_CATEGORY
        </p>
      </section>

      {/* ── Category section ─────────────────────────── */}
      <section style={{
        maxWidth: '820px',
        margin: '0 auto',
        padding: '32px 16px 0',
      }}>
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '0.82rem',
          color: 'rgba(255,255,255,0.28)',
          letterSpacing: '0.2em',
          marginBottom: '20px',
        }}>
          // SELECT_CATEGORY
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/tips/${cat.name}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '18px 22px',
                borderRadius: '12px',
                border: `1px solid rgba(255,255,255,0.09)`,
                background: cat.cardBg,
                backgroundBlendMode: 'normal',
                cursor: 'pointer',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.2s, transform 0.15s',
                width: '100%',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${cat.color}50`;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Accent glow overlay (right side) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: cat.cardAccent,
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: `${cat.color}22`,
                border: `1px solid ${cat.color}55`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
              }}>
                {cat.icon}
              </div>

              {/* Text */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'white',
                  letterSpacing: '0.07em',
                  marginBottom: '3px',
                }}>
                  {cat.name.toUpperCase()}
                </div>
                <div style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.38)',
                  letterSpacing: '0.03em',
                }}>
                  {cat.desc}
                </div>
              </div>

              {/* Arrow */}
              <div style={{
                marginLeft: 'auto',
                color: 'rgba(255,255,255,0.25)',
                fontSize: '1.1rem',
                position: 'relative',
                zIndex: 1,
                flexShrink: 0,
              }}>›</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
