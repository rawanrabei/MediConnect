import React from 'react';
import { mockStatistics } from '../../../data/statistics';
import { HOME_IMAGES } from '../../../data/homeImages';
import { container, section, sectionEyebrow, sectionHeader, sectionHeaderCentered, sectionTitle } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const StatisticsSection = ({ stats = mockStatistics }) => {
  return (
    <section className={cn(section, 'relative overflow-hidden isolate')} aria-labelledby="stats-heading">
      <img
        src={HOME_IMAGES.stats}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-[2]"
        loading="lazy"
      />
      <div className="absolute inset-0 -z-[1] bg-[linear-gradient(120deg,rgba(14,116,144,0.88),rgba(20,184,166,0.78))]" />
      <div className={cn(container, 'relative z-[1]')}>
        <div className={cn(sectionHeader, sectionHeaderCentered)}>
          <p className={cn(sectionEyebrow, 'section-eyebrow', 'bg-[rgba(255,255,255,0.16)] text-[#ecfeff]')}>
            Our impact
          </p>
          <h2 id="stats-heading" className={cn(sectionTitle, 'text-white')}>
            Care at a glance
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-6 max-[800px]:grid-cols-2 max-[480px]:grid-cols-1">
          {stats.map((stat) => (
            <article
              key={stat.id || stat.label}
              className="text-center py-[22px] px-3 rounded-[20px] bg-[rgba(255,255,255,0.14)] border border-[rgba(255,255,255,0.2)] backdrop-blur-[8px]"
            >
              <span className="block text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold text-white tracking-[-0.03em] leading-[1.1]">
                {stat.value}
              </span>
              <span className="block mt-2 text-[#ecfeff] font-semibold">{stat.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
