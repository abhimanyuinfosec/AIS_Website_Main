# 3D Wireframe Network Sphere Prototype

Isolated visual background element prototype for Abhimanyu InfoSec website.

---

## 📁 Directory Location
`wireframe-sphere-test/` (located inside the root of the workspace)

```
wireframe-sphere-test/
├── index.html        # Clean HTML container with control panel & hero preview
├── style.css         # Dark theme styling, glassmorphism UI, typography
├── script.js         # Three.js WebGL sphere with custom GLSL depth shaders
└── README.md         # Documentation & test instructions
```

---

## 🚀 How to Run the Test

You can run and test this prototype in either of two straightforward ways:

### Option 1: Direct File Open (Zero Server Required)
Simply double-click or open `wireframe-sphere-test/index.html` in any modern web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Using Any Local Static Server
If you prefer running via a local HTTP server:

```powershell
# Using Python
cd "d:\Pratham2\Abhimanyu InfoSec\AIS_Website_Main\wireframe-sphere-test"
python -m http.server 8080
# Then visit: http://localhost:8080

# Or using npx serve / http-server
npx serve .
```

---

## 🎨 Visual Features & Reference Alignment

| Requirement | Implementation Detail |
| :--- | :--- |
| **Spherical Plexus Network** | Procedural Fibonacci spherical distribution with layered nodes (surface, satellite antenna nodes, and inset depth nodes) |
| **Thin geometric lines** | Proximity-based Delaunay-style line mesh connecting nearest neighbors without excessive clutter |
| **Glowing white nodes** | Custom GLSL Point Shader rendering soft anti-aliased circular halos with variable sizes (major hub nodes, standard nodes, and satellite nodes) |
| **Depth Attenuation** | Custom GLSL Vertex & Fragment Shaders calculate view-space depth — rear-side network elements smoothly dim and become faint/darker, producing realistic 3D depth |
| **Color Scheme** | **Crimson Red & Ember Orange (Active)**: Fiery crimson connecting lines (`#ff3d2e`), incandescent warm-white/gold cores (`#ffeedb`), vibrant orange intermediate nodes (`#ff5722`), and deep wine burgundy rear depth attenuation (`#450910`). Multi-theme switcher also allows toggling to Blazing Amber, Deep Ruby, or Minimalist Silver. |
| **Subtle Motion** | Slow axial rotation + harmonic vertical & horizontal floating breath |
| **Mouse Interaction** | Silky smoothed (lerp) parallax interaction responding to mouse or touch movement |
| **Transparent Canvas** | WebGL renderer initialized with `alpha: true` and `clearColor: 0x000000, 0` so it can be seamlessly composited over any website section |

---

## 🎛️ Test Interface Features

The test interface includes a floating glassmorphism control panel:
- **Sphere Color Theme**: 
  - 🔴 **Crimson / Orange** (Default active theme)
  - 🟠 **Amber Fire** (Blazing amber and orange)
  - 🍷 **Deep Ruby** (Blood crimson and ruby)
  - ⚪ **Monochrome** (Minimalist silver and white)
- **Sphere Size**: Adjust radius from 1.5 to 5.0
- **Wireframe Line Opacity**: Fine-tune line visibility (0.05 - 0.80)
- **Node Size & Opacity**: Control particle point radius and brightness
- **Rotation Speed**: Increase, decrease, or freeze rotation
- **Mouse Parallax Strength**: Adjust cursor sensitivity
- **Depth Falloff**: Control rear-element fading contrast
- **Network Density**: Rebuild with between 150 and 500 nodes
- **Backdrop Style**: Switch between Pitch Black, Dark Graphite, and Transparent checkerboard
- **Preview Hero Overlay Button**: Toggle a realistic cybersecurity headline and CTAs over the sphere to immediately preview how it functions as a website hero background
- **Reset Defaults Button**: Restore optimal initial settings

---

## 🔒 Isolation Guarantee
- **Zero changes** were made to existing files in `src/`, `server/`, `public/`, or `package.json`.
- The existing React application remains 100% untouched and intact.
