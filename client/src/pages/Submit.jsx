import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import AlertBox from '../components/AlertBox';
import TipCard from '../components/TipCard';

const CATEGORIES = ['Survival', 'Redstone', 'Building', 'Combat', 'Farming'];

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

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!category) {
      setError('Please select a category.');
      return;
    }
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

  const labelStyle = {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: '0.55rem',
    color: '#4CAF50',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(0.8rem, 3vw, 1.4rem)',
            color: '#4CAF50',
            textShadow: '4px 4px 0px #2d7a2d',
            marginBottom: '8px',
          }}
        >
          SUBMIT TIP
        </h1>
        <p style={{ fontFamily: "'VT323', monospace", fontSize: '1.3rem', color: '#888' }}>
          Share your Minecraft knowledge with the community
        </p>
      </div>

      <div
        style={{
          background: '#0d0d1a',
          border: '4px solid #4CAF50',
          boxShadow: '6px 6px 0px #2d7a2d',
          padding: '28px',
        }}
      >
        {error && (
          <div style={{ marginBottom: '20px' }}>
            <AlertBox message={error} type="error" />
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Title */}
          <div>
            <label htmlFor="title" style={labelStyle}>
              TIP TITLE
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="pixel-input"
              placeholder="e.g. Never Dig Straight Down!"
              disabled={loading}
              maxLength={100}
            />
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '0.9rem', color: '#555', marginTop: '4px' }}>
              {title.length}/100 characters
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" style={labelStyle}>
              CATEGORY
            </label>
            <div style={{ position: 'relative' }}>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="pixel-select"
                disabled={loading}
              >
                <option value="">-- SELECT CATEGORY --</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#4CAF50',
                  pointerEvents: 'none',
                  fontFamily: "'VT323', monospace",
                  fontSize: '1.2rem',
                }}
              >
                ▼
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" style={labelStyle}>
              TIP CONTENT
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="pixel-textarea"
              placeholder="Describe your tip in detail. Share the what, why, and how..."
              disabled={loading}
              rows={8}
            />
            <div
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: '1rem',
                color: content.trim().length < 50 ? '#ef4444' : '#4CAF50',
                marginTop: '4px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                {content.trim().length < 50
                  ? `Need ${50 - content.trim().length} more characters`
                  : 'Minimum length reached ✓'}
              </span>
              <span style={{ color: '#666' }}>{content.length} chars</span>
            </div>
          </div>

          {/* YouTube URL */}
          <div>
            <label htmlFor="youtube" style={labelStyle}>
              YOUTUBE URL{' '}
              <span style={{ color: '#666', fontFamily: "'VT323', monospace", fontSize: '0.9rem' }}>
                (OPTIONAL)
              </span>
            </label>
            <input
              id="youtube"
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="pixel-input"
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={loading}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="pixel-btn-gold"
              style={{
                background: 'transparent',
                color: '#FFD700',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.6rem',
                padding: '12px 20px',
              }}
            >
              {showPreview ? 'HIDE PREVIEW' : 'PREVIEW'}
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#2d7a2d' : '#4CAF50',
                color: '#0d0d1a',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.6rem',
                padding: '12px 24px',
                border: '3px solid #2d7a2d',
                boxShadow: '4px 4px 0px #2d7a2d',
                cursor: loading ? 'wait' : 'pointer',
                transition: 'transform 0.1s, box-shadow 0.1s',
                flex: 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0px #2d7a2d';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '4px 4px 0px #2d7a2d';
              }}
            >
              {loading ? 'SUBMITTING...' : 'SUBMIT TIP'}
            </button>
          </div>
        </form>
      </div>

      {/* Preview */}
      {showPreview && (
        <div style={{ marginTop: '32px' }}>
          <h2
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.7rem',
              color: '#FFD700',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            PREVIEW
          </h2>
          <TipCard tip={previewTip} />
        </div>
      )}
    </div>
  );
}
