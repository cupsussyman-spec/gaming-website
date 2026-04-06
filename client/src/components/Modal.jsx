import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setTimeout(() => modalRef.current?.focus(), 0);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        style={{
          background: 'rgba(10,7,16,0.97)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '14px',
          width: '100%',
          maxWidth: '580px',
          maxHeight: '90vh',
          overflow: 'auto',
          outline: 'none',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* Title bar */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.03)',
        }}>
          <h2 style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 700,
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.9)',
            margin: 0,
            letterSpacing: '0.08em',
          }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: 'rgba(255,255,255,0.5)',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 700,
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.color = '#f87171'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px 20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
