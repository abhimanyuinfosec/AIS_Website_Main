import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({ children, delay = 0, yOffset = 20, duration = 0.6, className = "", ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: duration, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
