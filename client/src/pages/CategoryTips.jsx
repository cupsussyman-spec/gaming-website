import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TipCard, { TIP_LEVEL_COLORS } from '../components/TipCard';
import Pagination from '../components/Pagination';
import api from '../api/axios';

const LEVELS = [
  { key: 'BEGINNER',       label: 'Beginner',       icon: '🌱' },
  { key: 'BASIC',          label: 'Basic',           icon: '📘' },
  { key: 'MOST IMPORTANT', label: 'Most Important',  icon: '⭐' },
  { key: 'PRO TIP',        label: 'Pro Tip',         icon: '🔥' },
];

const CATEGORY_CONFIG = {
  Redstone: {
    color: '#ef4444',
    icon: '⚡',
    desc: 'Circuits & Contraptions',
    blurb: 'Master the art of redstone engineering. From simple doors to complex computing machines.',
    bgImage: '/cat-redstone.webp',
    overlay: 'rgba(6,3,8,0.62)',
  },
  Combat: {
    color: '#8b5cf6',
    icon: '⚔',
    desc: 'PvP & PvE Tactics',
    blurb: 'Dominate every encounter. PvP strategies, mob tactics, and gear optimization.',
    bgImage: '/cat-combat.webp',
    overlay: 'rgba(4,2,12,0.60)',
  },
  Building: {
    color: '#22c55e',
    icon: '🏗',
    desc: 'Architecture & Design',
    blurb: 'Create stunning structures. Architecture tips, building techniques, and design inspiration.',
    bgImage: '/cat-building.webp',
    overlay: 'rgba(4,8,12,0.60)',
  },
  Farming: {
    color: '#84cc16',
    icon: '🌾',
    desc: 'Automation & Resources',
    blurb: 'Automate your resources. Efficient farms, crop mechanics, and mob grinding setups.',
    bgImage: '/cat-farming.webp',
    overlay: 'rgba(4,8,2,0.60)',
  },
  Survival: {
    color: '#f97316',
    icon: '🧭',
    desc: 'Exploration & Strategy',
    blurb: 'Explore and survive. Navigation, resource gathering, and base setup strategies.',
    bgImage: '/cat-survival.webp',
    overlay: 'rgba(10,4,2,0.60)',
  },
};

export default function CategoryTips() {
  const { category } = useParams();
  const cfg = CATEGORY_CONFIG[category];

  const [tips, setTips] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [category]);

  useEffect(() => {
    fetchTips();
  }, [page, sort, category]);

  const fetchTips = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tips', { params: { page, sort, category } });
      setTips(res.data.tips);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch tips:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!cfg) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 16px' }}>
        <p style={{ fontFamily: "'VT323', monospace", fontSize: '1.5rem', color: 'rgba(255,255,255,0.4)' }}>
          Category not found.{' '}
          <Link to="/" style={{ color: '#f97316' }}>Go home</Link>
        </p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* ── Full-page background ──────────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: `url('${cfg.bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        zIndex: 0,
        transform: 'scale(1.05)',
      }} />
      {/* Dim overlay — just enough to keep text readable */}
      <div style={{
        position: 'fixed', inset: 0,
        background: `linear-gradient(
          to bottom,
          rgba(4,2,10,0.35) 0%,
          rgba(4,2,10,0.55) 50%,
          rgba(4,2,10,0.72) 100%
        )`,
        zIndex: 1,
      }} />

      {/* ── Content above background ─────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

      {/* ── Hero header — clear, image shows through ─────── */}
      <div style={{
        padding: '48px 24px 40px',
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
        marginBottom: '0',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Back */}
          <Link to="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 600,
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
            letterSpacing: '0.06em',
            marginBottom: '24px',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            ← BACK
          </Link>

          {/* Category identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: `${cfg.color}20`,
              border: `1px solid ${cfg.color}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              flexShrink: 0,
            }}>
              {cfg.icon}
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 5vw, 2.8rem)',
                color: 'white',
                margin: 0,
                letterSpacing: '0.05em',
              }}>
                {category.toUpperCase()}
              </h1>
              <p style={{
                fontFamily: "'VT323', monospace",
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.45)',
                margin: 0,
              }}>
                {cfg.desc}
              </p>
            </div>
          </div>

          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '520px',
            lineHeight: 1.5,
            margin: 0,
          }}>
            {cfg.blurb}
          </p>
        </div>
      </div>

      {/* ── Tips section ────────────────────────────────── */}
      <div style={{
        background: 'rgba(4,2,10,0.45)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        borderTop: `1px solid rgba(255,255,255,0.07)`,
        paddingTop: '32px',
        paddingBottom: '80px',
        minHeight: '50vh',
      }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>

        {/* Level legend */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '8px',
          marginBottom: '20px', paddingTop: '4px',
        }}>
          {LEVELS.map(({ key, label, icon }) => {
            const s = TIP_LEVEL_COLORS[key];
            return (
              <span key={key} style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: '0.68rem',
                letterSpacing: '0.06em',
                color: s.text,
                background: s.bg,
                border: `1px solid ${s.border}`,
                padding: '4px 10px',
                borderRadius: '6px',
              }}>
                {icon} {label}
              </span>
            );
          })}
        </div>

        {/* Header row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px',
        }}>
          <span style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.1em',
          }}>
            {loading ? '...' : `${total} TIPS`}
          </span>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['newest', 'top'].map(s => (
              <button
                key={s}
                onClick={() => { setSort(s); setPage(1); }}
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: sort === s ? `1px solid ${cfg.color}50` : '1px solid rgba(255,255,255,0.08)',
                  background: sort === s ? `${cfg.color}15` : 'transparent',
                  color: sort === s ? cfg.color : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.2s',
                  letterSpacing: '0.05em',
                }}
              >
                {s === 'newest' ? 'NEWEST' : 'TOP VOTED'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.25)' }}>
            <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em' }}>
              LOADING...
            </div>
          </div>
        ) : tips.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '64px 20px',
            border: '1px dashed rgba(255,255,255,0.08)',
            borderRadius: '10px',
          }}>
            <p style={{ fontFamily: "'VT323', monospace", fontSize: '1.3rem', color: 'rgba(255,255,255,0.3)' }}>
              No tips in {category} yet. Be the first!
            </p>
            <Link to="/submit" style={{
              display: 'inline-block',
              marginTop: '14px',
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 700,
              fontSize: '0.8rem',
              color: cfg.color,
              textDecoration: 'none',
              padding: '8px 20px',
              border: `1px solid ${cfg.color}40`,
              borderRadius: '7px',
              background: `${cfg.color}10`,
              letterSpacing: '0.06em',
            }}>
              SUBMIT TIP →
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}>
            {tips.map((tip) => (
              <TipCard key={tip.id} tip={tip} />
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div style={{ marginTop: '32px' }}>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </div>
      </div>
      </div> {/* end content wrapper */}
    </div>
  );
}
