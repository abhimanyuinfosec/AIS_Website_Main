import React from 'react';

const Approach = () => {
  return (
    <section className="approach section-padding" id="approach">
      <div className="wrap approach-grid">
        <div className="rings-visual fade-up">
          <svg viewBox="0 0 440 440" fill="none" aria-hidden="true">
            <circle cx="220" cy="220" r="205" stroke="#c59327" strokeOpacity="0.3" strokeWidth="1.5" />
            <circle className="ring-spin" cx="220" cy="220" r="165" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 9" />
            <circle cx="220" cy="220" r="128" stroke="#c59327" strokeOpacity="0.4" strokeWidth="1.2" />
            <circle className="ring-spin-rev" cx="220" cy="220" r="92" stroke="#38bdf8" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 7" />
            <circle cx="220" cy="220" r="58" stroke="#fcebb6" strokeOpacity="0.4" strokeWidth="1.2" />
            <circle className="pulse-dot" cx="220" cy="220" r="26" fill="#fcebb6" fillOpacity="0.15" stroke="#fcebb6" strokeWidth="1.5" />
            <g stroke="#fcebb6" strokeWidth="1.5">
              <path d="M220 6l6 14-6 6-6-6z" fill="#fcebb6" />
            </g>
            <text x="220" y="226" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="12" fill="#fcebb6" letterSpacing="1">CORE</text>
          </svg>
        </div>

        <div className="fade-up">
          <div className="eyebrow">The Chakravyuha Method</div>
          <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            Named for a warrior who broke seven layers of defense
          </h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>
            In the epic our name comes from, the Chakravyuha was a seven-ring military formation built to be unbreakable. We apply that same layered thinking in reverse — building defenses ring by ring, and testing each one the way an attacker would.
          </p>

          <div className="layer-list">
            {[
              { num: '01', title: 'Perimeter', desc: 'External attack surface — exposed services, DNS, and edge configuration.' },
              { num: '02', title: 'Network', desc: 'Segmentation, lateral movement paths, and internal traffic controls.' },
              { num: '03', title: 'Identity & Access', desc: 'Authentication flows, privilege escalation paths, and session handling.' },
              { num: '04', title: 'Application', desc: 'Business logic flaws, injection points, and API abuse cases.' }
            ].map((layer, idx) => (
              <div key={idx} className="layer-item">
                <div className="layer-num">{layer.num}</div>
                <div>
                  <h4>{layer.title}</h4>
                  <p>{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
