import { Types } from 'mongoose';

export type TBranch = {
  name: string;
  address: string;
  phone: string;
  mapLink?: string;

  createdAt: Date;
  updatedAt: Date;
  updatedBy: Types.ObjectId;
};
