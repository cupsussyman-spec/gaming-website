import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TipCard from '../components/TipCard';
import Pagination from '../components/Pagination';
import api from '../api/axios';

const CATEGORY_CONFIG = {
  Redstone: {
    color: '#ef4444',
    icon: '⚡',
    desc: 'Circuits & Contraptions',
    blurb: 'Master the art of redstone engineering. From simple doors to complex computing machines.',
    bg: 'radial-gradient(ellipse at 70% 50%, rgba(180,30,10,0.35) 0%, rgba(80,10,5,0.2) 55%, transparent 80%)',
  },
  Combat: {
    color: '#8b5cf6',
    icon: '⚔',
    desc: 'PvP & PvE Tactics',
    blurb: 'Dominate every encounter. PvP strategies, mob tactics, and gear optimization.',
    bg: 'radial-gradient(ellipse at 60% 40%, rgba(0,180,180,0.2) 0%, rgba(0,80,100,0.15) 55%, transparent 80%)',
  },
  Building: {
    color: '#22c55e',
    icon: '🏗',
    desc: 'Architecture & Design',
    blurb: 'Create stunning structures. Architecture tips, building techniques, and design inspiration.',
    bg: 'radial-gradient(ellipse at 50% 50%, rgba(20,150,50,0.2) 0%, rgba(10,80,30,0.15) 55%, transparent 80%)',
  },
  Farming: {
    color: '#84cc16',
    icon: '🌾',
    desc: 'Automation & Resources',
    blurb: 'Automate your resources. Efficient farms, crop mechanics, and mob grinding setups.',
    bg: 'radial-gradient(ellipse at 40% 60%, rgba(100,180,0,0.2) 0%, rgba(50,90,0,0.15) 55%, transparent 80%)',
  },
  Survival: {
    color: '#f97316',
    icon: '🧭',
    desc: 'Exploration & Strategy',
    blurb: 'Explore and survive. Navigation, resource gathering, and base setup strategies.',
    bg: 'radial-gradient(ellipse at 60% 40%, rgba(200,100,0,0.22) 0%, rgba(100,50,0,0.15) 55%, transparent 80%)',
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
    <div style={{ paddingBottom: '80px' }}>
      {/* ── Hero header ──────────────────────────────────── */}
      <div style={{
        padding: '48px 24px 40px',
        background: cfg.bg,
        borderBottom: `1px solid ${cfg.color}25`,
        marginBottom: '32px',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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

      {/* ── Tips ─────────────────────────────────────────── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>
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
  );
}
