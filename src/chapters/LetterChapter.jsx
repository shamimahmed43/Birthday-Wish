import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import ChromaVideo from '../components/ChromaVideo';

export default function LetterChapter({ onNext }) {
  const [opened, setOpened] = useState(false);
  const [typedIndex, setTypedIndex] = useState(0);

  const fullLetter = birthdayConfig.letter.paragraphs.join('\n\n');

  useEffect(() => {
    if (!opened) return;
    if (typedIndex < fullLetter.length) {
      const timer = setTimeout(() => {
        setTypedIndex((prev) => Math.min(prev + 2, fullLetter.length));
      }, 16);
      return () => clearTimeout(timer);
    }
  }, [opened, typedIndex, fullLetter.length]);

  return (
    <div className="chapter-page page-content letter-page">
      <div className="section-intro compact" style={{ textAlign: 'center', marginBottom: 20 }}>
        <div>
          <p className="eyebrow">Chapter 2 • Words from the heart</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {opened ? "A Letter For My Queen" : birthdayConfig.letter.envelopeTitle}
          </h2>
        </div>
      </div>

      {!opened ? (
        <div className="envelope-stage" style={{ textAlign: 'center', padding: '20px 0' }}>
          <div
            className="envelope-wrap"
            onClick={() => setOpened(true)}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer', margin: '0 auto' }}
          >
            <div className="envelope">
              <div className="envelope-flap"></div>
              <div className="envelope-pocket">
                <div className="wax-seal bdy-pulse" style={{ cursor: 'pointer' }}>
                  <Heart size={26} fill="currentColor" color="#b33945" />
                </div>
                <p className="envelope-to" style={{ marginTop: 24, fontWeight: 600, color: '#6d4c4f' }}>
                  To: {birthdayConfig.recipient.name}
                </p>
                <span className="envelope-hint">
                  <Sparkles size={13} style={{ display: 'inline', marginRight: 4 }} />
                  {birthdayConfig.letter.envelopeHint}
                </span>
              </div>
            </div>
          </div>
          <p style={{ marginTop: 18, color: '#7a5a5e', fontSize: '0.95rem' }}>
            Click the envelope to unseal and read ❤️
          </p>
        </div>
      ) : (
        <div className="letter-wrapper animate-fadeIn" style={{ maxWidth: 580, margin: '0 auto' }}>
          <div className="letter-paper" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 12, right: 16 }}>
              <ChromaVideo
                src={birthdayConfig.assets.hugBears}
                label="Hugging bears"
                size={80}
              />
            </div>

            <div className="letter-stamp" style={{ fontSize: '1.8rem', marginBottom: 12 }}>💌</div>
            
            <h3 style={{ fontFamily: 'Sacramento, cursive', fontSize: '2.4rem', color: '#8c353f', marginBottom: 14 }}>
              {birthdayConfig.letter.salutation}
            </h3>

            <div
              className="letter-body"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.25rem',
                lineHeight: 1.7,
                color: '#3d2b2f',
                whiteSpace: 'pre-line',
                minHeight: 220
              }}
            >
              {fullLetter.slice(0, typedIndex)}
              {typedIndex < fullLetter.length && <span className="typewriter-cursor">|</span>}
            </div>

            {typedIndex >= fullLetter.length && (
              <div className="letter-sign" style={{ marginTop: 28, textAlign: 'right' }}>
                <p style={{ fontStyle: 'italic', color: '#6a4a4e', marginBottom: 4 }}>
                  {birthdayConfig.letter.closing}
                </p>
                <p style={{ fontFamily: 'Sacramento, cursive', fontSize: '2.1rem', color: '#993a46' }}>
                  {birthdayConfig.letter.signature}
                </p>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <button
              className="unlock-button"
              onClick={onNext}
              style={{ width: 'auto', padding: '13px 30px' }}
            >
              Continue to Chapter 3 (Mini Games)
              <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

