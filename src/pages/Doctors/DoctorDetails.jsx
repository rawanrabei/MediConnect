import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb';
import DoctorInfo from '../../components/doctor/DoctorInfo/DoctorInfo';
import DoctorReviews from '../../components/doctor/DoctorReviews/DoctorReviews';
import AvailabilitySlots from '../../components/doctor/AvailabilitySlots/AvailabilitySlots';
import Loader from '../../components/common/Loader/Loader';
import { resolveDoctorSlots } from '../../data/doctors';
import { fetchDoctorById } from '../../features/doctors/doctorThunks';
import {
  selectDoctorById,
  selectDoctorsLoading,
} from '../../features/doctors/doctorSelectors';
import { selectBookedSlots } from '../../features/appointments/appointmentSelectors';
import { isSlotUnavailable } from '../../utils/appointmentUtils';
import { btn, btnPrimary, container, pagePadding } from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const bookedSlots = useSelector(selectBookedSlots);
  const doctor = useSelector(selectDoctorById(id));
  const loading = useSelector(selectDoctorsLoading);

  const initialSlot = location.state?.selectedSlot || null;
  const [selectedSlot, setSelectedSlot] = useState(initialSlot);

  useEffect(() => {
    if (id) {
      dispatch(fetchDoctorById(id));
    }
  }, [dispatch, id]);

  const slots = useMemo(() => {
    if (!doctor) return [];

    return resolveDoctorSlots(doctor)
      .map((day) => ({
        ...day,
        times: day.times.filter(
          (time) => !isSlotUnavailable(bookedSlots, doctor.id, day.date, time)
        ),
      }))
      .filter((day) => day.times.length > 0);
  }, [doctor, bookedSlots]);

  const notFoundCard =
    'text-center bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg py-16 px-8 [&_h1]:mb-2 [&_p]:text-[var(--text-secondary)] [&_p]:mb-6';

  if (loading && !doctor) {
    return (
      <div className={pagePadding}>
        <div className={container}>
          <Loader />
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className={pagePadding}>
        <div className={container}>
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Doctors', to: '/doctors' },
              { label: 'Doctor not found' },
            ]}
          />
          <div className={notFoundCard}>
            <h1>Doctor not found</h1>
            <p>This doctor profile is unavailable or the link may be incorrect.</p>
            <Link to="/doctors" className={btnPrimary}>
              Back to Doctors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const goToBooking = () => {
    if (!selectedSlot) {
      document.getElementById('appointments')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    navigate(`/booking/${doctor.id}`, {
      state: {
        doctorId: doctor.id,
        date: selectedSlot.date,
        time: selectedSlot.time,
        label: selectedSlot.label,
      },
    });
  };

  return (
    <div className={cn(pagePadding, 'max-[768px]:py-8')}>
      <div className={container}>
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Doctors', to: '/doctors' },
            { label: doctor.name },
          ]}
        />

        <DoctorInfo doctor={doctor} onBook={goToBooking} />

        <div className="grid gap-6 mt-6">
          <div id="appointments">
            <AvailabilitySlots
              slots={slots}
              selectedSlot={selectedSlot}
              onSlotSelect={setSelectedSlot}
            />
          </div>

          <div className="flex justify-end max-[768px]:[&_button]:w-full">
            <button
              type="button"
              className={btn('primary', 'lg')}
              onClick={goToBooking}
              disabled={!selectedSlot}
            >
              {selectedSlot
                ? `Book Appointment · ${selectedSlot.label}, ${selectedSlot.time}`
                : 'Select a time to book'}
            </button>
          </div>

          <DoctorReviews
            reviews={doctor.reviewList || []}
            averageRating={doctor.rating}
            reviewCount={doctor.reviews}
            ratingBreakdown={doctor.ratingBreakdown}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
