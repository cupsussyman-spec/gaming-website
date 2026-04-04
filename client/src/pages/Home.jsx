import { useNavigate } from 'react-router-dom';

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

      {/* ── Category section ─────────────────────────── */}
      <section style={{
        maxWidth: '820px',
        margin: '0 auto',
        padding: '40px 16px 0',
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
