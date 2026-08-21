import React from 'react';
import { Link } from 'react-router-dom';
import DoctorCard from '../../doctor/DoctorCard/DoctorCard';
import EmptyState from '../../common/EmptyState/EmptyState';
import { Heart } from 'lucide-react';
import { btn, panel, panelHeader } from '../../../constants/uiClasses';

const FavoriteDoctorsSection = ({ doctors, limit = 6 }) => {
  const displayed = doctors.slice(0, limit);

  return (
    <section className={panel}>
      <div className={panelHeader}>
        <h3>Favorite Doctors</h3>
        <Link to="/patient/favorites" className={btn('ghost', 'sm')}>View All Favorites</Link>
      </div>
      {displayed.length === 0 ? (
        <EmptyState
          icon={<Heart size={32} />}
          title="No favorite doctors yet"
          description="Save doctors you trust to find them quickly later."
          action={<Link to="/doctors" className={btn('primary', 'sm')}>Find a Doctor</Link>}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          {displayed.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoriteDoctorsSection;
