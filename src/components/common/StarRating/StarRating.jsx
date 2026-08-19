const StarRating = ({ rating, maxRating = 5 }) => {
  const filledCount = Math.round(Number(rating) || 0);
  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <span
        key={i}
        className={i <= filledCount ? 'text-amber-500' : 'text-[var(--gray-300)]'}
        aria-hidden="true"
      >
        ★
      </span>,
    );
  }

  return (
    <div className="flex gap-0.5" aria-label={`${Number(rating) || 0} out of ${maxRating} stars`}>
      {stars}
    </div>
  );
};

export default StarRating;
