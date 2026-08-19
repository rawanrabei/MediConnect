import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, Heart, MapPin, ShieldCheck } from 'lucide-react';
import StarRating from '../../common/StarRating/StarRating';
import Badge from '../../common/Badge/Badge';
import DoctorAvatar from '../DoctorAvatar/DoctorAvatar';
import { toggleFavorite } from '../../../features/doctors/doctorSlice';
import { selectFavoriteIds } from '../../../features/doctors/doctorSelectors';
import { btnGhost, btnPrimary, panel, supportText } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const DoctorInfo = ({ doctor, onBook }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectFavoriteIds).includes(doctor.id);
  const specialties = doctor.subspecialties?.length
    ? doctor.subspecialties
    : [doctor.specialty].filter(Boolean);

  return (
    <div className="grid gap-8">
      <section className={cn(panel, 'grid grid-cols-[auto_1fr_auto] gap-6 items-start max-[900px]:grid-cols-1')}>
        <DoctorAvatar doctor={doctor} size={96} />

        <div>
          <h1 className="text-[clamp(1.6rem,3vw,2rem)] tracking-[-0.03em] mb-1">{doctor.name}</h1>
          <p className="text-[var(--text-accent)] font-bold mb-3">{doctor.specialty}</p>
          <div className="flex items-center gap-2 mb-3.5 flex-wrap [&_.badge]:gap-1">
            <StarRating rating={doctor.rating} />
            <strong>{doctor.rating}</strong>
            <span className={supportText}>({doctor.reviews || 0} reviews)</span>
            {doctor.verified && (
              <Badge variant="success">
                <ShieldCheck size={12} aria-hidden="true" /> Verified
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2.5 text-[var(--text-secondary)] text-[var(--text-sm)] [&_span]:inline-flex [&_span]:items-center [&_span]:gap-1.5">
            {doctor.experience ? (
              <span>
                <Briefcase size={16} aria-hidden="true" />
                {doctor.experience} years experience
              </span>
            ) : null}
            {doctor.location ? (
              <span>
                <MapPin size={16} aria-hidden="true" />
                {doctor.location}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 min-w-[200px] max-[900px]:min-w-0">
          <button type="button" className={btnPrimary} onClick={onBook}>
            Book Appointment
          </button>
          <button
            type="button"
            className={btnGhost}
            aria-pressed={isFavorite}
            onClick={() => dispatch(toggleFavorite(doctor.id))}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
            {isFavorite ? 'Saved' : 'Save to favorites'}
          </button>
        </div>
      </section>

      <div className="grid grid-cols-[1.4fr_0.8fr] gap-6 max-[900px]:grid-cols-1">
        <div className={panel}>
          <h2 className="text-[1.15rem] mb-4">About</h2>
          <p className="text-[var(--text-secondary)]">{doctor.bio || 'Profile details will be added soon.'}</p>

          {specialties.length > 0 && (
            <>
              <h2 className="text-[1.15rem] mb-4 mt-6">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {specialties.map((item) => (
                  <span
                    key={item}
                    className="bg-[var(--primary-50)] text-[var(--text-accent)] rounded-full px-3 py-1.5 text-[var(--text-sm)] font-semibold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </>
          )}

          {doctor.experience ? (
            <>
              <h2 className="text-[1.15rem] mb-4 mt-6">Experience</h2>
              <p className="text-[var(--text-secondary)]">{doctor.experience} years of clinical experience.</p>
            </>
          ) : null}

          {doctor.education?.length ? (
            <>
              <h2 className="text-[1.15rem] mb-4 mt-6">Education</h2>
              <ul className="pl-[18px] grid gap-2 text-[var(--text-secondary)]">
                {doctor.education.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}

          {doctor.languages?.length ? (
            <>
              <h2 className="text-[1.15rem] mb-4 mt-6">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((language) => (
                  <span
                    key={language}
                    className="bg-[var(--primary-50)] text-[var(--text-accent)] rounded-full px-3 py-1.5 text-[var(--text-sm)] font-semibold"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <aside className={panel}>
          <h2 className="text-[1.15rem] mb-4">Clinic Information</h2>
          <dl className="grid gap-2.5">
            <div className="grid gap-0.5">
              <dt className="text-xs uppercase tracking-[0.04em] text-[var(--text-muted)] font-bold">Clinic</dt>
              <dd className="m-0 text-[var(--text-primary)] font-semibold">{doctor.clinic?.name || 'Clinic details coming soon'}</dd>
            </div>
            <div className="grid gap-0.5">
              <dt className="text-xs uppercase tracking-[0.04em] text-[var(--text-muted)] font-bold">Location</dt>
              <dd className="m-0 text-[var(--text-primary)] font-semibold">{doctor.clinic?.city || doctor.location}</dd>
            </div>
            {doctor.clinic?.address ? (
              <div className="grid gap-0.5">
                <dt className="text-xs uppercase tracking-[0.04em] text-[var(--text-muted)] font-bold">Address</dt>
                <dd className="m-0 text-[var(--text-primary)] font-semibold">{doctor.clinic.address}</dd>
              </div>
            ) : null}
            {doctor.consultationFee ? (
              <div className="grid gap-0.5">
                <dt className="text-xs uppercase tracking-[0.04em] text-[var(--text-muted)] font-bold">Consultation fee</dt>
                <dd className="m-0 text-[var(--text-primary)] font-semibold">{doctor.consultationFee} {doctor.currency || 'EGP'}</dd>
              </div>
            ) : null}
            {doctor.clinic?.workingHours ? (
              <div className="grid gap-0.5">
                <dt className="text-xs uppercase tracking-[0.04em] text-[var(--text-muted)] font-bold">Working hours</dt>
                <dd className="m-0 text-[var(--text-primary)] font-semibold">{doctor.clinic.workingHours}</dd>
              </div>
            ) : null}
          </dl>
        </aside>
      </div>
    </div>
  );
};

export default DoctorInfo;
