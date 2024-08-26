import { Types } from 'mongoose';

export type TCategory = {
  name: string;
  label: string;

  createdAt: Date;
  updatedAt: Date;
  updatedBy: Types.ObjectId;
};
