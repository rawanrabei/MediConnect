const photo = (id, extra = 'w=960&h=720') =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&${extra}`;

export const HOME_IMAGES = {
  heroMain: photo('photo-1576091160399-112ba8d25d1d', 'w=900&h=1100'),
  heroDoctor: photo('photo-1559839734-2b71ea197ec2', 'w=640&h=800'),
  heroCare: photo('photo-1666214280557-f1b5022eb634', 'w=720&h=560'),
  why: photo('photo-1579684385127-1ef15d508118', 'w=1000&h=1200'),
  stats: photo('photo-1519494026892-80bbd2d6fd0d', 'w=1600&h=900'),
  cta: photo('photo-1631217868264-e5b90bb7e133', 'w=1600&h=900'),
  recommend: photo('photo-1582750433449-648ed127bb54', 'w=1400&h=900'),
  patients: [
    photo('photo-1544005313-94ddf0286df2', 'w=120&h=120'),
    photo('photo-1500648767791-00dcc994a43e', 'w=120&h=120'),
    photo('photo-1438761681033-6461ffad8d80', 'w=120&h=120'),
    photo('photo-1507003211169-0a1dd7228f2d', 'w=120&h=120'),
  ],
};

export const SPECIALTY_IMAGES = {
  cardiology: photo('photo-1628348068343-c6a848d2b6dd', 'w=640&h=420'),
  dermatology: photo('photo-1570172619644-dfd03ed5d881', 'w=640&h=420'),
  dentistry: photo('photo-1598256989800-fe5f95da9787', 'w=640&h=420'),
  neurology: photo('photo-1559757148-5c350d0d3c56', 'w=640&h=420'),
  pediatrics: photo('photo-1581594693702-fbdc51b2763b', 'w=640&h=420'),
  ophthalmology: photo('photo-1579684453423-f84349ef60b0', 'w=640&h=420'),
  orthopedics: photo('photo-1571019613454-1cb2f99b2d8b', 'w=640&h=420'),
  'general-medicine': photo('photo-1666214280557-f1b5022eb634', 'w=640&h=420'),
  gynecology: photo('photo-1579684385127-1ef15d508118', 'w=640&h=420'),
  psychiatry: photo('photo-1573497019940-1c28c88b4f3e', 'w=640&h=420'),
  ent: photo('photo-1582750433449-648ed127bb54', 'w=640&h=420'),
  urology: photo('photo-1631217868264-e5b90bb7e133', 'w=640&h=420'),
  endocrinology: photo('photo-1576091160399-112ba8d25d1d', 'w=640&h=420'),
  gastroenterology: photo('photo-1519494026892-80bbd2d6fd0d', 'w=640&h=420'),
  pulmonology: photo('photo-1584982751601-97dcc096659c', 'w=640&h=420'),
};

export const HOW_IT_WORKS_IMAGES = [
  photo('photo-1517245386807-bb43f82c33c4', 'w=640&h=420'),
  photo('photo-1584982751601-97dcc096659c', 'w=640&h=420'),
  photo('photo-1516321318423-f06f85e504b3', 'w=640&h=420'),
  photo('photo-1576091160550-2173dba999ef', 'w=640&h=420'),
];
