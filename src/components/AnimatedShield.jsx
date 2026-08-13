import React from 'react';
import { motion } from 'framer-motion';

const AnimatedShield = ({ size = 48, color = 'var(--accent-primary)', strokeWidth = 1.5, className="" }) => {
  return (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      className={className}
    >
      <motion.path 
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { 
            pathLength: 1, 
            opacity: 1, 
            transition: { duration: 1.5, ease: "easeInOut" } 
          }
        }}
      />
      <motion.line 
        x1="12" y1="8" x2="12" y2="12" 
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { delay: 1.2, duration: 0.5 } }
        }}
      />
      <motion.line 
        x1="12" y1="16" x2="12.01" y2="16" 
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { delay: 1.4, duration: 0.3 } }
        }}
      />
      <motion.path 
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: [0, 0.5, 0],
            transition: { delay: 1.5, duration: 2, repeat: Infinity } 
          }
        }}
        style={{ filter: 'blur(8px)', strokeWidth: 4 }}
      />
    </motion.svg>
  );
};

export default AnimatedShield;
