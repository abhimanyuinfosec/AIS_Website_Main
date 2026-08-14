import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoon = ({ title }) => {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '120px 20px',
      background: 'var(--bg-dark)'
    }}>
      <div className="mono-label" style={{ color: 'var(--accent-secondary)', marginBottom: '1rem' }}>
        Development Phase
      </div>
      <h1 style={{ marginBottom: '1.5rem' }}>{title}</h1>
      <p className="muted" style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '3rem' }}>
        This page is currently under development. We are engineering a comprehensive resource that will provide detailed technical insights into this offering.
      </p>
      
      <Link to="/" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <ArrowLeft size={18} /> Return Home
      </Link>
    </div>
  );
};

export default ComingSoon;
