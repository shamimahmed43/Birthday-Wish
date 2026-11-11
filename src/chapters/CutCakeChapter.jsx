import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';

export default function CutCakeChapter({ onNext }) {
  const [candlesOut, setCandlesOut] = useState(false);
  const [cutCount, setCutCount] = useState(1);
  const [cuts, setCuts] = useState([]);
  const [knifePos, setKnifePos] = useState({ x: 0, y: 0, visible: false, rotation: 0 });

  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const dragStartRef = useRef(null);
  const creamRef = useRef([]);

  const handleBlowCandles = () => {
    setCandlesOut(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const width = (canvas.width = wrap.clientWidth || 360);
    const height = (canvas.height = 360);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let flameTime = 0;

    const render = () => {
      flameTime += 0.1;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.33;

      // Plate
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy + 12, radius * 1.42, radius * 1.3, 0, 0, Math.PI * 2);
      const plate = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius * 1.45);
      plate.addColorStop(0, '#fffdf8');
      plate.addColorStop(1, '#e8dccd');
      ctx.fillStyle = plate;
      ctx.shadowColor = 'rgba(37,25,29,.22)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 12;
      ctx.fill();
      ctx.restore();

      // Cake Wedges
      const angles = cuts.length
        ? cuts
            .reduce((acc, a) => acc.concat([a, a + Math.PI]), [])
            .map((a) => ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2))
            .sort((a, b) => a - b)
        : [];

      const wedges = [];
      if (angles.length === 0) {
        wedges.push([0, Math.PI * 2]);
      } else {
        for (let i = 0; i < angles.length; i += 1) {
          const start = angles[i];
          const end = i === angles.length - 1 ? angles[0] + Math.PI * 2 : angles[i + 1];
          wedges.push([start, end]);
        }
      }

      wedges.forEach(([start, end]) => {
        const mid = (start + end) / 2;
        const spread = cuts.length ? Math.min(10, 3 + cuts.length * 2) : 0;
        const ox = Math.cos(mid) * spread;
        const oy = Math.sin(mid) * spread;

        // Sponge
        ctx.save();
        ctx.translate(ox, oy + 16);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, start, end);
        ctx.closePath();
        ctx.fillStyle = '#c98d63';
        ctx.fill();

        // Cream layer
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, start, end);
        ctx.closePath();
        ctx.fillStyle = '#fcefe8';
        ctx.fill();

        // Top pink icing
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius - 4, start, end);
        ctx.closePath();
        const icing = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        icing.addColorStop(0, '#ffbcc7');
        icing.addColorStop(1, '#f78fa0');
        ctx.fillStyle = icing;
        ctx.fill();
        ctx.restore();
      });

      // Candles
      const candleCount = 5;
      for (let i = 0; i < candleCount; i++) {
        const ca = (i / candleCount) * Math.PI * 2;
        const cr = radius * 0.45;
        const canX = cx + Math.cos(ca) * cr;
        const canY = cy + Math.sin(ca) * cr;

        // Candle stick
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(canX - 3, canY - 22, 6, 22);

        // Flame if not blown out
        if (!candlesOut) {
          const flameFlicker = Math.sin(flameTime + i) * 2;
          ctx.beginPath();
          ctx.ellipse(canX + flameFlicker * 0.3, canY - 28, 4, 8, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#f97316';
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(canX + flameFlicker * 0.3, canY - 26, 2.5, 5, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#fde047';
          ctx.fill();
        }
      }

      // Cream crumbs
      creamRef.current.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 235, ${c.a})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [candlesOut, cuts]);

  // Pointer interactions for cutting cake
  const handlePointerDown = (e) => {
    if (!candlesOut) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    dragStartRef.current = { x: clientX - rect.left, y: clientY - rect.top };
    setKnifePos({ x: clientX - rect.left, y: clientY - rect.top, visible: true, rotation: 0 });
  };

  const handlePointerMove = (e) => {
    if (!candlesOut) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    let rot = 0;
    if (dragStartRef.current) {
      const dx = x - dragStartRef.current.x;
      const dy = y - dragStartRef.current.y;
      rot = (Math.atan2(dy, dx) * 180) / Math.PI - 90;

      // Drop cream crumbs
      creamRef.current.push({ x, y, r: 2 + Math.random() * 4, a: 0.6 });
      if (creamRef.current.length > 120) creamRef.current.shift();
    }

    setKnifePos({ x, y, visible: true, rotation: rot });
  };

  const handlePointerUp = (e) => {
    if (!dragStartRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const dx = x - dragStartRef.current.x;
    const dy = y - dragStartRef.current.y;
    dragStartRef.current = null;

    if (Math.hypot(dx, dy) > 55 && cuts.length < 6) {
      const newAngle = Math.atan2(dy, dx);
      const nextCuts = [...cuts, newAngle];
      setCuts(nextCuts);
      const newPieces = nextCuts.length * 2;
      setCutCount(newPieces);

      if (navigator.vibrate) navigator.vibrate(40);
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="chapter-page page-content cutcake-page">
      <div className="section-intro compact" style={{ textAlign: 'center', marginBottom: 14 }}>
        <div>
          <p className="eyebrow">{birthdayConfig.cake.eyebrow}</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {!candlesOut ? birthdayConfig.cake.title : "Now cut the cake!"}
          </h2>
          <p style={{ color: '#7a5a5e', fontSize: '0.92rem' }}>
            {!candlesOut
              ? "Tap the button below to blow out your birthday candles"
              : "Drag your finger or mouse across the cake to cut slices"}
          </p>
        </div>
      </div>

      {!candlesOut && (
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <button
            className="unlock-button bdy-pulse"
            onClick={handleBlowCandles}
            style={{ width: 'auto', padding: '12px 28px' }}
          >
            {birthdayConfig.cake.blowCandlesText}
          </button>
        </div>
      )}

      <div
        className="cutcake-stage"
        id="cutcake-stage"
        ref={wrapRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 380,
          height: 360,
          margin: '0 auto',
          cursor: candlesOut ? 'crosshair' : 'default',
          touchAction: 'none',
        }}
      >
        <canvas
          ref={canvasRef}
          className="cutcake-canvas"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Animated Knife element */}
        {candlesOut && knifePos.visible && (
          <div
            className="knife"
            style={{
              position: 'absolute',
              left: knifePos.x - 17,
              top: knifePos.y - 30,
              pointerEvents: 'none',
              transform: `rotate(${knifePos.rotation}deg)`,
              transition: 'transform 0.05s ease',
              zIndex: 10,
            }}
          >
            <svg viewBox="0 0 34 190" width="34" height="190">
              <defs>
                <linearGradient id="blade" x1="0" x2="1">
                  <stop offset="0" stopColor="#f3f6f8" />
                  <stop offset=".45" stopColor="#c7ced4" />
                  <stop offset=".55" stopColor="#eef2f5" />
                  <stop offset="1" stopColor="#98a1a8" />
                </linearGradient>
                <linearGradient id="handle" x1="0" x2="1">
                  <stop offset="0" stopColor="#4a2b24" />
                  <stop offset="1" stopColor="#25150f" />
                </linearGradient>
              </defs>
              <path d="M17 0 L26 34 L26 120 L8 120 L8 34 Z" fill="url(#blade)" />
              <rect x="7" y="120" width="20" height="10" rx="2" fill="#8d959b" />
              <rect x="9" y="130" width="16" height="58" rx="7" fill="url(#handle)" />
            </svg>
          </div>
        )}

        {candlesOut && (
          <span
            className="cut-count"
            style={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255,255,255,0.9)',
              padding: '4px 14px',
              borderRadius: 20,
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#553439',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            Pieces cut: {cutCount} 🍰
          </span>
        )}
      </div>

      {candlesOut && cuts.length >= 1 && (
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <button
            className="unlock-button bdy-pulse"
            onClick={onNext}
            style={{ width: 'auto', padding: '13px 30px' }}
          >
            {birthdayConfig.cake.doneButtonText}
            <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
        </div>
      )}
    </div>
  );
}

