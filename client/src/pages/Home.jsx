import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WISDOM_COLORS = ['#ef4444', '#ec4899', '#a855f7', '#8b5cf6', '#84cc16', '#22c55e'];

const CATEGORIES = [
  {
    name: 'Redstone',
    color: '#ef4444',
    icon: '⚡',
    desc: 'Circuits & Contraptions',
    blurb: 'Master the art of redstone engineering. From simple doors to complex computing machines.',
    bgImage: '/cat-redstone.png',
    // overlay: dark idle → lighter on hover (handled inline)
    idleOverlay: 'rgba(6,3,8,0.88)',
    hoverOverlay: 'rgba(6,3,8,0.55)',
  },
  {
    name: 'Combat',
    color: '#8b5cf6',
    icon: '⚔',
    desc: 'PvP & PvE Tactics',
    blurb: 'Dominate every encounter. PvP strategies, mob tactics, and gear optimization.',
    bgImage: '/cat-combat.png',
    idleOverlay: 'rgba(4,3,10,0.88)',
    hoverOverlay: 'rgba(4,3,10,0.52)',
    fallbackBg: `
      radial-gradient(ellipse 25% 35% at 78% 40%, rgba(120,60,255,0.55) 0%, transparent 70%),
      radial-gradient(ellipse 15% 20% at 88% 65%, rgba(100,40,220,0.45) 0%, transparent 60%),
      radial-gradient(ellipse 20% 25% at 65% 55%, rgba(80,30,180,0.3) 0%, transparent 65%),
      radial-gradient(ellipse 30% 40% at 92% 30%, rgba(60,20,140,0.35) 0%, transparent 70%),
      radial-gradient(ellipse 10% 15% at 72% 75%, rgba(140,70,255,0.4) 0%, transparent 55%),
      linear-gradient(to right, #04030a 0%, #06040e 40%, #080512 70%, #060310 100%)
    `,
  },
  {
    name: 'Building',
    color: '#22c55e',
    icon: '🏗',
    desc: 'Architecture & Design',
    blurb: 'Transform blocks into breathtaking structures. From cottages to cathedrals.',
    bgImage: '/cat-building.png',
    idleOverlay: 'rgba(3,6,8,0.88)',
    hoverOverlay: 'rgba(3,6,8,0.52)',
    fallbackBg: `
      radial-gradient(ellipse 25% 35% at 80% 45%, rgba(20,180,60,0.5) 0%, transparent 70%),
      radial-gradient(ellipse 15% 20% at 90% 65%, rgba(15,150,45,0.4) 0%, transparent 60%),
      radial-gradient(ellipse 20% 25% at 68% 60%, rgba(10,120,35,0.3) 0%, transparent 65%),
      radial-gradient(ellipse 30% 40% at 93% 28%, rgba(8,100,25,0.35) 0%, transparent 70%),
      radial-gradient(ellipse 10% 15% at 75% 78%, rgba(25,200,70,0.38) 0%, transparent 55%),
      linear-gradient(to right, #030804 0%, #040a05 40%, #050e06 70%, #040c05 100%)
    `,
  },
  {
    name: 'Farming',
    color: '#84cc16',
    icon: '🌾',
    desc: 'Automation & Resources',
    blurb: 'Build efficient farms for every resource. Automate your way to abundance.',
    bgImage: '/cat-farming.png',
    idleOverlay: 'rgba(4,6,3,0.88)',
    hoverOverlay: 'rgba(4,6,3,0.52)',
    fallbackBg: `
      radial-gradient(ellipse 25% 35% at 79% 42%, rgba(120,200,10,0.5) 0%, transparent 70%),
      radial-gradient(ellipse 15% 20% at 89% 68%, rgba(100,170,8,0.42) 0%, transparent 60%),
      radial-gradient(ellipse 20% 25% at 67% 58%, rgba(80,140,6,0.3) 0%, transparent 65%),
      radial-gradient(ellipse 30% 40% at 94% 25%, rgba(60,110,5,0.35) 0%, transparent 70%),
      radial-gradient(ellipse 10% 15% at 73% 80%, rgba(140,220,12,0.38) 0%, transparent 55%),
      linear-gradient(to right, #050703 0%, #070a04 40%, #090d05 70%, #070b04 100%)
    `,
  },
  {
    name: 'Survival',
    color: '#f97316',
    icon: '🧭',
    desc: 'Exploration & Strategy',
    blurb: 'Survive and thrive in any biome. Essential knowledge for every adventurer.',
    bgImage: '/cat-survival.png',
    idleOverlay: 'rgba(6,3,3,0.88)',
    hoverOverlay: 'rgba(6,3,3,0.52)',
    fallbackBg: `
      radial-gradient(ellipse 25% 35% at 80% 43%, rgba(240,100,10,0.52) 0%, transparent 70%),
      radial-gradient(ellipse 15% 20% at 90% 66%, rgba(200,80,8,0.43) 0%, transparent 60%),
      radial-gradient(ellipse 20% 25% at 67% 57%, rgba(160,65,6,0.32) 0%, transparent 65%),
      radial-gradient(ellipse 30% 40% at 93% 27%, rgba(130,50,5,0.36) 0%, transparent 70%),
      radial-gradient(ellipse 10% 15% at 74% 79%, rgba(255,120,15,0.4) 0%, transparent 55%),
      linear-gradient(to right, #080402 0%, #0a0503 40%, #0d0604 70%, #0b0503 100%)
    `,
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState('');

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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {CATEGORIES.map((cat) => {
            const isOpen = expanded === cat.name;
            return (
              <div
                key={cat.name}
                style={{
                  borderRadius: '12px',
                  border: isOpen ? `1px solid ${cat.color}50` : '1px solid rgba(255,255,255,0.07)',
                  overflow: 'hidden',
                  transition: 'border-color 0.55s ease',
                  position: 'relative',
                  cursor: 'pointer',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                onMouseEnter={() => setExpanded(cat.name)}
                onMouseLeave={() => setExpanded('')}
              >
                {/* Background image */}
                <div style={{
                  position: 'absolute',
                  inset: '-6px',
                  backgroundImage: cat.bgImage
                    ? `url('${cat.bgImage}')`
                    : cat.fallbackBg,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: isOpen ? 0.65 : 0.35,
                  filter: 'blur(5px)',
                  transition: 'opacity 0.55s ease',
                  pointerEvents: 'none',
                }} />

                {/* Glass overlay — lighter on hover */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: isOpen
                    ? 'rgba(10,8,16,0.35)'
                    : 'rgba(10,8,16,0.62)',
                  transition: 'background 0.55s ease',
                  pointerEvents: 'none',
                }} />

                {/* Left color bar */}
                <div style={{
                  position: 'absolute', left: 0, top: '12px', bottom: '12px',
                  width: '3px', borderRadius: '0 3px 3px 0',
                  background: cat.color,
                  opacity: isOpen ? 0.9 : 0.25,
                  transition: 'opacity 0.55s ease',
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
                  transition: 'max-height 0.55s cubic-bezier(0.25,0.1,0.25,1)',
                }}>
                  <div style={{
                    padding: '0 20px 20px 78px',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                    transition: 'opacity 0.45s ease 0.15s, transform 0.45s ease 0.15s',
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
