import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from '../lib/icons';

export default function CustomSelect({ value, options, onChange, label }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const root = useRef(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const off = (e) => { if (!root.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', off);
    return () => document.removeEventListener('pointerdown', off);
  }, [open]);

  const onKey = (e) => {
    if (!open && ['ArrowDown', 'Enter', ' '].includes(e.key)) { e.preventDefault(); setOpen(true); setActive(options.indexOf(value)); return; }
    if (!open) return;
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(options.length - 1, a + 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    if (e.key === 'Enter' && active >= 0) { e.preventDefault(); onChange(options[active]); setOpen(false); }
  };

  return (
    <div className={`select ${open ? 'is-open' : ''}`} ref={root}>
      <button
        type="button"
        className="input select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        aria-label={label}
        onClick={() => { setOpen((o) => !o); setActive(options.indexOf(value)); }}
        onKeyDown={onKey}
      >
        <span>{value}</span>
        <ChevronDown className="chev" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={id}
            role="listbox"
            className="select-list"
            initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.92 }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: 'top' }}
          >
            {options.map((o, i) => (
              <li
                key={o}
                role="option"
                aria-selected={o === value}
                className={`${o === value ? 'sel' : ''} ${i === active ? 'act' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => { onChange(o); setOpen(false); }}
              >
                <span>{o}</span>{o === value && <Check />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
