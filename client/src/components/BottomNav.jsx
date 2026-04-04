import { useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'HOME',     icon: '⌂',  path: '/',                color: null },
  { label: 'REDSTONE', icon: '⚡', path: '/tips/Redstone',  color: '#ef4444' },
  { label: 'COMBAT',   icon: '⚔', path: '/tips/Combat',    color: '#8b5cf6' },
  { label: 'BUILD',    icon: '⬛', path: '/tips/Building',  color: '#22c55e' },
  { label: 'FARM',     icon: '🌾', path: '/tips/Farming',   color: '#84cc16' },
  { label: 'SURVIVE',  icon: '🧭', path: '/tips/Survival',  color: '#f97316' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav" style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      zIndex: 200,
      background: 'rgba(8, 5, 12, 0.96)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-around',
        width: '100%',
      }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const color = item.color || '#fff';

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 2px 8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isActive ? color : 'rgba(255,255,255,0.3)',
                borderTop: isActive ? `2px solid ${color}` : '2px solid transparent',
                transition: 'color 0.2s',
                gap: '3px',
              }}
            >
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{item.icon}</span>
              <span style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: '0.5rem',
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
