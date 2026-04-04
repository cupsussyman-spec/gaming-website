import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { label: 'HOME',     icon: '⌂',  path: '/',                  cat: null },
  { label: 'REDSTONE', icon: '⚡', path: '/?cat=Redstone',     cat: 'Redstone',  color: '#ef4444' },
  { label: 'COMBAT',   icon: '⚔', path: '/?cat=Combat',       cat: 'Combat',    color: '#8b5cf6' },
  { label: 'BUILD',    icon: '⬛', path: '/?cat=Building',     cat: 'Building',  color: '#22c55e' },
  { label: 'FARM',     icon: '🌾', path: '/?cat=Farming',      cat: 'Farming',   color: '#84cc16' },
  { label: 'SURVIVE',  icon: '🧭', path: '/?cat=Survival',     cat: 'Survival',  color: '#f97316' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const currentCat = new URLSearchParams(location.search).get('cat');
  const isHome = location.pathname === '/' && !currentCat;

  return (
    <nav className="bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
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
          const isActive = item.cat === null
            ? isHome
            : location.pathname === '/' && currentCat === item.cat;

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
                color: isActive
                  ? (item.color || '#fff')
                  : 'rgba(255,255,255,0.35)',
                borderTop: isActive
                  ? `2px solid ${item.color || '#fff'}`
                  : '2px solid transparent',
                transition: 'color 0.2s',
                gap: '3px',
              }}
            >
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{item.icon}</span>
              <span style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: '0.5rem',
                letterSpacing: '0.05em',
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
