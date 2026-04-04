import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORY_CONFIG = [
  {
    name: 'Redstone',
    color: '#ef4444',
    icon: '⚡',
    desc: 'Circuits & Contraptions',
    blurb: 'Master the art of redstone engineering. From simple doors to complex computing machines.',
    bg: 'radial-gradient(ellipse at 75% 50%, rgba(180,30,10,0.45) 0%, rgba(80,10,5,0.25) 50%, transparent 75%)',
  },
  {
    name: 'Combat',
    color: '#8b5cf6',
    icon: '⚔',
    desc: 'PvP & PvE Tactics',
    blurb: 'Dominate every encounter. PvP strategies, mob tactics, and gear optimization.',
    bg: 'radial-gradient(ellipse at 65% 45%, rgba(0,200,200,0.2) 0%, rgba(0,80,100,0.15) 55%, transparent 80%)',
  },
  {
    name: 'Building',
    color: '#22c55e',
    icon: '🏗',
    desc: 'Architecture & Design',
    blurb: 'Create stunning structures. Architecture tips, building techniques, and design inspiration.',
    bg: 'radial-gradient(ellipse at 55% 50%, rgba(20,160,55,0.22) 0%, rgba(10,80,30,0.15) 55%, transparent 80%)',
  },
  {
    name: 'Farming',
    color: '#84cc16',
    icon: '🌾',
    desc: 'Automation & Resources',
    blurb: 'Automate your resources. Efficient farms, crop mechanics, and mob grinding setups.',
    bg: 'radial-gradient(ellipse at 45% 55%, rgba(100,190,0,0.22) 0%, rgba(50,90,0,0.15) 55%, transparent 80%)',
  },
  {
    name: 'Survival',
    color: '#f97316',
    icon: '🧭',
    desc: 'Exploration & Strategy',
    blurb: 'Explore and survive. Navigation, resource gathering, and base setup strategies.',
    bg: 'radial-gradient(ellipse at 65% 45%, rgba(200,100,0,0.25) 0%, rgba(100,50,0,0.15) 55%, transparent 80%)',
  },
];

const WISDOM_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];

export default function Home() {
  const [expanded, setExpanded] = useState('Redstone');
  const navigate = useNavigate();

  return (
    <div style={{ paddingBottom: '80px' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{
        minHeight: '68vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px 50px',
      }}>
        {/* Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px',
        }}>
          <div style={{ width: '44px', height: '1px', background: 'rgba(239,68,68,0.55)' }} />
          <span style={{
            fontFamily: "'VT323', monospace",
            fontSize: '0.95rem',
            color: 'rgba(239,68,68,0.75)',
            letterSpacing: '0.35em',
          }}>CRYSTAL LEGACY</span>
          <div style={{ width: '44px', height: '1px', background: 'rgba(239,68,68,0.55)' }} />
        </div>

        <h1 style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2.8rem, 10vw, 6.5rem)',
          color: 'white',
          margin: 0,
          lineHeight: 1,
          letterSpacing: '0.04em',
        }}>CRAFT</h1>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px', lineHeight: 1 }}>
          {'WISDOM'.split('').map((l, i) => (
            <span key={i} style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.8rem, 10vw, 6.5rem)',
              color: WISDOM_COLORS[i],
              letterSpacing: '0.04em',
            }}>{l}</span>
          ))}
        </div>

        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '380px',
          lineHeight: 1.55,
          margin: '0 0 14px',
        }}>
          The ultimate knowledge repository for Minecraft pros. Tips, tricks, and techniques across every dimension.
        </p>

        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.22)',
          letterSpacing: '0.14em',
        }}>
          X:0 Y:128 Z:0 — OVERWORLD
        </p>
      </section>

      {/* ── Category cards ───────────────────────────────── */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 16px' }}>
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.28)',
          letterSpacing: '0.18em',
          marginBottom: '18px',
        }}>
          // SELECT_CATEGORY
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {CATEGORY_CONFIG.map((cat) => {
            const isOpen = expanded === cat.name;
            return (
              <div
                key={cat.name}
                onClick={() => setExpanded(isOpen ? '' : cat.name)}
                style={{
                  borderRadius: '12px',
                  border: isOpen
                    ? `1px solid ${cat.color}40`
                    : '1px solid rgba(255,255,255,0.08)',
                  background: isOpen
                    ? `rgba(10,8,14,0.9)`
                    : 'rgba(255,255,255,0.04)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.25s, background 0.25s',
                  backgroundImage: isOpen ? cat.bg : 'none',
                  backgroundSize: 'cover',
                }}
              >
                {/* Card header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px 20px',
                }}>
                  {/* Icon */}
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: `${cat.color}22`,
                    border: `1px solid ${cat.color}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}>
                    {cat.icon}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: isOpen ? cat.color : 'white',
                      letterSpacing: '0.06em',
                      transition: 'color 0.2s',
                    }}>
                      {cat.name.toUpperCase()}
                    </div>
                    <div style={{
                      fontFamily: "'VT323', monospace",
                      fontSize: '1rem',
                      color: 'rgba(255,255,255,0.4)',
                      marginTop: '1px',
                    }}>
                      {cat.desc}
                    </div>
                  </div>

                  {/* Arrow */}
                  <span style={{
                    color: isOpen ? cat.color : 'rgba(255,255,255,0.3)',
                    fontSize: '1.2rem',
                    transition: 'transform 0.25s, color 0.2s',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                  }}>›</span>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{
                    padding: '0 20px 20px 76px',
                    borderTop: `1px solid ${cat.color}20`,
                    paddingTop: '14px',
                  }}>
                    <p style={{
                      fontFamily: "'VT323', monospace",
                      fontSize: '1.1rem',
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.55,
                      margin: '0 0 16px',
                    }}>
                      {cat.blurb}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/tips/${cat.name}`);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: "'Exo 2', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        color: cat.color,
                        letterSpacing: '0.08em',
                        borderBottom: `1px solid ${cat.color}`,
                        paddingBottom: '1px',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      EXPLORE TIPS →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
