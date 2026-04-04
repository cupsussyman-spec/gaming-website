import { useState } from 'react';
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
  const [expanded, setExpanded] = useState('Redstone');

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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {CATEGORIES.map((cat) => {
            const isOpen = expanded === cat.name;
            return (
              <div
                key={cat.name}
                style={{
                  borderRadius: '12px',
                  border: isOpen ? `1px solid ${cat.color}45` : '1px solid rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s',
                  background: cat.cardBg,
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={() => setExpanded(isOpen ? '' : cat.name)}
              >
                {/* Accent glow — always present, more visible when open */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: cat.cardAccent,
                  opacity: isOpen ? 1 : 0.4,
                  transition: 'opacity 0.4s',
                  pointerEvents: 'none',
                }} />

                {/* Header row */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '16px 20px',
                  position: 'relative', zIndex: 1,
                }}>
                  {/* Icon */}
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
                    background: `${cat.color}22`, border: `1px solid ${cat.color}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem',
                    boxShadow: isOpen ? `0 0 12px ${cat.color}40` : 'none',
                    transition: 'box-shadow 0.3s',
                  }}>{cat.icon}</div>

                  {/* Title + subtitle */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "'Exo 2', sans-serif", fontWeight: 700,
                      fontSize: '1rem', letterSpacing: '0.07em',
                      color: isOpen ? 'white' : 'rgba(255,255,255,0.85)',
                    }}>{cat.name.toUpperCase()}</div>
                    <div style={{
                      fontFamily: "'VT323', monospace", fontSize: '1rem',
                      color: 'rgba(255,255,255,0.38)', letterSpacing: '0.02em',
                    }}>{cat.desc}</div>
                  </div>

                  {/* Arrow */}
                  <span style={{
                    color: isOpen ? cat.color : 'rgba(255,255,255,0.25)',
                    fontSize: '1.2rem', flexShrink: 0,
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s, color 0.3s',
                    display: 'inline-block',
                  }}>›</span>
                </div>

                {/* Expandable body */}
                <div style={{
                  maxHeight: isOpen ? '220px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}>
                  <div style={{
                    padding: '0 20px 20px 78px',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                    transition: 'opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s',
                    position: 'relative', zIndex: 1,
                  }}>
                    <p style={{
                      fontFamily: "'VT323', monospace", fontSize: '1.1rem',
                      color: 'rgba(255,255,255,0.62)', lineHeight: 1.55,
                      margin: '0 0 16px',
                    }}>{cat.blurb}</p>

                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/tips/${cat.name}`); }}
                      style={{
                        background: 'none', border: 'none', padding: 0,
                        cursor: 'pointer',
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontFamily: "'Exo 2', sans-serif", fontWeight: 700,
                        fontSize: '0.8rem', color: cat.color, letterSpacing: '0.08em',
                        borderBottom: `1px solid ${cat.color}`,
                        paddingBottom: '1px',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      EXPLORE TIPS →
                    </button>
                  </div>

                  {/* Colored bottom line */}
                  <div style={{
                    height: '2px',
                    background: `linear-gradient(to right, ${cat.color}80, ${cat.color}20, transparent)`,
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
