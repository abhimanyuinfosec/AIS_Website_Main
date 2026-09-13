import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * ParticleWave - 3D dynamic waving particle sea.
 * Exact replication of mimirnest.vercel.app's background motion.
 * 
 * Features:
 * - Three.js WebGL with custom GLSL vertex and fragment shaders.
 * - Additive glowing blending (THREE.AdditiveBlending) so particles emit light without washing out dark backgrounds.
 * - Distance horizon fading (smoothstep) preventing particle clustering/haze.
 * - Additive 2D canvas fallback for environments without WebGL.
 * - Smooth mouse parallax interaction.
 */
const ParticleWave = ({ 
  className = '', 
  color = 'cyan', 
  speed = 0.035,
  interactive = true,
  opacity = 0.75
}) => {
  const canvasRef = useRef(null);

  const resolveColor = (c) => {
    let rgb = { r: 0.0, g: 0.94, b: 1.0, hex: '#00f0ff', rgba: 'rgba(0, 240, 255, ' };
    if (typeof c === 'string') {
      const lower = c.toLowerCase();
      if (lower === 'cyan') {
        rgb = { r: 0.0, g: 0.94, b: 1.0, hex: '#00f0ff', rgba: 'rgba(0, 240, 255, ' };
      } else if (lower === 'orange') {
        rgb = { r: 1.0, g: 0.42, b: 0.12, hex: '#FF5A36', rgba: 'rgba(255, 90, 54, ' };
      } else if (lower === 'blue') {
        rgb = { r: 0.18, g: 0.55, b: 1.0, hex: '#2e8cff', rgba: 'rgba(46, 140, 255, ' };
      } else if (lower === 'purple') {
        rgb = { r: 0.65, g: 0.35, b: 1.0, hex: '#a659ff', rgba: 'rgba(166, 89, 255, ' };
      } else if (lower.startsWith('#')) {
        const hex = lower.replace('#', '');
        const bigint = parseInt(hex.length === 3 ? hex.split('').map(x => x + x).join('') : hex, 16);
        const r = ((bigint >> 16) & 255) / 255;
        const g = ((bigint >> 8) & 255) / 255;
        const b = (bigint & 255) / 255;
        rgb = { r, g, b, hex: lower, rgba: `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ` };
      }
    }
    return rgb;
  };

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    const parent = canvas.parentElement || document.body;
    let winWidth = parent.clientWidth || window.innerWidth;
    let winHeight = parent.clientHeight || window.innerHeight;

    const colorConfig = resolveColor(color);
    let animationId = null;
    let isCleanedUp = false;

    // =========================================================================
    // 1. High-Performance Three.js WebGL Mode
    // =========================================================================
    try {
      const camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 0.1, 1000);
      const baseCamPos = { x: 0, y: 6, z: 5 };
      camera.position.set(baseCamPos.x, baseCamPos.y, baseCamPos.z);

      const scene = new THREE.Scene();

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(winWidth, winHeight);
      renderer.setClearColor(0x000000, 0); // Completely transparent background

      // GLSL Shaders with distance fade and point-size controls
      const particleVertex = `
        attribute float scale;
        uniform float uTime;
        varying float vDist;

        void main() {
          vec3 p = position;
          float s = scale;
          p.y += (sin(p.x * 0.75 + uTime) * 0.45) + (cos(p.z * 0.75 + uTime) * 0.12) * 2.0;
          p.x += (sin(p.z * 0.5 + uTime) * 0.35);
          s += (sin(p.x * 0.75 + uTime) * 0.45) + (cos(p.z * 0.75 + uTime) * 0.12) * 2.0;

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          vDist = -mvPosition.z;

          float pointSize = s * 11.0 * (1.0 / -mvPosition.z);
          gl_PointSize = clamp(pointSize, 0.6, 4.2);
          gl_Position = projectionMatrix * mvPosition;
        }
      `;

      const particleFragment = `
        uniform vec3 uColor;
        varying float vDist;

        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;

          float circleAlpha = smoothstep(0.5, 0.05, r);
          // Smooth distance horizon fade to prevent density bunching/fog
          float distFade = smoothstep(25.0, 4.0, vDist);
          float alpha = circleAlpha * distFade * 0.85;

          if (alpha < 0.01) discard;

          vec3 brightColor = uColor * (1.3 - r * 0.4);
          gl_FragColor = vec4(brightColor, alpha);
        }
      `;

      // Spaced particle grid
      const gap = 0.45;
      let amountX = 85;
      let amountY = 85;
      const w = window.innerWidth;
      if (w < 640) {
        amountX = 45;
        amountY = 45;
      } else if (w < 1024) {
        amountX = 65;
        amountY = 65;
      }

      const particleNum = amountX * amountY;
      const particlePositions = new Float32Array(particleNum * 3);
      const particleScales = new Float32Array(particleNum);

      let i = 0;
      let j = 0;
      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          particlePositions[i] = ix * gap - ((amountX * gap) / 2);
          particlePositions[i + 1] = 0;
          particlePositions[i + 2] = iy * gap - ((amountX * gap) / 2);
          particleScales[j] = 1;
          i += 3;
          j++;
        }
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

      // Key: Additive blending allows neon particles to glow on dark backgrounds without covering them
      const particleMaterial = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Vector3(colorConfig.r, colorConfig.g, colorConfig.b) }
        }
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      const mouseTarget = { x: 0, y: 0 };

      const handleMouseMove = (e) => {
        if (!interactive) return;
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseTarget.x = normX * 0.7;
        mouseTarget.y = normY * 0.35;
      };

      const handleResize = () => {
        if (isCleanedUp || !canvas || !parent) return;
        winWidth = parent.clientWidth || window.innerWidth;
        winHeight = parent.clientHeight || window.innerHeight;
        camera.aspect = winWidth / winHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(winWidth, winHeight);
      };

      const animateWebGL = () => {
        if (isCleanedUp) return;
        particleMaterial.uniforms.uTime.value += speed;

        if (interactive) {
          camera.position.x += (baseCamPos.x + mouseTarget.x - camera.position.x) * 0.05;
          camera.position.y += (baseCamPos.y + mouseTarget.y - camera.position.y) * 0.05;
        }

        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animateWebGL);
      };

      animateWebGL();

      window.addEventListener('resize', handleResize);
      if (interactive) window.addEventListener('mousemove', handleMouseMove);

      return () => {
        isCleanedUp = true;
        if (animationId) cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        if (interactive) window.removeEventListener('mousemove', handleMouseMove);

        scene.remove(particles);
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
        try {
          renderer.forceContextLoss();
        } catch (e) {}
      };
    } catch (webglErr) {
      console.info('WebGL unavailable; switching to resilient 2D canvas:', webglErr?.message);
    }

    // =========================================================================
    // 2. Resilient Additive 2D Canvas Fallback (100% Transparent, Dark Mode Safe)
    // =========================================================================
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const mousePos = { x: 0, y: 0 };

    const handleResize2D = () => {
      if (isCleanedUp) return;
      winWidth = parent.clientWidth || window.innerWidth;
      winHeight = parent.clientHeight || window.innerHeight;
      canvas.width = winWidth;
      canvas.height = winHeight;
    };

    handleResize2D();

    const handleMouseMove2D = (e) => {
      if (!interactive) return;
      mousePos.x = (e.clientX / window.innerWidth - 0.5) * 1.4;
      mousePos.y = (e.clientY / window.innerHeight - 0.5) * 0.7;
    };

    window.addEventListener('resize', handleResize2D);
    if (interactive) window.addEventListener('mousemove', handleMouseMove2D);

    const isMobile = window.innerWidth < 640;
    const amountX = isMobile ? 30 : 42;
    const amountY = isMobile ? 30 : 42;
    const gap = 0.52;

    const cosPitch = 0.640184;
    const sinPitch = 0.768221;
    const camDist = 7.81025;

    const animate2D = () => {
      if (isCleanedUp) return;
      time += speed;

      // Strictly clear to 100% transparent pixels
      ctx.clearRect(0, 0, winWidth, winHeight);

      const aspect = winWidth / winHeight;
      const fy = 1 / Math.tan((75 / 2) * Math.PI / 180);
      const fx = fy / aspect;
      const halfExtent = (amountX * gap) / 2;

      ctx.save();
      // Additive mode: light is added onto the background, never covering it
      ctx.globalCompositeOperation = 'lighter';

      for (let iy = 0; iy < amountY; iy++) {
        const baseZ = iy * gap - halfExtent;

        for (let ix = 0; ix < amountX; ix++) {
          const baseX = ix * gap - halfExtent;

          const pY = (Math.sin(baseX * 0.75 + time) * 0.45) + (Math.cos(baseZ * 0.75 + time) * 0.12) * 2.0;
          const pX = baseX + (Math.sin(baseZ * 0.5 + time) * 0.35);
          const s = 1.0 + (Math.sin(baseX * 0.75 + time) * 0.4) + (Math.cos(baseZ * 0.75 + time) * 0.15);

          const xc = pX - mousePos.x;
          const yc = cosPitch * (pY - mousePos.y) - sinPitch * baseZ;
          const d = camDist - sinPitch * (pY - mousePos.y) - cosPitch * baseZ;

          // Discard particles behind or too near camera
          if (d > 1.5 && d < 22) {
            const ndcX = (xc * fx) / d;
            const ndcY = (yc * fy) / d;

            const sx = ((ndcX + 1) / 2) * winWidth;
            const sy = ((-ndcY + 1) / 2) * winHeight;

            if (sx >= -5 && sx <= winWidth + 5 && sy >= -5 && sy <= winHeight + 5) {
              const pointRadius = Math.min(1.8, Math.max(0.6, (s * 2.6) / d));
              // Distance fade
              const distFade = Math.max(0, Math.min(1, (20 - d) / 14));
              const alpha = Math.min(0.75, Math.max(0.08, distFade * 0.7));

              if (alpha > 0.02) {
                ctx.beginPath();
                ctx.arc(sx, sy, pointRadius, 0, Math.PI * 2);
                ctx.fillStyle = `${colorConfig.rgba}${alpha})`;
                ctx.fill();
              }
            }
          }
        }
      }

      ctx.restore();
      animationId = requestAnimationFrame(animate2D);
    };

    animate2D();

    return () => {
      isCleanedUp = true;
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize2D);
      if (interactive) window.removeEventListener('mousemove', handleMouseMove2D);
    };
  }, [color, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full pointer-events-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        overflow: 'hidden',
        opacity: opacity
      }}
    />
  );
};

export default ParticleWave;
export { ParticleWave };
