export const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'MC';

  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : parts[0][1] || '';
  return `${first}${last}`.replace(/[^a-zA-Z]/g, '').toUpperCase() || 'MC';
};

const AVATAR_COLORS = [
  '#1d4ed8',
  '#0f766e',
  '#1e40af',
  '#15803d',
  '#0369a1',
  '#0e7490',
];

export const getAvatarColor = (seed = '') => {
  const total = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[total % AVATAR_COLORS.length];
};
