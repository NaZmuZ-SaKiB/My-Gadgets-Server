import { Types } from 'mongoose';

export type TBrand = {
  name: string;
  image?: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
  updatedBy: Types.ObjectId;
};
