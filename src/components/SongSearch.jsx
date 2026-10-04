import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Music } from '../lib/icons';
import { SONGS } from '../config';

function Mark({ text, q }) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (<>{text.slice(0, i)}<mark>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>);
}

export default function SongSearch({ value, onChange }) {
  const [text, setText] = useState(value || '');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef(null);
  const id = useId();

  // debounce + brief "searching" shimmer, like a real music-search field
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => { setQ(text.trim()); setBusy(false); setActive(0); }, 240);
    return () => clearTimeout(t);
  }, [text, open]);

  useEffect(() => {
    const off = (e) => { if (!root.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', off);
    return () => document.removeEventListener('pointerdown', off);
  }, []);

  const results = useMemo(() => {
    if (q.length < 2) return [];
    const l = q.toLowerCase();
    return SONGS
      .map(([title, artist]) => {
        const t = title.toLowerCase();
        const score = t === l ? 0 : t.startsWith(l) ? 1 : t.includes(l) ? 2 : artist.toLowerCase().includes(l) ? 3 : 9;
        return { title, artist, score };
      })
      .filter((s) => s.score < 9)
      .sort((a, b) => a.score - b.score)
      .slice(0, 5);
  }, [q]);

  const choose = (title, artist) => {
    const v = artist ? `${title} - ${artist.split(',')[0]}` : title;
    setText(v);
    onChange(v);
    setOpen(false);
  };
  const items = [...results, ...(q.length >= 2 ? [{ title: q, artist: '', custom: true }] : [])];

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((a) => Math.min(items.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter' && open && items[active]) { e.preventDefault(); choose(items[active].title, items[active].artist); }
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="song" ref={root}>
      <input
        className="input"
        type="text"
        placeholder="e.g. Kala Chashma"
        value={text}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={id}
        aria-autocomplete="list"
        onChange={(e) => { setText(e.target.value); onChange(e.target.value); setOpen(true); setBusy(true); }}
        onFocus={() => text.trim().length >= 2 && setOpen(true)}
        onKeyDown={onKey}
      />
      <AnimatePresence>
        {open && text.trim().length >= 2 && (
          <motion.ul
            id={id}
            role="listbox"
            className="select-list song-list"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {busy ? (
              [0, 1, 2].map((k) => <li key={k} className="skeleton"><span /></li>)
            ) : (
              items.map((s, i) => (
                <li key={s.title + i} role="option" aria-selected={i === active} className={i === active ? 'act' : ''} onMouseEnter={() => setActive(i)} onClick={() => choose(s.title, s.artist)}>
                  <Music className="song-ic" />
                  <span className="song-txt">
                    {s.custom ? (<><b>Use “{s.title}”</b><small>add as typed</small></>) : (<><b><Mark text={s.title} q={q} /></b><small>{s.artist}</small></>)}
                  </span>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
