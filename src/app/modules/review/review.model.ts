import { model, Schema } from 'mongoose';
import { TReview } from './review.type';
import { REVIEW_STATUS, reviewStatuses } from './review.constant';

const reviewSchema = new Schema<TReview>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [...reviewStatuses],
      default: REVIEW_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
  },
);

const Review = model<TReview>('Review', reviewSchema);

export default Review;
