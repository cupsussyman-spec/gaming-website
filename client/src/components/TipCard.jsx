import { useState } from 'react';
import { Link } from 'react-router-dom';
import VoteButtons from './VoteButtons';

const CATEGORY_COLORS = {
  Redstone: '#ef4444',
  Combat:   '#8b5cf6',
  Building: '#22c55e',
  Farming:  '#84cc16',
  Survival: '#f97316',
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function TipCard({ tip, showActions = false, onEdit, onDelete, userVote = null }) {
  const [expanded, setExpanded] = useState(false);

  const content = tip.content || '';
  const truncated = content.length > 160 ? content.slice(0, 160) + '...' : content;
  const needsTruncation = content.length > 160;
  const color = CATEGORY_COLORS[tip.category] || '#fff';

  return (
    <div className="tip-card" style={{
      borderLeft: `2px solid ${color}40`,
    }}>
      {/* Category badge + title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
        <h3 style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 700,
          fontSize: '0.9rem',
          color: 'white',
          lineHeight: 1.4,
          flex: 1,
          margin: 0,
        }}>
          {tip.title}
        </h3>
        <span style={{
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 700,
          fontSize: '0.6rem',
          color: color,
          background: `${color}18`,
          border: `1px solid ${color}40`,
          padding: '3px 8px',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          letterSpacing: '0.06em',
          flexShrink: 0,
        }}>
          {tip.category?.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <p style={{
        fontFamily: "'VT323', monospace",
        fontSize: '1.1rem',
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.5,
        margin: 0,
      }}>
        {expanded ? content : truncated}
        {needsTruncation && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none',
              border: 'none',
              color: color,
              cursor: 'pointer',
              fontFamily: "'VT323', monospace",
              fontSize: '1rem',
              marginLeft: '6px',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            {expanded ? 'Less' : 'More'}
          </button>
        )}
      </p>

      {/* YouTube */}
      {tip.youtube_url && (
        <a
          href={tip.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#ef4444',
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 600,
            fontSize: '0.75rem',
            textDecoration: 'none',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.25)',
            padding: '5px 12px',
            borderRadius: '5px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            letterSpacing: '0.04em',
            alignSelf: 'flex-start',
          }}
        >
          ▶ WATCH VIDEO
        </a>
      )}

      {/* Vote buttons */}
      <VoteButtons
        tipId={tip.id}
        upVotes={tip.up_votes}
        downVotes={tip.down_votes}
        userVote={userVote}
      />

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: '10px',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <span style={{ fontFamily: "'VT323', monospace", fontSize: '0.95rem', color: 'rgba(255,255,255,0.3)' }}>
          by{' '}
          <Link
            to={`/profile/${tip.username}`}
            style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
          >
            {tip.username}
          </Link>
          {' · '}
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>{formatDate(tip.created_at)}</span>
        </span>

        {showActions && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onEdit && onEdit(tip)}
              className="pixel-btn-gold"
              style={{
                background: 'transparent',
                color: '#FFD700',
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 600,
                fontSize: '0.75rem',
                padding: '4px 10px',
                letterSpacing: '0.04em',
              }}
            >
              EDIT
            </button>
            <button
              onClick={() => onDelete && onDelete(tip)}
              className="pixel-btn-red"
              style={{
                background: 'transparent',
                color: '#ef4444',
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 600,
                fontSize: '0.75rem',
                padding: '4px 10px',
                letterSpacing: '0.04em',
              }}
            >
              DELETE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
