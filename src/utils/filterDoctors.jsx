import { resolveDoctorSlots } from '../data/doctors';

export const DEFAULT_DOCTOR_FILTERS = {
  name: '',
  specialty: '',
  location: '',
  date: '',
  rating: '',
  maxFee: '',
  experience: '',
  availability: '',
  gender: '',
  sort: 'recommended',
};

export const parseDoctorQuery = (searchParams) => ({
  name: searchParams.get('name') || searchParams.get('q') || '',
  specialty: searchParams.get('specialty') || '',
  location: searchParams.get('location') || '',
  date: searchParams.get('date') || '',
  rating: searchParams.get('rating') || '',
  maxFee: searchParams.get('maxFee') || '',
  experience: searchParams.get('experience') || '',
  availability: searchParams.get('availability') || '',
  gender: searchParams.get('gender') || '',
  sort: searchParams.get('sort') || 'recommended',
});

export const toDoctorQuery = (filters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;
    if (key === 'sort' && value === 'recommended') return;
    params.set(key, value);
  });

  return params;
};

export const hasActiveDoctorFilters = (filters) =>
  Object.entries(filters).some(([key, value]) => {
    if (key === 'sort') return Boolean(value) && value !== 'recommended';
    return Boolean(value);
  });

const matchesSpecialty = (doctor, specialty) => {
  if (!specialty) return true;
  const value = specialty.toLowerCase();
  return (
    doctor.specialtySlug === value ||
    doctor.specialty.toLowerCase() === value
  );
};

const matchesAvailability = (doctor, availability) => {
  if (!availability) return true;
  const label = (doctor.availability || '').toLowerCase();

  if (availability === 'available') return Boolean(doctor.available);
  if (availability === 'today') return label.includes('today');
  if (availability === 'tomorrow') return label.includes('tomorrow');
  if (availability === 'week') return label.includes('week') || Boolean(doctor.available);
  return true;
};

export const filterDoctors = (doctors, filters) => {
  const query = (filters.name || '').trim().toLowerCase();
  const minRating = Number(filters.rating) || 0;
  const maxFee = Number(filters.maxFee) || 0;
  const minExperience = Number(filters.experience) || 0;

  return doctors.filter((doctor) => {
    if (query) {
      const inName = doctor.name.toLowerCase().includes(query);
      const inSpecialty = doctor.specialty.toLowerCase().includes(query);
      if (!inName && !inSpecialty) return false;
    }

    if (!matchesSpecialty(doctor, filters.specialty)) return false;
    if (filters.location && doctor.location !== filters.location) return false;
    if (minRating && doctor.rating < minRating) return false;
    if (maxFee && doctor.consultationFee > maxFee) return false;
    if (minExperience && doctor.experience < minExperience) return false;
    if (!matchesAvailability(doctor, filters.availability)) return false;
    if (filters.gender && doctor.gender !== filters.gender) return false;
    if (filters.date) {
      const days = resolveDoctorSlots(doctor);
      if (!days.some((day) => day.date === filters.date)) return false;
    }

    return true;
  });
};

export const sortDoctors = (doctors, sort = 'recommended') => {
  const sorted = [...doctors];

  switch (sort) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case 'fee':
      return sorted.sort((a, b) => a.consultationFee - b.consultationFee);
    case 'experience':
      return sorted.sort((a, b) => b.experience - a.experience);
    default:
      return sorted.sort(
        (a, b) => Number(b.available) - Number(a.available) || b.rating - a.rating || b.reviews - a.reviews
      );
  }
};
