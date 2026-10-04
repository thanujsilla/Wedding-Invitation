import { motion, useScroll, useSpring } from 'framer-motion';

// A fine gold thread across the top that fills as you scroll through the invitation.
export default function ScrollThread() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return (
    <div className="fixed-frame thread-layer" aria-hidden>
      <motion.div className="thread" style={{ scaleX }} />
    </div>
  );
}
