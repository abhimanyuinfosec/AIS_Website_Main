import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLock = ({ size = 48, color = 'var(--accent-primary)', strokeWidth = 1.5, className="" }) => {
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
      <motion.rect 
        x="3" y="11" width="18" height="11" rx="2" ry="2" 
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: "easeInOut" } }
        }}
      />
      <motion.path 
        d="M7 11V7a5 5 0 0 1 10 0v4" 
        variants={{
          hidden: { y: -10, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1, 
            transition: { 
              delay: 0.8, 
              type: "spring", 
              stiffness: 500, 
              damping: 15 
            } 
          }
        }}
      />
      <motion.circle cx="12" cy="15" r="1"
         variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1, transition: { delay: 1.2 } }
        }}
      />
      <motion.path d="M12 16v2"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 1.3 } }
        }}
      />
      
       <motion.rect 
        x="3" y="11" width="18" height="11" rx="2" ry="2" 
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: [0, 0.4, 0],
            transition: { delay: 1.5, duration: 2, repeat: Infinity } 
          }
        }}
        style={{ filter: 'blur(8px)', strokeWidth: 4 }}
      />
    </motion.svg>
  );
};

export default AnimatedLock;
