import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DoctorCard from '../../doctor/DoctorCard/DoctorCard';
import { selectTopRatedDoctors } from '../../../features/doctors/doctorSelectors';
import { btnOutline, container, section, sectionEyebrow, sectionHeader, sectionHeaderCentered, sectionSubtitle, sectionSurface, sectionTitle } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const TopDoctorsSection = () => {
  const doctors = useSelector(selectTopRatedDoctors(8));

  return (
    <section className={cn(section, sectionSurface)} aria-labelledby="top-doctors-heading">
      <div className={container}>
        <div className={cn(sectionHeader, sectionHeaderCentered)}>
          <p className={cn(sectionEyebrow, 'section-eyebrow')}>Trusted professionals</p>
          <h2 id="top-doctors-heading" className={sectionTitle}>
            Top Rated Doctors
          </h2>
          <p className={cn(sectionSubtitle, 'section-subtitle')}>
            Meet highly rated doctors ready to provide the care you need.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/doctors" className={cn(btnOutline, 'min-w-[200px]')}>
            View all doctors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopDoctorsSection;
