import { model, Schema } from 'mongoose';
import { TCategory } from './category.type';

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    showOnTopMenu: {
      type: Boolean,
      default: false,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: 'Media',
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    subCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Category = model<TCategory>('Category', categorySchema);

export default Category;
