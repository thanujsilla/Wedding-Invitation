# Meenal & Avinash — Interactive Wedding Invitation

React + Vite + Framer Motion. Mobile-first (max 430px, centred on desktop). No Tailwind, no UI kit — hand-written CSS.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Make it yours — edit `src/config.js`
Names, parents, wedding date/time (countdown target), venue + maps link, every event
(time, quote, dress code, location), dress-code palette, the autocomplete song list, dietary options.

**Photos:** drop images in `public/photos/` and set `src: '/photos/us-1.jpg'` in `PHOTOS` (config.js).
Until then, clearly-marked placeholders keep the exact frame, crop and animation.

**Countdown:** it targets `WEDDING_DATE`. Once that moment passes it shows zeros and a thank-you line.

**RSVP:** submissions are saved to `localStorage` (key `wedding-rsvp`). To collect them for real,
POST `payload` to your backend / Google Sheet / Formspree inside `submit()` in `src/components/RSVPSection.jsx`.

## Structure
```
src/
  App.jsx                    scroll flow + global state (opened, rsvp)
  config.js                  all content
  lib/petals.js              canvas petal / confetti / sparkle engine (sprites, 60fps)
  lib/art.jsx                lotus emblem, ornaments, 5 animated event scenes, photo placeholders
  components/
    Envelope.jsx             embossed envelope → light burst → flaps fold → card expands
    Hero.jsx                 blessing, staggered 3D letter reveal of the names
    SaveTheDate.jsx + ScratchCard.jsx   real canvas scratch cards → confetti → auto-scroll
    Countdown.jsx            live countdown, per-digit blur-slide animation
    OurStory.jsx             "developing" album photo + shufflable polaroid stack
    Venue.jsx  Festivities.jsx  DressCode.jsx
    RSVPSection.jsx  CustomSelect.jsx  SongSearch.jsx   validated form, autocomplete
    ThankYou.jsx             circle-wipe, drawn heart, petal storm
    Footer.jsx  FloatingPetals.jsx  ScrollThread.jsx  Reveal.jsx
```
