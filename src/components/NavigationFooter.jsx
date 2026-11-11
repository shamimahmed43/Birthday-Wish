import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NavigationFooter({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <footer className="bdy-footer" style={{ marginTop: 32, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(224, 122, 130, 0.2)' }}>
      <button
        className="nav-arrow-btn"
        id="nav-back"
        onClick={onPrev}
        disabled={currentPage === 0}
        style={{
          opacity: currentPage === 0 ? 0.35 : 1,
          cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: '#fffdfb',
          border: '1px solid #ebd7d4',
          padding: '8px 18px',
          borderRadius: 24,
          color: '#5e3e43',
          fontWeight: 600,
          fontSize: '0.9rem',
          transition: 'all 0.2s ease',
        }}
      >
        <ChevronLeft size={18} /> Previous
      </button>

      <span style={{ fontSize: '0.86rem', color: '#886268', fontWeight: 500 }}>
        Chapter {currentPage + 1} of {totalPages}
      </span>

      <button
        className="nav-arrow-btn"
        id="nav-forward"
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        style={{
          opacity: currentPage === totalPages - 1 ? 0.35 : 1,
          cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: '#e07a82',
          border: 'none',
          padding: '8px 20px',
          borderRadius: 24,
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '0.9rem',
          boxShadow: '0 4px 12px rgba(224, 122, 130, 0.3)',
          transition: 'all 0.2s ease',
        }}
      >
        Next <ChevronRight size={18} />
      </button>
    </footer>
  );
}

