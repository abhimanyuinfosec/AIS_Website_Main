import React from 'react';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import PainPoints from '../components/PainPoints';
import WhyUs from '../components/WhyUs';
import Services from '../components/Services';
import Lifecycle from '../components/Lifecycle';
import SecurityEngineering from '../components/SecurityEngineering';
import ThreatVisualization from '../components/ThreatVisualization';
import CTABand from '../components/CTABand';

const Home = () => {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <PainPoints />
      <WhyUs />
      <Services />
      <Lifecycle />
      <SecurityEngineering />
      <ThreatVisualization />
      <CTABand />
    </main>
  );
};

export default Home;
