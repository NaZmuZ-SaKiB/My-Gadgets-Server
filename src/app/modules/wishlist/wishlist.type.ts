import { Types } from 'mongoose';

export type TWishlist = {
  user: Types.ObjectId;
  products: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
};
