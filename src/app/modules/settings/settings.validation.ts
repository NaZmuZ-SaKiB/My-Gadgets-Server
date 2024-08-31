import { z } from 'zod';

const update = z.object({
  homepage: z.object({
    sliderImages: z.array(z.string()).optional(),
    bannerImage1: z.string().optional(),
    bannerImage2: z.string().optional(),
    bannerImage3: z.string().optional(),
    featuredCategories: z.array(z.string()).optional(),
    featuredBrands: z.array(z.string()).optional(),
    popularProducts: z.array(z.string()).optional(),
    featuredProducts: z
      .array(
        z.object({
          banner: z.string().optional(),
          products: z.array(z.string()),
        }),
      )
      .optional(),
    flashSale: z
      .array(
        z.object({
          product: z.string(),
          endDate: z.string(),
        }),
      )
      .optional(),

    topSellingProducts: z.array(z.string()).optional(),
    trendingProducts: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),

  footer: z.object({
    slogan: z.string().optional(),
    email: z.string().optional(),
    hours: z.string().optional(),
    contact: z.string().optional(),
    copyright: z.string().optional(),
  }),
});

export const SettingsValidation = {
  update,
};
