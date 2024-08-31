import { Types } from 'mongoose';

export type THomepageSettings = {
  sliderImages: Types.ObjectId[];
  bannerImage1: Types.ObjectId;
  bannerImage2: Types.ObjectId;
  bannerImage3: Types.ObjectId;
  featuredCategories: Types.ObjectId[];
  featuredBrands: Types.ObjectId[];
  popularProducts: Types.ObjectId[];
  featuredProducts: {
    banner?: Types.ObjectId;
    products: Types.ObjectId[];
  }[];
  flashSale: {
    product: Types.ObjectId;
    endDate: Date;
  }[];
  topSellingProducts: Types.ObjectId[];
  trendingProducts: Types.ObjectId[];
  description: string;
};

export type TFooterSettings = {
  slogan: string;
  email: string;
  hours: string;
  contact: string;
  copyright: string;
};

export type TSettings = {
  homepage: THomepageSettings;
  footer: TFooterSettings;
};
