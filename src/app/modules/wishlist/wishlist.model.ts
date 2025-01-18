import { model, Schema } from 'mongoose';
import { TWishlist } from './wishlist.type';

const wishlistSchema = new Schema<TWishlist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true },
);

const Wishlist = model<TWishlist>('Wishlist', wishlistSchema);

export default Wishlist;
