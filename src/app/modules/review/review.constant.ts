import { TReviewStatus } from './review.type';

export const reviewStatuses: TReviewStatus[] = [
  'pending',
  'approved',
  'rejected',
];

export const REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;
