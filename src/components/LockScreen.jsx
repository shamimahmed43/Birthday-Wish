import React, { useState } from 'react';
import { LockKeyhole, KeyRound, Sparkles, Heart } from 'lucide-react';
import FloatingDecor from './FloatingDecor';
import { birthdayConfig } from '../config/birthdayConfig';

export default function LockScreen({ onUnlock }) {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = passkey.trim();

    if (cleanInput === birthdayConfig.passwords.websitePasskey) {
      setError(false);
      setLoading(true);

      // Save to localStorage so visitor does not have to re-enter on refresh
      try {
        localStorage.setItem('bdy_unlocked_site', 'true');
      } catch (err) {
        console.warn('localStorage access failed:', err);
      }

      // Smooth loading transition matching reference
      setTimeout(() => {
        onUnlock();
      }, 1400);
    } else {
      setError(true);
      setShaking(true);
      if (navigator.vibrate) navigator.vibrate([100, 55, 100]);
      setTimeout(() => setShaking(false), 700);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 8);
    setPasskey(val);
    if (error) setError(false);
  };

  if (loading) {
    return (
      <main className="lock-screen">
        <FloatingDecor />
        <div className="lock-card" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div className="lock-seal bdy-pulse" style={{ margin: '0 auto 20px' }}>
            <Heart size={32} fill="currentColor" color="#d35d6e" />
          </div>
          <p className="eyebrow">Opening the door...</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', margin: '8px 0' }}>
            Preparing your surprise
          </h2>
          <p className="lock-copy">Unfolding the letters, blowing up the balloons, pouring the love.</p>
          <div style={{ width: '160px', height: '4px', background: '#fae5df', borderRadius: '99px', margin: '24px auto 0', overflow: 'hidden' }}>
            <div className="bdy-loading-bar" style={{ width: '100%', height: '100%', background: '#e07a82', borderRadius: '99px' }}></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="lock-screen">
      <FloatingDecor />
      <div className={`lock-card ${shaking ? 'shake' : ''}`} id="lock-card">
        <div className="lock-seal">
          <LockKeyhole size={30} />
        </div>
        <p className="eyebrow">A little secret for</p>
        <h1>{birthdayConfig.recipient.name}</h1>
        <p className="lock-copy">Something beautiful is waiting behind this tiny lock.</p>
        
        <form onSubmit={handleSubmit} id="lock-form">
          <label htmlFor="passkey">Enter the passkey</label>
          <div className="input-wrap">
            <KeyRound size={18} />
            <input
              id="passkey"
              value={passkey}
              onChange={handleInputChange}
              placeholder="DDMMYYYY"
              inputMode="numeric"
              autoComplete="off"
              maxLength={8}
              autoFocus
            />
          </div>
          
          <p className="hint">
            <Sparkles size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
            Hint: Your birthday date, month and year (numbers only)
          </p>

          {error && (
            <p className="error-message" id="lock-error">
              Nope, my love. That key does not fit. Try once more. 🥺
            </p>
          )}

          <button className="unlock-button" type="submit">
            Open my surprise <Heart size={18} fill="currentColor" style={{ marginLeft: 6 }} />
          </button>
        </form>

        <span className="tiny-note">Made with a ridiculous amount of love</span>
      </div>
    </main>
  );
}

