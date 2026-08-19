import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, Clock3, Heart, MapPin, Wallet } from 'lucide-react';
import StarRating from '../../common/StarRating/StarRating';
import Badge from '../../common/Badge/Badge';
import DoctorAvatar from '../DoctorAvatar/DoctorAvatar';
import { toggleFavorite } from '../../../features/doctors/doctorSlice';
import { selectFavoriteIds } from '../../../features/doctors/doctorSelectors';
import { btnPrimary, btnSm } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const DoctorCard = ({ doctor }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);
  const isFavorite = favoriteIds.includes(doctor.id);

  const availabilityLabel = doctor.availability
    || (doctor.available ? 'Available' : 'Fully Booked');
  const feeLabel = doctor.consultationFee
    ? `${doctor.consultationFee} ${doctor.currency || 'EGP'}`
    : 'Fee on request';

  const handleFavorite = () => {
    dispatch(toggleFavorite(doctor.id));
  };

  return (
    <article
      className={cn(
        'bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[22px] p-6',
        'flex flex-col gap-4 h-full shadow-sm',
        'transition-[transform,box-shadow,border-color] duration-150',
        'hover:-translate-y-1.5 hover:shadow-glow hover:border-transparent',
      )}
    >
      <div className="flex gap-4 items-start">
        <DoctorAvatar doctor={doctor} />
        <div className="flex-1 min-w-0">
          <h3 className="text-[1.05rem] font-bold text-[var(--text-primary)] leading-snug">{doctor.name}</h3>
          <p className="text-[var(--text-accent)] text-[var(--text-sm)] font-semibold mt-0.5">{doctor.specialty}</p>
          {typeof doctor.rating === 'number' && (
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={doctor.rating} />
              <span className="text-[var(--text-sm)] font-bold text-[var(--text-primary)]">{doctor.rating}</span>
            </div>
          )}
        </div>
        <button
          type="button"
          className={cn(
            'w-9 h-9 border-[1.5px] border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)]',
            'rounded-full inline-flex items-center justify-center cursor-pointer shrink-0',
            'transition-[color,border-color,background-color] duration-150',
            isFavorite && 'text-[var(--error)] border-[var(--text-danger)] bg-[var(--bg-danger-subtle)]',
            'hover:text-[var(--error)] hover:border-[var(--text-danger)] hover:bg-[var(--bg-danger-subtle)]',
          )}
          aria-label={isFavorite ? `Remove ${doctor.name} from favorites` : `Save ${doctor.name} to favorites`}
          aria-pressed={isFavorite}
          onClick={handleFavorite}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <dl className="grid gap-2">
        {doctor.experience ? (
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-[var(--text-sm)] [&_svg]:text-[var(--text-accent)] [&_svg]:shrink-0">
            <Briefcase size={16} aria-hidden="true" />
            <dt className="sr-only">Experience</dt>
            <dd className="m-0">{doctor.experience} Years Experience</dd>
          </div>
        ) : null}
        {doctor.location ? (
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-[var(--text-sm)] [&_svg]:text-[var(--text-accent)] [&_svg]:shrink-0">
            <MapPin size={16} aria-hidden="true" />
            <dt className="sr-only">Location</dt>
            <dd className="m-0">{doctor.location}</dd>
          </div>
        ) : null}
        <div className="flex items-center gap-2 text-[var(--text-secondary)] text-[var(--text-sm)] [&_svg]:text-[var(--text-accent)] [&_svg]:shrink-0">
          <Wallet size={16} aria-hidden="true" />
          <dt className="sr-only">Consultation fee</dt>
          <dd className="m-0">{feeLabel}</dd>
        </div>
        <div className="flex items-center gap-2 text-[var(--text-secondary)] text-[var(--text-sm)] [&_svg]:text-[var(--text-accent)] [&_svg]:shrink-0">
          <Clock3 size={16} aria-hidden="true" />
          <dt className="sr-only">Availability</dt>
          <dd className="m-0">{availabilityLabel}</dd>
        </div>
      </dl>

      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <Badge variant={doctor.available ? 'success' : 'warning'}>
          {doctor.available ? 'Available' : 'Busy'}
        </Badge>
        <Link to={`/doctors/${doctor.id}`} className={cn(btnPrimary, btnSm, 'no-underline')}>
          View Profile
        </Link>
      </div>
    </article>
  );
};

export default DoctorCard;
