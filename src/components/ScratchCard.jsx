import { useCallback, useEffect, useRef, useState } from 'react';
import { petals } from '../lib/petals';

function paintFoil(canvas, w, h, dpr) {
  const g = canvas.getContext('2d', { willReadFrequently: true });
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.globalCompositeOperation = 'source-over';
  const base = g.createLinearGradient(0, 0, w, h);
  base.addColorStop(0, '#6f1119');
  base.addColorStop(0.35, '#a82a35');
  base.addColorStop(0.6, '#7d151e');
  base.addColorStop(1, '#a3252f');
  g.fillStyle = base;
  g.fillRect(0, 0, w, h);

  // fine gold diagonal engraving
  g.strokeStyle = 'rgba(232,200,120,.16)';
  g.lineWidth = 0.7;
  for (let x = -h; x < w + h; x += 5) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x + h, h);
    g.stroke();
  }
  // speckle
  for (let i = 0; i < w * h * 0.04; i++) {
    g.fillStyle = Math.random() > 0.5 ? 'rgba(255,225,160,.22)' : 'rgba(40,0,6,.2)';
    g.fillRect(Math.random() * w, Math.random() * h, 1.2, 1.2);
  }
  // sheen
  const sheen = g.createLinearGradient(0, 0, w, 0);
  sheen.addColorStop(0.2, 'rgba(255,255,255,0)');
  sheen.addColorStop(0.5, 'rgba(255,240,200,.28)');
  sheen.addColorStop(0.8, 'rgba(255,255,255,0)');
  g.fillStyle = sheen;
  g.save();
  g.translate(w / 2, h / 2);
  g.rotate(-0.45);
  g.fillRect(-w, -h * 0.9, w * 2, h * 1.8);
  g.restore();
  // frame + label
  g.strokeStyle = 'rgba(232,200,120,.7)';
  g.lineWidth = 1;
  g.strokeRect(5.5, 5.5, w - 11, h - 11);
  g.fillStyle = 'rgba(255,236,190,.92)';
  g.font = '500 9px Montserrat, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  if ('letterSpacing' in g) g.letterSpacing = '3px';
  g.fillText('SCRATCH', w / 2, h / 2 + 12);
  g.font = '18px serif';
  if ('letterSpacing' in g) g.letterSpacing = '0px';
  g.fillText('✦', w / 2, h / 2 - 8);
}

export default function ScratchCard({ label, value, index, onDone, showHint, onTouched }) {
  const wrap = useRef(null);
  const cv = useRef(null);
  const st = useRef({ drawing: false, last: null, done: false, lastCheck: 0, dpr: 1, w: 0, h: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    const c = cv.current;
    const setup = () => {
      if (st.current.done) return;
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      st.current.dpr = dpr; st.current.w = r.width; st.current.h = r.height;
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      paintFoil(c, r.width, r.height, dpr);
    };
    setup();
    const ro = new ResizeObserver(() => { if (!st.current.drawing) setup(); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const finish = useCallback(() => {
    if (st.current.done) return;
    st.current.done = true;
    setDone(true);
    const r = wrap.current.getBoundingClientRect();
    petals.sparkle(r.left + r.width / 2, r.top + r.height / 2, 14, true);
    onDone?.(index);
  }, [index, onDone]);

  const pos = (e) => {
    const r = wrap.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const progress = () => {
    const c = cv.current;
    const data = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    let cleared = 0, total = 0;
    const step = 4 * 3; // sample every 3rd pixel
    for (let i = 3; i < data.length; i += step) { total++; if (data[i] < 40) cleared++; }
    return cleared / total;
  };

  const draw = (from, to) => {
    const g = cv.current.getContext('2d');
    g.setTransform(st.current.dpr, 0, 0, st.current.dpr, 0, 0);
    g.globalCompositeOperation = 'destination-out';
    g.lineWidth = 34;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.beginPath();
    g.moveTo(from.x, from.y);
    g.lineTo(to.x + 0.01, to.y);
    g.stroke();
  };

  const down = (e) => {
    if (st.current.done) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    st.current.drawing = true;
    const p = pos(e);
    st.current.last = p;
    draw(p, p);
    onTouched?.();
  };
  const move = (e) => {
    if (!st.current.drawing || st.current.done) return;
    const p = pos(e);
    draw(st.current.last, p);
    st.current.last = p;
    petals.sparkle(e.clientX, e.clientY, 1);
    const now = performance.now();
    if (now - st.current.lastCheck > 110) {
      st.current.lastCheck = now;
      if (progress() > 0.5) finish();
    }
  };
  const up = () => {
    st.current.drawing = false;
    if (!st.current.done && progress() > 0.5) finish();
  };

  return (
    <div className={`scratch scratch-${index} ${done ? 'is-done' : ''}`}>
      <span className="scratch-label">{label}</span>
      <div className="scratch-box" ref={wrap}>
        <div className="scratch-value" aria-live="polite">
          <span>{value}</span>
          <i className="shine" />
        </div>
        <canvas
          ref={cv}
          className="scratch-canvas"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          aria-label={`Scratch to reveal the ${label.toLowerCase()}`}
        />
        {showHint && !done && <span className="scratch-hint" aria-hidden />}
        <button className="sr-only" onClick={finish}>Reveal {label}</button>
      </div>
    </div>
  );
}
