import { cn } from '../utils/cn';

export const container =
  'w-full max-w-[1180px] mx-auto px-6 max-md:px-4';

export const section = 'py-24 max-lg:py-[72px] max-md:py-12';
export const sectionSurface = 'bg-[var(--bg-surface)]';

export const sectionHeader = 'mb-12';
export const sectionHeaderCentered = 'mb-12 text-center [&_.section-eyebrow]:mx-auto [&_.section-subtitle]:mx-auto';

export const sectionEyebrow =
  'inline-flex items-center gap-2 text-[var(--accent-mint)] text-[0.78rem] font-extrabold tracking-[0.1em] uppercase mb-2 bg-[rgba(20,184,166,0.12)] px-3 py-1.5 rounded-full dark:bg-[rgba(94,234,212,0.12)]';

export const sectionTitle =
  'text-[clamp(1.6rem,3vw,var(--text-3xl))] font-bold tracking-[-0.025em] leading-[var(--leading-tight)] text-[var(--text-primary)]';

export const sectionSubtitle =
  'mt-4 text-[var(--text-secondary)] text-[var(--text-md)] leading-[var(--leading-normal)] max-w-[620px]';

export const heroHeading =
  'text-[clamp(2.15rem,4.6vw,var(--text-4xl))] font-extrabold tracking-[-0.03em] leading-[var(--leading-tight)] text-[var(--text-primary)]';

export const cardTitle =
  'text-[var(--text-lg)] font-bold text-[var(--text-primary)] leading-[var(--leading-snug)]';

export const bodyText =
  'text-[var(--text-base)] text-[var(--text-secondary)] leading-[var(--leading-normal)]';

export const supportText =
  'text-[var(--text-sm)] text-[var(--text-secondary)]';

export const card =
  'bg-[var(--bg-surface)] rounded-lg p-8 shadow-sm border border-[var(--border-subtle)]';

export const btnBase =
  'inline-flex items-center justify-center gap-2 border-none rounded-md cursor-pointer font-semibold [font-family:inherit] no-underline transition-all duration-150 px-5 py-3 text-base leading-[1.2]';

export const btnPrimary = cn(
  btnBase,
  'bg-gradient-to-br from-[var(--accent-sky)] to-[var(--primary-600)] text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] hover:from-[var(--primary-600)] hover:to-[var(--primary-700)] hover:-translate-y-px hover:shadow-glow',
);

export const btnSecondary = cn(btnBase, 'bg-[var(--text-secondary)] text-white hover:bg-[var(--text-secondary)]');

export const btnOutline = cn(
  btnBase,
  'bg-transparent border-[1.5px] border-[var(--primary-600)] text-[var(--text-accent)] hover:bg-[var(--primary-50)] dark:border-[var(--primary-400)]',
);

export const btnGhost = cn(
  btnBase,
  'bg-[var(--bg-surface)] border-[1.5px] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--primary-300)] hover:bg-[var(--primary-50)] dark:hover:bg-[var(--gray-100)]',
);

export const btnLg = 'px-6 py-3.5 text-[var(--text-md)]';
export const btnSm = 'px-3.5 py-2 text-[var(--text-sm)]';

export const btn = (variant = 'primary', size) =>
  cn(
    variant === 'primary' && btnPrimary,
    variant === 'secondary' && btnSecondary,
    variant === 'outline' && btnOutline,
    variant === 'ghost' && btnGhost,
    size === 'lg' && btnLg,
    size === 'sm' && btnSm,
  );

export const formGroup = 'mb-6';
export const formLabel = 'block mb-2 font-semibold text-[var(--text-primary)]';
export const formInput =
  'w-full p-4 border-[1.5px] border-[var(--border-subtle)] rounded-md text-base [font-family:inherit] bg-[var(--input-bg)] text-[var(--text-primary)] transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-[var(--primary-600)] focus:shadow-[0_0_0_3px_var(--primary-100)]';
export const fieldError = 'block mt-1.5 text-[var(--error)] text-[var(--text-sm)]';

export const badgeBase = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-[0.01em]';
export const badgeDefault = cn(badgeBase, 'bg-[var(--gray-100)] text-[var(--text-secondary)]');
export const badgeSuccess = cn(badgeBase, 'bg-[var(--secondary-100)] text-[var(--text-success)]');
export const badgeWarning = cn(badgeBase, 'bg-[var(--bg-warning-subtle)] text-[var(--text-warning)]');
export const badgeError = cn(badgeBase, 'bg-[var(--bg-danger-subtle)] text-[var(--text-danger)]');

export const loader = 'flex justify-center items-center p-8';
export const spinner =
  'border-4 border-[var(--gray-200)] border-t-[var(--primary-600)] rounded-full w-10 h-10 animate-spin';

export const errorMessage =
  'flex items-center gap-2 text-[var(--text-danger)] p-4 bg-[var(--bg-danger-subtle)] rounded-md border border-[var(--border-subtle)]';

export const grid = 'grid gap-6';
export const grid2 = 'grid grid-cols-2 gap-6 max-md:grid-cols-1';
export const grid3 = 'grid grid-cols-3 gap-6 max-md:grid-cols-1';
export const grid4 = 'grid grid-cols-4 gap-6 max-md:grid-cols-1';

export const publicLayout = 'min-h-screen flex flex-col';
export const mainContent = 'flex-1 p-0';
export const skipLink =
  'absolute left-4 -top-10 z-[2000] bg-[var(--primary-700)] text-white px-4 py-2 rounded-md no-underline font-semibold focus:top-4';

export const authPage = 'py-[72px] max-md:py-8 flex justify-center';
export const authContainer =
  'w-full max-w-[440px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-12 shadow-sm [&_h1]:mb-6 [&_h1]:text-[var(--text-2xl)] [&_.btn]:w-full [&_button]:w-full';
export const authLink = 'mt-6 text-center text-[var(--text-secondary)] [&_a]:text-[var(--text-accent)] [&_a]:font-semibold';

export const pagePadding = 'py-[72px] max-md:py-8';
export const notFoundPage = 'py-[72px] max-md:py-8 text-center [&_h1]:text-[var(--text-4xl)] [&_h1]:mb-2';

export const fadeIn = 'animate-fade-up';

/* Dashboard shared */
export const dashboardLayout = 'flex min-h-screen bg-[var(--bg-page)]';
export const dashboardMain = 'flex-1 min-w-0 p-8 max-md:p-4 bg-[var(--bg-page)]';

export const panel =
  'bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-8';
export const panelHeader =
  'flex justify-between items-center gap-4 mb-6 [&_h3]:text-[1.05rem] [&_h3]:text-[var(--text-primary)]';

export const welcomeCard =
  'bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-8 [&_h2]:text-[clamp(1.4rem,3vw,1.9rem)] [&_h2]:tracking-[-0.03em] [&_h2]:mb-2 [&_h2]:text-[var(--text-primary)] [&_p]:text-[var(--text-secondary)] [&_p]:max-w-[640px]';

export const statCard =
  'bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-6 [&_h3]:text-[var(--text-sm)] [&_h3]:text-[var(--text-muted)] [&_h3]:font-semibold [&_h3]:mb-2';

export const statValue =
  'text-[clamp(1.5rem,3vw,1.9rem)] font-extrabold text-[var(--text-primary)] tracking-[-0.03em]';

export const statValueLg =
  'text-[clamp(1.6rem,3vw,2rem)] font-extrabold text-[var(--text-primary)] tracking-[-0.03em]';

export const quickActions = 'grid grid-cols-2 gap-2 max-sm:grid-cols-1';
export const quickAction =
  'flex items-center gap-2.5 px-3.5 py-3 border border-[var(--border-subtle)] rounded-md text-[var(--text-primary)] no-underline font-semibold text-[var(--text-sm)] transition-[border-color,background] duration-150 hover:border-[var(--primary-300)] hover:bg-[var(--primary-50)]';

export const adminDashboard = 'grid gap-8';
export const adminDashboardGrid = 'grid grid-cols-[1.2fr_0.8fr] gap-6 max-lg:grid-cols-1';
export const adminStats = 'grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1';
export const adminOverviewGrid = 'grid grid-cols-3 gap-4 max-lg:grid-cols-1';
export const adminOverviewItem =
  'p-4 border border-[var(--border-subtle)] rounded-md text-center [&_strong]:block [&_strong]:text-2xl [&_strong]:text-[var(--text-primary)] [&_strong]:mb-1 [&_span]:text-[var(--text-sm)] [&_span]:text-[var(--text-muted)]';
export const adminChartsGrid = 'grid grid-cols-2 gap-6 max-lg:grid-cols-1';
export const adminChartWrap = 'h-[280px]';
export const adminTableWrap = 'overflow-x-auto';
export const adminTable =
  'w-full border-collapse min-w-[720px] [&_th]:p-3 [&_th]:text-left [&_th]:border-b [&_th]:border-[var(--border-subtle)] [&_th]:text-[var(--text-sm)] [&_th]:text-[var(--text-muted)] [&_th]:font-semibold [&_th]:bg-[var(--gray-50)] [&_td]:p-3 [&_td]:text-left [&_td]:border-b [&_td]:border-[var(--border-subtle)] [&_td]:text-[var(--text-sm)] [&_td]:text-[var(--text-primary)] [&_tbody_tr:hover]:bg-[var(--gray-50)]';
export const adminTableActions = 'flex flex-wrap gap-1.5';
export const adminToolbar = 'flex flex-wrap gap-4 items-center justify-between';
export const adminFilterTabs = 'flex flex-wrap gap-2';
export const adminFilterTab =
  'px-3.5 py-2 border-[1.5px] border-[var(--border-subtle)] rounded-full bg-[var(--bg-surface)] text-[var(--text-secondary)] font-semibold text-[var(--text-sm)] cursor-pointer';
export const adminFilterTabActive =
  'border-[var(--primary-600)] bg-[var(--primary-50)] text-[var(--text-accent)]';

export const patientDashboard = 'grid gap-8';
export const patientDashboardGrid = 'grid grid-cols-[1.2fr_0.8fr] gap-6 max-[1100px]:grid-cols-1';
export const patientStats = 'grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-sm:grid-cols-1';

export const doctorDashboard = 'grid gap-8';
export const doctorDashboardGrid = 'grid grid-cols-[1.2fr_0.8fr] gap-6 max-lg:grid-cols-1';
export const doctorStats = 'grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1';

export const appointmentChartWrap = 'w-full h-[240px]';

export const statusBadge =
  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize';
export const statusBadgeActive = cn(statusBadge, 'bg-[var(--bg-success-subtle)] text-[var(--text-success)]');
export const statusBadgeDanger = cn(statusBadge, 'bg-[var(--bg-danger-subtle)] text-[var(--text-danger)]');
export const statusBadgeWarning = cn(statusBadge, 'bg-[var(--bg-warning-subtle)] text-[var(--text-warning)]');

export const getStatusBadgeClass = (status) => {
  const normalized = String(status || '').toLowerCase();
  if (['active', 'approved', 'confirmed', 'completed'].includes(normalized)) return statusBadgeActive;
  if (['suspended', 'cancelled', 'canceled'].includes(normalized)) return statusBadgeDanger;
  if (normalized === 'pending') return statusBadgeWarning;
  return statusBadgeActive;
};
