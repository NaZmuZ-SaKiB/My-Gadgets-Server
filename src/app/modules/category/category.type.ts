import { Types } from 'mongoose';

export type TCategory = {
  name: string;
  label: string;
  featured: boolean;
  showOnTopMenu: boolean;
  image: Types.ObjectId;
  parent?: Types.ObjectId;
  subCategories: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
  updatedBy: Types.ObjectId;
};
