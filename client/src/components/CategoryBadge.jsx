const categoryStyles = {
  Survival: {
    bg: '#1a3a1a',
    border: '#4CAF50',
    color: '#4CAF50',
  },
  Redstone: {
    bg: '#3a1a1a',
    border: '#ef4444',
    color: '#ef4444',
  },
  Building: {
    bg: '#1a1a3a',
    border: '#3b82f6',
    color: '#60a5fa',
  },
  Combat: {
    bg: '#3a2a1a',
    border: '#f97316',
    color: '#f97316',
  },
  Farming: {
    bg: '#3a3a1a',
    border: '#FFD700',
    color: '#FFD700',
  },
};

export default function CategoryBadge({ category }) {
  const style = categoryStyles[category] || {
    bg: '#2a2a2a',
    border: '#888',
    color: '#888',
  };

  return (
    <span
      style={{
        backgroundColor: style.bg,
        border: `2px solid ${style.border}`,
        color: style.color,
        padding: '2px 8px',
        fontSize: '0.65rem',
        fontFamily: "'Press Start 2P', monospace",
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        display: 'inline-block',
        lineHeight: '1.5',
      }}
    >
      {category}
    </span>
  );
}
