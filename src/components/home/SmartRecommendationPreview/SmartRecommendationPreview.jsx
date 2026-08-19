import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, Sparkles, UserRound } from 'lucide-react';
import { HOME_IMAGES } from '../../../data/homeImages';
import { btnPrimary, container, sectionEyebrow, sectionTitle } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const SmartRecommendationPreview = () => {
  return (
    <section className="py-[72px]" aria-labelledby="recommendation-heading">
      <div className={container}>
        <div className="grid grid-cols-[1.15fr_0.85fr] gap-10 items-center text-white rounded-[32px] p-12 overflow-hidden relative isolate min-h-[360px] shadow-xl max-[800px]:grid-cols-1 max-[800px]:p-7 max-[800px]:px-[22px] max-[800px]:gap-6">
          <img
            src={HOME_IMAGES.recommend}
            alt=""
            className="absolute inset-0 w-full h-full object-cover -z-[2]"
            loading="lazy"
          />
          <div className="absolute inset-0 -z-[1] bg-[linear-gradient(115deg,rgba(11,31,58,0.92)_0%,rgba(13,148,136,0.78)_100%)]" />
          <div className="relative z-[1]">
            <p className={cn(sectionEyebrow, 'bg-[rgba(255,255,255,0.12)] text-[#99f6e4]')}>
              Coming soon
            </p>
            <h2 id="recommendation-heading" className={cn(sectionTitle, 'text-white')}>
              Not sure which doctor is right for you?
            </h2>
            <p className="my-4 mb-7 text-[#e2e8f0] max-w-[520px]">
              MediConnect can help you discover doctors based on your specialty,
              availability, preferences, and healthcare needs.
            </p>
            <Link to="/register" className={btnPrimary}>
              Get Personalized Recommendations
            </Link>
          </div>

          <div className="relative z-[1] grid gap-3" aria-hidden="true">
            <div className="bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.16)] rounded-2xl px-4 py-3.5 flex items-center gap-3 backdrop-blur-[8px] [&>span]:w-9 [&>span]:h-9 [&>span]:rounded-[10px] [&>span]:bg-[var(--accent-coral)] [&>span]:grid [&>span]:place-items-center [&>span]:shrink-0 [&_strong]:block [&_strong]:text-[0.95rem] [&_strong]:text-white [&_small]:text-[#cbd5e1]">
              <span>
                <Sparkles size={18} />
              </span>
              <div>
                <strong>Matched by specialty</strong>
                <small>Find care that fits your needs</small>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.16)] rounded-2xl px-4 py-3.5 flex items-center gap-3 backdrop-blur-[8px] [&>span]:w-9 [&>span]:h-9 [&>span]:rounded-[10px] [&>span]:bg-[var(--accent-coral)] [&>span]:grid [&>span]:place-items-center [&>span]:shrink-0 [&_strong]:block [&_strong]:text-[0.95rem] [&_strong]:text-white [&_small]:text-[#cbd5e1]">
              <span>
                <CalendarClock size={18} />
              </span>
              <div>
                <strong>Filtered by availability</strong>
                <small>See doctors who can see you soon</small>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.16)] rounded-2xl px-4 py-3.5 flex items-center gap-3 backdrop-blur-[8px] [&>span]:w-9 [&>span]:h-9 [&>span]:rounded-[10px] [&>span]:bg-[var(--accent-coral)] [&>span]:grid [&>span]:place-items-center [&>span]:shrink-0 [&_strong]:block [&_strong]:text-[0.95rem] [&_strong]:text-white [&_small]:text-[#cbd5e1]">
              <span>
                <UserRound size={18} />
              </span>
              <div>
                <strong>Aligned to preferences</strong>
                <small>Location, language, and visit type</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartRecommendationPreview;
