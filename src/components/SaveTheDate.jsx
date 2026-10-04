import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import ScratchCard from './ScratchCard';
import { Divider } from '../lib/art';
import { petals } from '../lib/petals';
import { SAVE_THE_DATE as D } from '../config';

export default function SaveTheDate() {
  const [count, setCount] = useState(0);
  const [touched, setTouched] = useState(false);
  const fired = useRef(false);
  const done = count >= 3;

  const onDone = useCallback(() => setCount((c) => c + 1), []);

  useEffect(() => {
    if (!done || fired.current) return;
    fired.current = true;
    navigator.vibrate?.([30, 50, 90]);
    petals.burst({ count: 300, duration: 1100 });
    petals.setAmbient(28);
    const t = setTimeout(() => {
      document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 3600);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <section className={`section std ${done ? 'std-done' : ''}`} id="save-the-date">
      <Reveal className="head">
        <span className="eyebrow">The Date</span>
        <h2 className="display">Save the<br />Date</h2>
        <p className="lede">Scratch below to reveal our wedding date</p>
      </Reveal>

      <Reveal className="scratch-row" delay={0.15}>
        <ScratchCard index={0} label="Month" value={D.month} onDone={onDone} showHint={!touched} onTouched={() => setTouched(true)} />
        <ScratchCard index={1} label="Day" value={D.day} onDone={onDone} onTouched={() => setTouched(true)} />
        <ScratchCard index={2} label="Year" value={D.year} onDone={onDone} onTouched={() => setTouched(true)} />
      </Reveal>

      <div className="std-foot">
        <motion.p
          className="std-caption"
          initial={false}
          animate={done ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 12, filter: 'blur(4px)' }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Wednesday · the first of July
        </motion.p>
        <motion.div initial={false} animate={{ opacity: done ? 1 : 0.0 }} transition={{ delay: 0.9 }}>
          <Divider width={150} />
        </motion.div>
        {!done && <p className="std-progress">{count} of 3 revealed</p>}
      </div>
    </section>
  );
}
