import React from 'react';
import StarRating from '../../common/StarRating/StarRating';
import { panel, supportText } from '../../../constants/uiClasses';

const RATINGS = [5, 4, 3, 2, 1];

const DoctorReviews = ({ reviews = [], averageRating = 0, reviewCount = 0, ratingBreakdown = {} }) => {
  const total = reviewCount || reviews.length;
  const maxBreakdown = Math.max(...RATINGS.map((rating) => ratingBreakdown[rating] || 0), 1);

  return (
    <section className={panel} aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="mb-6 text-[1.15rem]">Ratings & Reviews</h2>

      <div className="grid grid-cols-[160px_1fr] gap-8 mb-8 items-center max-[700px]:grid-cols-1">
        <div className="text-center">
          <strong className="block text-[2.4rem] tracking-[-0.04em] leading-none mb-2 text-[var(--text-primary)]">
            {averageRating || 0}
          </strong>
          <StarRating rating={averageRating} />
          <p className={supportText}>{total} reviews</p>
        </div>
        <div className="grid gap-2" aria-label="Rating breakdown">
          {RATINGS.map((rating) => {
            const count = ratingBreakdown[rating] || 0;
            const width = `${Math.round((count / maxBreakdown) * 100)}%`;
            return (
              <div key={rating} className="grid grid-cols-[42px_1fr_36px] gap-2 items-center text-[var(--text-sm)] text-[var(--text-secondary)]">
                <span>{rating} star</span>
                <div className="h-2 bg-[var(--gray-100)] rounded-full overflow-hidden" aria-hidden="true">
                  <span className="block h-full bg-[var(--warning)]" style={{ width }} />
                </div>
                <span>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-[var(--text-secondary)]">No written reviews yet.</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <article key={review.id} className="border border-[var(--border-subtle)] rounded-md p-4 text-[var(--text-secondary)]">
              <div className="flex justify-between gap-4 items-center mb-1.5 text-[var(--text-primary)]">
                <h3 className="font-semibold">{review.patientName}</h3>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-[var(--text-muted)] text-[var(--text-sm)] mb-2">{review.date}</p>
              <p>{review.comment}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default DoctorReviews;
