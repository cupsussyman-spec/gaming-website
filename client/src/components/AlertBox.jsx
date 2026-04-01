export default function AlertBox({ message, type = 'error' }) {
  if (!message) return null;

  const styles = {
    error: {
      border: '4px solid #ef4444',
      boxShadow: '4px 4px 0px #991b1b',
      background: 'rgba(239, 68, 68, 0.1)',
      icon: '✗',
      iconColor: '#ef4444',
    },
    success: {
      border: '4px solid #4CAF50',
      boxShadow: '4px 4px 0px #2d7a2d',
      background: 'rgba(76, 175, 80, 0.1)',
      icon: '✓',
      iconColor: '#4CAF50',
    },
    warning: {
      border: '4px solid #FFD700',
      boxShadow: '4px 4px 0px #b8960c',
      background: 'rgba(255, 215, 0, 0.1)',
      icon: '!',
      iconColor: '#FFD700',
    },
  };

  const style = styles[type] || styles.error;

  return (
    <div
      style={{
        border: style.border,
        boxShadow: style.boxShadow,
        background: style.background,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        fontFamily: "'VT323', monospace",
        fontSize: '1.1rem',
      }}
      role="alert"
    >
      <span style={{ color: style.iconColor, fontWeight: 'bold', fontSize: '1.3rem', lineHeight: 1 }}>
        [{style.icon}]
      </span>
      <span>{message}</span>
    </div>
  );
}
