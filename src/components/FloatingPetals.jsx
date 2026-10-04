import { useEffect, useRef } from 'react';
import { PetalField, petals } from '../lib/petals';

export default function FloatingPetals() {
  const ref = useRef(null);
  useEffect(() => {
    const field = new PetalField(ref.current);
    petals.field = field;
    field.start();
    return () => { field.destroy(); if (petals.field === field) petals.field = null; };
  }, []);
  return <canvas ref={ref} className="petal-canvas" aria-hidden />;
}
