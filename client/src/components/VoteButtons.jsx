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

  const btnBase = {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '6px 14px',
    borderRadius: '8px',
    cursor: loading ? 'wait' : 'pointer',
    fontFamily: "'Exo 2', sans-serif",
    fontWeight: 700,
    fontSize: '0.82rem',
    letterSpacing: '0.04em',
    transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
    border: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          onClick={() => handleVote('up')}
          disabled={loading}
          style={{
            ...btnBase,
            background: upActive ? 'rgba(74,222,128,0.22)' : 'rgba(74,222,128,0.08)',
            color: upActive ? '#4ade80' : 'rgba(74,222,128,0.7)',
            boxShadow: upActive ? '0 0 10px rgba(74,222,128,0.25)' : 'none',
            outline: `1px solid ${upActive ? 'rgba(74,222,128,0.5)' : 'rgba(74,222,128,0.2)'}`,
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'rgba(74,222,128,0.16)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = upActive ? 'rgba(74,222,128,0.22)' : 'rgba(74,222,128,0.08)'; }}
          title="Upvote"
        >
          👍 {upCount}
        </button>

        <button
          onClick={() => handleVote('down')}
          disabled={loading}
          style={{
            ...btnBase,
            background: downActive ? 'rgba(239,68,68,0.22)' : 'rgba(239,68,68,0.08)',
            color: downActive ? '#f87171' : 'rgba(239,68,68,0.7)',
            boxShadow: downActive ? '0 0 10px rgba(239,68,68,0.25)' : 'none',
            outline: `1px solid ${downActive ? 'rgba(239,68,68,0.5)' : 'rgba(239,68,68,0.2)'}`,
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'rgba(239,68,68,0.16)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = downActive ? 'rgba(239,68,68,0.22)' : 'rgba(239,68,68,0.08)'; }}
          title="Downvote"
        >
          👎 {downCount}
        </button>
      </div>

      {loginMsg && (
        <span style={{
          fontFamily: "'VT323', monospace",
          fontSize: '0.95rem',
          color: '#fbbf24',
          letterSpacing: '0.05em',
        }}>
          Login to vote
        </span>
      )}
    </div>
  );
}
