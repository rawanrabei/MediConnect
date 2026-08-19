import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Baby,
  Bone,
  Brain,
  Eye,
  Heart,
  HeartPulse,
  Smile,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { getFeaturedSpecialties } from '../../../data/specialties';
import { SPECIALTY_IMAGES } from '../../../data/homeImages';
import { container, section, sectionEyebrow, sectionHeader, sectionHeaderCentered, sectionSubtitle, sectionTitle } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const SPECIALTY_ICONS = {
  HeartPulse,
  Sparkles,
  Smile,
  Brain,
  Baby,
  Eye,
  Bone,
  Stethoscope,
  Heart,
};

const SpecialtiesSection = () => {
  const navigate = useNavigate();
  const featuredSpecialties = getFeaturedSpecialties();

  const handleSelect = (slug) => {
    navigate(`/doctors?specialty=${slug}`);
  };

  return (
    <section className={section} aria-labelledby="specialties-heading">
      <div className={container}>
        <div className={cn(sectionHeader, sectionHeaderCentered)}>
          <p className={cn(sectionEyebrow, 'section-eyebrow')}>Care by specialty</p>
          <h2 id="specialties-heading" className={sectionTitle}>
            Explore Specialties
          </h2>
          <p className={cn(sectionSubtitle, 'section-subtitle')}>
            Browse trusted doctors across the most requested areas of care.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 max-[1024px]:grid-cols-2 max-[560px]:grid-cols-1">
          {featuredSpecialties.map((specialty) => {
            const Icon = SPECIALTY_ICONS[specialty.icon] || Stethoscope;
            const image = SPECIALTY_IMAGES[specialty.slug];

            return (
              <button
                key={specialty.id}
                type="button"
                className="group flex flex-col gap-2.5 text-left bg-[var(--bg-surface)] border border-transparent rounded-[22px] p-2.5 pb-[18px] cursor-pointer text-inherit overflow-hidden shadow-md transition-[transform,box-shadow] duration-150 hover:-translate-y-1.5 hover:shadow-glow focus-visible:-translate-y-1.5 focus-visible:shadow-glow"
                onClick={() => handleSelect(specialty.slug)}
              >
                <span className="relative block h-[132px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#ccfbf1] to-[#dbeafe]">
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[400ms] ease-[ease] group-hover:scale-[1.06]"
                  />
                  <span
                    className="absolute left-2.5 bottom-2.5 w-9 h-9 rounded-[10px] bg-white text-[var(--accent-mint)] grid place-items-center shadow-sm dark:bg-[var(--bg-surface)]"
                    aria-hidden="true"
                  >
                    <Icon size={18} />
                  </span>
                </span>
                <h3 className="text-[1.02rem] px-2 text-[var(--text-primary)]">{specialty.name}</h3>
                <p className="text-[var(--text-secondary)] text-[var(--text-sm)] px-2">
                  {specialty.description}
                </p>
                <span className="mt-auto px-2 text-[var(--accent-coral)] text-[13px] font-extrabold">
                  {specialty.doctorCount}+ doctors
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
