import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope';
import FloatingPetals from './components/FloatingPetals';
import ScrollThread from './components/ScrollThread';
import Hero from './components/Hero';
import SaveTheDate from './components/SaveTheDate';
import Countdown from './components/Countdown';
import OurStory from './components/OurStory';
import Venue from './components/Venue';
import Festivities from './components/Festivities';
import DressCode from './components/DressCode';
import RSVPSection from './components/RSVPSection';
import Footer from './components/Footer';
import ThankYou from './components/ThankYou';

export default function App() {
  const [opened, setOpened] = useState(false);
  const [rsvp, setRsvp] = useState(null);

  // The envelope owns the screen until opened: no scrolling underneath it.
  useEffect(() => {
    document.documentElement.classList.toggle('locked', !opened);
    if (!opened) window.scrollTo(0, 0);
  }, [opened]);

  return (
    <>
      <div className="stage">
        <main className="frame">
          <Hero opened={opened} />
          <SaveTheDate />
          <Countdown />
          <OurStory />
          <Venue />
          <Festivities />
          <DressCode />
          <RSVPSection onSubmitted={setRsvp} />
          <Footer />
        </main>
      </div>

      {opened && <ScrollThread />}
      <AnimatePresence>{!opened && <Envelope key="env" onOpen={() => setOpened(true)} />}</AnimatePresence>
      <ThankYou data={rsvp} onClose={() => setRsvp(null)} />
      <FloatingPetals />
    </>
  );
}
