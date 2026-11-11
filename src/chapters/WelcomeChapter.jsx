import React from 'react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import ChromaVideo from '../components/ChromaVideo';

export default function WelcomeChapter({ onNext }) {
  return (
    <div className="chapter-page page-content welcome-page">
      <div className="welcome-card">
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <ChromaVideo
            src={birthdayConfig.assets.cheekLove}
            label="Cute kiss bears"
            size={140}
          />
        </div>

        <span className="sparkle-badge">
          <Sparkles size={14} style={{ display: 'inline', marginRight: 4 }} />
          A special birthday surprise
        </span>

        <p className="eyebrow">{birthdayConfig.welcome.eyebrow}</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', lineHeight: 1.1, margin: '8px 0 16px' }}>
          Happiest Birthday, {birthdayConfig.recipient.name}
        </h1>

        <p className="welcome-lead" style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#5a4649', maxWidth: 480, margin: '0 auto 24px' }}>
          {birthdayConfig.welcome.message}
        </p>

        <button className="unlock-button" onClick={onNext} id="start-journey-btn" style={{ width: 'auto', padding: '14px 32px' }}>
          {birthdayConfig.welcome.buttonText}
          <ArrowRight size={18} style={{ marginLeft: 8 }} />
        </button>
      </div>
    </div>
  );
}

