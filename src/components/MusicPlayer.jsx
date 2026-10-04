import { useCallback, useEffect, useRef, useState } from 'react';
import { MUSIC } from '../config';

// Starts when `start` flips true (the envelope tap = the user gesture browsers require),
// fades in, pauses when the tab is hidden, and offers a mute toggle.
export default function MusicPlayer({ start }) {
  const audio = useRef(null);
  const fade = useRef(0);
  const [available, setAvailable] = useState(true);
  const [on, setOn] = useState(false);
  const wanted = useRef(false); // does the guest want music? (survives tab switches)

  const ramp = useCallback((to, ms, done) => {
    cancelAnimationFrame(fade.current);
    const a = audio.current;
    if (!a) return;
    const from = a.volume;
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      a.volume = Math.max(0, Math.min(1, from + (to - from) * k));
      if (k < 1) fade.current = requestAnimationFrame(step);
      else done?.();
    };
    fade.current = requestAnimationFrame(step);
  }, []);

  const play = useCallback(() => {
    const a = audio.current;
    if (!a) return;
    a.volume = 0;
    a.play().then(() => { setOn(true); ramp(MUSIC.volume, MUSIC.fadeMs); }).catch(() => setOn(false));
  }, [ramp]);

  const pause = useCallback(() => {
    ramp(0, 500, () => audio.current?.pause());
    setOn(false);
  }, [ramp]);

  useEffect(() => {
    if (start && available && !wanted.current) { wanted.current = true; play(); }
  }, [start, available, play]);

  useEffect(() => {
    const onVis = () => {
      const a = audio.current;
      if (!a || !wanted.current) return;
      if (document.hidden) { a.pause(); }
      else if (on || a.paused) { a.play().catch(() => {}); }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [on]);

  const toggle = () => {
    if (on) { wanted.current = false; pause(); }
    else { wanted.current = true; play(); }
  };

  return (
    <>
      <audio ref={audio} src={MUSIC.src} loop preload="auto" onError={() => setAvailable(false)} />
      {available && start && (
        <div className="fixed-frame music-layer">
          <button className={`music-btn ${on ? 'is-on' : ''}`} onClick={toggle} aria-pressed={on} aria-label={on ? 'Mute music' : 'Play music'}>
            <span className="eq" aria-hidden><i /><i /><i /><i /></span>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 9.5v5h3.5L12 19V5L7.5 9.5H4Z" />
              {on ? <path d="M15.5 9a4 4 0 0 1 0 6M18 6.500a8 8 0 0 1 0 11" /> : <path d="m16 9.500 5 5M21 9.500l-5 5" />}
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
