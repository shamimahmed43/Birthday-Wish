import React, { useState } from 'react';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';
import ChromaVideo from '../components/ChromaVideo';

export default function AcceptGiftChapter({ onRestart }) {
  const [opened, setOpened] = useState(false);

  const handleOpenGift = () => {
    setOpened(true);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#e07a82', '#ffbcc7', '#ffd166', '#a7f3d0', '#c084fc'],
    });
  };

  return (
    <div className="chapter-page page-content gift-page">
      <div className="section-intro compact" style={{ textAlign: 'center', marginBottom: 18 }}>
        <div>
          <p className="eyebrow">{birthdayConfig.gift.eyebrow}</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {opened ? "It Was Always Yours ❤️" : birthdayConfig.gift.title}
          </h2>
          <p style={{ color: '#7a5a5e', fontSize: '0.92rem' }}>
            {!opened ? birthdayConfig.gift.hint : "Forever and always, no expiry date"}
          </p>
        </div>
      </div>

      <div className="gift-stage" id="gift-stage" style={{ textAlign: 'center', margin: '0 auto', maxWidth: 580 }}>
        {!opened ? (
          <div style={{ padding: '30px 0' }}>
            <button
              className="gift-box bdy-pulse"
              id="gift-box"
              onClick={handleOpenGift}
              aria-label="Open your birthday gift"
              style={{
                border: 0,
                background: 'none',
                padding: 0,
                cursor: 'pointer',
                margin: '0 auto',
                display: 'block',
              }}
            >
              <span className="gift-body"></span>
              <span className="gift-shine"></span>
              <span className="gift-ribbon-v"></span>
              <span className="gift-lid"></span>
              <span className="gift-bow">
                <svg width="70" height="46" viewBox="0 0 70 46" fill="currentColor">
                  <path d="M35 30C24 30 18 22 18 14S24 2 30 6s5 16 5 24Zm0 0c11 0 17-8 17-16S46 2 40 6s-5 16-5 24Z" />
                  <circle cx="35" cy="31" r="8" />
                </svg>
              </span>
            </button>
            <p className="cut-help" style={{ position: 'static', transform: 'none', marginTop: 24 }}>
              ✨ Tap the gift box to unwrap your surprise ✨
            </p>
          </div>
        ) : (
          <div className="gift-reveal animate-fadeIn" style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 12 }}>
              <ChromaVideo
                src={birthdayConfig.assets.iLoveYou}
                label="I love you bear animation"
                size={110}
              />
            </div>

            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', color: '#88313b', marginBottom: 10 }}>
              {birthdayConfig.gift.revealTitle}
            </h3>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#4a3337', marginBottom: 20 }}>
              {birthdayConfig.gift.revealMessage}
            </p>

            {/* Coupons section */}
            <div
              className="gift-coupons"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 10,
                margin: '18px 0 28px',
              }}
            >
              {birthdayConfig.gift.coupons.map((coupon, idx) => (
                <span
                  key={idx}
                  className="gift-coupon"
                  style={{
                    background: '#fff2f4',
                    border: '1px dashed #e07a82',
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: '#8c353f',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  }}
                >
                  <Sparkles size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
                  {coupon}
                </span>
              ))}
            </div>

            <div className="signature" style={{ margin: '24px 0 16px', fontSize: '1.2rem', color: '#993a46', fontWeight: 600 }}>
              {birthdayConfig.context.signOff}
            </div>

            <button
              className="unlock-button"
              onClick={onRestart}
              style={{
                width: 'auto',
                padding: '12px 28px',
                background: '#5c4044',
                margin: '0 auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <RotateCcw size={16} /> Relive The Journey From Chapter 1
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

