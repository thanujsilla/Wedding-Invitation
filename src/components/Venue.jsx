import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { Photo } from '../lib/art';
import { MapPin } from '../lib/icons';
import { PHOTOS, VENUE } from '../config';

export default function Venue() {
  return (
    <section className="section venue" id="venue">
      <Reveal className="head">
        <span className="eyebrow">Where</span>
        <h2 className="display">The Venue</h2>
      </Reveal>

      <motion.article
        className="venue-card"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: [0.22, 0.8, 0.24, 1] }}
        whileHover={{ y: -4 }}
      >
        <div className="venue-pic">
          <motion.div initial={{ scale: 1.2 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} style={{ height: '100%' }}>
            <Photo src={PHOTOS.venue.src} kind="venue" alt={VENUE.name} />
          </motion.div>
        </div>
        <div className="venue-body">
          <h3>{VENUE.name}</h3>
          <p>{VENUE.address[0]}<br />{VENUE.address[1]}</p>
          <a className="btn btn-red" href={VENUE.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin /> <span>View on maps</span>
          </a>
        </div>
      </motion.article>
    </section>
  );
}
