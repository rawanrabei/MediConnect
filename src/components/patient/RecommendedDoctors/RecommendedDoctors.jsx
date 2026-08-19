import React from 'react';
import DoctorCard from '../../doctor/DoctorCard/DoctorCard';
import { sectionTitle } from '../../../constants/uiClasses';

const RecommendedDoctors = ({ doctors }) => {
  return (
    <div className="grid gap-6">
      <h3 className={sectionTitle}>Recommended Doctors</h3>
      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedDoctors;
