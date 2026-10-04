// ─────────────────────────────────────────────────────────────
//  Everything personal lives here. Edit this file, not the components.
// ─────────────────────────────────────────────────────────────

export const COUPLE = {
  bride: 'Meenal',
  groom: 'Avinash',
  brideParents: 'Mr. & Mrs. Sharma',
  groomParents: 'Mr. & Mrs. Patel',
};

// Countdown target (IST). NOTE: if this moment has already passed the
// countdown shows zeros and a gentle "celebrations have begun" line.
export const WEDDING_DATE = new Date('2026-07-01T11:00:00+05:30');

export const SAVE_THE_DATE = { month: 'JULY', day: '01', year: '2026' };

export const VENUE = {
  name: 'Rajalakshmi Kalyana Mandapam',
  address: ['No. 205/1, Velachery Main Road, Dhandeeswaram,', 'Velachery, Chennai, Tamil Nadu — 600042'],
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rajalakshmi+Kalyana+Mandapam+Velachery+Chennai',
};

const RESORT = 'Accord Wildlife Pench Resort';
const mapsFor = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const EVENTS = [
  {
    id: 'sangeet',
    name: 'Sangeet Night',
    day: 'Tuesday',
    date: '30 Jun 2026',
    short: 'JUNE 30',
    time: '7:00 PM',
    quote: 'An evening of music, dance, and celebration.',
    dress: { colors: ['#6e1a26', '#c9a04a', '#f4ead6'], names: 'Maroon · Gold · Cream', style: 'Traditional Indian / Indo-western' },
    place: null,
  },
  {
    id: 'afterparty',
    name: 'After Party',
    day: 'Tuesday',
    date: '30 Jun 2026',
    short: 'JUNE 30',
    time: '11:00 PM',
    quote: 'Let your hair down and party till the stars fade.',
    dress: null,
    place: `${RESORT} · The Lounge`,
    maps: mapsFor(RESORT),
  },
  {
    id: 'carnival',
    name: 'Carnival',
    day: 'Wednesday',
    date: '1 Jul 2026',
    short: 'JULY 1',
    time: '11:00 AM',
    quote: 'A vibrant burst of colors, games, and laughter.',
    dress: { colors: ['#f2a7b8', '#f6c3a0', '#b9e0c8'], names: 'Pastel Pink · Peach · Mint', style: 'Comfortable & breezy daywear' },
    place: `${RESORT} · Poolside Lawn`,
    maps: mapsFor(RESORT),
  },
  {
    id: 'shera',
    name: 'Shera Bandi',
    day: 'Wednesday',
    date: '1 Jul 2026',
    short: 'JULY 1',
    time: '5:00 PM',
    quote: 'The groom’s royal procession begins.',
    dress: { colors: ['#e0752b', '#d9a93a', '#f4ead6'], names: 'Saffron · Marigold · Ivory', style: 'Festive ethnic' },
    place: `${RESORT} · Main Entrance`,
    maps: mapsFor(RESORT),
  },
  {
    id: 'reception',
    name: 'Reception',
    day: 'Wednesday',
    date: '1 Jul 2026',
    short: 'JULY 1',
    time: '7:00 PM',
    quote: 'Family, love, and shaadi — full filmy package.',
    dress: { colors: ['#14204f', '#c9a04a'], names: 'Navy · Gold', style: 'Cocktail formal' },
    place: `${RESORT} · Grand Ballroom`,
    maps: mapsFor(RESORT),
  },
];

export const DRESS_CODE = {
  palette: [
    { name: 'Maroon', color: '#7d1a24' },
    { name: 'Gold', color: '#c9a04a' },
    { name: 'Ivory', color: '#f6efe0' },
  ],
  style: 'Traditional Indian',
  pieces: ['Sarees', 'Lehengas', 'Sherwanis'],
  mapsUrl: mapsFor(RESORT),
};

// Replace `src: null` with e.g. '/photos/us-1.jpg' (put files in /public/photos)
export const PHOTOS = {
  hero: { src: null, caption: 'Memories together…' },
  stack: [
    { src: null, caption: 'Where it all began', tilt: -7 },
    { src: null, caption: 'Chai, chaos & us', tilt: 5 },
    { src: null, caption: 'Forever starts here', tilt: -2 },
  ],
  venue: { src: null },
};

export const SONGS = [
  ['Kala Chashma', 'Amar Arshi, Badshah, Neha Kakkar'],
  ['Kala', 'Danheim'],
  ['Kala Sha Kala', 'Om Prakash'],
  ['Chaiyya Chaiyya', 'Sukhwinder Singh, Sapna Awasthi'],
  ['Gallan Goodiyan', 'Shankar Mahadevan, Yashita Sharma'],
  ['London Thumakda', 'Labh Janjua, Sonu Kakkar, Neha Kakkar'],
  ['Balam Pichkari', 'Vishal Dadlani, Shalmali Kholgade'],
  ['Badtameez Dil', 'Benny Dayal'],
  ['Nashe Si Chadh Gayi', 'Arijit Singh'],
  ['Kar Gayi Chull', 'Badshah, Neha Kakkar, Fazilpuria'],
  ['Subha Hone Na De', 'Mika Singh, Pritam'],
  ['Tenu Suit Suit', 'Guru Randhawa'],
  ['Naatu Naatu', 'Rahul Sipligunj, Kaala Bhairava'],
  ['Zingaat', 'Ajay-Atul'],
  ['Dilliwaali Girlfriend', 'Arijit Singh, Sunidhi Chauhan'],
  ['Mauja Hi Mauja', 'Mika Singh'],
  ['Kajra Re', 'Alisha Chinai, Shankar Mahadevan, Javed Ali'],
  ['Sheila Ki Jawani', 'Sunidhi Chauhan'],
  ['Lungi Dance', 'Yo Yo Honey Singh'],
  ['Desi Girl', 'Vishal Dadlani, Sunidhi Chauhan, Shankar Mahadevan'],
  ['Swag Se Swagat', 'Vishal Dadlani, Neha Bhasin'],
  ['Jhoome Jo Pathaan', 'Arijit Singh'],
  ['Raataan Lambiyan', 'Jubin Nautiyal, Asees Kaur'],
  ['Apna Bana Le', 'Arijit Singh'],
  ['Gerua', 'Arijit Singh, Antara Mitra'],
  ['Ghungroo', 'Arijit Singh, Shilpa Rao'],
];

export const DIETARY = [
  'No specific preferences',
  'Vegetarian',
  'Vegan',
  'Jain',
  'Gluten-free',
  'Other — tell us in the notes',
];

export const PARTY_SIZES = ['1 (Just me)', '2', '3', '4', '5', '6+'];
