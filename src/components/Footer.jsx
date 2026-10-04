import { motion } from 'framer-motion';
import { COUPLE } from '../config';

const line = (d) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(5px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 1.1, delay: d, ease: [0.22, 0.8, 0.24, 1] },
});

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave" aria-hidden />
      <motion.p className="foot-quote" {...line(0)}>
        Your presence will turn this real-life romance into a blockbuster we’ll never forget.
      </motion.p>
      <motion.p className="foot-quote sm" {...line(0.2)}>
        Come, dance, laugh, and celebrate with us in Bollywood style!
      </motion.p>
      <motion.div className="foot-rule" {...line(0.35)}><i>✦</i></motion.div>
      <motion.p className="foot-with" {...line(0.45)}>With love &amp; blessings</motion.p>
      <motion.p className="foot-fam" {...line(0.55)}>
        Mrs. Anjana &amp; Mr. Santosh Sahu<br />and families
      </motion.p>
      <motion.h3 className="foot-names" {...line(0.7)}>{COUPLE.bride} <em>&amp;</em> {COUPLE.groom}</motion.h3>
      <motion.p className="foot-craft" {...line(0.9)}>Crafted with <span className="heartbeat">♥</span> by INVIFEST</motion.p>
    </footer>
  );
}
