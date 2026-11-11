import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export default function AtmChapter({ onNext }) {
  // ATM Steps: 'insert' | 'pin' | 'pinWrong' | 'menu' | 'memories' | 'balance' | 'wish' | 'wishDone' | 'receipt' | 'cardReturn' | 'thanks'
  const [step, setStep] = useState('insert');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [wishText, setWishText] = useState('');
  const [cardInserted, setCardInserted] = useState(false);
  const [receiptCollected, setReceiptCollected] = useState(false);
  const [cardTaken, setCardTaken] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  // Card insertion
  const handleInsertCard = () => {
    if (step !== 'insert') return;
    setCardInserted(true);
    showToast('Card accepted ✨');
    setTimeout(() => {
      setStep('pin');
    }, 700);
  };

  // Keypad press handler
  const handleKeyPress = (key) => {
    if (step === 'pin' || step === 'pinWrong') {
      if (key === 'C') {
        setPin('');
        setPinError(false);
        return;
      }
      if (key === 'E') {
        validatePin(pin);
        return;
      }
      if (pin.length < 4) {
        const newPin = pin + key;
        setPin(newPin);
        if (newPin.length === 4) {
          validatePin(newPin);
        }
      }
    }
  };

  const validatePin = (inputPin) => {
    if (inputPin === birthdayConfig.passwords.atmPin) {
      setPinError(false);
      setStep('menu');
      showToast('PIN Verified! Welcome My Queen ❤️');
    } else {
      setPinError(true);
      setStep('pinWrong');
      setPin('');
      if (navigator.vibrate) navigator.vibrate([80, 50, 80]);
      setTimeout(() => {
        setStep('pin');
      }, 1400);
    }
  };

  // Receipt collection
  const handleTakeReceipt = () => {
    if (step !== 'receipt') return;
    setReceiptCollected(true);
    showToast('Receipt taken 🧾');
    setTimeout(() => {
      setStep('cardReturn');
    }, 800);
  };

  // Card retrieval on exit
  const handleTakeCard = () => {
    if (step !== 'cardReturn') return;
    setCardTaken(true);
    setCardInserted(false);
    showToast('Card retrieved 💳');
    setTimeout(() => {
      setStep('thanks');
    }, 600);
  };

  return (
    <div className="chapter-page page-content atm-page">
      <div className="section-intro compact" style={{ textAlign: 'center', marginBottom: 14 }}>
        <div>
          <p className="eyebrow">Chapter 4 • Special Interactive Feature</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            The Memory ATM ({birthdayConfig.atm.topperText})
          </h2>
          <p style={{ color: '#7a5a5e', fontSize: '0.92rem' }}>
            {step === 'insert' && "Tap the ATM card to slide it into the slot"}
            {step === 'pin' && "Enter your 4-digit ATM PIN (Hint: 1207)"}
            {step === 'menu' && "Select an option from the screen or side buttons"}
            {step === 'memories' && "Browse favorite captured memories"}
            {step === 'balance' && "Emotional Account Balance Statement"}
            {step === 'wish' && "Make a wish on the ATM machine"}
            {step === 'receipt' && "Tap the receipt paper to collect it"}
            {step === 'cardReturn' && "Tap the card to retrieve it from the slot"}
            {step === 'thanks' && "Session completed with love ❤️"}
          </p>
        </div>
      </div>

      <div className="atm-stage" id="atm-stage" style={{ position: 'relative', margin: '0 auto' }}>
        {/* ATM booth backdrop */}
        {birthdayConfig.assets.atmBg && (
          <img
            className="atm-booth-bg"
            src={birthdayConfig.assets.atmBg}
            alt="ATM booth background"
            loading="lazy"
          />
        )}

        {toast && <div className="atm-toast">{toast}</div>}

        <div className="atm-machine">
          <div className="atm-topper">{birthdayConfig.atm.topperText}</div>

          <div className="atm-body">
            <div className="atm-face">
              {/* Left Side Rail Buttons */}
              <div className="side-rail left" id="rail-left">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    className="side-btn"
                    disabled={step !== 'menu' && step !== 'memories' && step !== 'balance' && step !== 'wishDone'}
                    onClick={() => {
                      if (step === 'menu') {
                        if (i === 0) setStep('memories');
                        if (i === 1) setStep('balance');
                        if (i === 2) setStep('wish');
                        if (i === 3) setStep('receipt');
                      } else if (step === 'memories') {
                        if (i === 3) setMemoryIndex((prev) => Math.max(0, prev - 1));
                      } else if (step === 'balance' || step === 'wishDone') {
                        if (i === 3) setStep('menu');
                      }
                    }}
                    aria-label={`Left option ${i + 1}`}
                  />
                ))}
              </div>

              {/* ATM CRT Screen */}
              <div className="atm-screen-frame">
                <div className="atm-screen screen-fade" id="atm-screen">
                  {/* Step: INSERT */}
                  {step === 'insert' && (
                    <div className="screen-center animate-fadeIn" style={{ textAlign: 'center', padding: '24px 12px' }}>
                      <p className="screen-tag" style={{ letterSpacing: 2, color: '#38bdf8', fontSize: '0.8rem' }}>PHOTO BANK SYSTEM</p>
                      <h4 style={{ color: '#ffffff', margin: '12px 0 8px', fontSize: '1.25rem' }}>PLEASE INSERT CARD</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Tap your ATM card below to begin</p>
                      <div className="screen-card-anim" style={{ marginTop: 14 }}>💳 ➔ [SLOT]</div>
                    </div>
                  )}

                  {/* Step: PIN ENTRY */}
                  {(step === 'pin' || step === 'pinWrong') && (
                    <div className="screen-center animate-fadeIn" style={{ textAlign: 'center', padding: '20px 12px' }}>
                      <p className="screen-tag" style={{ color: '#38bdf8', fontSize: '0.78rem' }}>SECURITY VERIFICATION</p>
                      <h4 style={{ color: '#ffffff', margin: '8px 0', fontSize: '1.2rem' }}>
                        {step === 'pinWrong' ? 'INCORRECT PIN' : 'ENTER 4-DIGIT PIN'}
                      </h4>
                      <div className="pin-dots" style={{ display: 'flex', justifyContent: 'center', gap: 10, margin: '14px 0' }}>
                        {[0, 1, 2, 3].map((i) => (
                          <span
                            key={i}
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: '50%',
                              border: '2px solid #38bdf8',
                              background: i < pin.length ? '#38bdf8' : 'transparent',
                              display: 'inline-block',
                            }}
                          />
                        ))}
                      </div>
                      <p style={{ color: step === 'pinWrong' ? '#f87171' : '#94a3b8', fontSize: '0.82rem' }}>
                        {step === 'pinWrong'
                          ? 'Access denied. Please try again.'
                          : 'Use keypad below (Hint: 1207)'}
                      </p>
                    </div>
                  )}

                  {/* Step: MAIN MENU */}
                  {step === 'menu' && (
                    <div className="screen-menu animate-fadeIn" style={{ padding: '12px 8px', color: '#ffffff' }}>
                      <p style={{ textAlign: 'center', color: '#38bdf8', fontSize: '0.82rem', margin: '0 0 8px', borderBottom: '1px solid rgba(56,189,248,0.3)', paddingBottom: 4 }}>
                        MAIN MENU • WELCOME {birthdayConfig.recipient.name}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.86rem' }}>
                        <div
                          onClick={() => setStep('memories')}
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px 8px', background: 'rgba(56,189,248,0.15)', borderRadius: 4 }}
                        >
                          <span style={{ color: '#38bdf8', marginRight: 8 }}>◀ 1.</span>
                          <span>Withdraw Memories</span>
                        </div>
                        <div
                          onClick={() => setStep('balance')}
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px 8px', background: 'rgba(56,189,248,0.15)', borderRadius: 4 }}
                        >
                          <span style={{ color: '#38bdf8', marginRight: 8 }}>◀ 2.</span>
                          <span>Emotional Balance Inquiry</span>
                        </div>
                        <div
                          onClick={() => setStep('wish')}
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px 8px', background: 'rgba(56,189,248,0.15)', borderRadius: 4 }}
                        >
                          <span style={{ color: '#38bdf8', marginRight: 8 }}>◀ 3.</span>
                          <span>Make a Birthday Wish</span>
                        </div>
                        <div
                          onClick={() => setStep('receipt')}
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px 8px', background: 'rgba(239,68,68,0.2)', borderRadius: 4 }}
                        >
                          <span style={{ color: '#f87171', marginRight: 8 }}>◀ 4.</span>
                          <span>Exit Session & Print Receipt</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step: MEMORIES CAROUSEL */}
                  {step === 'memories' && (
                    <div className="screen-memories animate-fadeIn" style={{ padding: '8px', color: '#ffffff', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#38bdf8', marginBottom: 6 }}>
                        <span>MEMORY {memoryIndex + 1}/{birthdayConfig.atm.memories.length}</span>
                        <span onClick={() => setStep('menu')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Menu ✕</span>
                      </div>
                      <div style={{ width: '100%', height: 115, borderRadius: 6, overflow: 'hidden', background: '#000', margin: '0 auto 6px' }}>
                        <img
                          src={birthdayConfig.atm.memories[memoryIndex].img}
                          alt="Memory"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <p style={{ fontSize: '0.82rem', color: '#e2e8f0', margin: '4px 0 6px', fontWeight: 600 }}>
                        {birthdayConfig.atm.memories[memoryIndex].caption}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginTop: 4 }}>
                        <button
                          className="screen-btn"
                          disabled={memoryIndex === 0}
                          onClick={() => setMemoryIndex((p) => Math.max(0, p - 1))}
                          style={{ flex: 1, padding: '4px 8px', fontSize: '0.75rem', background: '#1e293b', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: 4 }}
                        >
                          ◀ Prev
                        </button>
                        <button
                          className="screen-btn"
                          onClick={() => {
                            if (memoryIndex < birthdayConfig.atm.memories.length - 1) {
                              setMemoryIndex((p) => p + 1);
                            } else {
                              setStep('menu');
                            }
                          }}
                          style={{ flex: 1, padding: '4px 8px', fontSize: '0.75rem', background: '#38bdf8', color: '#0f172a', fontWeight: 700, border: 'none', borderRadius: 4 }}
                        >
                          {memoryIndex < birthdayConfig.atm.memories.length - 1 ? 'Next ▶' : 'Done ✕'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step: BALANCE INQUIRY */}
                  {step === 'balance' && (
                    <div className="screen-balance animate-fadeIn" style={{ padding: '10px 8px', color: '#ffffff' }}>
                      <p style={{ textAlign: 'center', color: '#38bdf8', fontSize: '0.8rem', margin: '0 0 6px', borderBottom: '1px solid rgba(56,189,248,0.3)', paddingBottom: 2 }}>
                        EMOTIONAL BALANCE INQUIRY
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.78rem' }}>
                        {birthdayConfig.atm.balance.map((item, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 4px', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                            <span style={{ color: '#cbd5e1' }}>{item.label}</span>
                            <span style={{ color: '#38bdf8', fontWeight: 700 }}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setStep('menu')}
                        style={{ marginTop: 8, width: '100%', padding: '4px', fontSize: '0.78rem', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: 4, fontWeight: 700 }}
                      >
                        ◀ Return to Main Menu
                      </button>
                    </div>
                  )}

                  {/* Step: BIRTHDAY WISH */}
                  {step === 'wish' && (
                    <div className="screen-wish animate-fadeIn" style={{ padding: '10px 8px', color: '#ffffff', textAlign: 'center' }}>
                      <p style={{ color: '#38bdf8', fontSize: '0.8rem', margin: '0 0 6px' }}>MAKE A BIRTHDAY WISH</p>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: 6 }}>Type your wish into the ATM console:</p>
                      <input
                        type="text"
                        value={wishText}
                        onChange={(e) => setWishText(e.target.value)}
                        placeholder="Type your wish here..."
                        style={{ width: '92%', padding: '6px 8px', background: '#0f172a', border: '1px solid #38bdf8', color: '#ffffff', borderRadius: 4, fontSize: '0.82rem', marginBottom: 8 }}
                      />
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => {
                            if (wishText.trim()) setStep('wishDone');
                          }}
                          style={{ flex: 1, padding: '5px', fontSize: '0.78rem', background: '#38bdf8', color: '#0f172a', fontWeight: 700, border: 'none', borderRadius: 4 }}
                        >
                          Confirm Wish ✨
                        </button>
                        <button
                          onClick={() => setStep('menu')}
                          style={{ padding: '5px 10px', fontSize: '0.78rem', background: '#334155', color: '#ffffff', border: 'none', borderRadius: 4 }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step: WISH CONFIRMED */}
                  {step === 'wishDone' && (
                    <div className="screen-center animate-fadeIn" style={{ textAlign: 'center', padding: '24px 10px', color: '#ffffff' }}>
                      <p style={{ color: '#4ade80', fontSize: '1.2rem', margin: '0 0 6px' }}>WISH REGISTERED ✨</p>
                      <p style={{ color: '#e2e8f0', fontSize: '0.82rem', lineHeight: 1.4 }}>
                        "{wishText}" has been locked in the universe & guaranteed to come true!
                      </p>
                      <button
                        onClick={() => setStep('menu')}
                        style={{ marginTop: 12, padding: '4px 14px', fontSize: '0.78rem', background: '#38bdf8', color: '#0f172a', fontWeight: 700, border: 'none', borderRadius: 4 }}
                      >
                        Back to Menu
                      </button>
                    </div>
                  )}

                  {/* Step: RECEIPT PRINTING */}
                  {step === 'receipt' && (
                    <div className="screen-center animate-fadeIn" style={{ textAlign: 'center', padding: '20px 8px', color: '#ffffff' }}>
                      <p style={{ color: '#38bdf8', fontSize: '0.8rem', margin: '0 0 6px' }}>SESSION ENDING</p>
                      <h4 style={{ color: '#ffffff', margin: '6px 0', fontSize: '1.1rem' }}>PRINTING RECEIPT...</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Please collect your receipt from the slot below</p>
                    </div>
                  )}

                  {/* Step: CARD RETURN */}
                  {step === 'cardReturn' && (
                    <div className="screen-center animate-fadeIn" style={{ textAlign: 'center', padding: '20px 8px', color: '#ffffff' }}>
                      <p style={{ color: '#4ade80', fontSize: '0.8rem', margin: '0 0 6px' }}>CARD EJECTED</p>
                      <h4 style={{ color: '#ffffff', margin: '6px 0', fontSize: '1.1rem' }}>PLEASE TAKE CARD</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Tap your ATM card to collect it</p>
                    </div>
                  )}

                  {/* Step: THANKS */}
                  {step === 'thanks' && (
                    <div className="screen-center animate-fadeIn" style={{ textAlign: 'center', padding: '24px 10px', color: '#ffffff' }}>
                      <p style={{ color: '#ec4899', fontSize: '1.3rem', margin: '0 0 6px' }}>THANK YOU ❤️</p>
                      <p style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>
                        Thank you for banking with the Bank of Love. All wishes and memories are stored forever.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side Rail Buttons */}
              <div className="side-rail right" id="rail-right">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    className="side-btn"
                    disabled={step !== 'memories'}
                    onClick={() => {
                      if (step === 'memories' && i === 3) {
                        if (memoryIndex < birthdayConfig.atm.memories.length - 1) {
                          setMemoryIndex((p) => p + 1);
                        } else {
                          setStep('menu');
                        }
                      }
                    }}
                    aria-label={`Right option ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ATM Shelf with Card Slot and Receipt Slot */}
            <div className="atm-shelf">
              <div className="slot-group">
                <span className="slot-label">Card Slot</span>
                <div
                  className={`card-slot ${cardInserted ? 'active' : ''}`}
                  onClick={step === 'cardReturn' ? handleTakeCard : handleInsertCard}
                  style={{ cursor: 'pointer' }}
                >
                  <span className={`slot-led ${cardInserted ? 'active' : ''}`} />
                </div>
              </div>

              <div className="slot-group">
                <span className="slot-label">Receipt</span>
                <div
                  className="receipt-slot"
                  onClick={handleTakeReceipt}
                  style={{ cursor: step === 'receipt' ? 'pointer' : 'default' }}
                >
                  {step === 'receipt' && !receiptCollected && (
                    <div
                      className="receipt-paper animate-slideDown"
                      onClick={handleTakeReceipt}
                      style={{
                        position: 'absolute',
                        top: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#ffffff',
                        padding: '6px 10px',
                        borderRadius: 3,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                        fontSize: '0.72rem',
                        color: '#000',
                        cursor: 'pointer',
                        zIndex: 10,
                        width: 90,
                        textAlign: 'center',
                        lineHeight: 1.3,
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>PHOTO BANK</div>
                      <div>RECEIPT</div>
                      <div style={{ borderTop: '1px dashed #999', margin: '4px 0' }}></div>
                      <div>LOVE: 100%</div>
                      <div>MEMORIES: ∞</div>
                      <div style={{ fontSize: '0.65rem', color: '#666', marginTop: 4 }}>[TAP TO TAKE]</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ATM Keypad */}
            <div className="atm-keypad" id="atm-keypad">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'E'].map((key) => (
                <button
                  key={key}
                  className={`key ${key === 'E' ? 'enter' : ''} ${key === 'C' ? 'cancel' : ''}`}
                  onClick={() => handleKeyPress(key)}
                  data-key={key}
                >
                  {key === 'E' ? 'ENTER' : key === 'C' ? 'CLR' : key}
                </button>
              ))}
            </div>

            <div className="cash-slot"></div>
          </div>
          <div className="atm-base"></div>
        </div>

        {/* ATM Card element */}
        {!cardInserted && (
          <div
            className={`atm-card ${step === 'insert' ? 'bdy-pulse' : ''}`}
            id="atm-card"
            role="button"
            tabIndex={0}
            onClick={handleInsertCard}
            style={{ cursor: 'pointer', margin: '18px auto 8px' }}
          >
            <span className="card-bank">{birthdayConfig.atm.cardBank}</span>
            <span className="chip"></span>
            <span className="card-name">{birthdayConfig.atm.cardName}</span>
          </div>
        )}

        {step === 'insert' && (
          <span className="card-hint" id="card-hint" style={{ display: 'block', textAlign: 'center', marginTop: 8 }}>
            👆 Tap the card to slide it into the machine
          </span>
        )}

        {/* Proceed button after ATM completion */}
        {(step === 'thanks' || receiptCollected) && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button
              className="unlock-button bdy-pulse"
              onClick={onNext}
              style={{ width: 'auto', padding: '13px 30px' }}
            >
              Continue to Chapter 5 (Cut The Cake)
              <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

