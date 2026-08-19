import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Users } from 'lucide-react';
import DoctorPatientList from '../../components/doctorDashboard/DoctorPatientList/DoctorPatientList';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { useDoctorContext } from '../../hooks/useDoctorContext';
import { selectDoctorAppointments } from '../../features/appointments/appointmentSelectors';
import { getUniqueDoctorPatients } from '../../utils/doctorUtils';
import { adminToolbar, doctorDashboard } from '../../constants/uiClasses';

const pageIntro = '[&_p]:text-[var(--text-secondary)] [&_p]:max-w-[720px]';

const Patients = () => {
  const { doctorId } = useDoctorContext();
  const appointments = useSelector(selectDoctorAppointments(doctorId));
  const [search, setSearch] = useState('');

  const patients = useMemo(() => {
    const uniquePatients = getUniqueDoctorPatients(appointments);
    if (!search.trim()) return uniquePatients;

    const query = search.trim().toLowerCase();
    return uniquePatients.filter((patient) => patient.name.toLowerCase().includes(query));
  }, [appointments, search]);

  return (
    <div className={doctorDashboard}>
      <header className={pageIntro}>
        <p>View unique patients who have booked appointments with you.</p>
      </header>

      <div className={adminToolbar}>
        <SearchBar
          value={search}
          onSearch={setSearch}
          placeholder="Search by patient name"
          label="Search patients"
        />
      </div>

      {patients.length === 0 ? (
        <EmptyState
          icon={<Users size={36} />}
          title="No patients found"
          description="Patients will appear here after they book appointments with you."
        />
      ) : (
        <DoctorPatientList patients={patients} title="My Patients" compact />
      )}
    </div>
  );
};

export default Patients;
