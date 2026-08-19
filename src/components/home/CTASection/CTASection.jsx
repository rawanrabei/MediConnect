import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_IMAGES } from '../../../data/homeImages';
import { btnBase, btnLg, btnPrimary, container, sectionTitle } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const ctaGhost = cn(
  btnBase,
  btnLg,
  'bg-[rgba(255,255,255,0.16)] text-white border-[1.5px] border-[rgba(255,255,255,0.4)] hover:bg-white hover:text-[var(--navy)]',
);

const CTASection = () => {
  return (
    <section className="pb-24" aria-labelledby="cta-heading">
      <div className={cn(container, 'mt-24 max-[1024px]:mt-[72px] max-[640px]:mt-12')}>
        <div className="relative overflow-hidden isolate min-h-[340px] rounded-[32px] grid place-items-center text-center py-14 px-7 shadow-xl max-[640px]:py-9 max-[640px]:px-[18px] max-[640px]:min-h-[280px]">
          <img
            src={HOME_IMAGES.cta}
            alt=""
            className="absolute inset-0 w-full h-full object-cover -z-[2]"
            loading="lazy"
          />
          <div className="absolute inset-0 -z-[1] bg-[linear-gradient(135deg,rgba(11,31,58,0.72),rgba(14,165,233,0.55)_55%,rgba(255,122,89,0.45))]" />
          <div className="max-w-[640px]">
            <h2 id="cta-heading" className={cn(sectionTitle, 'text-white')}>
              Your health deserves brighter care
            </h2>
            <p className="text-white my-3.5 mb-7 text-[var(--text-md)]">
              Find a trusted doctor and book a visit that fits your life today.
            </p>
            <div className="flex justify-center flex-wrap gap-3 max-[640px]:[&_a]:w-full">
              <Link to="/doctors" className={cn(btnPrimary, btnLg)}>
                Find a Doctor
              </Link>
              <Link to="/register" className={ctaGhost}>
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
