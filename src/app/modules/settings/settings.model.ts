import { model, Schema } from 'mongoose';
import { TFooterSettings, THomepageSettings, TSettings } from './settings.type';

const homepageSettingsSchema = new Schema<THomepageSettings>(
  {
    sliderImages: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
    bannerImage1: { type: Schema.Types.ObjectId, ref: 'Media' },
    bannerImage2: { type: Schema.Types.ObjectId, ref: 'Media' },
    bannerImage3: { type: Schema.Types.ObjectId, ref: 'Media' },
    featuredCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    featuredBrands: [{ type: Schema.Types.ObjectId, ref: 'Brand' }],
    popularProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    featuredProducts: [
      {
        banner: { type: Schema.Types.ObjectId, ref: 'Media' },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
      },
    ],
    flashSale: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        endDate: {
          type: Date,
          required: true,
        },
      },
    ],
    topSellingProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    trendingProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    description: String,
  },
  {
    _id: false,
  },
);

const footerSettingsSchema = new Schema<TFooterSettings>(
  {
    slogan: {
      type: String,
      required: true,
      default: 'Your slogan here',
    },
    email: {
      type: String,
      required: true,
      default: 'example@email.com',
    },
    hours: {
      type: String,
      required: true,
      default: '10:00AM - 8:00PM',
    },
    contact: {
      type: String,
      required: true,
      default: '123-456-7890',
    },
    copyright: {
      type: String,
      required: true,
      default: '© 2024 Your Company. All Rights Reserved.',
    },
  },
  {
    _id: false,
  },
);

const settingsSchema = new Schema<TSettings>({
  homepage: homepageSettingsSchema,
  footer: footerSettingsSchema,
});

const Settings = model<TSettings>('Settings', settingsSchema);

export default Settings;
