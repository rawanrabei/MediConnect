import React from 'react';
import { useForm } from 'react-hook-form';
import { btnLg, btnPrimary, fieldError, formGroup, formInput, formLabel, panel } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const BookingForm = ({ defaultValues = {}, onSubmit, submitLabel = 'Continue to Review' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, mode: 'onBlur' });

  return (
    <form className={panel} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-[1.15rem] mb-6">Patient Information</h2>
      <div className="grid grid-cols-2 gap-x-4 max-sm:grid-cols-1">
        <div className={cn(formGroup, 'col-span-full')}>
          <label htmlFor="fullName" className={cn(formLabel, 'text-[var(--text-secondary)] text-[var(--text-sm)]')}>
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            className={formInput}
            placeholder="Enter your full name"
            {...register('fullName', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />
          {errors.fullName && <span className={fieldError}>{errors.fullName.message}</span>}
        </div>

        <div className={formGroup}>
          <label htmlFor="email" className={cn(formLabel, 'text-[var(--text-secondary)] text-[var(--text-sm)]')}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            className={formInput}
            placeholder="you@example.com"
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
          <label htmlFor="phone" className={cn(formLabel, 'text-[var(--text-secondary)] text-[var(--text-sm)]')}>
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            className={formInput}
            placeholder="+20 100 000 0000"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[+]?[\d\s()-]{8,20}$/,
                message: 'Enter a valid phone number',
              },
            })}
          />
          {errors.phone && <span className={fieldError}>{errors.phone.message}</span>}
        </div>

        <div className={formGroup}>
          <label htmlFor="dateOfBirth" className={cn(formLabel, 'text-[var(--text-secondary)] text-[var(--text-sm)]')}>
            Date of Birth *
          </label>
          <input
            id="dateOfBirth"
            type="date"
            className={formInput}
            max={new Date().toISOString().split('T')[0]}
            {...register('dateOfBirth', {
              required: 'Date of birth is required',
            })}
          />
          {errors.dateOfBirth && <span className={fieldError}>{errors.dateOfBirth.message}</span>}
        </div>

        <div className={formGroup}>
          <label htmlFor="gender" className={cn(formLabel, 'text-[var(--text-secondary)] text-[var(--text-sm)]')}>
            Gender *
          </label>
          <select
            id="gender"
            className={formInput}
            {...register('gender', { required: 'Gender is required' })}
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className={fieldError}>{errors.gender.message}</span>}
        </div>

        <div className={cn(formGroup, 'col-span-full')}>
          <label htmlFor="reason" className={cn(formLabel, 'text-[var(--text-secondary)] text-[var(--text-sm)]')}>
            Reason for Visit *
          </label>
          <input
            id="reason"
            type="text"
            className={formInput}
            placeholder="Brief reason for your appointment"
            {...register('reason', {
              required: 'Reason for visit is required',
              minLength: { value: 5, message: 'Please provide at least 5 characters' },
            })}
          />
          {errors.reason && <span className={fieldError}>{errors.reason.message}</span>}
        </div>

        <div className={cn(formGroup, 'col-span-full')}>
          <label htmlFor="notes" className={cn(formLabel, 'text-[var(--text-secondary)] text-[var(--text-sm)]')}>
            Additional Notes
          </label>
          <textarea
            id="notes"
            className={cn(formInput, 'min-h-24 resize-y')}
            placeholder="Any additional information for the doctor (optional)"
            {...register('notes')}
          />
        </div>
      </div>

      <button type="submit" className={cn(btnPrimary, btnLg, 'w-full')}>
        {submitLabel}
      </button>
    </form>
  );
};

export default BookingForm;
