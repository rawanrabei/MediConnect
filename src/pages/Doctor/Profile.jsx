import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import DoctorAvatar from '../../components/doctor/DoctorAvatar/DoctorAvatar';
import { useDoctorContext } from '../../hooks/useDoctorContext';
import { updateDoctorProfile } from '../../features/doctors/doctorPortalSlice';
import { btn, doctorDashboard, fieldError, formGroup, formInput, formLabel, panel, supportText } from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const pageIntro = '[&_p]:text-[var(--text-secondary)] [&_p]:max-w-[720px]';
const doctorProfileView = 'grid gap-6';
const doctorProfileHero =
  'flex gap-6 items-center bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-8 max-sm:flex-col max-sm:items-start [&_h2]:text-[var(--text-primary)] [&_h2]:mb-1.5';
const doctorProfileGrid = 'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6';
const profilePanel = cn(panel, '[&_h3]:text-[var(--text-primary)] [&_h3]:mb-4');
const doctorProfileList = 'grid gap-2.5 [&_li]:text-[var(--text-secondary)]';
const doctorProfileSuccess =
  'px-4 py-3 rounded-md bg-[var(--bg-success-subtle)] text-[var(--text-success)] mb-4';

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const { doctor, doctorId } = useDoctorContext();
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: doctor?.name || '',
      specialty: doctor?.specialty || '',
      email: 'doctor@mediconnect.com',
      phone: '+20 100 987 6543',
      consultationFee: doctor?.consultationFee || '',
      about: doctor?.bio || '',
      clinicName: doctor?.clinic?.name || '',
      clinicAddress: doctor?.clinic?.address || '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    dispatch(updateDoctorProfile({
      doctorId,
      profile: {
        name: data.name,
        specialty: data.specialty,
        consultationFee: Number(data.consultationFee),
        bio: data.about,
        clinic: {
          ...(doctor?.clinic || {}),
          name: data.clinicName,
          address: data.clinicAddress,
        },
      },
    }));
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!doctor) {
    return (
      <div className={doctorDashboard}>
        <p className={supportText}>Doctor profile could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className={doctorDashboard}>
      <header className={pageIntro}>
        <p>Manage your professional profile and clinic information visible to patients.</p>
      </header>

      {saved && (
        <p className={doctorProfileSuccess} role="status">
          Profile updated successfully.
        </p>
      )}

      {!isEditing ? (
        <div className={doctorProfileView}>
          <section className={doctorProfileHero}>
            <DoctorAvatar doctor={doctor} size={80} />
            <div>
              <h2>{doctor.name}</h2>
              <p className={supportText}>{doctor.specialty}</p>
              <p className={supportText}>{doctor.experience} years experience · {doctor.location}</p>
            </div>
            <button
              type="button"
              className={cn(btn('primary'), 'ml-auto max-sm:ml-0')}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </section>

          <div className={doctorProfileGrid}>
            <section className={profilePanel}>
              <h3>About</h3>
              <p className={supportText}>{doctor.bio}</p>
            </section>
            <section className={profilePanel}>
              <h3>Education</h3>
              <ul className={doctorProfileList}>
                {(doctor.education || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className={profilePanel}>
              <h3>Languages</h3>
              <p className={supportText}>{(doctor.languages || []).join(', ')}</p>
            </section>
            <section className={profilePanel}>
              <h3>Consultation Fee</h3>
              <p className={supportText}>{doctor.consultationFee} {doctor.currency || 'EGP'}</p>
            </section>
            <section className={profilePanel}>
              <h3>Clinic Information</h3>
              <div className={doctorProfileList}>
                <p><strong>{doctor.clinic?.name}</strong></p>
                <p className={supportText}>{doctor.clinic?.address}, {doctor.clinic?.city}</p>
                <p className={supportText}>{doctor.clinic?.workingHours}</p>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={doctorProfileGrid}>
            <section className={profilePanel}>
              <h3>Professional Information</h3>
              <div className={formGroup}>
                <label htmlFor="name" className={formLabel}>Name *</label>
                <input
                  id="name"
                  type="text"
                  className={formInput}
                  {...register('name', {
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  })}
                />
                {errors.name && <span className={fieldError}>{errors.name.message}</span>}
              </div>
              <div className={formGroup}>
                <label htmlFor="specialty" className={formLabel}>Specialty *</label>
                <input
                  id="specialty"
                  type="text"
                  className={formInput}
                  {...register('specialty', { required: 'Specialty is required' })}
                />
                {errors.specialty && <span className={fieldError}>{errors.specialty.message}</span>}
              </div>
              <div className={formGroup}>
                <label htmlFor="consultationFee" className={formLabel}>Consultation Fee *</label>
                <input
                  id="consultationFee"
                  type="number"
                  min="0"
                  className={formInput}
                  {...register('consultationFee', {
                    required: 'Consultation fee is required',
                    min: { value: 1, message: 'Fee must be greater than 0' },
                  })}
                />
                {errors.consultationFee && (
                  <span className={fieldError}>{errors.consultationFee.message}</span>
                )}
              </div>
              <div className={formGroup}>
                <label htmlFor="about" className={formLabel}>About</label>
                <textarea id="about" rows={4} className={formInput} {...register('about')} />
              </div>
            </section>

            <section className={profilePanel}>
              <h3>Contact Information</h3>
              <div className={formGroup}>
                <label htmlFor="email" className={formLabel}>Email *</label>
                <input
                  id="email"
                  type="email"
                  className={formInput}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                />
                {errors.email && <span className={fieldError}>{errors.email.message}</span>}
              </div>
              <div className={formGroup}>
                <label htmlFor="phone" className={formLabel}>Phone *</label>
                <input
                  id="phone"
                  type="tel"
                  className={formInput}
                  {...register('phone', {
                    required: 'Phone is required',
                    pattern: {
                      value: /^[+]?[\d\s()-]{8,20}$/,
                      message: 'Enter a valid phone number',
                    },
                  })}
                />
                {errors.phone && <span className={fieldError}>{errors.phone.message}</span>}
              </div>
            </section>

            <section className={profilePanel}>
              <h3>Clinic Information</h3>
              <div className={formGroup}>
                <label htmlFor="clinicName" className={formLabel}>Clinic Name</label>
                <input id="clinicName" type="text" className={formInput} {...register('clinicName')} />
              </div>
              <div className={formGroup}>
                <label htmlFor="clinicAddress" className={formLabel}>Clinic Address</label>
                <input id="clinicAddress" type="text" className={formInput} {...register('clinicAddress')} />
              </div>
            </section>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <button type="submit" className={btn('primary', 'lg')}>Save Profile</button>
            <button type="button" className={btn('ghost', 'lg')} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DoctorProfile;
