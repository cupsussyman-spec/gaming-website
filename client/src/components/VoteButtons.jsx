import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function VoteButtons({ tipId, upVotes, downVotes, userVote: initialUserVote }) {
  const { isAuthenticated } = useAuth();
  const [upCount, setUpCount] = useState(upVotes || 0);
  const [downCount, setDownCount] = useState(downVotes || 0);
  const [userVote, setUserVote] = useState(initialUserVote || null);
  const [loginMsg, setLoginMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVote = async (type) => {
    if (!isAuthenticated) {
      setLoginMsg(true);
      setTimeout(() => setLoginMsg(false), 3000);
      return;
    }

    if (loading) return;
    setLoading(true);

    // Optimistic update
    const prevUp = upCount;
    const prevDown = downCount;
    const prevVote = userVote;

    if (userVote === type) {
      // Toggle off
      setUserVote(null);
      if (type === 'up') setUpCount((c) => Math.max(0, c - 1));
      else setDownCount((c) => Math.max(0, c - 1));
    } else {
      // Switching or new vote
      if (userVote === 'up') setUpCount((c) => Math.max(0, c - 1));
      if (userVote === 'down') setDownCount((c) => Math.max(0, c - 1));
      setUserVote(type);
      if (type === 'up') setUpCount((c) => c + 1);
      else setDownCount((c) => c + 1);
    }

    try {
      const res = await api.post(`/tips/${tipId}/vote`, { type });
      setUpCount(res.data.up_votes);
      setDownCount(res.data.down_votes);
      setUserVote(res.data.user_vote);
    } catch {
      // Revert on error
      setUpCount(prevUp);
      setDownCount(prevDown);
      setUserVote(prevVote);
    } finally {
      setLoading(false);
    }
  };

  const upActive = userVote === 'up';
  const downActive = userVote === 'down';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          onClick={() => handleVote('up')}
          disabled={loading}
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1.1rem',
            padding: '4px 10px',
            cursor: loading ? 'wait' : 'pointer',
            border: `3px solid ${upActive ? '#4CAF50' : '#2d7a2d'}`,
            background: upActive ? '#4CAF50' : '#0d0d1a',
            color: upActive ? '#0d0d1a' : '#4CAF50',
            boxShadow: upActive ? '3px 3px 0px #2d7a2d' : '2px 2px 0px #2d7a2d',
            transition: 'transform 0.1s, box-shadow 0.1s',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translate(-1px, -1px)';
              e.currentTarget.style.boxShadow = '4px 4px 0px #2d7a2d';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = upActive ? '3px 3px 0px #2d7a2d' : '2px 2px 0px #2d7a2d';
          }}
          title="Upvote"
        >
          ▲ UP {upCount}
        </button>

        <button
          onClick={() => handleVote('down')}
          disabled={loading}
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1.1rem',
            padding: '4px 10px',
            cursor: loading ? 'wait' : 'pointer',
            border: `3px solid ${downActive ? '#ef4444' : '#991b1b'}`,
            background: downActive ? '#ef4444' : '#0d0d1a',
            color: downActive ? 'white' : '#ef4444',
            boxShadow: downActive ? '3px 3px 0px #991b1b' : '2px 2px 0px #991b1b',
            transition: 'transform 0.1s, box-shadow 0.1s',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translate(-1px, -1px)';
              e.currentTarget.style.boxShadow = '4px 4px 0px #991b1b';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = downActive ? '3px 3px 0px #991b1b' : '2px 2px 0px #991b1b';
          }}
          title="Downvote"
        >
          ▼ DOWN {downCount}
        </button>
      </div>

      {loginMsg && (
        <div
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: '1rem',
            color: '#FFD700',
            border: '2px solid #FFD700',
            padding: '4px 8px',
            background: 'rgba(255, 215, 0, 0.1)',
          }}
        >
          LOGIN TO VOTE
        </div>
      )}
    </div>
  );
}
