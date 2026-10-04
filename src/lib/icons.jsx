const base = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const MapPin = (p) => (<svg {...base} {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const ChevronDown = (p) => (<svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>);
export const ArrowDown = (p) => (<svg {...base} {...p}><path d="M12 5v14M6 13l6 6 6-6" /></svg>);
export const Check = (p) => (<svg {...base} strokeWidth={2.4} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
export const Music = (p) => (<svg {...base} {...p}><path d="M9 18V5l11-2v13" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="17.5" cy="16" r="2.5" /></svg>);
export const Utensils = (p) => (<svg {...base} {...p}><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M17 21V3c-2.5 1.5-3.5 4-3.5 8h3.5" /></svg>);
export const Pen = (p) => (<svg {...base} {...p}><path d="M4 20l1-4L17 4l3 3L8 19l-4 1Z" /></svg>);
export const Phone = (p) => (<svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>);
export const User = (p) => (<svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></svg>);
export const Users = (p) => (<svg {...base} {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.6 3.2-5.5 6.5-5.5s5.700 1.900 6.500 5.500M16 4.800a3.500 3.500 0 0 1 0 6.400M18 14.800c2 .6 3.200 2.300 3.600 5.200" /></svg>);
export const Loader = (p) => (<svg {...base} className="spin" {...p}><path d="M12 3a9 9 0 1 0 9 9" /></svg>);
