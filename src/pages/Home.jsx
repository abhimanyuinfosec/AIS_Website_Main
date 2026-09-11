import React from 'react';
import HeroSection from '../components/HeroSection';
import ClientLogosSection from '../components/ClientLogosSection';
import ValuePropositionSection from '../components/ValuePropositionSection';
import HowItWorksArchitecture from '../components/HowItWorksArchitecture';
import DetailedProtectionGrid from '../components/DetailedProtectionGrid';
import DeviceManagementSection from '../components/DeviceManagementSection';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';
import CallToActionBanner from '../components/CallToActionBanner';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ClientLogosSection />
      <ValuePropositionSection />
      <HowItWorksArchitecture />
      <DetailedProtectionGrid />
      <DeviceManagementSection />
      <PricingSection />
      <FAQSection />
      <CallToActionBanner />
    </>
  );
};

export default Home;
