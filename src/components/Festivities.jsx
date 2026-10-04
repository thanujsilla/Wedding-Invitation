import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import { SCENES } from '../lib/art';
import { MapPin } from '../lib/icons';
import { EVENTS } from '../config';

function EventCard({ ev, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-26, 26]);
  const Scene = SCENES[ev.id];
  const side = i % 2 ? 1 : -1;

  return (
    <motion.article
      ref={ref}
      className={`ev ev-${ev.id}`}
      initial={{ opacity: 0, y: 70, x: side * 18, scale: 0.94, rotate: side * 1.2 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.22, 0.8, 0.24, 1] }}
    >
      <div className="ev-art">
        <motion.div className="ev-art-in" style={{ y }}><Scene /></motion.div>
        <span className="ev-frame" />
        <span className="ev-badge">{ev.short}</span>
      </div>

      <div className="ev-body">
        <motion.h3 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25, duration: 0.8 }}>
          {ev.name}
        </motion.h3>
        <motion.p className="ev-when" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }}>
          {ev.day} <i>|</i> {ev.date} <i>|</i> {ev.time}
        </motion.p>
        <motion.p className="ev-quote" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}>
          “{ev.quote}”
        </motion.p>

        {ev.place && <p className="ev-place">{ev.place}</p>}
        {ev.maps && (
          <a className="btn btn-red btn-sm" href={ev.maps} target="_blank" rel="noreferrer">
            <MapPin /> <span>Get directions</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Festivities() {
  return (
    <section className="section fest" id="celebrations">
      <Reveal className="head">
        <span className="eyebrow">The celebrations unfold</span>
        <h2 className="display">Festivities</h2>
      </Reveal>
      <div className="ev-list">
        {EVENTS.map((ev, i) => <EventCard key={ev.id} ev={ev} i={i} />)}
      </div>
    </section>
  );
}
