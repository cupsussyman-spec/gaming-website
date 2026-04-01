import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import TipCard from '../components/TipCard';
import Modal from '../components/Modal';
import AlertBox from '../components/AlertBox';

const CATEGORIES = ['Survival', 'Redstone', 'Building', 'Combat', 'Farming'];

function getAvatarColor(username) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    '#4CAF50', '#ef4444', '#3b82f6', '#f97316',
    '#8b5cf6', '#ec4899', '#06b6d4', '#FFD700',
  ];
  return colors[Math.abs(hash) % colors.length];
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Profile() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTip, setEditingTip] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editYoutube, setEditYoutube] = useState('');
  const [editError, setEditError] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  // Delete confirmation state
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

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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

    if (!editTitle.trim()) {
      setEditError('Title is required.');
      return;
    }
    if (!editCategory) {
      setEditError('Please select a category.');
      return;
    }
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

  const handleDeleteClick = (tip) => {
    setDeletingTip(tip);
    setDeleteModalOpen(true);
  };

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
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '1rem',
            color: '#4CAF50',
          }}
        >
          [LOADING...]
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 16px', textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '1.5rem',
            color: '#ef4444',
            marginBottom: '16px',
          }}
        >
          404
        </div>
        <p style={{ fontFamily: "'VT323', monospace", fontSize: '1.5rem', color: '#888' }}>{error}</p>
      </div>
    );
  }

  const { user: profileUser, tips, total_tips, total_upvotes } = profileData;
  const avatarColor = getAvatarColor(profileUser.username);
  const initials = profileUser.username.slice(0, 2).toUpperCase();

  const labelStyle = {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: '0.5rem',
    color: '#4CAF50',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Profile header */}
      <div
        style={{
          background: '#0d0d1a',
          border: '4px solid #4CAF50',
          boxShadow: '6px 6px 0px #2d7a2d',
          padding: '28px',
          marginBottom: '32px',
          display: 'flex',
          gap: '24px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: '80px',
            height: '80px',
            background: avatarColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '1.4rem',
            color: '#0d0d1a',
            border: `4px solid ${avatarColor}`,
            boxShadow: `4px 4px 0px rgba(0,0,0,0.5)`,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>

        {/* User info */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(0.7rem, 2.5vw, 1.1rem)',
              color: avatarColor,
              marginBottom: '8px',
              textShadow: `3px 3px 0px rgba(0,0,0,0.5)`,
            }}
          >
            {profileUser.username}
          </h1>
          <p style={{ fontFamily: "'VT323', monospace", fontSize: '1.2rem', color: '#666', marginBottom: '16px' }}>
            Member since {formatDate(profileUser.created_at)}
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div
              className="pixel-box-gold"
              style={{
                background: 'rgba(255, 215, 0, 0.08)',
                padding: '10px 18px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '1.1rem',
                  color: '#FFD700',
                }}
              >
                {total_tips}
              </div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '0.9rem', color: '#b8960c', marginTop: '4px' }}>
                TIPS SUBMITTED
              </div>
            </div>

            <div
              className="pixel-box-gold"
              style={{
                background: 'rgba(255, 215, 0, 0.08)',
                padding: '10px 18px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '1.1rem',
                  color: '#FFD700',
                }}
              >
                {total_upvotes}
              </div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '0.9rem', color: '#b8960c', marginTop: '4px' }}>
                UPVOTES RECEIVED
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips section */}
      <h2
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '0.8rem',
          color: '#4CAF50',
          marginBottom: '20px',
          borderBottom: '3px solid #2a2a4a',
          paddingBottom: '12px',
        }}
      >
        {isOwnProfile ? 'MY TIPS' : `${profileUser.username}'s TIPS`}
      </h2>

      {tips.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '48px',
            border: '3px dashed #2a2a4a',
          }}
        >
          <p style={{ fontFamily: "'VT323', monospace", fontSize: '1.4rem', color: '#555' }}>
            {isOwnProfile
              ? 'You haven\'t submitted any tips yet. Share your knowledge!'
              : 'This player hasn\'t submitted any tips yet.'}
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
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
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="EDIT TIP"
      >
        {editError && (
          <div style={{ marginBottom: '16px' }}>
            <AlertBox message={editError} type="error" />
          </div>
        )}
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
          <div>
            <label style={labelStyle}>CONTENT</label>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="pixel-textarea"
              disabled={editLoading}
              rows={6}
            />
            <div
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: '0.9rem',
                color: editContent.trim().length < 50 ? '#ef4444' : '#4CAF50',
                marginTop: '4px',
              }}
            >
              {editContent.trim().length}/50 min chars
            </div>
          </div>
          <div>
            <label style={labelStyle}>YOUTUBE URL (OPTIONAL)</label>
            <input
              type="url"
              value={editYoutube}
              onChange={(e) => setEditYoutube(e.target.value)}
              className="pixel-input"
              placeholder="https://www.youtube.com/..."
              disabled={editLoading}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="pixel-btn"
              style={{
                background: 'transparent',
                color: '#4CAF50',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.55rem',
                padding: '10px 16px',
                flex: 1,
              }}
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={editLoading}
              style={{
                background: editLoading ? '#2d7a2d' : '#4CAF50',
                color: '#0d0d1a',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.55rem',
                padding: '10px 16px',
                border: '3px solid #2d7a2d',
                boxShadow: '3px 3px 0px #2d7a2d',
                cursor: editLoading ? 'wait' : 'pointer',
                flex: 1,
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseEnter={(e) => {
                if (!editLoading) {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '5px 5px 0px #2d7a2d';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '3px 3px 0px #2d7a2d';
              }}
            >
              {editLoading ? 'SAVING...' : 'SAVE CHANGES'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="DELETE TIP"
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💀</div>
          <p
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: '1.3rem',
              color: '#ef4444',
              marginBottom: '8px',
            }}
          >
            Are you sure you want to delete this tip?
          </p>
          {deletingTip && (
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.55rem',
                color: '#888',
                marginBottom: '24px',
                padding: '10px',
                border: '2px solid #2a2a4a',
                background: '#0d0d1a',
              }}
            >
              "{deletingTip.title}"
            </p>
          )}
          <p
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: '1.1rem',
              color: '#666',
              marginBottom: '24px',
            }}
          >
            This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="pixel-btn"
              style={{
                background: 'transparent',
                color: '#4CAF50',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.55rem',
                padding: '10px 20px',
              }}
            >
              CANCEL
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={deleteLoading}
              className="pixel-btn-red"
              style={{
                background: deleteLoading ? '#991b1b' : '#ef4444',
                color: 'white',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.55rem',
                padding: '10px 20px',
                cursor: deleteLoading ? 'wait' : 'pointer',
              }}
            >
              {deleteLoading ? 'DELETING...' : 'DELETE'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
