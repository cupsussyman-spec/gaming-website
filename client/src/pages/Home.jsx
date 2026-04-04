import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TipCard from '../components/TipCard';
import Pagination from '../components/Pagination';
import api from '../api/axios';

const CATEGORY_CONFIG = {
  Redstone: { color: '#ef4444', icon: '⚡', desc: 'Circuits & Contraptions' },
  Combat:   { color: '#8b5cf6', icon: '⚔',  desc: 'PvP & PvE Tactics' },
  Building: { color: '#22c55e', icon: '🏗',  desc: 'Architecture & Design' },
  Farming:  { color: '#84cc16', icon: '🌾', desc: 'Automation & Resources' },
  Survival: { color: '#f97316', icon: '🧭', desc: 'Exploration & Strategy' },
};

const WISDOM_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tips, setTips] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('newest');

  const selectedCategory = searchParams.get('cat') || '';

  const setCategory = (cat) => {
    setPage(1);
    if (cat) setSearchParams({ cat });
    else setSearchParams({});
  };

  useEffect(() => {
    fetchTips();
  }, [page, selectedCategory, sort]);

  const fetchTips = async () => {
    setLoading(true);
    try {
      const params = { page, sort };
      if (selectedCategory) params.category = selectedCategory;
      const res = await api.get('/tips', { params });
      setTips(res.data.tips);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch tips:', err);
    } finally {
      setLoading(false);
    }
  };

  const catConfig = selectedCategory ? CATEGORY_CONFIG[selectedCategory] : null;

  return (
    <div style={{ paddingBottom: '80px' }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        minHeight: '72vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px 60px',
        position: 'relative',
      }}>
        {/* CRYSTAL LEGACY badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}>
          <div style={{ width: '44px', height: '1px', background: 'rgba(239,68,68,0.6)' }} />
          <span style={{
            fontFamily: "'VT323', monospace",
            fontSize: '0.95rem',
            color: 'rgba(239,68,68,0.8)',
            letterSpacing: '0.35em',
          }}>CRYSTAL LEGACY</span>
          <div style={{ width: '44px', height: '1px', background: 'rgba(239,68,68,0.6)' }} />
        </div>

        {/* CRAFT */}
        <h1 style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2.8rem, 10vw, 6.5rem)',
          color: 'white',
          margin: 0,
          lineHeight: 1,
          letterSpacing: '0.04em',
        }}>
          CRAFT
        </h1>

        {/* WISDOM – each letter a different color */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '28px',
          lineHeight: 1,
        }}>
          {'WISDOM'.split('').map((letter, i) => (
            <span key={i} style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.8rem, 10vw, 6.5rem)',
              color: WISDOM_COLORS[i],
              letterSpacing: '0.04em',
            }}>
              {letter}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '380px',
          lineHeight: 1.55,
          margin: '0 0 16px',
        }}>
          The ultimate knowledge repository for Minecraft pros. Tips, tricks, and techniques across every dimension.
        </p>

        {/* Stats */}
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.28)',
          letterSpacing: '0.12em',
        }}>
          {total > 0 ? `${total} TIPS  ·  5 CATEGORIES` : '5 CATEGORIES'}
        </p>
      </section>

      {/* ── Category selector ────────────────────────────────── */}
      <section style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '0 16px',
      }}>
        {/* Section label */}
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.18em',
          marginBottom: '14px',
        }}>
          // SELECT_CATEGORY
        </p>

        {/* Category cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
          {Object.entries(CATEGORY_CONFIG).map(([name, cfg]) => {
            const active = selectedCategory === name;
            return (
              <button
                key={name}
                onClick={() => setCategory(active ? '' : name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '14px 20px',
                  background: active
                    ? `rgba(${hexToRgb(cfg.color)}, 0.12)`
                    : 'rgba(255,255,255,0.04)',
                  border: active
                    ? `1px solid rgba(${hexToRgb(cfg.color)}, 0.35)`
                    : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  }
                }}
              >
                {/* Icon badge */}
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: `rgba(${hexToRgb(cfg.color)}, 0.18)`,
                  border: `1px solid rgba(${hexToRgb(cfg.color)}, 0.3)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}>
                  {cfg.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: active ? cfg.color : 'white',
                    letterSpacing: '0.05em',
                  }}>
                    {name.toUpperCase()}
                  </div>
                  <div style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.45)',
                    marginTop: '1px',
                  }}>
                    {cfg.desc}
                  </div>
                </div>

                {/* Active arrow */}
                {active && (
                  <span style={{ color: cfg.color, fontSize: '1.1rem', opacity: 0.8 }}>›</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Tips section ─────────────────────────────────────── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>
        {/* Header row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {catConfig && (
              <div style={{
                width: '10px', height: '10px',
                borderRadius: '50%',
                background: catConfig.color,
                boxShadow: `0 0 8px ${catConfig.color}`,
              }} />
            )}
            <span style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 700,
              fontSize: '0.9rem',
              color: catConfig ? catConfig.color : 'rgba(255,255,255,0.6)',
              letterSpacing: '0.06em',
            }}>
              {selectedCategory ? `${selectedCategory.toUpperCase()} TIPS` : 'ALL TIPS'}
            </span>
            {!loading && (
              <span style={{
                fontFamily: "'VT323', monospace",
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.25)',
              }}>
                ({total})
              </span>
            )}
          </div>

          {/* Sort */}
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
                  border: sort === s ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.08)',
                  background: sort === s ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: sort === s ? 'white' : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.2s',
                  letterSpacing: '0.05em',
                }}
              >
                {s === 'newest' ? 'NEWEST' : 'TOP VOTED'}
              </button>
            ))}
          </div>
        </div>

        {/* Tips */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>
            <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em' }}>
              LOADING...
            </div>
          </div>
        ) : tips.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '64px 20px',
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: '10px',
          }}>
            <p style={{ fontFamily: "'VT323', monospace", fontSize: '1.3rem', color: 'rgba(255,255,255,0.3)' }}>
              {selectedCategory
                ? `No tips in ${selectedCategory} yet. Be the first!`
                : 'No tips submitted yet.'}
            </p>
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
      </section>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
