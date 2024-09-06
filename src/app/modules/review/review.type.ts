import { Types } from 'mongoose';

export type TReviewStatus = 'pending' | 'approved' | 'rejected';

export type TReview = {
  product: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;
  comment: string;
  status: TReviewStatus;

  createdAt: Date;
  updatedAt: Date;
};
