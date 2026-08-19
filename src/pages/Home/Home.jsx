import React from 'react';
import HeroSection from '../../components/home/HeroSection/HeroSection';
import DoctorSearch from '../../components/doctor/DoctorSearch/DoctorSearch';
import SpecialtiesSection from '../../components/home/SpecialtiesSection/SpecialtiesSection';
import TopDoctorsSection from '../../components/home/TopDoctorsSection/TopDoctorsSection';
import SmartRecommendationPreview from '../../components/home/SmartRecommendationPreview/SmartRecommendationPreview';
import HowItWorks from '../../components/home/HowItWorks/HowItWorks';
import WhyChooseUs from '../../components/home/WhyChooseUs/WhyChooseUs';
import StatisticsSection from '../../components/home/StatisticsSection/StatisticsSection';
import CTASection from '../../components/home/CTASection/CTASection';
import useScrollToHash from '../../hooks/useScrollToHash';
import { container } from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const Home = () => {
  useScrollToHash();

  return (
    <div className="bg-[radial-gradient(circle_at_100%_38%,rgba(253,186,116,0.14),transparent_22%)] bg-[var(--bg-page)]">
      <HeroSection />
      <div className={cn(container, '-mt-14 relative z-[2] pb-8 max-md:-mt-7 max-md:pb-0')}>
        <DoctorSearch />
      </div>
      <SpecialtiesSection />
      <TopDoctorsSection />
      <SmartRecommendationPreview />
      <HowItWorks />
      <WhyChooseUs />
      <StatisticsSection />
      <CTASection />
    </div>
  );
};

export default Home;
