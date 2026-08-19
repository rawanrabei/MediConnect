import React from 'react';
import { CalendarCheck, ClipboardCheck, Search, Stethoscope } from 'lucide-react';
import { HOW_IT_WORKS_IMAGES } from '../../../data/homeImages';
import { container, section, sectionEyebrow, sectionHeader, sectionHeaderCentered, sectionSubtitle, sectionTitle } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const STEPS = [
  {
    number: '01',
    title: 'Search',
    description: 'Find doctors by specialty, location, rating, and availability.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Compare',
    description: 'Review doctor profiles, experience, ratings, and available appointments.',
    icon: ClipboardCheck,
  },
  {
    number: '03',
    title: 'Book',
    description: 'Choose the appointment time that works for you.',
    icon: CalendarCheck,
  },
  {
    number: '04',
    title: 'Get Care',
    description: 'Manage and track your appointment from your personal dashboard.',
    icon: Stethoscope,
  },
];

const HowItWorks = () => {
  return (
    <section
      className={cn(
        section,
        'bg-[radial-gradient(circle_at_8%_20%,rgba(14,165,233,0.08),transparent_28%)] bg-[var(--bg-page)] dark:bg-[var(--bg-page)]',
      )}
      id="how-it-works"
      aria-labelledby="how-heading"
    >
      <div className={container}>
        <div className={cn(sectionHeader, sectionHeaderCentered)}>
          <p className={cn(sectionEyebrow, 'section-eyebrow')}>Simple process</p>
          <h2 id="how-heading" className={sectionTitle}>
            How MediConnect Works
          </h2>
          <p className={cn(sectionSubtitle, 'section-subtitle')}>
            From search to care, booking an appointment takes just a few clear steps.
          </p>
        </div>

        <ol className="grid grid-cols-4 gap-6 relative list-none p-0 m-0 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.number}
                className="bg-[var(--bg-surface)] rounded-[22px] p-2.5 pb-[22px] h-full shadow-md"
              >
                <div className="h-32 rounded-2xl overflow-hidden mb-3.5 [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
                  <img src={HOW_IT_WORKS_IMAGES[index]} alt="" loading="lazy" />
                </div>
                <div
                  className="w-[38px] h-[38px] rounded-xl bg-[#ecfeff] text-[var(--accent-sky)] grid place-items-center mx-2.5 mb-2.5 dark:bg-[var(--primary-50)] dark:text-[var(--text-accent)]"
                  aria-hidden="true"
                >
                  <Icon size={18} />
                </div>
                <p className="text-[0.78rem] font-extrabold tracking-[0.1em] text-[var(--accent-coral)] mx-2.5 mb-1">
                  {step.number}
                </p>
                <h3 className="mx-2.5 mb-2 text-[1.08rem] text-[var(--text-primary)]">{step.title}</h3>
                <p className="text-[var(--text-secondary)] text-[var(--text-sm)] mx-2.5">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
