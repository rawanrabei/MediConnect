import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../features/auth/authSlice';
import { selectUser } from '../../features/auth/authSelectors';
import { btnLg, btnPrimary, fieldError, formGroup, formInput, formLabel, panel, supportText } from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="grid gap-8">
      <header>
        <p className={supportText}>Update your personal and contact information for a smoother healthcare experience.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {saved && (
          <p
            className="bg-[var(--secondary-50)] border border-[var(--secondary-200)] text-[var(--text-success)] p-3 rounded-md mb-4 text-[var(--text-sm)] font-semibold"
            role="status"
          >
            Profile updated successfully.
          </p>
        )}

        <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
          <section className={panel}>
            <h2 className="text-[1.05rem] mb-6">Personal Information</h2>
            <div className={formGroup}>
              <label htmlFor="name" className={formLabel}>Full Name *</label>
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
              <label htmlFor="dateOfBirth" className={formLabel}>Date of Birth</label>
              <input id="dateOfBirth" type="date" className={formInput} {...register('dateOfBirth')} />
            </div>
            <div className={formGroup}>
              <label htmlFor="gender" className={formLabel}>Gender</label>
              <select id="gender" className={formInput} {...register('gender')}>
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
          </section>

          <section className={panel}>
            <h2 className="text-[1.05rem] mb-6">Contact Information</h2>
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

          <section className={panel}>
            <h2 className="text-[1.05rem] mb-6">Account Information</h2>
            <div className={formGroup}>
              <label htmlFor="role" className={formLabel}>Account Role</label>
              <input id="role" type="text" className={formInput} value={user?.role || 'patient'} disabled />
            </div>
            <div className={formGroup}>
              <label htmlFor="userId" className={formLabel}>User ID</label>
              <input id="userId" type="text" className={formInput} value={user?.id || ''} disabled />
            </div>
          </section>
        </div>

        <button type="submit" className={cn(btnPrimary, btnLg, 'mt-4')}>
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
