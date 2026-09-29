import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * WireframeSphere Component
 * =========================================================================
 * 3D technological network sphere for the hero section background.
 * Features:
 *  - Procedural Fibonacci sphere network with delicate optical nodes
 *  - Custom GLSL Shaders with view-space depth attenuation
 *  - Scroll-triggered dynamic disruption & parallax dispersion
 *  - Interactive cursor hover excitation & node brightening (Antigravity style)
 *  - Smooth reversible lerping back to pristine sphere when scrolled to top
 * =========================================================================
 */
const WireframeSphere = ({
  radius = 5.2,
  wireframeOpacity = 0.16,
  nodeSize = 0.6,
  nodeOpacity = 0.7,
  rotationSpeed = 0.35,
  mouseStrength = 0.0,
  depthFade = 0.82,
  nodeCount = 950,
  enableScrollDisruption = true,
  disruptionStrength = 1.0,
  className = '',
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8.2;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent canvas
    container.appendChild(renderer.domElement);

    // 3. Sphere Group
    const sphereGroup = new THREE.Group();
    sphereGroup.rotation.x = 0.22;
    sphereGroup.rotation.z = -0.12;
    scene.add(sphereGroup);

    // 4. Color Palette (Luminous warm-white core, refined amber-crimson rim)
    const lineColor = new THREE.Color(0xff4a34);
    const lineDeepColor = new THREE.Color(0x28060a);
    const nodeOuterColor = new THREE.Color(0xd9261a);
    const nodeMainColor = new THREE.Color(0xff6e38);
    const nodeCoreColor = new THREE.Color(0xfffbf5); // Radiant pure light

    // 5. GLSL Shaders with Built-in Scroll Disruption & Hover Brightening
    const lineShader = {
      vertexShader: `
        attribute vec3 aDirection;
        attribute float aDispWeight;
        uniform float uDisruption;
        uniform float uTime;
        varying vec3 vViewPosition;

        void main() {
          vec3 displaced = position + aDirection * (uDisruption * aDispWeight * 3.6);
          displaced += sin(uTime * 2.5 + position * 2.0) * (uDisruption * 0.12);

          vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uLineColor;
        uniform vec3 uLineDeepColor;
        uniform float uBaseOpacity;
        uniform float uDepthFade;
        uniform float uNearDepth;
        uniform float uFarDepth;
        uniform float uDisruption;
        uniform float uHover;
        varying vec3 vViewPosition;

        void main() {
          float depth = clamp((vViewPosition.z - uNearDepth) / (uFarDepth - uNearDepth), 0.0, 1.0);
          float fade = mix(1.0, 1.0 - uDepthFade, depth);

          // Lines stretch and gracefully dissolve as disruption expands
          float disruptionFade = 1.0 - smoothstep(0.12, 0.90, uDisruption) * 0.8;
          // Subtle luminescence boost on hover
          float hoverBoost = 1.0 + uHover * 0.35;
          float alpha = uBaseOpacity * hoverBoost * fade * disruptionFade;

          vec3 color = mix(uLineColor, uLineDeepColor, depth * 0.9);
          gl_FragColor = vec4(color, alpha);
        }
      `,
    };

    const pointShader = {
      vertexShader: `
        attribute float aSize;
        attribute float aBrightness;
        attribute vec3 aDirection;
        attribute float aDispWeight;
        uniform float uBaseSize;
        uniform float uDisruption;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uHover;
        varying vec3 vViewPosition;
        varying float vBrightness;
        varying float vCursorGlow;

        void main() {
          vBrightness = aBrightness;

          // Disperse nodes outward into a scattered cyber constellation
          vec3 displaced = position + aDirection * (uDisruption * aDispWeight * 4.0);
          displaced.y += sin(uTime * 2.0 + position.x * 2.0) * (uDisruption * 0.18);
          displaced.x += cos(uTime * 1.8 + position.y * 2.0) * (uDisruption * 0.15);

          vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
          vViewPosition = -mvPosition.xyz;

          // Projected NDC coordinates to detect cursor proximity excitation
          vec4 projPos = projectionMatrix * mvPosition;
          vec2 screenCoord = projPos.xy / projPos.w;
          float distToCursor = length(screenCoord - uMouse);
          vCursorGlow = smoothstep(0.70, 0.05, distToCursor) * uHover;

          // Point size expands gently when hovering and near cursor
          float hoverScale = 1.0 + uHover * 0.25 + vCursorGlow * 0.45;
          float sizeFactor = mix(1.0, 1.35, smoothstep(0.0, 0.6, uDisruption)) * hoverScale;
          gl_PointSize = (uBaseSize * aSize * sizeFactor) * (180.0 / -mvPosition.z);
          gl_Position = projPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uNodeOuterColor;
        uniform vec3 uNodeMainColor;
        uniform vec3 uNodeCoreColor;
        uniform float uBaseOpacity;
        uniform float uDepthFade;
        uniform float uNearDepth;
        uniform float uFarDepth;
        uniform float uDisruption;
        uniform float uHover;
        varying vec3 vViewPosition;
        varying float vBrightness;
        varying float vCursorGlow;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          float totalGlow = clamp(uHover * 0.6 + vCursorGlow * 0.85, 0.0, 1.0);

          // Optical light profile: core blooms wider and brighter on hover (Antigravity excitation)
          float coreRadius = mix(0.18, 0.28, totalGlow);
          float core = smoothstep(coreRadius, 0.0, dist);
          float halo = smoothstep(0.5, 0.12, dist);

          float depth = clamp((vViewPosition.z - uNearDepth) / (uFarDepth - uNearDepth), 0.0, 1.0);
          float depthFactor = mix(1.0, 1.0 - uDepthFade * 0.88, depth);
          float scrollFade = 1.0 - smoothstep(0.65, 1.0, uDisruption) * 0.55;

          // Brightness amplification on hover
          float boostAlpha = uBaseOpacity * (1.0 + totalGlow * 0.7);
          float alpha = boostAlpha * vBrightness * (core * 0.95 + halo * (0.35 + totalGlow * 0.45)) * depthFactor * scrollFade;
          
          // Shifts into incandescent brilliant white on hover
          vec3 radiantWhite = mix(uNodeCoreColor, vec3(1.0, 1.0, 1.0), totalGlow * 0.8);
          vec3 color = mix(uNodeMainColor, radiantWhite, core * (0.95 + totalGlow * 0.05));

          gl_FragColor = vec4(color, alpha);
        }
      `,
    };

    // 6. Geometry Generation (Scales dynamically for 900+ nodes)
    const N = nodeCount;
    const vertices = [];
    const dirs = [];
    const weights = [];
    const sizes = [];
    const brightnesses = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      let radialMultiplier = 1.0;
      const randType = Math.random();

      if (randType > 0.88) {
        radialMultiplier = 1.04 + Math.random() * 0.06;
      } else if (randType < 0.12) {
        radialMultiplier = 0.94 + Math.random() * 0.04;
      } else {
        radialMultiplier = 0.985 + Math.random() * 0.03;
      }

      const r = radius * radialMultiplier;
      const pos = new THREE.Vector3(x * r, y * r, z * r);
      vertices.push(pos);

      // Precalculate organic disruption direction & weight per node
      const normal = pos.clone().normalize();
      const randVec = new THREE.Vector3(
        (Math.random() - 0.5) * 1.4,
        (Math.random() - 0.5) * 1.4,
        (Math.random() - 0.5) * 1.4
      );
      const dir = normal.multiplyScalar(0.7).add(randVec.multiplyScalar(0.45)).normalize();
      dirs.push(dir);
      weights.push(0.75 + Math.random() * 0.5);

      // Delicate point sizing ("lite" and elegant)
      if (Math.random() < 0.08) {
        sizes.push(1.15 + Math.random() * 0.2);
        brightnesses.push(0.95);
      } else if (Math.random() < 0.35) {
        sizes.push(0.55 + Math.random() * 0.15);
        brightnesses.push(0.65);
      } else {
        sizes.push(0.75 + Math.random() * 0.15);
        brightnesses.push(0.8);
      }
    }

    // Connect proximity vertices: tightened threshold for 900+ nodes to produce clean micro-triangles
    const linePositions = [];
    const lineDirs = [];
    const lineWeights = [];
    const maxDistance = radius * (N >= 700 ? 0.22 : N > 280 ? 0.35 : 0.44);
    const maxNeighborsPerNode = N >= 700 ? 4 : N > 280 ? 4 : 5;
    const neighborCounts = new Array(N).fill(0);

    for (let i = 0; i < N; i++) {
      if (neighborCounts[i] >= maxNeighborsPerNode) continue;
      const p1 = vertices[i];

      const candidates = [];
      for (let j = i + 1; j < N; j++) {
        if (neighborCounts[j] >= maxNeighborsPerNode) continue;
        const p2 = vertices[j];
        const dist = p1.distanceTo(p2);
        if (dist <= maxDistance) {
          candidates.push({ index: j, dist: dist, point: p2 });
        }
      }

      candidates.sort((a, b) => a.dist - b.dist);

      for (let c = 0; c < candidates.length; c++) {
        if (neighborCounts[i] >= maxNeighborsPerNode) break;
        const candidate = candidates[c];
        if (neighborCounts[candidate.index] >= maxNeighborsPerNode) continue;

        linePositions.push(p1.x, p1.y, p1.z);
        linePositions.push(candidate.point.x, candidate.point.y, candidate.point.z);

        lineDirs.push(dirs[i].x, dirs[i].y, dirs[i].z);
        lineDirs.push(dirs[candidate.index].x, dirs[candidate.index].y, dirs[candidate.index].z);

        lineWeights.push(weights[i]);
        lineWeights.push(weights[candidate.index]);

        neighborCounts[i]++;
        neighborCounts[candidate.index]++;
      }
    }

    // Line Segments Mesh
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('aDirection', new THREE.Float32BufferAttribute(lineDirs, 3));
    lineGeometry.setAttribute('aDispWeight', new THREE.Float32BufferAttribute(lineWeights, 1));

    const cameraDist = camera.position.z;
    const nearDepth = cameraDist - radius * 1.15;
    const farDepth = cameraDist + radius * 1.15;

    const lineMaterial = new THREE.ShaderMaterial({
      vertexShader: lineShader.vertexShader,
      fragmentShader: lineShader.fragmentShader,
      uniforms: {
        uLineColor: { value: lineColor },
        uLineDeepColor: { value: lineDeepColor },
        uBaseOpacity: { value: wireframeOpacity },
        uDepthFade: { value: depthFade },
        uNearDepth: { value: nearDepth },
        uFarDepth: { value: farDepth },
        uDisruption: { value: 0.0 },
        uHover: { value: 0.0 },
        uTime: { value: 0.0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    sphereGroup.add(lineMesh);

    // Points Mesh
    const pointPositions = [];
    const pointDirs = [];
    const pointWeights = [];
    for (let i = 0; i < N; i++) {
      pointPositions.push(vertices[i].x, vertices[i].y, vertices[i].z);
      pointDirs.push(dirs[i].x, dirs[i].y, dirs[i].z);
      pointWeights.push(weights[i]);
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointPositions, 3));
    pointsGeometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1));
    pointsGeometry.setAttribute('aBrightness', new THREE.Float32BufferAttribute(brightnesses, 1));
    pointsGeometry.setAttribute('aDirection', new THREE.Float32BufferAttribute(pointDirs, 3));
    pointsGeometry.setAttribute('aDispWeight', new THREE.Float32BufferAttribute(pointWeights, 1));

    const pointsMaterial = new THREE.ShaderMaterial({
      vertexShader: pointShader.vertexShader,
      fragmentShader: pointShader.fragmentShader,
      uniforms: {
        uNodeOuterColor: { value: nodeOuterColor },
        uNodeMainColor: { value: nodeMainColor },
        uNodeCoreColor: { value: nodeCoreColor },
        uBaseSize: { value: nodeSize },
        uBaseOpacity: { value: nodeOpacity },
        uDepthFade: { value: depthFade },
        uNearDepth: { value: nearDepth },
        uFarDepth: { value: farDepth },
        uDisruption: { value: 0.0 },
        uHover: { value: 0.0 },
        uMouse: { value: new THREE.Vector2(-999, -999) },
        uTime: { value: 0.0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    sphereGroup.add(pointsMesh);

    // 7. Scroll Parallax & Disruption Tracker
    let targetDisruption = 0;
    let currentDisruption = 0;

    const handleScroll = () => {
      if (!enableScrollDisruption) return;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScrollDistance = Math.max(window.innerHeight * 0.85, 380);
      targetDisruption = Math.min(1.0, Math.max(0.0, (scrollY / maxScrollDistance) * disruptionStrength));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 8. Hover Interaction & Antigravity Proximity Excitation Tracker
    let targetHover = 0.0;
    let currentHover = 0.0;
    const mouse = { x: -999, y: -999, targetX: -999, targetY: -999 };
    const heroSection = container.closest('section') || container;

    const handlePointerMove = (e) => {
      const rect = heroSection.getBoundingClientRect();
      const inHero =
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right;

      if (inHero) {
        targetHover = 1.0;
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      } else {
        targetHover = 0.0;
        mouse.targetX = -999;
        mouse.targetY = -999;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 9. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const updatedNear = camera.position.z - radius * 1.15;
      const updatedFar = camera.position.z + radius * 1.15;
      lineMaterial.uniforms.uNearDepth.value = updatedNear;
      lineMaterial.uniforms.uFarDepth.value = updatedFar;
      pointsMaterial.uniforms.uNearDepth.value = updatedNear;
      pointsMaterial.uniforms.uFarDepth.value = updatedFar;
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animId;
    const animate = (now) => {
      animId = requestAnimationFrame(animate);

      // Only calculate if page is visible
      if (document.hidden) return;

      const timeSec = now * 0.001;

      // Smooth lerp for scroll disruption
      currentDisruption += (targetDisruption - currentDisruption) * 0.08;
      // Smooth lerp for hover glow
      currentHover += (targetHover - currentHover) * 0.08;

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      lineMaterial.uniforms.uDisruption.value = currentDisruption;
      lineMaterial.uniforms.uHover.value = currentHover;
      lineMaterial.uniforms.uTime.value = timeSec;

      pointsMaterial.uniforms.uDisruption.value = currentDisruption;
      pointsMaterial.uniforms.uHover.value = currentHover;
      pointsMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);
      pointsMaterial.uniforms.uTime.value = timeSec;

      // Axial Rotation (gentle dynamic acceleration on hover / disruption)
      if (rotationSpeed > 0) {
        const hoverRotationBoost = 1.0 + currentHover * 0.15;
        sphereGroup.rotation.y += (0.0018 + currentDisruption * 0.003) * rotationSpeed * hoverRotationBoost;
      }

      // Harmonic Floating Motion + Scroll Parallax Translation
      const floatY = Math.sin(timeSec * 0.7) * 0.09;
      const floatX = Math.cos(timeSec * 0.5) * 0.06;
      sphereGroup.position.y = floatY - currentDisruption * 1.6;
      sphereGroup.position.x = floatX + currentDisruption * 0.35;

      // Scroll Parallax 3D Tilt
      sphereGroup.rotation.x = 0.22 + currentDisruption * 0.45;
      sphereGroup.rotation.z = -0.12 - currentDisruption * 0.22;

      // Mouse Parallax (if enabled)
      if (mouseStrength > 0 && mouse.x > -900) {
        sphereGroup.rotation.y += mouse.x * mouseStrength * 0.007;
        sphereGroup.rotation.x += -mouse.y * mouseStrength * 0.05;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);

      lineGeometry.dispose();
      lineMaterial.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [
    radius,
    wireframeOpacity,
    nodeSize,
    nodeOpacity,
    rotationSpeed,
    mouseStrength,
    depthFade,
    nodeCount,
    enableScrollDisruption,
    disruptionStrength,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default WireframeSphere;
