import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope';
import FloatingPetals from './components/FloatingPetals';
import ScrollThread from './components/ScrollThread';
import Hero from './components/Hero';
import SaveTheDate from './components/SaveTheDate';
import Countdown from './components/Countdown';
import Venue from './components/Venue';
import Festivities from './components/Festivities';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [opened, setOpened] = useState(false);
  const [musicStart, setMusicStart] = useState(false);

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
          <Venue />
          <Festivities />
          <Footer />
        </main>
      </div>

      {opened && <ScrollThread />}
      <AnimatePresence>{!opened && <Envelope key="env" onStart={() => setMusicStart(true)} onOpen={() => setOpened(true)} />}</AnimatePresence>
      <MusicPlayer start={musicStart} />
      <FloatingPetals />
    </>
  );
}
