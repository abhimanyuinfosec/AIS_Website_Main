import React from 'react';
import { motion } from 'framer-motion';

const AnimatedRadar = ({ size = 48, color = 'var(--accent-primary)', strokeWidth = 1.5, className="" }) => {
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
      <motion.circle cx="12" cy="12" r="10" 
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 0.5, transition: { duration: 1 } }
        }}
      />
      <motion.circle cx="12" cy="12" r="6" 
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 0.5, transition: { duration: 1, delay: 0.2 } }
        }}
      />
      <motion.circle cx="12" cy="12" r="2" 
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } }
        }}
      />
      
      <motion.line x1="12" y1="12" x2="12" y2="2" 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 1 } }
        }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 3, 
          ease: "linear", 
          repeat: Infinity,
          delay: 1 
        }}
        style={{ transformOrigin: "12px 12px" }}
      />
      
      <motion.circle cx="16" cy="8" r="1.5" fill={color} stroke="none"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 0, scale: 0 }
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0]
        }}
        transition={{
          duration: 3,
          ease: "easeOut",
          repeat: Infinity,
          delay: 1.5
        }}
      />
    </motion.svg>
  );
};

export default AnimatedRadar;
