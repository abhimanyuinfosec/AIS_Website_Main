import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import ValuePillars from './components/ValuePillars';
import SolutionsGrid from './components/SolutionsGrid';

import TestimonialCarousel from './components/TestimonialCarousel';
import LiveData from './components/LiveData';
import Pricing from './components/Pricing';
import CTABand from './components/CTABand';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <ValuePillars />
        <SolutionsGrid />

        <LiveData />
        <TestimonialCarousel />
        <Pricing />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}

export default App;
