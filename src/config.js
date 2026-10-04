// ─────────────────────────────────────────────────────────────
//  Everything personal lives here. Edit this file, not the components.
// ─────────────────────────────────────────────────────────────

export const COUPLE = {
  bride: 'Yamini',
  groom: 'Nayan Raju',
  brideParents: 'Nagamani & Ravi Kumar',
  groomParents: 'ABCDEF & Dr. Lokanatham', // ← replace ABCDEF with the real name
};

// Telugu blessing shown at the top of the invitation
export const BLESSING_TELUGU = 'శ్రీ గణేశాయ నమః';

// Ganesh photo: put your image at public/images/ganesh.png (or .jpg and change this path).
// Until the file exists, a hand-drawn Ganesha illustration is shown instead.
export const GANESH = { src: '/images/ganesh.png' };

// Countdown target (IST). 13 December 2026 — change the time if you have the muhurtham.
export const WEDDING_DATE = new Date('2026-12-13T00:00:00+05:30');

export const SAVE_THE_DATE = { month: 'DECEMBER', day: '13', year: '2026', caption: 'Sunday · the thirteenth of December' };

export const VENUE = {
  name: 'Anandamayi Function Hall',
  address: ['Mill Junction , 80 Feet Road , Arasavilli , Srikakulam'],
  mapsUrl:
    'https://www.google.com/search?client=ms-android-motorola-rvo3&hs=Ymkq&sca_esv=0822aa61e3658205&hl=en-IN&cs=1&sxsrf=APpeQntdLgVYv4JxLZx0gaWznzab6k-AkQ%3A1791138574440&kgmid=%2Fg%2F11ybhvb5vm&q=Anandamayi%20convention%20hall&shem=epsd1%2Cltae%2Crimspwouoe&shndl=30&source=sh%2Fx%2Floc%2Ftile%2Fm1%2F4&kgs=50ab9dcea178de44',
};

const RESORT = 'Accord Wildlife Pench Resort';
const mapsFor = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// NOTE: event names / times / places below are still the sample ones — edit them.
export const EVENTS = [
  { id: 'sangeet', name: 'Sangeet Night', day: 'Saturday', date: '12 Dec 2026', short: 'DEC 12', time: '7:00 PM', quote: 'An evening of music, dance, and celebration.', place: null },
  { id: 'afterparty', name: 'Alaka Sambaram', day: 'Saturday', date: '12 Dec 2026', short: 'DEC 12', time: '11:00 PM', quote: 'Let your hair down and party till the stars fade.', place: `${RESORT} · The Lounge`, maps: mapsFor(RESORT) },
  { id: 'carnival', name: 'Godumu rayi', day: 'Sunday', date: '13 Dec 2026', short: 'DEC 13', time: '11:00 AM', quote: 'A vibrant burst of colors, games, and laughter.', place: `${RESORT} · Poolside Lawn`, maps: mapsFor(RESORT) },
  { id: 'shera', name: 'Haldi Function', day: 'Sunday', date: '13 Dec 2026', short: 'DEC 13', time: '5:00 PM', quote: 'The groom’s royal procession begins.', place: `${RESORT} · Main Entrance`, maps: mapsFor(RESORT) },
  { id: 'reception', name: 'Reception', day: 'Sunday', date: '13 Dec 2026', short: 'DEC 13', time: '7:00 PM', quote: 'Family, love, and shaadi — full filmy package.', place: `${RESORT} · Grand Ballroom`, maps: mapsFor(RESORT) },
];

// Replace `src: null` with e.g. '/photos/venue.jpg' (put files in /public/photos)
export const PHOTOS = { venue: { src: null } };

// Background music. Put your file at public/music/wedding.mp3 (or change src).
// If the file is missing, the music button simply doesn't appear.
export const MUSIC = { src: '/music/ReelAudio-38076.mp3', volume: 0.45, fadeMs: 2500 };
