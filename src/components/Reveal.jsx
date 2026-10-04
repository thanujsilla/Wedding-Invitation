import { motion } from 'framer-motion';

// Scroll-triggered reveal: opacity + translate + slight scale (+ soft blur).
export default function Reveal({ children, delay = 0, y = 34, scale = 0.98, blur = true, as = 'div', className = '', ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, scale, filter: blur ? 'blur(6px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, delay, ease: [0.22, 0.8, 0.24, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
