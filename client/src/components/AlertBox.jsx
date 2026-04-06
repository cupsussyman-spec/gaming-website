export default function AlertBox({ message, type = 'error' }) {
  if (!message) return null;

  const styles = {
    error: {
      border: '1px solid rgba(239,68,68,0.35)',
      background: 'rgba(239,68,68,0.08)',
      icon: '✕',
      iconColor: '#f87171',
      textColor: 'rgba(255,255,255,0.8)',
    },
    success: {
      border: '1px solid rgba(74,222,128,0.35)',
      background: 'rgba(74,222,128,0.07)',
      icon: '✓',
      iconColor: '#4ade80',
      textColor: 'rgba(255,255,255,0.8)',
    },
    warning: {
      border: '1px solid rgba(251,191,36,0.35)',
      background: 'rgba(251,191,36,0.07)',
      icon: '!',
      iconColor: '#fbbf24',
      textColor: 'rgba(255,255,255,0.8)',
    },
  };

  const s = styles[type] || styles.error;

  return (
    <div
      role="alert"
      style={{
        border: s.border,
        background: s.background,
        borderRadius: '8px',
        padding: '11px 14px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
      }}
    >
      <span style={{
        color: s.iconColor,
        fontFamily: "'Exo 2', sans-serif",
        fontWeight: 700,
        fontSize: '0.8rem',
        lineHeight: '1.5',
        flexShrink: 0,
      }}>
        {s.icon}
      </span>
      <span style={{
        fontFamily: "'Exo 2', sans-serif",
        fontWeight: 500,
        fontSize: '0.82rem',
        color: s.textColor,
        lineHeight: 1.5,
      }}>
        {message}
      </span>
    </div>
  );
}
