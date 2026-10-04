import { motion } from 'framer-motion';
import { Emblem, CornerFlourish } from '../lib/art';
import { ArrowDown } from '../lib/icons';
import { COUPLE } from '../config';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.9 } } };
const letter = {
  hidden: { opacity: 0, y: 30, rotateX: -80, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] } },
};
const fade = (delay) => ({
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1, delay, ease: 'easeOut' } },
});

function Name({ text }) {
  return (
    <motion.h1 className="hero-name" variants={container} aria-label={text}>
      {text.split('').map((c, i) => (
        <motion.span key={i} variants={letter} aria-hidden style={{ display: 'inline-block' }}>{c}</motion.span>
      ))}
    </motion.h1>
  );
}

export default function Hero({ opened }) {
  const state = opened ? 'show' : 'hidden';
  return (
    <section className="hero" aria-label="Invitation">
      <div className="hero-frame">
        <CornerFlourish className="c-tl" />
        <CornerFlourish className="c-tr" flip="flip-x" />
        <CornerFlourish className="c-bl" flip="flip-y" />
        <CornerFlourish className="c-br" flip="flip-xy" />
      </div>

      <motion.div initial="hidden" animate={state} className="hero-inner">
        <motion.div variants={fade(0.2)} className="hero-emblem">{opened && <Emblem />}</motion.div>
        <motion.p variants={fade(0.5)} className="sloka">
          ॥ श्री गणेशाय नमः ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
        </motion.p>
        <motion.p variants={fade(0.7)} className="invite-line">
          With the blessings of Shri Ganesh and our beloved families, we joyfully invite you to celebrate the union of
        </motion.p>

        <div className="hero-names">
          <motion.div initial="hidden" animate={state} variants={container}><Name text={COUPLE.bride} /></motion.div>
          <motion.div variants={fade(1.7)} className="amp">&amp;</motion.div>
          <motion.div initial="hidden" animate={state} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 1.9 } } }}><Name text={COUPLE.groom} /></motion.div>
        </div>

        <motion.p variants={fade(2.6)} className="parents">
          Daughter of {COUPLE.brideParents}
          <span className="dot">✦</span>
          Son of {COUPLE.groomParents}
        </motion.p>
      </motion.div>

      <motion.div className="scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: opened ? 1 : 0 }} transition={{ delay: 3.1, duration: 1 }}>
        <span>Scroll to see magic</span>
        <ArrowDown className="bob" />
      </motion.div>
    </section>
  );
}
