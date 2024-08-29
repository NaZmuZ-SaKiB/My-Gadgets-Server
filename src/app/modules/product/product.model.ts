import { Schema, model } from 'mongoose';
import { TProduct } from './product.type';
import {
  compatibilities,
  connectivities,
  operatingSystems,
  powerSources,
  chargingPorts,
} from './product.constant';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
    badgeText: String,
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Media',
      },
    ],
    brand: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Brand',
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    operatingSystem: {
      type: String,
      enum: [...operatingSystems],
    },
    connectivity: [
      {
        type: String,
        enum: [...connectivities],
      },
    ],
    chargingPort: [
      {
        type: String,
        enum: [...chargingPorts],
      },
    ],
    weight: {
      type: Number,
    },
    powerSource: {
      type: String,
      enum: [...powerSources],
    },
    camera: {
      type: Number,
    },
    displaySize: {
      type: Number,
    },
    compatibility: [
      {
        type: String,
        enum: [...compatibilities],
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', productSchema);
