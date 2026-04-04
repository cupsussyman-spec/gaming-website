const COLORS = {
  Survival: '#f97316',
  Redstone: '#ef4444',
  Building: '#22c55e',
  Combat:   '#8b5cf6',
  Farming:  '#84cc16',
};

export default function CategoryBadge({ category }) {
  const color = COLORS[category] || '#fff';
  return (
    <span style={{
      fontFamily: "'Exo 2', sans-serif",
      fontWeight: 700,
      fontSize: '0.6rem',
      color,
      background: `${color}18`,
      border: `1px solid ${color}40`,
      padding: '3px 8px',
      borderRadius: '4px',
      letterSpacing: '0.06em',
      display: 'inline-block',
      whiteSpace: 'nowrap',
    }}>
      {category?.toUpperCase()}
    </span>
  );
}
