import React from 'react';
import {
  CalendarRange,
  ClipboardList,
  Lock,
  ShieldCheck,
  Sparkles,
  Timer,
} from 'lucide-react';
import { HOME_IMAGES } from '../../../data/homeImages';
import { cardTitle, container, section, sectionEyebrow, sectionHeader, sectionSubtitle, sectionTitle } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const VALUES = [
  {
    title: 'Trusted Doctors',
    description: 'Discover verified healthcare professionals you can rely on.',
    icon: ShieldCheck,
  },
  {
    title: 'Easy Booking',
    description: 'Book appointments in just a few steps, without the extra wait.',
    icon: Timer,
  },
  {
    title: 'Flexible Scheduling',
    description: 'Find appointment slots that fit your schedule.',
    icon: CalendarRange,
  },
  {
    title: 'Secure & Private',
    description: 'Your healthcare information is handled securely.',
    icon: Lock,
  },
  {
    title: 'Personalized Recommendations',
    description: 'Discover doctors that match your preferences.',
    icon: Sparkles,
  },
  {
    title: 'Appointment Management',
    description: 'Keep all your appointments organized in one place.',
    icon: ClipboardList,
  },
];

const WhyChooseUs = () => {
  return (
    <section
      className={cn(section, 'bg-[var(--bg-surface)] dark:bg-[var(--bg-page)]')}
      id="about"
      aria-labelledby="why-heading"
    >
      <div className={container}>
        <div className="grid grid-cols-[0.85fr_1.15fr] gap-10 items-start max-[960px]:grid-cols-1">
          <div className="sticky top-[calc(var(--navbar-height)+24px)] max-[960px]:relative [&_img]:w-full [&_img]:h-[520px] [&_img]:object-cover [&_img]:rounded-[32px] [&_img]:shadow-xl [&_img]:block max-[960px]:[&_img]:h-80">
            <img src={HOME_IMAGES.why} alt="Medical team collaborating in a modern clinic" loading="lazy" />
            <div className="absolute left-5 right-5 bottom-5 bg-[rgba(255,255,255,0.92)] backdrop-blur-[10px] rounded-[18px] px-[18px] py-4 shadow-md dark:bg-[var(--bg-surface)] [&_strong]:block [&_strong]:text-[var(--text-primary)] [&_strong]:mb-1 [&_p]:m-0 [&_p]:text-[var(--text-secondary)] [&_p]:text-[var(--text-sm)]">
              <strong>Care with a human touch</strong>
              <p>Warm clinics, verified doctors, and a booking flow that feels effortless.</p>
            </div>
          </div>

          <div>
            <div className={sectionHeader}>
              <p className={sectionEyebrow}>Why MediConnect</p>
              <h2 id="why-heading" className={sectionTitle}>
                Healthcare that looks as good as it feels
              </h2>
              <p className={sectionSubtitle}>
                A modern experience designed around trust, convenience, and brighter days.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
              {VALUES.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="bg-[#f8fffd] border border-[#d1fae5] rounded-[18px] p-[18px] transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-md dark:bg-[var(--bg-surface)] dark:border-[var(--border-subtle)]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ccfbf1] to-[#dbeafe] text-[var(--accent-mint)] grid place-items-center mb-3 dark:bg-[var(--primary-50)] dark:text-[var(--text-accent)]"
                      aria-hidden="true"
                    >
                      <Icon size={18} />
                    </div>
                    <h3 className={cn(cardTitle, 'mb-1.5 text-base')}>{item.title}</h3>
                    <p className="text-[var(--text-secondary)] text-[var(--text-sm)]">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
