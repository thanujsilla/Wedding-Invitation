import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import { Photo } from '../lib/art';
import { PHOTOS } from '../config';

function HeroFrame() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  // Trigger from the (always-visible) frame: a fully clip-pathed element is never "in view".
  const seen = useInView(ref, { once: true, amount: 0.25 });
  return (
    <motion.figure
      ref={ref}
      className="album-frame"
      initial={{ opacity: 0, y: 60, scale: 0.93, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: -1.2 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.3, ease: [0.22, 0.8, 0.24, 1] }}
    >
      <span className="tape tape-l" /><span className="tape tape-r" />
      <div className="album-mat">
        <motion.div
          className="album-pic"
          initial={false}
          animate={{ clipPath: seen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            style={{ y, position: 'absolute', inset: '-8% 0' }}
            initial={false}
            animate={seen ? { scale: 1, filter: 'sepia(0) blur(0px) brightness(1)' } : { scale: 1.25, filter: 'sepia(.8) blur(4px) brightness(1.15)' }}
            transition={{ duration: 2.2, delay: 0.5, ease: 'easeOut' }}
          >
            <Photo src={PHOTOS.hero.src} alt="Meenal and Avinash" />
          </motion.div>
        </motion.div>
      </div>
      <figcaption>{PHOTOS.hero.caption}</figcaption>
    </motion.figure>
  );
}

const SPOTS = [{ x: -40, y: 0 }, { x: 34, y: 56 }, { x: -2, y: 112 }];

function PhotoStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [order, setOrder] = useState([0, 1, 2]); // last = front
  const shuffle = () => setOrder(([a, b, c]) => [c, a, b]);

  return (
    <div className="stack" ref={ref}>
      {PHOTOS.stack.map((p, i) => {
        const pos = order.indexOf(i);
        const spot = SPOTS[pos];
        const side = i % 2 ? 1 : -1;
        return (
          <motion.button
            key={i}
            type="button"
            className="polaroid"
            onClick={shuffle}
            aria-label={`Photo: ${p.caption}. Tap to shuffle.`}
            style={{ zIndex: pos + 1 }}
            initial={{ x: side * 380, y: 120, rotate: side * 34, opacity: 0 }}
            animate={inView ? { x: spot.x, y: spot.y, rotate: p.tilt + pos * 1.5, opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 15, delay: inView ? 0.15 + i * 0.28 : 0 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="polaroid-pic"><Photo src={p.src} alt={p.caption} kind="couple" /></span>
            <span className="polaroid-cap">{p.caption}</span>
          </motion.button>
        );
      })}
      <p className="stack-tip">tap the photos to shuffle</p>
    </div>
  );
}

export default function OurStory() {
  return (
    <section className="section story" id="story">
      <Reveal className="head">
        <span className="eyebrow">Our Story</span>
        <h2 className="display">Forever Us</h2>
      </Reveal>
      <HeroFrame />
      <Reveal className="story-line"><p>A little chai, a lot of laughter, and a love that found its way home.</p></Reveal>
      <PhotoStack />
    </section>
  );
}
