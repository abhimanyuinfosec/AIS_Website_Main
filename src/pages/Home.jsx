import React from 'react';
import HeroSection from '../components/HeroSection';
import ClientLogosSection from '../components/ClientLogosSection';
import SimplifiedSecuritySection from '../components/SimplifiedSecuritySection';
import DetailedProtectionGrid from '../components/DetailedProtectionGrid';
import ValuePropositionSection from '../components/ValuePropositionSection';
import FeaturedProjectsSection from '../components/FeaturedProjectsSection';
import HowItWorksArchitecture from '../components/HowItWorksArchitecture';
import ReviewsSection from '../components/ReviewsSection';
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

      {/* 4.5 Enterprise Security Projects & Case Studies */}
      <FeaturedProjectsSection />

      {/* 5. How we Work */}
      <HowItWorksArchitecture />

      {/* 5.5 Verified Client Testimonials & Reviews */}
      <ReviewsSection />

      {/* 6. FAQs */}
      <FAQSection />

      {/* Final Action Banner */}
      <CallToActionBanner />
    </>
  );
};

export default Home;
