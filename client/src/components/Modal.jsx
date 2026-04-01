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
      // Focus the modal
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        style={{
          background: '#1a1a2e',
          border: '4px solid #4CAF50',
          boxShadow: '8px 8px 0px #2d7a2d',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflow: 'auto',
          outline: 'none',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: '#0d0d1a',
            borderBottom: '4px solid #4CAF50',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.75rem',
              color: '#4CAF50',
              margin: 0,
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: '#ef4444',
              border: '2px solid #991b1b',
              color: 'white',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '2px 2px 0px #991b1b',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-1px, -1px)';
              e.currentTarget.style.boxShadow = '3px 3px 0px #991b1b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '2px 2px 0px #991b1b';
            }}
            aria-label="Close modal"
          >
            X
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
