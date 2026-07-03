"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PIXEL_COLS = 28;
const INK = { r: 61, g: 255, b: 122 };
const DEEP = { r: 4, g: 8, b: 6 };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type PixelAvatarProps = {
  src?: string;
  alt?: string;
  size?: number;
  initials?: string;
};

export function PixelAvatar({
  src = "/profile.jpg",
  alt = "Midhat Ratib Khan",
  size = 168,
  initials = "MRK",
}: PixelAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const aspect = img.naturalWidth / img.naturalHeight;
      const cols = PIXEL_COLS;
      const rows = Math.max(1, Math.round(cols / aspect));
      canvas.width = cols;
      canvas.height = rows;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, cols, rows);
      const frame = ctx.getImageData(0, 0, cols, rows);
      const data = frame.data;

      for (let i = 0; i < data.length; i += 4) {
        const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
        data[i] = lerp(DEEP.r, INK.r, lum);
        data[i + 1] = lerp(DEEP.g, INK.g, lum);
        data[i + 2] = lerp(DEEP.b, INK.b, lum);
      }

      ctx.putImageData(frame, 0, 0);
      setReady(true);
    };
    img.onerror = () => {
      if (!cancelled) setFailed(true);
    };

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="pixel-avatar-frame"
      style={{ width: size, height: size }}
    >
      {!failed ? (
        <canvas
          ref={canvasRef}
          className={`pixel-avatar-canvas ${ready ? "is-ready" : ""}`}
          role="img"
          aria-label={alt}
        />
      ) : (
        <div className="pixel-avatar-fallback" role="img" aria-label={alt}>
          <span>{initials}</span>
        </div>
      )}
      {!ready && !failed && (
        <div className="pixel-avatar-loading" aria-hidden>
          <div className="pixel-avatar-loading-dots">
            <span />
            <span />
            <span />
            <span />
          </div>
          <p className="pixel-avatar-loading-label">LOADING</p>
        </div>
      )}
      <span className="pixel-avatar-scan" aria-hidden />
    </motion.div>
  );
}
