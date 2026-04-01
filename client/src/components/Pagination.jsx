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
    border: '3px solid #4CAF50',
    background: '#0d0d1a',
    color: 'white',
    transition: 'transform 0.1s, box-shadow 0.1s',
    boxShadow: '3px 3px 0px #2d7a2d',
  };

  const activeBtnStyle = {
    ...btnBase,
    background: '#4CAF50',
    color: '#0d0d1a',
  };

  const disabledBtnStyle = {
    ...btnBase,
    opacity: 0.4,
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
            e.currentTarget.style.boxShadow = '5px 5px 0px #2d7a2d';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '3px 3px 0px #2d7a2d';
        }}
      >
        &lt;&lt; PREV
      </button>

      {getPageNumbers().map((page, idx) => (
        page === '...' ? (
          <span key={`ellipsis-${idx}`} style={{ color: '#4CAF50', fontFamily: "'VT323', monospace", fontSize: '1.2rem', padding: '0 4px' }}>
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
                e.currentTarget.style.boxShadow = '5px 5px 0px #2d7a2d';
              }
            }}
            onMouseLeave={(e) => {
              if (page !== currentPage) {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '3px 3px 0px #2d7a2d';
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
            e.currentTarget.style.boxShadow = '5px 5px 0px #2d7a2d';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '3px 3px 0px #2d7a2d';
        }}
      >
        NEXT &gt;&gt;
      </button>
    </div>
  );
}
