import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from '../lib/art';
import { petals } from '../lib/petals';
import { EVENTS } from '../config';

const letters = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 1.7 } } };
const letter = { hidden: { opacity: 0, y: 26, scale: 0.7, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 160, damping: 12 } } };
const up = (d) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.9 } });

function Inner({ data, onClose }) {
  useEffect(() => {
    petals.setAmbient(46);
    petals.burst({ count: 340, duration: 1800 });
    let n = 0;
    const id = setInterval(() => { if (++n < 6) petals.burst({ count: 70, duration: 600 }); else clearInterval(id); }, 2400);
    return () => { clearInterval(id); petals.setAmbient(22); };
  }, []);

  const going = data.attending === 'yes';
  const names = EVENTS.filter((e) => data.events.includes(e.id)).map((e) => e.name);
  const first = data.name.split(' ')[0];

  return (
    <motion.div
      className="ty"
      initial={{ clipPath: 'circle(0% at 50% 90%)' }}
      animate={{ clipPath: 'circle(150% at 50% 90%)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
    >
      <div className="ty-glow" />
      <div className="ty-center">
        <div className="ty-heart">
          <span className="ring r1" /><span className="ring r2" /><span className="ring r3" />
          <motion.div initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.9, type: 'spring', stiffness: 120, damping: 10 }}>
            <div className="beat"><Heart size={132} /></div>
          </motion.div>
        </div>

        <motion.h2 className="ty-title" variants={letters} initial="hidden" animate="show" aria-label="Thank You!">
          {'Thank You!'.split('').map((c, i) => (<motion.span key={i} variants={letter} aria-hidden style={{ display: 'inline-block', whiteSpace: 'pre' }}>{c}</motion.span>))}
        </motion.h2>

        <motion.p className="ty-msg" {...up(2.9)}>
          {going
            ? <>Your RSVP has been lovingly received, {first}. We can’t wait to celebrate with you!</>
            : <>We’ll miss you, {first} — thank you for letting us know. You’ll be in our hearts on the day.</>}
        </motion.p>

        {going && (
          <motion.div className="ty-chips" {...up(3.2)}>
            <span>{data.party}</span>
            {names.map((n) => <span key={n}>{n}</span>)}
          </motion.div>
        )}

        <motion.button className="btn btn-red" {...up(3.6)} whileTap={{ scale: 0.95 }} onClick={onClose}>
          <span>Back to the invitation</span><i className="btn-shine" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function ThankYou({ data, onClose }) {
  useEffect(() => {
    if (!data) return;
    document.documentElement.classList.add('locked');
    return () => document.documentElement.classList.remove('locked');
  }, [data]);

  return (
    <AnimatePresence>
      {data && (
        <div className="fixed-frame ty-layer" key="ty">
          <Inner data={data} onClose={onClose} />
        </div>
      )}
    </AnimatePresence>
  );
}
