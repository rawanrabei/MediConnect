import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CalendarCheck, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react';
import DoctorAvatar from '../../doctor/DoctorAvatar/DoctorAvatar';
import { selectFeaturedDoctor } from '../../../features/doctors/doctorSelectors';
import { HOME_IMAGES } from '../../../data/homeImages';
import { btnGhost, btnLg, btnPrimary, container, fadeIn, heroHeading, sectionEyebrow } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const HeroSection = () => {
  const featuredDoctor = useSelector(selectFeaturedDoctor);

  return (
    <section
      className={cn(
        fadeIn,
        'relative overflow-hidden py-14 pb-[108px] max-[900px]:py-8 max-[900px]:pb-[72px]',
        'bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,transparent_40%),radial-gradient(circle_at_12%_10%,#dbeafe_0%,transparent_34%),radial-gradient(circle_at_88%_0%,#ccfbf1_0%,transparent_32%),radial-gradient(circle_at_70%_90%,#ffedd5_0%,transparent_28%),var(--bg-page)]',
        'dark:bg-[var(--bg-page)]',
      )}
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-auto -bottom-[20%] left-[40%] -right-[8%] h-[280px] bg-[radial-gradient(circle,rgba(20,184,166,0.18),transparent_70%)] blur-[10px] pointer-events-none"
        aria-hidden="true"
      />
      <div className={cn(container, 'relative grid grid-cols-[1.02fr_0.98fr] gap-10 items-center max-[900px]:grid-cols-1 max-[900px]:gap-7')}>
        <div className="max-w-[560px]">
          <p className={sectionEyebrow}>
            <Sparkles size={14} aria-hidden="true" />
            Smart Healthcare Portal
          </p>
          <h1
            id="hero-heading"
            className={cn(
              heroHeading,
              '[&_span]:block [&_span]:bg-gradient-to-r [&_span]:from-[var(--accent-sky)] [&_span]:via-[var(--accent-mint)] [&_span]:via-[55%] [&_span]:to-[var(--accent-coral)] [&_span]:bg-clip-text [&_span]:text-transparent',
            )}
          >
            Care that feels
            <span> personal &amp; easy.</span>
          </h1>
          <p className="my-[18px] mb-7 text-[1.125rem] text-[var(--text-secondary)] max-w-[480px]">
            Find trusted doctors, book in minutes, and manage your health journey
            from one bright, simple place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/doctors" className={cn(btnPrimary, btnLg)}>
              Find a Doctor
            </Link>
            <Link to="/#how-it-works" className={cn(btnGhost, btnLg)}>
              How It Works
            </Link>
          </div>
          <div className="flex items-center gap-3.5 mt-7">
            <div
              className="flex [&_img]:w-[38px] [&_img]:h-[38px] [&_img]:rounded-full [&_img]:object-cover [&_img]:border-2 [&_img]:border-white [&_img]:-ml-2.5 [&_img]:shadow-sm [&_img:first-child]:ml-0"
              aria-hidden="true"
            >
              {HOME_IMAGES.patients.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" />
              ))}
            </div>
            <div>
              <strong className="block text-[0.95rem] text-[var(--text-primary)]">
                10,000+ patients
              </strong>
              <p className="m-0 text-[13px] text-[var(--text-muted)]">
                book happier visits every month
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5 mt-[22px]">
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[rgba(255,255,255,0.72)] border border-[rgba(255,255,255,0.8)] text-[var(--text-secondary)] text-[var(--text-sm)] font-semibold shadow-sm dark:bg-[var(--bg-surface)] dark:border-[var(--border-subtle)] dark:text-[var(--text-primary)] [&_svg]:text-[var(--accent-mint)]">
              <ShieldCheck size={18} aria-hidden="true" />
              Verified doctors
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[rgba(255,255,255,0.72)] border border-[rgba(255,255,255,0.8)] text-[var(--text-secondary)] text-[var(--text-sm)] font-semibold shadow-sm dark:bg-[var(--bg-surface)] dark:border-[var(--border-subtle)] dark:text-[var(--text-primary)] [&_svg]:text-[var(--accent-mint)]">
              <CalendarCheck size={18} aria-hidden="true" />
              Instant booking
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[rgba(255,255,255,0.72)] border border-[rgba(255,255,255,0.8)] text-[var(--text-secondary)] text-[var(--text-sm)] font-semibold shadow-sm dark:bg-[var(--bg-surface)] dark:border-[var(--border-subtle)] dark:text-[var(--text-primary)] [&_svg]:text-[var(--accent-mint)]">
              <Stethoscope size={18} aria-hidden="true" />
              Care you can trust
            </span>
          </div>
        </div>

        <div className="relative min-h-[460px] max-[900px]:min-h-0">
          <div className="relative h-[430px] max-[900px]:h-auto">
            <img
              src={HOME_IMAGES.heroMain}
              alt="Doctor listening to a patient during a consultation"
              className="w-[78%] h-full object-cover rounded-[32px] shadow-xl ml-auto block max-[900px]:w-full max-[900px]:h-80"
            />
            <img
              src={HOME_IMAGES.heroDoctor}
              alt=""
              className="absolute left-0 bottom-7 w-[42%] h-[210px] object-cover rounded-3xl border-[6px] border-white shadow-lg dark:border-[var(--bg-surface)] max-[900px]:static max-[900px]:w-full max-[900px]:mt-3 max-[900px]:h-[180px] max-[900px]:border-0"
              loading="lazy"
            />
            <div className="absolute top-[18px] right-[18px] bg-white text-[var(--accent-mint)] text-xs font-extrabold px-3 py-2 rounded-full shadow-md before:content-[''] before:inline-block before:w-2 before:h-2 before:mr-2 before:rounded-full before:bg-[#22c55e] before:shadow-[0_0_0_6px_rgba(34,197,94,0.18)] dark:bg-[var(--bg-surface)] dark:border dark:border-[var(--border-subtle)] dark:text-[var(--text-primary)]">
              Live clinic hours
            </div>
          </div>
          <div className="absolute left-0 -bottom-[18px] z-[2] w-[min(320px,86%)] bg-[rgba(255,255,255,0.92)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.8)] rounded-[20px] p-4 shadow-lg dark:bg-[var(--bg-surface)] dark:border-[var(--border-subtle)] max-[900px]:static max-[900px]:w-full max-[900px]:mt-3">
            <div className="flex justify-between items-center mb-3 [&_h3]:text-[0.92rem] [&_h3]:text-[var(--text-primary)] [&_span]:text-[var(--accent-coral)] [&_span]:text-xs [&_span]:font-extrabold">
              <h3>Upcoming appointments</h3>
              <span>Today</span>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#f0fdfa] dark:bg-[var(--gray-50)] [&_strong]:block [&_strong]:text-[0.9rem] [&_strong]:text-[var(--text-primary)] [&_small]:text-[var(--text-muted)]">
                <div>
                  <strong>Dermatology consult</strong>
                  <small>Tomorrow · 10:30 AM</small>
                </div>
                <span className="inline-flex items-center bg-[#ecfdf5] text-[var(--text-success)] rounded-full px-2.5 py-1 text-[11px] font-extrabold">
                  Confirmed
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#f0fdfa] dark:bg-[var(--gray-50)] [&_strong]:block [&_strong]:text-[0.9rem] [&_strong]:text-[var(--text-primary)] [&_small]:text-[var(--text-muted)]">
                <div>
                  <strong>General check-up</strong>
                  <small>Thu · 02:00 PM</small>
                </div>
                <span className="inline-flex items-center bg-[#ecfdf5] text-[var(--text-success)] rounded-full px-2.5 py-1 text-[11px] font-extrabold">
                  Available
                </span>
              </div>
            </div>
          </div>
          {featuredDoctor && (
            <div className="absolute right-3 bottom-[72px] z-[3] w-[220px] bg-white rounded-2xl p-3 shadow-lg flex gap-2.5 items-center dark:bg-[var(--bg-surface)] max-[900px]:static max-[900px]:w-full max-[900px]:mt-3 [&_p]:text-xs [&_p]:text-[var(--text-muted)] [&_strong]:text-[0.9rem] [&_strong]:text-[var(--text-primary)]">
              <DoctorAvatar doctor={featuredDoctor} size={44} />
              <div>
                <strong>{featuredDoctor.name}</strong>
                <p>
                  {featuredDoctor.specialty} · {featuredDoctor.rating} rating
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
