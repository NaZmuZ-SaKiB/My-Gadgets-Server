import { model, Schema } from 'mongoose';
import { TBrand } from './brand.type';

const brandSchema = new Schema<TBrand>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: 'Media',
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Brand = model<TBrand>('Brand', brandSchema);

export default Brand;
