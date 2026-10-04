import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import CustomSelect from './CustomSelect';
import SongSearch from './SongSearch';
import { Check, Loader, Music, Pen, Phone, User, Users, Utensils } from '../lib/icons';
import { DIETARY, EVENTS, PARTY_SIZES } from '../config';

const Err = ({ msg }) => (
  <AnimatePresence initial={false}>
    {msg && (
      <motion.p className="err" role="alert" initial={{ opacity: 0, height: 0, y: -4 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0 }}>
        <span aria-hidden>❦</span> {msg}
      </motion.p>
    )}
  </AnimatePresence>
);

export default function RSVPSection({ onSubmitted }) {
  const [f, setF] = useState({
    name: '', phone: '', attending: null, party: PARTY_SIZES[0], events: [],
    song: '', diet: DIETARY[0], advice: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending
  const [shake, setShake] = useState(0);
  const formRef = useRef(null);

  const set = (k, v) => { setF((s) => ({ ...s, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };
  const toggleEvent = (id) => set('events', f.events.includes(id) ? f.events.filter((x) => x !== id) : [...f.events, id]);

  const validate = () => {
    const e = {};
    if (f.name.trim().length < 2) e.name = 'Please tell us your name.';
    const digits = f.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) e.phone = 'A valid phone number helps us stay in touch.';
    if (!f.attending) e.attending = 'Let us know if you can join us.';
    if (f.attending === 'yes' && f.events.length === 0) e.events = 'Pick at least one celebration to attend.';
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (status === 'sending') return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      setShake((n) => n + 1);
      navigator.vibrate?.(40);
      const first = formRef.current?.querySelector(`[data-field="${Object.keys(e)[0]}"]`);
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setStatus('sending');
    const payload = { ...f, name: f.name.trim(), at: new Date().toISOString() };
    setTimeout(() => {
      try { localStorage.setItem('wedding-rsvp', JSON.stringify(payload)); } catch { /* storage may be unavailable */ }
      setStatus('idle');
      onSubmitted(payload);
    }, 1800);
  };

  return (
    <section className="section rsvp" id="rsvp">
      <Reveal className="head">
        <span className="eyebrow">Join the celebration</span>
        <h2 className="display">RSVP</h2>
        <p className="lede">Kindly let us know if you can make it — your presence will make this celebration whole.</p>
      </Reveal>

      <Reveal delay={0.1}>
        <form className="rsvp-form" onSubmit={submit} ref={formRef} noValidate>
          <motion.div className="card" key={`s${shake}`} animate={shake ? { x: [0, -8, 8, -5, 5, 0] } : {}} transition={{ duration: 0.45 }}>
            <h3 className="card-title">Your details</h3>

            <div className="field" data-field="name">
              <label htmlFor="rs-name">Your name</label>
              <div className={`input-wrap ${errors.name ? 'bad' : ''}`}>
                <User className="ic" />
                <input id="rs-name" className="input" placeholder="Full name" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
              </div>
              <Err msg={errors.name} />
            </div>

            <div className="field" data-field="phone">
              <label htmlFor="rs-phone">Phone number</label>
              <div className={`input-wrap ${errors.phone ? 'bad' : ''}`}>
                <Phone className="ic" />
                <span className="cc">🇮🇳 +91</span>
                <input id="rs-phone" className="input" inputMode="tel" placeholder="98765 43210" value={f.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel-national" />
              </div>
              <Err msg={errors.phone} />
            </div>

            <div className="field" data-field="attending">
              <label>Will you join us?</label>
              <div className="pills" role="radiogroup">
                {[['yes', 'Joyfully accept'], ['no', 'Regretfully decline']].map(([v, t]) => (
                  <motion.button type="button" key={v} role="radio" aria-checked={f.attending === v} className={`pill ${f.attending === v ? 'on' : ''}`} whileTap={{ scale: 0.95 }} onClick={() => set('attending', v)}>
                    {f.attending === v && <Check />} {t}
                  </motion.button>
                ))}
              </div>
              <Err msg={errors.attending} />
            </div>

            <AnimatePresence initial={false}>
              {f.attending !== 'no' && (
                <motion.div key="yes-only" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45 }} style={{ overflow: 'visible' }}>
                  <div className="field">
                    <label><Users className="ic-inline" /> Party size</label>
                    <CustomSelect label="Party size" value={f.party} options={PARTY_SIZES} onChange={(v) => set('party', v)} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence initial={false}>
            {f.attending !== 'no' && (
              <motion.div key="events" className="card" data-field="events" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0, padding: 0, margin: 0 }} transition={{ duration: 0.5 }}>
                <h3 className="card-title">Events you’ll attend</h3>
                <ul className="evlist">
                  {EVENTS.map((e) => {
                    const on = f.events.includes(e.id);
                    return (
                      <li key={e.id}>
                        <motion.button type="button" className={`evrow ${on ? 'on' : ''}`} role="checkbox" aria-checked={on} onClick={() => toggleEvent(e.id)} whileTap={{ scale: 0.98 }}>
                          <span className="evrow-txt"><b>{e.name}</b><small>{e.short} · {e.time}</small></span>
                          <span className="box">
                            <motion.svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <motion.path d="m5 12.5 4.5 4.5L19 7.5" initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.25 }} />
                            </motion.svg>
                          </span>
                        </motion.button>
                      </li>
                    );
                  })}
                </ul>
                <Err msg={errors.events} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="card">
            <div className="field">
              <label><Music className="ic-inline" /> A song for the dance floor</label>
              <SongSearch value={f.song} onChange={(v) => set('song', v)} />
            </div>
            <div className="field">
              <label><Utensils className="ic-inline" /> Dietary preferences</label>
              <CustomSelect label="Dietary preferences" value={f.diet} options={DIETARY} onChange={(v) => set('diet', v)} />
            </div>
            <div className="field">
              <label htmlFor="rs-adv"><Pen className="ic-inline" /> Marriage advice for us</label>
              <textarea id="rs-adv" className="input area" rows={3} placeholder="Share something sweet, funny, or wise…" value={f.advice} onChange={(e) => set('advice', e.target.value)} />
            </div>
          </div>

          <motion.button type="submit" className="btn btn-red btn-wide" whileTap={{ scale: 0.95 }} disabled={status === 'sending'}>
            {status === 'sending' ? (<><Loader /> <span>Sending…</span></>) : <span>Send RSVP</span>}
            <i className="btn-shine" />
          </motion.button>
        </form>
      </Reveal>
    </section>
  );
}
