import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { Divider } from '../lib/art';
import { MapPin } from '../lib/icons';
import { DRESS_CODE as D } from '../config';

export default function DressCode() {
  return (
    <section className="section dress" id="dress-code">
      <Reveal className="head">
        <span className="eyebrow">Dress code</span>
        <div className="swatches">
          {D.palette.map((p, i) => (
            <motion.div key={p.name} className="swatch" initial={{ scale: 0, rotate: -40 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 160, damping: 11, delay: 0.2 + i * 0.15 }}>
              <i style={{ background: p.color }} />
            </motion.div>
          ))}
        </div>
        <h2 className="display sm">{D.palette.map((p) => p.name).join(' • ')}</h2>
      </Reveal>

      <Reveal delay={0.1} className="dress-body">
        <Divider width={160} />
        <p className="dress-style">{D.style}</p>
        <ul className="dress-pieces">
          {D.pieces.map((p, i) => (
            <motion.li key={p} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}>
              {p}
            </motion.li>
          ))}
        </ul>
        <a className="btn btn-red btn-sm" href={D.mapsUrl} target="_blank" rel="noreferrer"><MapPin /> <span>Get directions</span></a>
      </Reveal>
    </section>
  );
}
