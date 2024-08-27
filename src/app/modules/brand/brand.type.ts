import { Types } from 'mongoose';

export type TBrand = {
  name: string;
  featured: boolean;
  image: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
  updatedBy: Types.ObjectId;
};
