import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Heart, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';

export default function PlayChapter({ onNext }) {
  const [part, setPart] = useState(1); // 1 = Scratch, 2 = Love Meter
  const [revealed, setRevealed] = useState(false);
  const [meterValue, setMeterValue] = useState(0);
  const [meterActive, setMeterActive] = useState(false);
  const [meterDone, setMeterDone] = useState(false);

  const canvasRef = useRef(null);
  const scratchingRef = useRef(false);

  // Scratch card setup
  useEffect(() => {
    if (part !== 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 340);
    const height = (canvas.height = 190);

    // Silver metallic scratch gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#c7ced4');
    grad.addColorStop(0.3, '#f2f4f7');
    grad.addColorStop(0.7, '#a5b0b8');
    grad.addColorStop(1, '#dfe4e8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle pattern & text
    ctx.font = 'bold 15px DM Sans, sans-serif';
    ctx.fillStyle = '#68727a';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH WITH FINGER OR MOUSE ✨', width / 2, height / 2);

    let scratchedPoints = 0;

    const scratch = (e) => {
      if (!scratchingRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      scratchedPoints++;
      if (scratchedPoints > 28 && !revealed) {
        setRevealed(true);
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      }
    };

    const handlePointerDown = (e) => {
      scratchingRef.current = true;
      scratch(e);
    };

    const handlePointerUp = () => {
      scratchingRef.current = false;
    };

    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', handlePointerUp);

    canvas.addEventListener('touchstart', handlePointerDown, { passive: true });
    canvas.addEventListener('touchmove', scratch, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      canvas.removeEventListener('mousedown', handlePointerDown);
      canvas.removeEventListener('mousemove', scratch);
      window.removeEventListener('mouseup', handlePointerUp);
      canvas.removeEventListener('touchstart', handlePointerDown);
      canvas.removeEventListener('touchmove', scratch);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [part]);

  // Love meter simulation
  const handleStartMeter = () => {
    if (meterActive || meterDone) return;
    setMeterActive(true);
    let val = 20;

    const interval = setInterval(() => {
      val += 3;
      setMeterValue(Math.min(val, 100));

      if (val >= 100) {
        clearInterval(interval);
        setMeterActive(false);
        setMeterDone(true);
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#e07a82', '#f3b4be', '#ffffff', '#ffd166'],
        });
      }
    }, 40);
  };

  return (
    <div className="chapter-page page-content play-page">
      <div className="section-intro compact" style={{ textAlign: 'center', marginBottom: 20 }}>
        <div>
          <p className="eyebrow">Chapter 3 • Mini Fun & Games</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {part === 1 ? birthdayConfig.play.scratch.title : birthdayConfig.play.meter.title}
          </h2>
          <p style={{ color: '#7a5a5e', fontSize: '0.95rem' }}>
            {part === 1 ? birthdayConfig.play.scratch.subtitle : birthdayConfig.play.meter.subtitle}
          </p>
        </div>
      </div>

      {part === 1 ? (
        <div className="scratch-stage" style={{ textAlign: 'center', margin: '0 auto', maxWidth: 360 }}>
          <div
            className="scratch-card-box"
            style={{
              position: 'relative',
              width: 340,
              height: 190,
              margin: '0 auto',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
              border: '2px solid #ecd3ce',
              background: '#fffdfb',
            }}
          >
            {/* Prize layer underneath */}
            <div
              className="prize-content"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 18,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #fff2f2 0%, #fffbf0 100%)',
              }}
            >
              <Trophy size={32} color="#e07a82" style={{ marginBottom: 6 }} />
              <p style={{ fontSize: '0.98rem', fontWeight: 600, color: '#4a2d32', lineHeight: 1.45 }}>
                {birthdayConfig.play.scratch.revealedPrize}
              </p>
            </div>

            {/* Canvas layer on top */}
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                inset: 0,
                cursor: 'pointer',
                touchAction: 'none',
                opacity: revealed ? 0 : 1,
                transition: revealed ? 'opacity 0.6s ease' : 'none',
                pointerEvents: revealed ? 'none' : 'auto',
              }}
            />
          </div>

          <p style={{ marginTop: 14, color: '#78565b', fontSize: '0.92rem' }}>
            {revealed ? "🎉 Surprise unlocked!" : "Scratch gently to unveil what's waiting..."}
          </p>

          {revealed && (
            <button
              className="unlock-button"
              onClick={() => setPart(2)}
              style={{ width: 'auto', padding: '12px 28px', marginTop: 18 }}
            >
              {birthdayConfig.play.scratch.proceedText}
            </button>
          )}
        </div>
      ) : (
        <div className="meter-stage" style={{ textAlign: 'center', margin: '0 auto', maxWidth: 380 }}>
          <div
            className="meter-container"
            style={{
              background: '#fffdfb',
              padding: '24px 20px',
              borderRadius: 18,
              boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
              border: '1px solid #f1dedb',
            }}
          >
            <div className="meter-gauge" style={{ width: 64, height: 210, background: '#fae9e7', borderRadius: 32, margin: '0 auto 18px', padding: 4, position: 'relative', overflow: 'hidden', border: '2px solid #ecd3ce' }}>
              <div
                className="meter-fill"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${meterValue}%`,
                  background: 'linear-gradient(to top, #e07a82, #f58d98, #ff6b81)',
                  borderRadius: '0 0 28px 28px',
                  transition: 'height 0.1s linear',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: meterValue > 45 ? '#ffffff' : '#8c4850',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  zIndex: 2,
                }}
              >
                {meterDone ? '∞%' : `${meterValue}%`}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Heart
                size={34}
                fill={meterDone ? '#e07a82' : 'none'}
                color="#e07a82"
                className={meterActive ? 'bdy-pulse' : ''}
                style={{ margin: '0 auto' }}
              />
            </div>

            <p style={{ color: '#573c41', fontSize: '0.98rem', lineHeight: 1.5, minHeight: 46 }}>
              {meterDone
                ? birthdayConfig.play.meter.completedMessage
                : meterActive
                ? "Measuring deep cardiac love waves... ❤️"
                : "Tap the button to test our compatibility!"}
            </p>

            {!meterDone ? (
              <button
                className="unlock-button"
                onClick={handleStartMeter}
                disabled={meterActive}
                style={{ width: 'auto', padding: '12px 28px', marginTop: 14 }}
              >
                {birthdayConfig.play.meter.buttonText}
              </button>
            ) : (
              <button
                className="unlock-button bdy-pulse"
                onClick={onNext}
                style={{ width: 'auto', padding: '13px 30px', marginTop: 14 }}
              >
                Proceed to Chapter 4 (Memory ATM)
                <ArrowRight size={18} style={{ marginLeft: 8 }} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

