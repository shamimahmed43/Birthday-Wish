import React, { useEffect, useRef } from 'react';

/**
 * ChromaVideo: Renders video with transparent background using canvas chroma-keying
 * exactly as done in enhance.js from the reference website.
 */
export default function ChromaVideo({ src, className = '', label = 'Sticker animation', size = 130 }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let ctx = canvas.getContext('2d', { willReadFrequently: true });
    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      if (video.videoWidth && video.videoHeight && !video.paused && !video.ended) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        const len = data.length;

        // Smooth cubic Hermite interpolation between 28 and 72
        const LOWER = 28;
        const UPPER = 72;
        const RANGE = UPPER - LOWER;

        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const max = Math.max(r, g, b);

          if (max <= LOWER) {
            data[i + 3] = 0;
          } else if (max < UPPER) {
            const t = (max - LOWER) / RANGE;
            const alpha = t * t * (3 - 2 * t);
            data[i + 3] = Math.round(alpha * 255);
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      animRef.current = requestAnimationFrame(render);
    };

    video.play().catch(() => {});
    animRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [src]);

  return (
    <div
      className={`bdy-vsticker ${className}`}
      role="img"
      aria-label={label}
      style={{ width: size, height: size, display: 'inline-block', position: 'relative' }}
    >
      <video
        ref={videoRef}
        src={src}
        crossOrigin="anonymous"
        autoPlay
        loop
        muted
        playsInline
        style={{ display: 'none' }}
      />
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}

