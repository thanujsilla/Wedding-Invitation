import { useState } from 'react';
import { motion } from 'framer-motion';
import { GANESH } from '../config';

/* ───────── Ornaments ───────── */

function GaneshDrawing() {
  const line = { fill: 'none', stroke: '#6a3b2a', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <svg viewBox="0 0 100 118" className="ganesh-svg" role="img" aria-label="Lord Ganesha">
      <defs>
        <radialGradient id="gnHalo" cx="50%" cy="38%" r="55%"><stop offset="0" stopColor="#fff2c4" /><stop offset="1" stopColor="#f1dfbf" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="100" height="118" fill="url(#gnHalo)" />
      <circle cx="50" cy="44" r="34" fill="none" stroke="#c9a04a" strokeWidth=".8" strokeDasharray="1.5 2.5" />
      {/* ears */}
      <path d="M36 38 C14 26 6 52 20 66 C28 70 34 60 36 52Z" fill="#f0c98f" {...line} />
      <path d="M64 38 C86 26 94 52 80 66 C72 70 66 60 64 52Z" fill="#f0c98f" {...line} />
      {/* body */}
      <path d="M26 118 C26 92 36 82 50 82 C64 82 74 92 74 118Z" fill="#e9a35f" {...line} />
      <circle cx="50" cy="100" r="14" fill="#f0b46d" {...line} />
      <path d="M36 88 Q50 98 64 88" {...line} stroke="#c9a04a" strokeWidth="1.8" />
      {/* head */}
      <ellipse cx="50" cy="46" rx="17" ry="19" fill="#f0b46d" {...line} />
      {/* crown */}
      <path d="M34 34 L38 18 L44 26 L50 8 L56 26 L62 18 L66 34 C58 28 42 28 34 34Z" fill="#e3b94f" stroke="#8a5a14" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="50" cy="20" r="2.2" fill="#c23a47" /><circle cx="42" cy="28" r="1.5" fill="#c23a47" /><circle cx="58" cy="28" r="1.5" fill="#c23a47" />
      {/* face */}
      <path d="M50 36 V44" stroke="#c23a47" strokeWidth="2" strokeLinecap="round" />
      <path d="M41 45 q3 -3 6 0 M53 45 q3 -3 6 0" {...line} />
      {/* trunk */}
      <path d="M50 50 C50 64 49 74 42 82 C37 87 31 82 36 77 C39 74 42 77 40 80" {...line} strokeWidth="7" stroke="#e9a35f" />
      <path d="M50 50 C50 64 49 74 42 82 C37 87 31 82 36 77 C39 74 42 77 40 80" {...line} strokeWidth="1.2" />
      {/* tusk */}
      <path d="M57 58 C62 62 62 68 58 72" {...line} stroke="#fff6e4" strokeWidth="3.4" />
      {/* lotus seat */}
      {[-24, -12, 0, 12, 24].map((x, i) => (<path key={i} d={`M${50 + x} 118 q${-5} -8 0 -14 q5 6 0 14Z`} fill="#f4b8c4" stroke="#b5424c" strokeWidth=".8" />))}
    </svg>
  );
}

export function Emblem() {
  const [broken, setBroken] = useState(false);
  return (
    <motion.div className="ganesh" initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.4, ease: [0.22, 0.8, 0.24, 1] }}>
      <span className="ganesh-halo" aria-hidden />
      <div className="ganesh-frame">
        {!broken ? (
          <img className="ganesh-img" src={GANESH.src} alt="Lord Ganesha" onError={() => setBroken(true)} />
        ) : (
          <GaneshDrawing />
        )}
      </div>
    </motion.div>
  );
}

export function Divider({ width = 190 }) {
  return (
    <svg viewBox="0 0 200 20" width={width} height="20" className="divider" aria-hidden>
      <motion.path
        d="M2 10 H78 M122 10 H198"
        stroke="#B8924A"
        strokeWidth=".8"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 160, damping: 12 }}
        style={{ transformOrigin: '100px 10px' }}
      >
        <path d="M100 2 L104 10 L100 18 L96 10Z" fill="#B8924A" />
        <circle cx="88" cy="10" r="2" fill="none" stroke="#B8924A" strokeWidth=".8" />
        <circle cx="112" cy="10" r="2" fill="none" stroke="#B8924A" strokeWidth=".8" />
      </motion.g>
    </svg>
  );
}

export function CornerFlourish({ className = '', flip = '' }) {
  return (
    <svg viewBox="0 0 60 60" className={`corner ${className} ${flip}`} aria-hidden>
      <g fill="none" stroke="#B8924A" strokeWidth=".9" strokeLinecap="round">
        <path d="M2 58 V14 Q2 2 14 2 H58" />
        <path d="M8 58 V18 Q8 8 18 8 H58" opacity=".45" />
        <path d="M14 14 q8 0 8 8 q-8 0 -8 -8Z" fill="#B8924A" fillOpacity=".25" />
        <circle cx="26" cy="26" r="1.6" fill="#B8924A" />
      </g>
    </svg>
  );
}

export function Heart({ size = 120 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden className="heart-svg">
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C23A47" />
          <stop offset="1" stopColor="#7A1620" />
        </linearGradient>
      </defs>
      <motion.path
        d="M50 84 C14 58 8 34 24 22 C36 13 46 20 50 30 C54 20 64 13 76 22 C92 34 86 58 50 84Z"
        fill="url(#hg)"
        stroke="#E3C77E"
        strokeWidth="1.6"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{ pathLength: { duration: 1.3, ease: 'easeInOut' }, fillOpacity: { delay: 1.1, duration: 0.7 } }}
      />
      <motion.path
        d="M34 48 L46 60 L68 38"
        fill="none"
        stroke="#FFF6E4"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}
      />
    </svg>
  );
}

/* ───────── Photo placeholders ───────── */

export function Photo({ src, alt = '', kind = 'couple', className = '' }) {
  if (src) return <img src={src} alt={alt} loading="lazy" decoding="async" className={`photo-img ${className}`} />;
  return (
    <svg viewBox="0 0 300 380" preserveAspectRatio="xMidYMid slice" className={`photo-img ${className}`} role="img" aria-label={alt || 'Photo placeholder'}>
      <defs>
        <linearGradient id={`pg-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F1DCC8" />
          <stop offset="1" stopColor="#D8B497" />
        </linearGradient>
        <radialGradient id={`pv-${kind}`} cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor="#fff" stopOpacity=".5" />
          <stop offset="1" stopColor="#8a4a3a" stopOpacity=".25" />
        </radialGradient>
      </defs>
      <rect width="300" height="380" fill={`url(#pg-${kind})`} />
      {kind === 'venue' ? (
        <g>
          <path d="M40 380 V210 Q40 120 150 100 Q260 120 260 210 V380Z" fill="#C79A7A" opacity=".55" />
          <path d="M70 380 V220 Q70 150 150 134 Q230 150 230 220 V380Z" fill="#8E5B49" opacity=".7" />
          {[...Array(9)].map((_, i) => (
            <circle key={i} cx={60 + i * 22} cy={96 - Math.sin((i / 8) * Math.PI) * 38} r="3" fill="#FFE7A8" className="twinkle" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
          <path d="M120 380 V250 Q150 220 180 250 V380Z" fill="#5C3326" />
        </g>
      ) : (
        <g fill="#7B4B3E" opacity=".62">
          <circle cx="112" cy="168" r="30" />
          <path d="M52 380 Q56 236 112 220 Q168 236 172 380Z" />
          <circle cx="192" cy="178" r="27" opacity=".85" />
          <path d="M138 380 Q142 252 192 238 Q242 252 248 380Z" opacity=".85" />
        </g>
      )}
      <rect width="300" height="380" fill={`url(#pv-${kind})`} />
      <text x="150" y="352" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontSize="17" fill="#fff" opacity=".9">
        your photo goes here
      </text>
    </svg>
  );
}

/* ───────── Event illustrations (viewBox 400 × 270) ───────── */

const STARS = [[30,30],[80,60],[120,22],[170,48],[230,26],[290,56],[340,24],[372,70],[56,96],[210,84],[318,98],[150,92],[262,16],[22,70],[388,40]];

function Stars({ color = '#fff' }) {
  return STARS.map(([x, y], i) => (
    <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.8 : 1.1} fill={color} className="twinkle" style={{ animationDelay: `${(i % 7) * 0.35}s` }} />
  ));
}

function Chandelier({ x = 200, y = 0, s = 1, color = '#F3D98B' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth=".8" fill="none" opacity=".95">
      <path d="M0 0 V30" />
      <path d="M-26 52 Q0 26 26 52" />
      <path d="M-40 70 Q0 34 40 70" />
      <path d="M0 30 V86" />
      {[-34, -22, -10, 0, 10, 22, 34].map((dx, i) => (
        <g key={i}>
          <path d={`M${dx} ${60 + Math.abs(dx) * 0.1} V${80 + (i % 2) * 8}`} />
          <circle cx={dx} cy={84 + (i % 2) * 8} r="2.2" fill={color} className="twinkle" style={{ animationDelay: `${i * 0.18}s` }} />
        </g>
      ))}
    </g>
  );
}

function Couple({ x, y, s = 1, bride = '#E0527A', groom = '#14172e', veil = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* groom */}
      <circle cx="-16" cy="-62" r="9" fill="#C58E6E" />
      <path d="M-25 -66 q9 -12 18 0 q-9 -4 -18 0Z" fill="#101224" />
      <path d="M-28 -52 h24 l3 54 h-30Z" fill={groom} />
      <rect x="-27" y="2" width="12" height="40" fill={groom} />
      <rect x="-13" y="2" width="12" height="40" fill={groom} />
      {/* bride */}
      <circle cx="18" cy="-60" r="8.5" fill="#C58E6E" />
      <path d="M8 -64 q10 -14 20 0 q-4 20 -2 28 h-14 q2 -8 -4 -28Z" fill="#1d1020" opacity=".9" />
      <path d="M12 -50 h12 l22 92 h-56Z" fill={bride} />
      {veil && <path d="M26 -62 q30 40 14 104 h-10 q10 -50 -4 -104Z" fill="#fff" opacity=".35" />}
      <path d="M-4 -6 l18 -6" stroke="#C58E6E" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

export function SceneSangeet() {
  return (
    <svg viewBox="0 0 400 270" preserveAspectRatio="xMidYMid slice" className="scene" aria-hidden>
      <defs>
        <linearGradient id="sgBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#090d36" /><stop offset=".7" stopColor="#1b1f6e" /><stop offset="1" stopColor="#25276f" /></linearGradient>
        <radialGradient id="sgGlow" cx="50%" cy="60%" r="50%"><stop offset="0" stopColor="#f4c868" stopOpacity=".35" /><stop offset="1" stopColor="#f4c868" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="400" height="270" fill="url(#sgBg)" />
      <Stars color="#ffeab0" />
      <rect width="400" height="270" fill="url(#sgGlow)" />
      <Chandelier x={200} y={-4} s={1.1} />
      {/* arches */}
      {[0, 1].map((k) => (
        <g key={k} transform={k ? 'translate(400 0) scale(-1 1)' : ''}>
          <path d="M-6 270 V120 Q-6 40 56 34 Q108 40 108 120 V270Z" fill="#0b0e2c" stroke="#d6b45e" strokeWidth="1.4" opacity=".92" />
          <path d="M10 270 V126 Q10 60 56 54 Q96 60 96 126 V270Z" fill="none" stroke="#d6b45e" strokeWidth=".8" opacity=".6" />
          {[...Array(7)].map((_, i) => (
            <circle key={i} cx={20 + i * 12} cy={170 + (i % 3) * 18} r="2.4" fill="#ffd98a" className="twinkle" style={{ animationDelay: `${i * 0.22}s` }} />
          ))}
        </g>
      ))}
      <path d="M0 232 Q200 214 400 232 V270 H0Z" fill="#0b1a22" />
      <path d="M0 246 Q200 230 400 246 V270 H0Z" fill="#143828" opacity=".8" />
      <Couple x={200} y={178} s={0.95} />
    </svg>
  );
}

export function SceneAfter() {
  const rows = [1, 2, 3, 4];
  return (
    <svg viewBox="0 0 400 270" preserveAspectRatio="xMidYMid slice" className="scene" aria-hidden>
      <defs>
        <linearGradient id="afBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#12113a" /><stop offset="1" stopColor="#2a1a5e" /></linearGradient>
      </defs>
      <rect width="400" height="270" fill="url(#afBg)" />
      <g stroke="#d9a93a" strokeWidth="1.2" fill="none" opacity=".75">
        <path d="M0 40 L90 120 L40 270" /><path d="M400 30 L300 110 L370 270" /><path d="M120 0 L200 70 L290 0" /><path d="M0 150 L120 190 L60 270" /><path d="M400 160 L280 200 L350 270" />
      </g>
      <Stars color="#ffe7a8" />
      {/* table */}
      <path d="M60 270 L84 200 H316 L340 270Z" fill="#fdfbff" />
      <path d="M84 200 H316 L330 232 H70Z" fill="#33309e" />
      <path d="M96 204 Q200 190 304 204 L318 252 Q200 238 82 252Z" fill="#4a46c4" opacity=".7" />
      {/* champagne tower */}
      {rows.map((n, r) => {
        const y = 78 + r * 30;
        return [...Array(n)].map((_, i) => {
          const x = 200 + (i - (n - 1) / 2) * 34;
          return (
            <g key={`${r}-${i}`} transform={`translate(${x} ${y})`}>
              <path d="M-14 0 Q0 22 14 0Z" fill="#fff" fillOpacity=".78" stroke="#fff" strokeOpacity=".9" strokeWidth=".8" />
              <path d="M-11 3 Q0 16 11 3Z" fill="#f3cf6d" opacity=".9" />
              <path d="M0 13 V24" stroke="#fff" strokeWidth="1.4" />
              <ellipse cx="0" cy="25" rx="9" ry="2.4" fill="#fff" opacity=".85" />
            </g>
          );
        });
      })}
      <path d="M200 64 q6 -10 0 -22 q-6 12 0 22Z" fill="#f6dd8e" className="twinkle" />
      {[...Array(12)].map((_, i) => (
        <circle key={i} cx={60 + i * 26} cy={70 + (i * 37) % 120} r="2" fill="#fff" className="bubble" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
    </svg>
  );
}

export function SceneCarnival() {
  const flags = ['#e8506e', '#f7b32b', '#38b6a0', '#7d5bd6', '#f4825e'];
  return (
    <svg viewBox="0 0 400 270" preserveAspectRatio="xMidYMid slice" className="scene" aria-hidden>
      <defs>
        <linearGradient id="cvBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd5de" /><stop offset="1" stopColor="#ffeede" /></linearGradient>
      </defs>
      <rect width="400" height="270" fill="url(#cvBg)" />
      <path d="M0 40 Q100 76 200 40 T400 40" stroke="#8d5a4a" strokeWidth="1.2" fill="none" />
      {[...Array(14)].map((_, i) => (
        <path key={i} d={`M${i * 29 + 6} ${50 + Math.sin(i * 0.9) * 8} l11 0 l-5.5 16Z`} fill={flags[i % 5]} className="sway" style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
      {/* ferris wheel */}
      <g transform="translate(318 128)">
        <g className="spin-slow">
          <circle r="54" fill="none" stroke="#c0527a" strokeWidth="2.2" />
          <circle r="30" fill="none" stroke="#c0527a" strokeWidth="1" opacity=".6" />
          {[...Array(8)].map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (<g key={i}><line x1="0" y1="0" x2={Math.cos(a) * 54} y2={Math.sin(a) * 54} stroke="#c0527a" strokeWidth="1" /><rect x={Math.cos(a) * 54 - 5} y={Math.sin(a) * 54 - 4} width="10" height="9" rx="2" fill={flags[i % 5]} /></g>);
          })}
        </g>
        <path d="M0 0 L-26 112 M0 0 L26 112" stroke="#8d5a4a" strokeWidth="2" />
      </g>
      {/* striped tent */}
      <g transform="translate(120 100)">
        {[...Array(8)].map((_, i) => (
          <path key={i} d={`M0 -52 L${-80 + i * 20} 0 L${-60 + i * 20} 0Z`} fill={i % 2 ? '#fff6ee' : '#e84a6c'} />
        ))}
        <path d="M-80 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0Z" fill="#e84a6c" />
        <rect x="-60" y="12" width="120" height="60" fill="#fff0e4" />
        <path d="M-18 72 V30 Q0 14 18 30 V72Z" fill="#a8365a" />
        <path d="M0 -52 V-70" stroke="#8d5a4a" strokeWidth="2" /><path d="M0 -70 l16 6 -16 6Z" fill="#f7b32b" />
      </g>
      {/* balloons */}
      {[[40, 190, '#e8506e'], [74, 168, '#f7b32b'], [352, 200, '#38b6a0'], [28, 150, '#7d5bd6']].map(([x, y, c], i) => (
        <g key={i} className="float" style={{ animationDelay: `${i * 0.5}s` }}>
          <ellipse cx={x} cy={y} rx="13" ry="16" fill={c} />
          <path d={`M${x} ${y + 16} q-4 14 2 28`} stroke="#8d5a4a" strokeWidth=".8" fill="none" />
        </g>
      ))}
      <path d="M0 232 Q200 214 400 236 V270 H0Z" fill="#bfe6cf" />
      <path d="M0 250 Q200 236 400 252 V270 H0Z" fill="#9dd6b8" />
    </svg>
  );
}

export function SceneShera() {
  const marigolds = [...Array(26)].map((_, i) => i);
  return (
    <svg viewBox="0 0 400 270" preserveAspectRatio="xMidYMid slice" className="scene" aria-hidden>
      <defs>
        <linearGradient id="shBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd9c7" /><stop offset=".6" stopColor="#f9b9a3" /><stop offset="1" stopColor="#e88d79" /></linearGradient>
        <radialGradient id="shSun" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#fff2c8" /><stop offset="1" stopColor="#ffd37d" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="400" height="270" fill="url(#shBg)" />
      <g transform="translate(200 120)" className="spin-slow" opacity=".5">
        <circle r="100" fill="url(#shSun)" />
        {[...Array(24)].map((_, i) => (<path key={i} d="M0 -100 L6 -64 L-6 -64Z" fill="#fff0b8" transform={`rotate(${i * 15})`} />))}
      </g>
      {/* garland swags */}
      {[0, 1].map((k) => (
        <g key={k} transform={k ? 'translate(0 22)' : ''}>
          {marigolds.map((i) => {
            const t = i / 25;
            const x = t * 400;
            const y = 18 + Math.sin(t * Math.PI * 3) * 14 + (k ? 6 : 0);
            return <circle key={i} cx={x} cy={y} r="6" fill={i % 3 ? '#f08a1c' : '#f6b92b'} stroke="#b85c0b" strokeWidth=".6" />;
          })}
        </g>
      ))}
      {/* groom with turban + sehra, bride beside */}
      <g transform="translate(200 214)">
        <circle cx="-28" cy="-92" r="11" fill="#b9805f" />
        <path d="M-42 -96 q14 -24 28 0 q-2 6 -14 4 q-12 2 -14 -4Z" fill="#e0752b" />
        <path d="M-42 -96 q14 -24 28 0" stroke="#f6c85a" strokeWidth="1.4" fill="none" />
        {[...Array(9)].map((_, i) => (<line key={i} x1={-40 + i * 3} y1={-93} x2={-40 + i * 3} y2={-78 + (i % 2) * 4} stroke="#f6c85a" strokeWidth=".9" />))}
        <path d="M-46 -80 h36 l6 80 h-48Z" fill="#8f1d26" />
        <path d="M-28 -80 v80" stroke="#f6c85a" strokeWidth="1" />
        <rect x="-44" y="0" width="16" height="44" fill="#f4ead6" /><rect x="-26" y="0" width="16" height="44" fill="#f4ead6" />
        <circle cx="22" cy="-86" r="10" fill="#b9805f" />
        <path d="M10 -90 q12 -18 24 0 q-1 20 2 30 h-28 q3 -10 2 -30Z" fill="#2a1020" opacity=".9" />
        <path d="M16 -74 h12 l30 118 h-72Z" fill="#c63b57" />
        <path d="M10 -64 q-22 38 -8 108 h8 q-8 -66 8 -108Z" fill="#f6c85a" opacity=".55" />
      </g>
      <path d="M0 240 Q200 224 400 240 V270 H0Z" fill="#c76a58" />
    </svg>
  );
}

export function SceneReception() {
  return (
    <svg viewBox="0 0 400 270" preserveAspectRatio="xMidYMid slice" className="scene" aria-hidden>
      <defs>
        <linearGradient id="rcBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#060a24" /><stop offset="1" stopColor="#121c52" /></linearGradient>
        <radialGradient id="rcGlow" cx="50%" cy="55%" r="55%"><stop offset="0" stopColor="#ffeab0" stopOpacity=".28" /><stop offset="1" stopColor="#ffeab0" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="400" height="270" fill="url(#rcBg)" />
      <rect width="400" height="270" fill="url(#rcGlow)" />
      <Stars color="#fff4cf" />
      {/* crystal chandeliers */}
      {[70, 200, 330].map((x, k) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <line x1="0" y1="0" x2="0" y2={k === 1 ? 40 : 26} stroke="#e8d08a" strokeWidth=".8" />
          {[...Array(15)].map((_, i) => {
            const dx = (i - 7) * (k === 1 ? 6.4 : 4.6);
            const len = (k === 1 ? 90 : 60) - Math.abs(i - 7) * (k === 1 ? 6 : 4);
            return (<g key={i}><line x1="0" y1={k === 1 ? 40 : 26} x2={dx} y2={(k === 1 ? 40 : 26) + len} stroke="#f4e4b0" strokeWidth=".7" opacity=".8" /><circle cx={dx} cy={(k === 1 ? 40 : 26) + len} r="1.8" fill="#fff6d6" className="twinkle" style={{ animationDelay: `${(i % 6) * 0.25}s` }} /></g>);
          })}
        </g>
      ))}
      {/* hedges + fairy lights */}
      <path d="M0 236 Q50 210 100 236 T200 236 T300 236 T400 236 V270 H0Z" fill="#0f3a2a" />
      {[...Array(24)].map((_, i) => (
        <circle key={i} cx={8 + i * 17} cy={232 + Math.sin(i) * 6} r="2" fill="#fff4c0" className="twinkle" style={{ animationDelay: `${(i % 8) * 0.2}s` }} />
      ))}
      <Couple x={200} y={182} s={0.95} bride="#b9b4cf" groom="#1b1f3a" veil />
    </svg>
  );
}

export const SCENES = {
  sangeet: SceneSangeet,
  afterparty: SceneAfter,
  carnival: SceneCarnival,
  shera: SceneShera,
  reception: SceneReception,
};
