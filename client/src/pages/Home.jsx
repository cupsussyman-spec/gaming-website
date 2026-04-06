import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WISDOM_COLORS = ['#ef4444', '#f25c2a', '#f97316', '#fbbf24', '#f97316', '#ef4444'];

const CATEGORIES = [
  {
    name: 'Redstone',
    color: '#ef4444',
    icon: '⚡',
    desc: 'Circuits & Contraptions',
    blurb: 'Master the art of redstone engineering. From simple doors to complex computing machines.',
    bgImage: '/cat-redstone.webp',
    idleOverlay: 'rgba(6,3,8,0.45)',
    hoverOverlay: 'rgba(6,3,8,0.15)',
    colorTint: null,
    blur: 4,
  },
  {
    name: 'Combat',
    color: '#8b5cf6',
    icon: '⚔',
    desc: 'PvP & PvE Tactics',
    blurb: 'Dominate every encounter. PvP strategies, mob tactics, and gear optimization.',
    bgImage: '/cat-combat.webp',
    idleOverlay: 'rgba(4,2,12,0.45)',
    hoverOverlay: 'rgba(4,2,12,0.15)',
    colorTint: 'rgba(30,100,110,0.25)',
    blur: 8,
  },
  {
    name: 'Building',
    color: '#22c55e',
    icon: '🏗',
    desc: 'Architecture & Design',
    blurb: 'Transform blocks into breathtaking structures. From cottages to cathedrals.',
    bgImage: '/cat-building.webp',
    idleOverlay: 'rgba(4,8,12,0.45)',
    hoverOverlay: 'rgba(4,8,12,0.15)',
    colorTint: 'rgba(10,50,70,0.2)',
    blur: 8,
  },
  {
    name: 'Farming',
    color: '#84cc16',
    icon: '🌾',
    desc: 'Automation & Resources',
    blurb: 'Build efficient farms for every resource. Automate your way to abundance.',
    bgImage: '/cat-farming.webp',
    idleOverlay: 'rgba(4,8,2,0.45)',
    hoverOverlay: 'rgba(4,8,2,0.15)',
    colorTint: 'rgba(80,100,5,0.2)',
    blur: 8,
  },
  {
    name: 'Survival',
    color: '#f97316',
    icon: '🧭',
    desc: 'Exploration & Strategy',
    blurb: 'Survive and thrive in any biome. Essential knowledge for every adventurer.',
    bgImage: '/cat-survival.webp',
    idleOverlay: 'rgba(10,4,2,0.45)',
    hoverOverlay: 'rgba(10,4,2,0.15)',
    colorTint: 'rgba(100,30,5,0.2)',
    blur: 8,
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState('');

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px', position: 'relative' }}>

      {/* ── Enderman + Discord widget (top-left) ─────────── */}
      <div style={{
        position: 'fixed',
        top: '72px',
        left: '16px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
      }}>
        {/* Enderman GIF */}
        <img
          src="https://minecraft.wiki/images/Warden_sniffing.gif"
          alt="Warden"
          style={{
            width: '72px',
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.7))',
          }}
        />

        {/* Discord card */}
        <div style={{
          background: 'rgba(88, 28, 135, 0.18)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '10px',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 0 18px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
          width: '120px',
        }}>
          <span style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: '0.6rem',
            fontWeight: 700,
            color: 'rgba(196, 148, 255, 0.85)',
            letterSpacing: '0.08em',
            textAlign: 'center',
            lineHeight: 1.4,
          }}>Join for any questions</span>

          <a
            href="https://discord.gg/Kw75kgZ7yC"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(88, 28, 135, 0.5)',
              border: '1px solid rgba(139, 92, 246, 0.6)',
              borderRadius: '6px',
              padding: '5px 10px',
              color: 'white',
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 700,
              fontSize: '0.65rem',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'background 0.2s, box-shadow 0.2s',
              boxShadow: '0 0 10px rgba(139,92,246,0.3)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(88, 28, 135, 0.8)';
              e.currentTarget.style.boxShadow = '0 0 16px rgba(139,92,246,0.6)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(88, 28, 135, 0.5)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(139,92,246,0.3)';
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            Discord
          </a>
        </div>
      </div>
      {/* ── Full-page water background ───────────────────── */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: "url('/home-bg.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(6px) saturate(0.5)',
        transform: 'scale(1.05)',
        opacity: 0.5,
        zIndex: -2,
      }} />
      <div style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(to bottom, rgba(3,3,8,0.82) 0%, rgba(3,3,8,0.62) 50%, rgba(3,3,8,0.70) 100%)',
        zIndex: -1,
      }} />

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
          url('/hero-bg.webp')
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
              textShadow: `0 0 24px ${WISDOM_COLORS[i]}bb, 0 0 48px ${WISDOM_COLORS[i]}55`,
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

        {/* Gradient fade into category section */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, rgba(3,3,8,0.85))',
          pointerEvents: 'none',
        }} />
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
                  border: isOpen ? `1px solid ${cat.color}55` : '1px solid rgba(255,255,255,0.10)',
                  overflow: 'hidden',
                  transition: 'border-color 0.55s ease, box-shadow 0.55s ease, background 0.55s ease',
                  position: 'relative',
                  cursor: 'pointer',
                  background: isOpen
                    ? `rgba(255,255,255,0.10)`
                    : 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: isOpen
                    ? `0 8px 32px ${cat.color}25, inset 0 1px 0 rgba(255,255,255,0.18)`
                    : 'inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
                onClick={() => navigate(`/tips/${cat.name}`)}
                onMouseEnter={() => setExpanded(cat.name)}
                onMouseLeave={() => setExpanded('')}
              >
                {/* Background image — blurred, low opacity */}
                <div style={{
                  position: 'absolute',
                  inset: '-6px',
                  backgroundImage: `url('${cat.bgImage}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: isOpen ? 0.45 : 0.25,
                  filter: 'blur(3px)',
                  transition: 'opacity 0.55s ease',
                  pointerEvents: 'none',
                }} />

                {/* Glass overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: isOpen ? `rgba(4,2,10,0.30)` : 'rgba(4,2,10,0.45)',
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
