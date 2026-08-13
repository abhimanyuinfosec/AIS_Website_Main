import React from 'react';

const Stats = () => {
  return (
    <section className="urgency section-padding">
      <div className="wrap fade-up">
        <h2>The cost of waiting is higher than the cost of testing</h2>
        <div className="stat-grid">
          <div className="stat-card glass">
            <div className="stat-number">277</div>
            <div className="stat-desc">Average days to identify and contain a data breach [REPLACE].</div>
          </div>
          <div className="stat-card glass">
            <div className="stat-number">$4.45M</div>
            <div className="stat-desc">Average total cost of a data breach globally [REPLACE].</div>
          </div>
          <div className="stat-card glass">
            <div className="stat-number">82%</div>
            <div className="stat-desc">Of breaches involve data stored in the cloud [REPLACE].</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
