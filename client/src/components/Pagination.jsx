export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const btnBase = {
    fontFamily: "'VT323', monospace",
    fontSize: '1.2rem',
    padding: '6px 14px',
    cursor: 'pointer',
    border: '2px solid rgba(239, 68, 68, 0.45)',
    background: 'rgba(255, 255, 255, 0.04)',
    color: 'rgba(255,255,255,0.85)',
    transition: 'transform 0.1s, box-shadow 0.1s, background 0.15s',
    boxShadow: '3px 3px 0px rgba(150, 30, 10, 0.5)',
    borderRadius: '6px',
  };

  const activeBtnStyle = {
    ...btnBase,
    background: 'rgba(239, 68, 68, 0.18)',
    border: '2px solid rgba(239, 68, 68, 0.8)',
    color: 'white',
    boxShadow: '3px 3px 0px rgba(150, 30, 10, 0.7)',
  };

  const disabledBtnStyle = {
    ...btnBase,
    opacity: 0.3,
    cursor: 'not-allowed',
    boxShadow: 'none',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
      <button
        style={currentPage === 1 ? disabledBtnStyle : btnBase}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '5px 5px 0px rgba(150, 30, 10, 0.7)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '3px 3px 0px rgba(150, 30, 10, 0.5)';
        }}
      >
        &lt;&lt; PREV
      </button>

      {getPageNumbers().map((page, idx) => (
        page === '...' ? (
          <span key={`ellipsis-${idx}`} style={{ color: 'rgba(239, 68, 68, 0.7)', fontFamily: "'VT323', monospace", fontSize: '1.2rem', padding: '0 4px' }}>
            ...
          </span>
        ) : (
          <button
            key={page}
            style={page === currentPage ? activeBtnStyle : btnBase}
            onClick={() => onPageChange(page)}
            onMouseEnter={(e) => {
              if (page !== currentPage) {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '5px 5px 0px rgba(150, 30, 10, 0.7)';
              }
            }}
            onMouseLeave={(e) => {
              if (page !== currentPage) {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '3px 3px 0px rgba(150, 30, 10, 0.5)';
              }
            }}
          >
            {page}
          </button>
        )
      ))}

      <button
        style={currentPage === totalPages ? disabledBtnStyle : btnBase}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '5px 5px 0px rgba(150, 30, 10, 0.7)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '3px 3px 0px rgba(150, 30, 10, 0.5)';
        }}
      >
        NEXT &gt;&gt;
      </button>
    </div>
  );
}
