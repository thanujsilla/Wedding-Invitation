import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import { CornerFlourish, Divider } from '../lib/art';
import { WEDDING_DATE } from '../config';

function calc() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  const past = diff <= 0;
  const s = Math.max(0, Math.floor(diff / 1000));
  return {
    past,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

function Rosette() {
  return (
    <svg viewBox="-100 -100 200 200" className="rosette" aria-hidden>
      <g fill="none" stroke="#B8924A" strokeWidth=".8">
        {[...Array(16)].map((_, i) => (<path key={i} d="M0 0 C-14 -30 -10 -70 0 -92 C10 -70 14 -30 0 0Z" transform={`rotate(${i * 22.5})`} opacity={i % 2 ? 0.45 : 0.9} />))}
        <circle r="96" strokeDasharray="2 5" />
        <circle r="30" />
      </g>
    </svg>
  );
}

function Digits({ value }) {
  const str = String(value).padStart(2, '0');
  return (
    <span className="cd-num" aria-hidden>
      {str.split('').map((ch, i) => (
        <span className="cd-digit" key={i}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={ch}
              initial={{ y: -16, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: 16, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {ch}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

export default function Countdown() {
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [['Days', t.days], ['Hours', t.hours], ['Minutes', t.mins], ['Seconds', t.secs]];
  return (
    <section className="section countdown" id="countdown">
      <div className="rosette-wrap"><Rosette /></div>
      <Reveal className="head">
        <span className="eyebrow">Counting down to</span>
        <h2 className="display">The Wedding</h2>
      </Reveal>

      <Reveal className="cd-grid" delay={0.15} role="timer" aria-label={`${t.days} days ${t.hours} hours ${t.mins} minutes ${t.secs} seconds`}>
        {units.map(([label, v], i) => (
          <motion.div
            key={label}
            className="cd-box"
            whileInView={{ y: [0, -6, 0] }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.7 }}
          >
            <CornerFlourish className="cd-c" />
            <Digits value={v} />
            <span className="cd-label">{label}</span>
          </motion.div>
        ))}
      </Reveal>

      <Reveal delay={0.3} className="cd-note">
        <Divider width={150} />
        <p>{t.past ? 'The celebrations have begun — thank you for being part of them.' : '13 December 2026'}</p>
      </Reveal>
    </section>
  );
}
