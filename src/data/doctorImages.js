const portrait = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&h=400&q=80&facepad=2`;

/** Real portrait photos mapped to mock doctor IDs */
export const DOCTOR_PHOTOS = {
  1: portrait('photo-1559839734-2b71ea197ec2'),
  2: portrait('photo-1612349317150-e413f6a5b16d'),
  3: portrait('photo-1594824476967-48c8b964273f'),
  4: portrait('photo-1582750433449-648ed127bb54'),
  5: portrait('photo-1573496359142-b8d87734a5a2'),
  6: portrait('photo-1519085360753-af0119f7cbe7'),
  7: portrait('photo-1544005313-94ddf0286df2'),
  8: portrait('photo-1560250097-0b93528c311a'),
  9: portrait('photo-1438761681033-6461ffad8d80'),
  10: portrait('photo-1534528741775-53994a69daeb'),
  11: portrait('photo-1507003211169-0a1dd7228f2d'),
  12: portrait('photo-1506794778202-cad84cf45f1d'),
  13: portrait('photo-1584982751601-97dcc096659c'),
  14: portrait('photo-1500648767791-00dcc994a43e'),
  15: portrait('photo-1487412720507-e7ab37603c6f'),
  16: portrait('photo-1472099645785-5658abf4ff4e'),
  17: portrait('photo-1551836022-d5d88e9218df'),
  18: portrait('photo-1622253692010-333f2da6031d'),
  19: portrait('photo-1651008376811-b90baee60c1f'),
  20: portrait('photo-1537368910025-700350fe46c7'),
  21: portrait('photo-1527613426441-4da17471b66d'),
  22: portrait('photo-1614608682850-afc5454b0d66'),
  23: portrait('photo-1594824476967-48c8b964273f'),
  24: portrait('photo-1607990283143-e81e7a2c9349'),
  25: portrait('photo-1559839734-2b71ea197ec2'),
  26: portrait('photo-1612349317150-e413f6a5b16d'),
  27: portrait('photo-1573496359142-b8d87734a5a2'),
  28: portrait('photo-1560250097-0b93528c311a'),
  29: portrait('photo-1544005313-94ddf0286df2'),
  30: portrait('photo-1500648767791-00dcc994a43e'),
};

export const getDoctorPhoto = (doctorId) =>
  DOCTOR_PHOTOS[doctorId] || portrait('photo-1612349317150-e413f6a5b16d');
