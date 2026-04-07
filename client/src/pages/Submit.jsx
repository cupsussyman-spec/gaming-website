import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import AlertBox from '../components/AlertBox';
import TipCard from '../components/TipCard';

const CATEGORIES = ['Survival', 'Redstone', 'Building', 'Combat', 'Farming'];

const CATEGORY_COLORS = {
  Survival: '#f97316',
  Redstone: '#ef4444',
  Building: '#22c55e',
  Combat: '#8b5cf6',
  Farming: '#84cc16',
};

const labelStyle = {
  fontFamily: "'Exo 2', sans-serif",
  fontWeight: 700,
  fontSize: '0.72rem',
  color: 'rgba(180,200,255,0.7)',
  display: 'block',
  marginBottom: '8px',
  letterSpacing: '0.12em',
};

const glassInput = {
  width: '100%',
  padding: '12px 14px',
  background: 'rgba(10,15,30,0.55)',
  border: '1px solid rgba(100,150,255,0.2)',
  borderRadius: '10px',
  color: 'white',
  fontSize: '0.88rem',
  fontFamily: "'Exo 2', sans-serif",
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

export default function Submit() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) { setError('Title is required.'); return; }
    if (!category) { setError('Please select a category.'); return; }
    if (content.trim().length < 50) {
      setError(`Content must be at least 50 characters (currently ${content.trim().length}).`);
      return;
    }
    setLoading(true);
    try {
      await api.post('/tips', {
        title: title.trim(),
        category,
        content: content.trim(),
        youtube_url: youtubeUrl.trim() || null,
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit tip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const previewTip = {
    id: 0,
    title: title || 'Your Tip Title',
    category: category || 'Survival',
    content: content || 'Your tip content will appear here...',
    youtube_url: youtubeUrl || null,
    up_votes: 0,
    down_votes: 0,
    username: user?.username || 'You',
    created_at: new Date().toISOString(),
  };

  const accentColor = CATEGORY_COLORS[category] || '#ef4444';

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      backgroundImage: "url('/submit-bg.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 16px 100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '0.85rem',
          color: 'rgba(150,180,255,0.4)',
          letterSpacing: '0.18em',
          marginBottom: '8px',
        }}>// SUBMIT_TIP</p>
        <h1 style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
          color: 'white',
          margin: 0,
          letterSpacing: '0.04em',
          textShadow: '0 2px 20px rgba(80,120,255,0.4)',
        }}>
          Share Your Knowledge
        </h1>
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.1rem',
          color: 'rgba(150,180,255,0.5)',
          marginTop: '6px',
        }}>
          Help the community master Minecraft
        </p>
      </div>

      {/* Form card */}
      <div style={{
        background: 'rgba(5,10,25,0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(100,150,255,0.18)',
        borderRadius: '18px',
        padding: '32px 28px',
        boxShadow: '0 8px 40px rgba(0,0,10,0.5)',
      }}>
        {error && (
          <div style={{ marginBottom: '20px' }}>
            <AlertBox message={error} type="error" />
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Title */}
          <div>
            <label htmlFor="title" style={labelStyle}>TIP TITLE</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Never Dig Straight Down!"
              disabled={loading}
              maxLength={100}
              style={glassInput}
            />
            <div style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '0.7rem', color: 'rgba(150,180,255,0.4)', marginTop: '5px' }}>
              {title.length}/100
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" style={labelStyle}>CATEGORY</label>
            <div style={{ position: 'relative' }}>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loading}
                style={{ ...glassInput, appearance: 'none', cursor: 'pointer' }}
              >
                <option value="">— Select category —</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.3)',
                pointerEvents: 'none',
                fontSize: '0.7rem',
              }}>▾</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" style={labelStyle}>TIP CONTENT</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your tip in detail. Share the what, why, and how..."
              disabled={loading}
              rows={7}
              style={{ ...glassInput, resize: 'vertical', lineHeight: 1.6 }}
            />
            <div style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '0.7rem', marginTop: '5px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: content.trim().length < 50 ? 'rgba(239,68,68,0.8)' : 'rgba(74,222,128,0.8)' }}>
                {content.trim().length < 50 ? `${50 - content.trim().length} more characters needed` : 'Minimum length reached ✓'}
              </span>
              <span style={{ color: 'rgba(150,180,255,0.4)' }}>{content.length} chars</span>
            </div>
          </div>

          {/* YouTube URL */}
          <div>
            <label htmlFor="youtube" style={labelStyle}>
              YOUTUBE URL
              <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400, marginLeft: '6px' }}>optional</span>
            </label>
            <input
              id="youtube"
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={loading}
              style={glassInput}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '4px' }}>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              style={{
                background: 'rgba(251,191,36,0.12)',
                border: '1px solid rgba(251,191,36,0.35)',
                borderRadius: '10px',
                color: '#fbbf24',
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: '0.78rem',
                padding: '11px 22px',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(251,191,36,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(251,191,36,0.12)'}
            >
              {showPreview ? 'HIDE PREVIEW' : 'PREVIEW'}
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                background: loading ? 'rgba(99,120,255,0.35)' : 'rgba(99,120,255,0.85)',
                color: 'white',
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: '0.82rem',
                padding: '11px 24px',
                border: '1px solid rgba(99,120,255,0.4)',
                borderRadius: '10px',
                cursor: loading ? 'wait' : 'pointer',
                letterSpacing: '0.08em',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'rgba(99,120,255,1)'; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'rgba(99,120,255,0.85)'; }}
            >
              {loading ? 'SUBMITTING...' : 'SUBMIT TIP'}
            </button>
          </div>
        </form>
      </div>

      {/* Preview */}
      {showPreview && (
        <div style={{ marginTop: '28px' }}>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.18em',
            marginBottom: '14px',
          }}>// PREVIEW</p>
          <TipCard tip={previewTip} />
        </div>
      )}
    </div>
    </div>
  );
}
