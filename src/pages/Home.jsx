import React from 'react';
import HeroSection from '../components/HeroSection';
import ClientLogosSection from '../components/ClientLogosSection';
import SimplifiedSecuritySection from '../components/SimplifiedSecuritySection';
import DetailedProtectionGrid from '../components/DetailedProtectionGrid';
import ValuePropositionSection from '../components/ValuePropositionSection';
import HowItWorksArchitecture from '../components/HowItWorksArchitecture';
import FAQSection from '../components/FAQSection';
import CallToActionBanner from '../components/CallToActionBanner';

const Home = () => {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Strip */}
      <ClientLogosSection />

      {/* 2.5 Security shouldn't be complicated */}
      <SimplifiedSecuritySection />

      {/* 3. Services / How Abhimanyu can protect my data? */}
      <DetailedProtectionGrid />

      {/* 4. Why Abhimanyu InfoSec ? */}
      <ValuePropositionSection />

      {/* 5. How we Work */}
      <HowItWorksArchitecture />

      {/* 6. FAQs */}
      <FAQSection />

      {/* Final Action Banner */}
      <CallToActionBanner />
    </>
  );
};

export default Home;
