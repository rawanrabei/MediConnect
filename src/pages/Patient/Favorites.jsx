import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import DoctorCard from '../../components/doctor/DoctorCard/DoctorCard';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { selectAllDoctors, selectFavoriteIds } from '../../features/doctors/doctorSelectors';
import { btnPrimary, supportText } from '../../constants/uiClasses';

const Favorites = () => {
  const favoriteIds = useSelector(selectFavoriteIds);
  const allDoctors = useSelector(selectAllDoctors);
  const favoriteDoctors = allDoctors.filter((doctor) => favoriteIds.includes(doctor.id));

  return (
    <div className="grid gap-8">
      <header>
        <p className={supportText}>Doctors you have saved for quick access. Remove favorites anytime using the heart icon.</p>
      </header>

      {favoriteDoctors.length === 0 ? (
        <EmptyState
          icon={<Heart size={36} />}
          title="No favorite doctors yet"
          description="Browse doctors and save the ones you trust."
          action={<Link to="/doctors" className={btnPrimary}>Find a Doctor</Link>}
        />
      ) : (
        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1 max-sm:grid-cols-1">
          {favoriteDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
