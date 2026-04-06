import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import TipCard from '../components/TipCard';
import Modal from '../components/Modal';
import AlertBox from '../components/AlertBox';

const CATEGORIES = ['Survival', 'Redstone', 'Building', 'Combat', 'Farming'];

const AVATAR_COLORS = [
  '#ef4444', '#f97316', '#8b5cf6', '#3b82f6',
  '#06b6d4', '#22c55e', '#ec4899', '#fbbf24',
];

function getAvatarColor(username) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

const labelStyle = {
  fontFamily: "'Exo 2', sans-serif",
  fontWeight: 600,
  fontSize: '0.7rem',
  color: 'rgba(255,255,255,0.45)',
  display: 'block',
  marginBottom: '8px',
  letterSpacing: '0.1em',
};

export default function Profile() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTip, setEditingTip] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editYoutube, setEditYoutube] = useState('');
  const [editError, setEditError] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingTip, setDeletingTip] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const isOwnProfile = currentUser && currentUser.username === username;

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/users/${username}`);
      setProfileData(res.data);
    } catch (err) {
      setError(err.response?.status === 404 ? 'Player not found.' : 'Failed to load profile.');
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const handleEditClick = (tip) => {
    setEditingTip(tip);
    setEditTitle(tip.title);
    setEditCategory(tip.category);
    setEditContent(tip.content);
    setEditYoutube(tip.youtube_url || '');
    setEditError('');
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError('');
    if (!editTitle.trim()) { setEditError('Title is required.'); return; }
    if (!editCategory) { setEditError('Please select a category.'); return; }
    if (editContent.trim().length < 50) {
      setEditError(`Content must be at least 50 characters (currently ${editContent.trim().length}).`);
      return;
    }
    setEditLoading(true);
    try {
      await api.put(`/tips/${editingTip.id}`, {
        title: editTitle.trim(),
        category: editCategory,
        content: editContent.trim(),
        youtube_url: editYoutube.trim() || null,
      });
      setEditModalOpen(false);
      fetchProfile();
    } catch (err) {
      setEditError(err.response?.data?.error || 'Failed to update tip.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteClick = (tip) => { setDeletingTip(tip); setDeleteModalOpen(true); };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await api.delete(`/tips/${deletingTip.id}`);
      setDeleteModalOpen(false);
      setDeletingTip(null);
      fetchProfile();
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <div style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 700,
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.12em',
        }}>
          LOADING...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '480px', margin: '80px auto', padding: '0 16px', textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 800,
          fontSize: '3rem',
          color: 'rgba(239,68,68,0.7)',
          marginBottom: '12px',
        }}>404</div>
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.3rem',
          color: 'rgba(255,255,255,0.4)',
        }}>{error}</p>
        <Link to="/" style={{
          display: 'inline-block',
          marginTop: '20px',
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 600,
          fontSize: '0.78rem',
          color: '#f97316',
          textDecoration: 'none',
          letterSpacing: '0.06em',
        }}>← BACK HOME</Link>
      </div>
    );
  }

  const { user: profileUser, tips, total_tips, total_upvotes } = profileData;
  const avatarColor = getAvatarColor(profileUser.username);
  const initials = profileUser.username.slice(0, 2).toUpperCase();

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '40px 16px 100px' }}>
      {/* Profile header */}
      <div className="glass-card" style={{
        padding: '28px 24px',
        marginBottom: '32px',
        display: 'flex',
        gap: '22px',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        {/* Avatar */}
        {profileUser.avatar_url ? (
          <img src={profileUser.avatar_url} alt="" style={{
            width: '72px', height: '72px', borderRadius: '14px',
            objectFit: 'cover', flexShrink: 0,
            border: `1px solid ${avatarColor}40`,
          }} />
        ) : (
          <div style={{
            width: '72px', height: '72px', borderRadius: '14px',
            background: `${avatarColor}20`,
            border: `1px solid ${avatarColor}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 800,
            fontSize: '1.4rem',
            color: avatarColor,
            flexShrink: 0,
          }}>
            {initials}
          </div>
        )}

        {/* Info */}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            color: 'white',
            margin: '0 0 4px',
            letterSpacing: '0.04em',
          }}>
            {profileUser.username}
          </h1>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.3)',
            margin: '0 0 18px',
          }}>
            Member since {formatDate(profileUser.created_at)}
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(251,191,36,0.07)',
              border: '1px solid rgba(251,191,36,0.2)',
              borderRadius: '10px',
              padding: '12px 20px',
              textAlign: 'center',
              minWidth: '90px',
            }}>
              <div style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 800,
                fontSize: '1.4rem',
                color: '#fbbf24',
                lineHeight: 1,
              }}>{total_tips}</div>
              <div style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 600,
                fontSize: '0.62rem',
                color: 'rgba(251,191,36,0.55)',
                marginTop: '4px',
                letterSpacing: '0.06em',
              }}>TIPS</div>
            </div>

            <div style={{
              background: 'rgba(74,222,128,0.07)',
              border: '1px solid rgba(74,222,128,0.2)',
              borderRadius: '10px',
              padding: '12px 20px',
              textAlign: 'center',
              minWidth: '90px',
            }}>
              <div style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 800,
                fontSize: '1.4rem',
                color: '#4ade80',
                lineHeight: 1,
              }}>{total_upvotes}</div>
              <div style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 600,
                fontSize: '0.62rem',
                color: 'rgba(74,222,128,0.55)',
                marginTop: '4px',
                letterSpacing: '0.06em',
              }}>UPVOTES</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
      }}>
        <p style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 700,
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.1em',
          margin: 0,
        }}>
          {isOwnProfile ? 'MY TIPS' : `${profileUser.username.toUpperCase()}'S TIPS`}
        </p>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {tips.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '56px 20px',
          border: '1px dashed rgba(255,255,255,0.08)',
          borderRadius: '12px',
        }}>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.28)',
          }}>
            {isOwnProfile
              ? "You haven't submitted any tips yet."
              : 'This player has no tips yet.'}
          </p>
          {isOwnProfile && (
            <Link to="/submit" style={{
              display: 'inline-block',
              marginTop: '14px',
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 700,
              fontSize: '0.78rem',
              color: '#ef4444',
              textDecoration: 'none',
              padding: '9px 20px',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px',
              background: 'rgba(239,68,68,0.07)',
              letterSpacing: '0.06em',
            }}>
              SUBMIT YOUR FIRST TIP →
            </Link>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {tips.map((tip) => (
            <TipCard
              key={tip.id}
              tip={tip}
              showActions={isOwnProfile}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="EDIT TIP">
        {editError && <div style={{ marginBottom: '16px' }}><AlertBox message={editError} type="error" /></div>}
        <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>TITLE</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="pixel-input"
              disabled={editLoading}
              maxLength={100}
            />
          </div>
          <div>
            <label style={labelStyle}>CATEGORY</label>
            <div style={{ position: 'relative' }}>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="pixel-select"
                disabled={editLoading}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span style={{
                position: 'absolute', right: '14px', top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.3)', pointerEvents: 'none', fontSize: '0.7rem',
              }}>▾</span>
            </div>
          </div>
          <div>
            <label style={labelStyle}>CONTENT</label>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="pixel-textarea"
              disabled={editLoading}
              rows={6}
            />
            <div style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: '0.7rem',
              color: editContent.trim().length < 50 ? 'rgba(239,68,68,0.7)' : 'rgba(74,222,128,0.7)',
              marginTop: '5px',
            }}>
              {editContent.trim().length}/50 min chars
            </div>
          </div>
          <div>
            <label style={labelStyle}>YOUTUBE URL <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>optional</span></label>
            <input
              type="url"
              value={editYoutube}
              onChange={(e) => setEditYoutube(e.target.value)}
              className="pixel-input"
              placeholder="https://www.youtube.com/..."
              disabled={editLoading}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="pixel-btn"
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 600,
                fontSize: '0.78rem',
                padding: '11px 16px',
                flex: 1,
                letterSpacing: '0.06em',
              }}
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={editLoading}
              style={{
                background: editLoading ? 'rgba(239,68,68,0.45)' : 'rgba(239,68,68,0.85)',
                color: 'white',
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: '0.78rem',
                padding: '11px 16px',
                border: '1px solid rgba(239,68,68,0.35)',
                borderRadius: '8px',
                cursor: editLoading ? 'wait' : 'pointer',
                flex: 1,
                letterSpacing: '0.06em',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { if (!editLoading) e.currentTarget.style.background = 'rgba(239,68,68,1)'; }}
              onMouseLeave={e => { if (!editLoading) e.currentTarget.style.background = 'rgba(239,68,68,0.85)'; }}
            >
              {editLoading ? 'SAVING...' : 'SAVE CHANGES'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="DELETE TIP">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '14px', opacity: 0.8 }}>💀</div>
          <p style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 600,
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '8px',
          }}>
            Delete this tip?
          </p>
          {deletingTip && (
            <p style={{
              fontFamily: "'VT323', monospace",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '8px',
              padding: '10px 14px',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.03)',
            }}>
              "{deletingTip.title}"
            </p>
          )}
          <p style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.25)',
            marginBottom: '24px',
          }}>
            This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="pixel-btn"
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 600,
                fontSize: '0.78rem',
                padding: '10px 24px',
                letterSpacing: '0.06em',
              }}
            >
              CANCEL
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={deleteLoading}
              style={{
                background: deleteLoading ? 'rgba(239,68,68,0.5)' : 'rgba(239,68,68,0.85)',
                color: 'white',
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: '0.78rem',
                padding: '10px 24px',
                border: '1px solid rgba(239,68,68,0.35)',
                borderRadius: '8px',
                cursor: deleteLoading ? 'wait' : 'pointer',
                letterSpacing: '0.06em',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { if (!deleteLoading) e.currentTarget.style.background = 'rgba(239,68,68,1)'; }}
              onMouseLeave={e => { if (!deleteLoading) e.currentTarget.style.background = 'rgba(239,68,68,0.85)'; }}
            >
              {deleteLoading ? 'DELETING...' : 'DELETE'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
