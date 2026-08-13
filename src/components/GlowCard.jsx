import React, { useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';

const GlowCard = ({ children, className = "", tiltMaxAngleX = 5, tiltMaxAngleY = 5, ...props }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Tilt
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      glareEnable={false}
      transitionSpeed={1500}
      scale={1.02}
      className={className}
      {...props}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          borderRadius: 'inherit'
        }}
      >
        {isHovering && (
          <div
            style={{
              position: 'absolute',
              top: mousePosition.y,
              left: mousePosition.x,
              width: '600px',
              height: '600px',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(2, 132, 199, 0.15) 0%, rgba(2, 132, 199, 0) 60%)',
              pointerEvents: 'none',
              zIndex: 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}
        <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
          {children}
        </div>
      </div>
    </Tilt>
  );
};

export default GlowCard;
