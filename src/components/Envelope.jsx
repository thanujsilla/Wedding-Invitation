import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { petals } from '../lib/petals';
import { COUPLE } from '../config';

// Embossed floral motif — drawn twice (shadow + highlight) to fake a debossed paper texture.
function EmbossDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <g id="motif" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1">
          {/* flower */}
          <g transform="translate(40 40)">
            {[0, 72, 144, 216, 288].map((r) => (<path key={r} d="M0 0 C-9 -8 -9 -20 0 -27 C9 -20 9 -8 0 0Z" transform={`rotate(${r})`} />))}
            <circle r="3.2" />
            <circle r="7.5" strokeDasharray="1.4 2.6" />
          </g>
          {/* vine + leaves */}
          <path d="M70 70 C96 60 108 88 130 80 S150 52 146 34" />
          {[[86, 70, -30], [108, 82, 25], [128, 78, -40], [144, 52, 20]].map(([x, y, r], i) => (
            <path key={i} d="M0 0 C6 -8 16 -8 22 0 C16 8 6 8 0 0Z" transform={`translate(${x} ${y}) rotate(${r})`} />
          ))}
          <g transform="translate(112 118) rotate(18)">
            {[0, 60, 120, 180, 240, 300].map((r) => (<path key={r} d="M0 0 C-5 -5 -5 -12 0 -16 C5 -12 5 -5 0 0Z" transform={`rotate(${r})`} />))}
          </g>
          <path d="M10 130 C30 118 44 142 62 132" />
          <path d="M20 128 c4 -9 14 -10 18 -4 c-6 6 -12 8 -18 4Z" />
        </g>
        <pattern id="emb" width="160" height="160" patternUnits="userSpaceOnUse">
          <use href="#motif" stroke="rgba(30,0,4,.5)" transform="translate(1 1.4)" />
          <use href="#motif" stroke="rgba(255,150,140,.34)" transform="translate(-.5 -.7)" />
          <use href="#motif" stroke="rgba(30,0,4,.5)" transform="translate(81 81.4)" />
          <use href="#motif" stroke="rgba(255,150,140,.34)" transform="translate(80.5 80.3)" />
        </pattern>
      </defs>
    </svg>
  );
}

const Flap = ({ side }) => (
  <div className={`flap flap-${side}`}>
    <svg className="emboss" aria-hidden><rect width="100%" height="100%" fill="url(#emb)" /></svg>
  </div>
);

export default function Envelope({ onOpen, onStart }) {
  const [phase, setPhase] = useState('loading'); // loading → ready → opening

  useEffect(() => {
    let alive = true;
    const minWait = new Promise((r) => setTimeout(r, 2100));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.all([minWait, fonts]).then(() => alive && setPhase('ready'));
    return () => { alive = false; };
  }, []);

  const open = () => {
    if (phase !== 'ready') return;
    setPhase('opening');
    onStart?.(); // inside the tap, so browsers allow audio to start
    navigator.vibrate?.(20);
    const { w, h } = petals.size();
    petals.burst({ count: 70, x: w / 2, y: h / 2, spread: 1.1 });
    setTimeout(() => petals.burst({ count: 110, duration: 900 }), 900);
    setTimeout(onOpen, 2350);
  };

  return (
    <div className={`fixed-frame env-layer env-${phase}`}>
      <motion.div className="env" exit={{ opacity: 0 }} transition={{ duration: 1 }}>
        <EmbossDefs />
        <div className="env-stage">
          <div className="env-inner" />
          <div className="env-card">
            <div className="env-card-border">
              <span className="env-card-kicker">together with their families</span>
              <span className="env-card-names">{COUPLE.bride}<em>&amp;</em>{COUPLE.groom}</span>
              <span className="env-card-kicker">invite you to their wedding</span>
            </div>
          </div>
          <Flap side="bottom" />
          <Flap side="left" />
          <Flap side="right" />
          <Flap side="top" />
          <svg className="env-folds" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <path d="M0 0 L50 50 L100 0 M0 100 L50 50 L100 100 M0 0 L50 50 L0 100 M100 0 L50 50 L100 100" />
          </svg>
          <div className="env-vignette" />
        </div>

        <button className="env-star" onClick={open} aria-label="Open the invitation" disabled={phase !== 'ready'}>
          <span className="env-ring" />
          <span className="env-rays" />
          <svg viewBox="-50 -50 100 100" className="env-starsvg" aria-hidden>
            <defs>
              <radialGradient id="stCore"><stop offset="0" stopColor="#fff" /><stop offset=".35" stopColor="#ffe9a8" /><stop offset="1" stopColor="#ff8a1e" stopOpacity="0" /></radialGradient>
            </defs>
            <circle r="46" fill="url(#stCore)" opacity=".85" />
            <path d="M0 -44 Q3 -3 44 0 Q3 3 0 44 Q-3 3 -44 0 Q-3 -3 0 -44Z" fill="#fff6d8" />
            <path d="M0 -26 Q2 -2 26 0 Q2 2 0 26 Q-2 2 -26 0 Q-2 -2 0 -26Z" fill="#fff" transform="rotate(45)" />
          </svg>
        </button>

        <div className="env-label" aria-live="polite">
          <span className="env-label-load">Preparing your invitation</span>
          <span className="env-label-ready">Tap to open</span>
        </div>
        <div className="env-top">You are invited</div>
      </motion.div>
    </div>
  );
}
