export const selectAllDoctors = (state) => state.doctors.list;
export const selectDoctorsLoading = (state) => state.doctors.loading;
export const selectDoctorsError = (state) => state.doctors.error;
export const selectDoctorsFetched = (state) => state.doctors.fetched;
export const selectFavoriteIds = (state) => state.doctors.favoriteIds;
export const selectIsFavorite = (id) => (state) =>
  state.doctors.favoriteIds.includes(id);

export const selectDoctorById = (id) => (state) =>
  state.doctors.list.find((doctor) => String(doctor.id) === String(id));

export const selectTopRatedDoctors = (limit = 4) => (state) =>
  [...state.doctors.list].sort((a, b) => b.rating - a.rating).slice(0, limit);

export const selectFeaturedDoctor = (state) => state.doctors.list[0] || null;
