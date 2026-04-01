import { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';
import VoteButtons from './VoteButtons';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function TipCard({ tip, showActions = false, onEdit, onDelete, userVote = null }) {
  const [expanded, setExpanded] = useState(false);

  const content = tip.content || '';
  const truncated = content.length > 150 ? content.slice(0, 150) + '...' : content;
  const needsTruncation = content.length > 150;

  return (
    <div
      className="tip-card-hover"
      style={{
        background: '#0d0d1a',
        border: '4px solid #4CAF50',
        boxShadow: '4px 4px 0px #2d7a2d, inset -2px -2px 0px rgba(0,0,0,0.3)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
      }}
    >
      {/* Top row: category badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
        <h3
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.6rem',
            color: 'white',
            lineHeight: '1.6',
            flex: 1,
            margin: 0,
          }}
        >
          {tip.title}
        </h3>
        <CategoryBadge category={tip.category} />
      </div>

      {/* Content */}
      <div
        style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.15rem',
          color: '#ccc',
          lineHeight: '1.4',
        }}
      >
        {expanded ? content : truncated}
        {needsTruncation && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none',
              border: 'none',
              color: '#4CAF50',
              cursor: 'pointer',
              fontFamily: "'VT323', monospace",
              fontSize: '1.1rem',
              marginLeft: '6px',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            {expanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      {/* YouTube link */}
      {tip.youtube_url && (
        <a
          href={tip.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#ef4444',
            fontFamily: "'VT323', monospace",
            fontSize: '1.1rem',
            textDecoration: 'none',
            border: '2px solid #ef4444',
            padding: '4px 10px',
            display: 'inline-block',
            alignSelf: 'flex-start',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
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

      {/* Bottom row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '2px solid #2a2a4a',
          paddingTop: '10px',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <span style={{ fontFamily: "'VT323', monospace", fontSize: '1rem', color: '#888' }}>
          by{' '}
          <Link
            to={`/profile/${tip.username}`}
            style={{ color: '#4CAF50', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#FFD700'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#4CAF50'; }}
          >
            {tip.username}
          </Link>
          {' '}&bull;{' '}
          <span style={{ color: '#666' }}>{formatDate(tip.created_at)}</span>
        </span>

        {showActions && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onEdit && onEdit(tip)}
              className="pixel-btn-gold"
              style={{
                background: 'transparent',
                color: '#FFD700',
                fontFamily: "'VT323', monospace",
                fontSize: '1rem',
                padding: '4px 10px',
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
                fontFamily: "'VT323', monospace",
                fontSize: '1rem',
                padding: '4px 10px',
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
