/**
 * 3D Wireframe Network Sphere Prototype
 * =========================================================================
 * Technology Stack: Three.js (WebGL) + Vanilla JS
 * Target Aesthetic: Minimalist, futuristic, dark cybersecurity network plexus.
 * Features:
 *  - Procedural Fibonacci sphere point distribution with layered satellite nodes
 *  - Dynamic proximity Delaunay-style geometric line network
 *  - Custom GLSL Shaders for realistic depth fading (dimmer/fainter rear elements)
 *  - Smooth anti-aliased circular glowing point sprites (no square particles)
 *  - Subtle planetary rotation & floating harmonic motion
 *  - Eased mouse parallax interaction
 *  - Responsive viewport management
 * =========================================================================
 */

(function () {
  'use strict';

  // --- Palette Definitions ---
  const PALETTES = {
    'crimson-orange': {
      id: 'crimson-orange',
      name: 'Crimson Red / Orange',
      lineColor: new THREE.Color(0xff3d2e),        // Fiery crimson red / orange
      lineDeepColor: new THREE.Color(0x450910),    // Deep wine crimson for rear lines
      nodeOuterColor: new THREE.Color(0xd61536),   // Intense crimson
      nodeMainColor: new THREE.Color(0xff5722),    // Vivid burnt orange
      nodeCoreColor: new THREE.Color(0xffeedb),    // Hot incandescent core
    },
    'amber-fire': {
      id: 'amber-fire',
      name: 'Blazing Amber',
      lineColor: new THREE.Color(0xff7214),
      lineDeepColor: new THREE.Color(0x4d1c04),
      nodeOuterColor: new THREE.Color(0xe65100),
      nodeMainColor: new THREE.Color(0xff9100),
      nodeCoreColor: new THREE.Color(0xfffae6),
    },
    'deep-ruby': {
      id: 'deep-ruby',
      name: 'Deep Crimson Ruby',
      lineColor: new THREE.Color(0xee1742),
      lineDeepColor: new THREE.Color(0x38050e),
      nodeOuterColor: new THREE.Color(0xb7092b),
      nodeMainColor: new THREE.Color(0xff2a55),
      nodeCoreColor: new THREE.Color(0xffe8ed),
    },
    'monochrome': {
      id: 'monochrome',
      name: 'Minimalist White / Silver',
      lineColor: new THREE.Color(0xdce2ec),
      lineDeepColor: new THREE.Color(0x282c34),
      nodeOuterColor: new THREE.Color(0xb0b8c6),
      nodeMainColor: new THREE.Color(0xffffff),
      nodeCoreColor: new THREE.Color(0xffffff),
    }
  };

  // --- Configuration State & Default Parameters ---
  const DEFAULT_CONFIG = {
    radius: 5.0,
    wireframeOpacity: 0.46,
    nodeSize: 1.0,
    nodeOpacity: 0.85,
    rotationSpeed: 0.4,
    mouseStrength: 0.0,
    depthFade: 0.75,
    nodeCount: 200,
    autoRotate: true,
    floating: true,
    bgTheme: 'pitch-black',
    colorTheme: 'crimson-orange',
  };

  const config = { ...DEFAULT_CONFIG };

  // --- Three.js Global Variables ---
  let scene, camera, renderer;
  let sphereGroup;
  let lineMesh, pointsMesh;
  let lineMaterial, pointsMaterial;
  let container;

  // --- Animation & Interaction State ---
  let animationFrameId;
  let lastTime = performance.now();
  let frameCount = 0;
  let fpsLastCalculated = performance.now();
  let currentFps = 60;

  const mouse = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  };

  // --- GLSL Shaders with Built-in Depth Attenuation & Multi-Tone Colors ---
  const lineShader = {
    vertexShader: `
      varying vec3 vViewPosition;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
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
      varying vec3 vViewPosition;

      void main() {
        // Linear normalized depth: 0.0 at front of sphere, 1.0 at rear of sphere
        float depth = clamp((vViewPosition.z - uNearDepth) / (uFarDepth - uNearDepth), 0.0, 1.0);
        
        // Depth attenuation: front elements stay crisp and vibrant, rear elements fade to dark translucent
        float fade = mix(1.0, 1.0 - uDepthFade, depth);
        float alpha = uBaseOpacity * fade;
        
        // Color attenuation: front is vibrant crimson/orange, rear transitions to deep dark tone
        vec3 color = mix(uLineColor, uLineDeepColor, depth * 0.85);
        
        gl_FragColor = vec4(color, alpha);
      }
    `
  };

  const pointShader = {
    vertexShader: `
      attribute float aSize;
      attribute float aBrightness;
      varying vec3 vViewPosition;
      varying float vBrightness;
      uniform float uBaseSize;

      void main() {
        vBrightness = aBrightness;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;

        // Perspective size attenuation with screen ratio factor
        gl_PointSize = (uBaseSize * aSize) * (320.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
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
      varying vec3 vViewPosition;
      varying float vBrightness;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        // Crisp, clear point edge with subtle anti-aliasing (no fuzzy blur halo)
        float edge = smoothstep(0.5, 0.38, dist);
        float innerCore = smoothstep(0.28, 0.02, dist);

        // Depth falloff (front nodes brighter, rear nodes dimmer)
        float depth = clamp((vViewPosition.z - uNearDepth) / (uFarDepth - uNearDepth), 0.0, 1.0);
        float depthFactor = mix(1.0, 1.0 - uDepthFade * 0.85, depth);

        // Clean, clear opacity without foggy bloom
        float alpha = uBaseOpacity * vBrightness * edge * depthFactor;
        vec3 color = mix(uNodeMainColor, uNodeCoreColor, innerCore * 0.85);

        gl_FragColor = vec4(color, alpha);
      }
    `
  };

  // --- Initialize Scene & Renderer ---
  function init() {
    container = document.getElementById('canvas-container');

    // 1. Scene
    scene = new THREE.Scene();

    // 2. Camera: 50 deg FOV with optimal clipping
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.z = 8.5;

    // 3. Renderer with antialiasing and transparency support
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent canvas background
    container.appendChild(renderer.domElement);

    // 4. Sphere Group
    sphereGroup = new THREE.Group();
    // Default natural tilt (similar to planetary orientation for visual elegance)
    sphereGroup.rotation.x = 0.22;
    sphereGroup.rotation.z = -0.12;
    scene.add(sphereGroup);

    // 5. Generate Network Geometry
    generateSphereNetwork();

    // 6. Bind Events
    setupEventListeners();
    setupUIControls();

    // 7. Start Animation Loop
    animate(performance.now());
  }

  // --- Network Generation Algorithm ---
  function generateSphereNetwork() {
    // Clean up existing meshes if regenerating
    if (lineMesh) {
      sphereGroup.remove(lineMesh);
      lineMesh.geometry.dispose();
      lineMesh = null;
    }
    if (pointsMesh) {
      sphereGroup.remove(pointsMesh);
      pointsMesh.geometry.dispose();
      pointsMesh = null;
    }

    const N = config.nodeCount;
    const baseRadius = config.radius;
    const vertices = [];
    const sizes = [];
    const brightnesses = [];

    // --- 1. Distribute points using Fibonacci spherical lattice ---
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2; // Linear spread from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      // Base spherical coordinates
      let x = Math.cos(theta) * radiusAtY;
      let z = Math.sin(theta) * radiusAtY;

      // Layering:
      // - 72% Surface nodes (radius ~ 1.0)
      // - 16% Satellite nodes pushed slightly outwards (radius ~ 1.06 to 1.14)
      // - 12% Inset nodes pulled slightly inwards (radius ~ 0.92 to 0.96)
      let radialMultiplier = 1.0;
      const randType = Math.random();

      if (randType > 0.84) {
        // Satellite node branching outward (creates the technological "spikes" seen in reference)
        radialMultiplier = 1.05 + Math.random() * 0.09;
      } else if (randType < 0.12) {
        // Inset depth node
        radialMultiplier = 0.92 + Math.random() * 0.05;
      } else {
        // Subtle micro-jitter to prevent rigid computerized alignment
        radialMultiplier = 0.98 + Math.random() * 0.04;
      }

      const r = baseRadius * radialMultiplier;
      const px = x * r;
      const py = y * r;
      const pz = z * r;

      vertices.push(new THREE.Vector3(px, py, pz));

      // Varying sizes & brightness per node
      // Primary hub nodes (9%): larger & brighter
      // Standard nodes (73%): normal
      // Micro nodes (18%): subtle
      if (Math.random() < 0.09) {
        sizes.push(1.6 + Math.random() * 0.5);
        brightnesses.push(1.0);
      } else if (Math.random() < 0.22) {
        sizes.push(0.65 + Math.random() * 0.25);
        brightnesses.push(0.65);
      } else {
        sizes.push(0.95 + Math.random() * 0.25);
        brightnesses.push(0.85);
      }
    }

    // --- 2. Calculate Network Edges (Connections) ---
    // Connect vertices within an adaptive threshold to form polygonal facets
    const linePositions = [];
    const maxDistance = baseRadius * 0.44; // Proximity threshold
    const maxNeighborsPerNode = 5; // Prevent dense clumping, keep clean wireframe

    const neighborCounts = new Array(N).fill(0);
    let edgeCount = 0;

    for (let i = 0; i < N; i++) {
      if (neighborCounts[i] >= maxNeighborsPerNode) continue;
      const p1 = vertices[i];

      // Find closest candidates for structured triangular facets
      const candidates = [];
      for (let j = i + 1; j < N; j++) {
        if (neighborCounts[j] >= maxNeighborsPerNode) continue;
        const p2 = vertices[j];
        const dist = p1.distanceTo(p2);

        if (dist <= maxDistance) {
          candidates.push({ index: j, dist: dist, point: p2 });
        }
      }

      // Sort by proximity to favor clean triangular meshes
      candidates.sort((a, b) => a.dist - b.dist);

      for (let c = 0; c < candidates.length; c++) {
        if (neighborCounts[i] >= maxNeighborsPerNode) break;
        const candidate = candidates[c];
        if (neighborCounts[candidate.index] >= maxNeighborsPerNode) continue;

        linePositions.push(p1.x, p1.y, p1.z);
        linePositions.push(candidate.point.x, candidate.point.y, candidate.point.z);

        neighborCounts[i]++;
        neighborCounts[candidate.index]++;
        edgeCount++;
      }
    }

    // --- 3. Build Three.js Line Geometry & Shader Material ---
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    const cameraDist = camera.position.z;
    const nearDepth = cameraDist - baseRadius * 1.15;
    const farDepth = cameraDist + baseRadius * 1.15;
    const currentPalette = PALETTES[config.colorTheme] || PALETTES['crimson-orange'];

    lineMaterial = new THREE.ShaderMaterial({
      vertexShader: lineShader.vertexShader,
      fragmentShader: lineShader.fragmentShader,
      uniforms: {
        uLineColor: { value: currentPalette.lineColor.clone() },
        uLineDeepColor: { value: currentPalette.lineDeepColor.clone() },
        uBaseOpacity: { value: config.wireframeOpacity },
        uDepthFade: { value: config.depthFade },
        uNearDepth: { value: nearDepth },
        uFarDepth: { value: farDepth },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    sphereGroup.add(lineMesh);

    // --- 4. Build Three.js Points Geometry & Shader Material ---
    const pointPositions = [];
    for (let i = 0; i < N; i++) {
      pointPositions.push(vertices[i].x, vertices[i].y, vertices[i].z);
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(pointPositions, 3)
    );
    pointsGeometry.setAttribute(
      'aSize',
      new THREE.Float32BufferAttribute(sizes, 1)
    );
    pointsGeometry.setAttribute(
      'aBrightness',
      new THREE.Float32BufferAttribute(brightnesses, 1)
    );

    pointsMaterial = new THREE.ShaderMaterial({
      vertexShader: pointShader.vertexShader,
      fragmentShader: pointShader.fragmentShader,
      uniforms: {
        uNodeOuterColor: { value: currentPalette.nodeOuterColor.clone() },
        uNodeMainColor: { value: currentPalette.nodeMainColor.clone() },
        uNodeCoreColor: { value: currentPalette.nodeCoreColor.clone() },
        uBaseSize: { value: config.nodeSize },
        uBaseOpacity: { value: config.nodeOpacity },
        uDepthFade: { value: config.depthFade },
        uNearDepth: { value: nearDepth },
        uFarDepth: { value: farDepth },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    sphereGroup.add(pointsMesh);

    // --- 5. Update UI Stats ---
    const statNodes = document.getElementById('stat-nodes');
    const statEdges = document.getElementById('stat-edges');
    if (statNodes) statNodes.textContent = N.toString();
    if (statEdges) statEdges.textContent = edgeCount.toString();
  }

  // --- Depth Bounds Synchronizer ---
  function updateDepthUniforms() {
    if (!lineMaterial || !pointsMaterial) return;
    const cameraDist = camera.position.z;
    const near = cameraDist - config.radius * 1.15;
    const far = cameraDist + config.radius * 1.15;

    lineMaterial.uniforms.uNearDepth.value = near;
    lineMaterial.uniforms.uFarDepth.value = far;
    pointsMaterial.uniforms.uNearDepth.value = near;
    pointsMaterial.uniforms.uFarDepth.value = far;
  }

  // --- Event Listeners & Interaction ---
  function setupEventListeners() {
    // Window Resize Handler with aspect preservation
    window.addEventListener('resize', onWindowResize, false);

    // Mouse Movement Tracking
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Touch Support for mobile / touchpads
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchMove, { passive: true });
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    updateDepthUniforms();
  }

  function onMouseMove(event) {
    // Normalized device coordinates [-1, 1]
    mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function onTouchMove(event) {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      mouse.targetX = (touch.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
  }

  // --- Controls & UI Wiring ---
  function setupUIControls() {
    // 1. Sliders & Badges
    bindSlider('ctrl-radius', 'val-radius', (val) => {
      config.radius = parseFloat(val);
      generateSphereNetwork();
      updateDepthUniforms();
    }, (v) => Number(v).toFixed(1));

    bindSlider('ctrl-wireframe-opacity', 'val-wireframe-opacity', (val) => {
      config.wireframeOpacity = parseFloat(val);
      if (lineMaterial) {
        lineMaterial.uniforms.uBaseOpacity.value = config.wireframeOpacity;
      }
    }, (v) => Number(v).toFixed(2));

    bindSlider('ctrl-node-size', 'val-node-size', (val) => {
      config.nodeSize = parseFloat(val);
      if (pointsMaterial) {
        pointsMaterial.uniforms.uBaseSize.value = config.nodeSize;
      }
    }, (v) => Number(v).toFixed(1));

    bindSlider('ctrl-node-opacity', 'val-node-opacity', (val) => {
      config.nodeOpacity = parseFloat(val);
      if (pointsMaterial) {
        pointsMaterial.uniforms.uBaseOpacity.value = config.nodeOpacity;
      }
    }, (v) => Number(v).toFixed(2));

    bindSlider('ctrl-rotation-speed', 'val-rotation-speed', (val) => {
      config.rotationSpeed = parseFloat(val);
    }, (v) => Number(v).toFixed(1) + 'x');

    bindSlider('ctrl-mouse-strength', 'val-mouse-strength', (val) => {
      config.mouseStrength = parseFloat(val);
    }, (v) => Number(v).toFixed(1) + 'x');

    bindSlider('ctrl-depth-fade', 'val-depth-fade', (val) => {
      config.depthFade = parseFloat(val);
      if (lineMaterial) lineMaterial.uniforms.uDepthFade.value = config.depthFade;
      if (pointsMaterial) pointsMaterial.uniforms.uDepthFade.value = config.depthFade;
    }, (v) => Number(v).toFixed(2));

    bindSlider('ctrl-network-density', 'val-network-density', (val) => {
      config.nodeCount = parseInt(val, 10);
    }, (v) => `${v} nodes`);

    // 2. Toggles
    const toggleAutoRotate = document.getElementById('toggle-autorotate');
    if (toggleAutoRotate) {
      toggleAutoRotate.addEventListener('change', (e) => {
        config.autoRotate = e.target.checked;
      });
    }

    const toggleFloating = document.getElementById('toggle-floating');
    if (toggleFloating) {
      toggleFloating.addEventListener('change', (e) => {
        config.floating = e.target.checked;
        if (!config.floating) {
          sphereGroup.position.set(0, 0, 0);
        }
      });
    }

    // 3. Palette Switcher (Crimson Red / Orange, Amber Fire, Deep Ruby, Monochrome)
    const paletteButtons = document.querySelectorAll('.palette-btn');
    paletteButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const themeKey = btn.dataset.palette;
        applyPalette(themeKey);
      });
    });

    // 4. Background Switcher
    const bgButtons = document.querySelectorAll('.bg-btn');
    bgButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        bgButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const bg = btn.dataset.bg;
        document.body.className = '';
        document.body.classList.add('bg-' + bg);
      });
    });

    // 5. Panel Collapse Toggle
    const togglePanelBtn = document.getElementById('toggle-panel-btn');
    const controlsPanel = document.getElementById('controls-panel');
    if (togglePanelBtn && controlsPanel) {
      togglePanelBtn.addEventListener('click', () => {
        controlsPanel.classList.toggle('collapsed');
        togglePanelBtn.classList.toggle('active', !controlsPanel.classList.contains('collapsed'));
      });
    }

    // 6. Hero Preview Toggle
    const toggleHeroBtn = document.getElementById('toggle-hero-btn');
    const heroPreview = document.getElementById('hero-preview');
    if (toggleHeroBtn && heroPreview) {
      toggleHeroBtn.addEventListener('click', () => {
        heroPreview.classList.toggle('hidden');
        toggleHeroBtn.classList.toggle('active', !heroPreview.classList.contains('hidden'));
      });
    }

    // 7. Reset Defaults
    const btnReset = document.getElementById('btn-reset');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        applyConfig({ ...DEFAULT_CONFIG });
      });
    }

    // 8. Rebuild Network
    const btnRegenerate = document.getElementById('btn-regenerate');
    if (btnRegenerate) {
      btnRegenerate.addEventListener('click', () => {
        generateSphereNetwork();
      });
    }
  }

  function applyPalette(paletteKey) {
    const palette = PALETTES[paletteKey] || PALETTES['crimson-orange'];
    config.colorTheme = palette.id;

    if (lineMaterial) {
      lineMaterial.uniforms.uLineColor.value.copy(palette.lineColor);
      lineMaterial.uniforms.uLineDeepColor.value.copy(palette.lineDeepColor);
    }
    if (pointsMaterial) {
      pointsMaterial.uniforms.uNodeOuterColor.value.copy(palette.nodeOuterColor);
      pointsMaterial.uniforms.uNodeMainColor.value.copy(palette.nodeMainColor);
      pointsMaterial.uniforms.uNodeCoreColor.value.copy(palette.nodeCoreColor);
    }

    const paletteButtons = document.querySelectorAll('.palette-btn');
    paletteButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.palette === paletteKey);
    });
  }

  function bindSlider(sliderId, badgeId, onChange, formatValue) {
    const slider = document.getElementById(sliderId);
    const badge = document.getElementById(badgeId);
    if (!slider || !badge) return;

    slider.addEventListener('input', (e) => {
      const val = e.target.value;
      badge.textContent = formatValue ? formatValue(val) : val;
      onChange(val);
    });
  }

  function applyConfig(newConfig) {
    Object.assign(config, newConfig);

    // Update Slider inputs
    setSliderValue('ctrl-radius', 'val-radius', config.radius, (v) => Number(v).toFixed(1));
    setSliderValue('ctrl-wireframe-opacity', 'val-wireframe-opacity', config.wireframeOpacity, (v) => Number(v).toFixed(2));
    setSliderValue('ctrl-node-size', 'val-node-size', config.nodeSize, (v) => Number(v).toFixed(1));
    setSliderValue('ctrl-node-opacity', 'val-node-opacity', config.nodeOpacity, (v) => Number(v).toFixed(2));
    setSliderValue('ctrl-rotation-speed', 'val-rotation-speed', config.rotationSpeed, (v) => Number(v).toFixed(1) + 'x');
    setSliderValue('ctrl-mouse-strength', 'val-mouse-strength', config.mouseStrength, (v) => Number(v).toFixed(1) + 'x');
    setSliderValue('ctrl-depth-fade', 'val-depth-fade', config.depthFade, (v) => Number(v).toFixed(2));
    setSliderValue('ctrl-network-density', 'val-network-density', config.nodeCount, (v) => `${v} nodes`);

    // Checkboxes
    const toggleAutoRotate = document.getElementById('toggle-autorotate');
    if (toggleAutoRotate) toggleAutoRotate.checked = config.autoRotate;

    const toggleFloating = document.getElementById('toggle-floating');
    if (toggleFloating) toggleFloating.checked = config.floating;

    // Apply color theme
    applyPalette(config.colorTheme || 'crimson-orange');

    // Regenerate
    generateSphereNetwork();
  }

  function setSliderValue(sliderId, badgeId, value, formatValue) {
    const slider = document.getElementById(sliderId);
    const badge = document.getElementById(badgeId);
    if (slider) slider.value = value;
    if (badge) badge.textContent = formatValue ? formatValue(value) : value;
  }

  // --- Main Animation & Render Loop ---
  function animate(now) {
    animationFrameId = requestAnimationFrame(animate);

    const delta = (now - lastTime) * 0.001;
    lastTime = now;

    // --- FPS Calculation ---
    frameCount++;
    if (now - fpsLastCalculated >= 500) {
      currentFps = Math.round((frameCount * 1000) / (now - fpsLastCalculated));
      frameCount = 0;
      fpsLastCalculated = now;
      const fpsEl = document.getElementById('fps-display');
      if (fpsEl) fpsEl.textContent = `${currentFps} FPS`;
    }

    if (sphereGroup) {
      // 1. Steady slow axial rotation
      if (config.autoRotate && config.rotationSpeed > 0) {
        sphereGroup.rotation.y += 0.0018 * config.rotationSpeed;
      }

      // 2. Subtle harmonic floating motion (organic breathing)
      if (config.floating) {
        const timeSec = now * 0.001;
        sphereGroup.position.y = Math.sin(timeSec * 0.7) * 0.09;
        sphereGroup.position.x = Math.cos(timeSec * 0.5) * 0.06;
      }

      // 3. Smooth mouse parallax damping (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const parallaxStrength = config.mouseStrength * 0.35;
      sphereGroup.rotation.y += mouse.x * parallaxStrength * 0.02;
      sphereGroup.rotation.x = 0.22 + -mouse.y * parallaxStrength * 0.15;
    }

    // Render Scene
    renderer.render(scene, camera);
  }

  // --- Bootstrap on DOM Ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
