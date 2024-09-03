import Settings from './settings.model';
import { TSettings } from './settings.type';

const get = async () => {
  const settings = await Settings.findOne()
    .populate(['homepage.featuredCategories', 'homepage.featuredBrands'])
    .populate([
      {
        path: 'homepage.popularProducts',
        populate: {
          path: 'images',
        },
      },
      {
        path: 'homepage.topSellingProducts',
        populate: {
          path: 'images',
        },
      },
      {
        path: 'homepage.trendingProducts',
        populate: {
          path: 'images',
        },
      },
      {
        path: 'homepage.featuredProducts',
        populate: ['banner', 'products'],
      },
    ]);

  return settings;
};

const update = async (payload: Partial<TSettings>) => {
  const settings = await Settings.findOne().select('_id');

  await Settings.findByIdAndUpdate(settings?._id, payload, {
    runValidators: true,
  });

  return null;
};

export const SettingsService = {
  get,
  update,
};
