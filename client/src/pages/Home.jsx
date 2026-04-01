import { useState, useEffect } from 'react';
import TipCard from '../components/TipCard';
import Pagination from '../components/Pagination';
import api from '../api/axios';

const CATEGORIES = ['Survival', 'Redstone', 'Building', 'Combat', 'Farming'];

export default function Home() {
  const [tips, setTips] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    fetchTips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat === selectedCategory ? '' : cat);
    setPage(1);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1);
  };

  const filterBtnStyle = (active) => ({
    fontFamily: "'VT323', monospace",
    fontSize: '1.1rem',
    padding: '6px 14px',
    cursor: 'pointer',
    border: `3px solid ${active ? '#FFD700' : '#4CAF50'}`,
    background: active ? '#FFD700' : 'transparent',
    color: active ? '#0d0d1a' : '#4CAF50',
    boxShadow: active ? '3px 3px 0px #b8960c' : '2px 2px 0px #2d7a2d',
    transition: 'transform 0.1s, box-shadow 0.1s',
  });

  const sortBtnStyle = (active) => ({
    fontFamily: "'VT323', monospace",
    fontSize: '1.1rem',
    padding: '6px 14px',
    cursor: 'pointer',
    border: `3px solid ${active ? '#4CAF50' : '#2a2a4a'}`,
    background: active ? '#4CAF50' : 'transparent',
    color: active ? '#0d0d1a' : '#888',
    boxShadow: active ? '3px 3px 0px #2d7a2d' : 'none',
    transition: 'transform 0.1s, box-shadow 0.1s',
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Hero section */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '48px',
          padding: '40px 20px',
          background: '#0d0d1a',
          border: '4px solid #4CAF50',
          boxShadow: '6px 6px 0px #2d7a2d',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative pixel corners */}
        <div style={{ position: 'absolute', top: '8px', left: '8px', width: '16px', height: '16px', background: '#4CAF50' }} />
        <div style={{ position: 'absolute', top: '8px', right: '8px', width: '16px', height: '16px', background: '#4CAF50' }} />
        <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '16px', height: '16px', background: '#4CAF50' }} />
        <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '16px', height: '16px', background: '#4CAF50' }} />

        <h1
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(1.1rem, 4vw, 2.2rem)',
            color: '#4CAF50',
            marginBottom: '16px',
            textShadow: '4px 4px 0px #2d7a2d, 8px 8px 0px rgba(0,0,0,0.3)',
            letterSpacing: '0.05em',
            lineHeight: '1.4',
          }}
        >
          CRAFTEDWISDOM
        </h1>
        <p
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1.5rem',
            color: '#FFD700',
            margin: '0 0 8px',
            textShadow: '2px 2px 0px #b8960c',
          }}
        >
          Your Ultimate Minecraft Survival Guide
        </p>
        <p
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1.1rem',
            color: '#666',
          }}
        >
          {total} tips &amp; counting | Share your knowledge, survive together
        </p>
      </div>

      {/* Filter bar */}
      <div
        style={{
          background: '#0d0d1a',
          border: '3px solid #2a2a4a',
          padding: '16px',
          marginBottom: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {/* Sort buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.5rem',
              color: '#888',
              marginRight: '4px',
            }}
          >
            SORT:
          </span>
          <button
            style={sortBtnStyle(sort === 'newest')}
            onClick={() => handleSortChange('newest')}
          >
            NEWEST
          </button>
          <button
            style={sortBtnStyle(sort === 'top')}
            onClick={() => handleSortChange('top')}
          >
            MOST VOTED
          </button>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.5rem',
              color: '#888',
              marginRight: '4px',
            }}
          >
            CATEGORY:
          </span>
          <button
            style={filterBtnStyle(selectedCategory === '')}
            onClick={() => handleCategoryChange('')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-1px, -1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
            }}
          >
            ALL
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              style={filterBtnStyle(selectedCategory === cat)}
              onClick={() => handleCategoryChange(cat)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-1px, -1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Tips grid */}
      {loading ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 0',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '1rem',
            color: '#4CAF50',
          }}
        >
          <div style={{ marginBottom: '16px', fontSize: '2rem' }}>⛏</div>
          [LOADING...]
        </div>
      ) : tips.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            border: '3px dashed #2a2a4a',
          }}
        >
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.8rem',
              color: '#666',
              marginBottom: '12px',
            }}
          >
            NO TIPS FOUND
          </div>
          <p style={{ fontFamily: "'VT323', monospace", fontSize: '1.3rem', color: '#444' }}>
            {selectedCategory
              ? `No tips in the ${selectedCategory} category yet. Be the first!`
              : 'No tips have been submitted yet.'}
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {tips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      )}

      {/* Pagination */}
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
  );
}
