import Settings from './settings.model';
import { TSettings } from './settings.type';

const homePopulate1 = [
  'homepage.sliderImages',
  'homepage.bannerImage1',
  'homepage.bannerImage2',
  'homepage.bannerImage3',
  'homepage.featuredBrands',
];

const homePopulate2 = [
  {
    path: 'homepage.featuredCategories',
    populate: 'image',
  },
  {
    path: 'homepage.popularProducts',
    populate: ['images', 'brand'],
  },
  {
    path: 'homepage.topSellingProducts',
    populate: ['images', 'brand'],
  },
  {
    path: 'homepage.trendingProducts',
    populate: ['images', 'brand'],
  },
  {
    path: 'homepage.featuredProducts',
    populate: [
      {
        path: 'banner',
      },
      {
        path: 'products',
        populate: ['images', 'brand'],
      },
    ],
  },
  {
    path: 'homepage.flashSale',
    populate: {
      path: 'product',
      populate: 'images',
    },
  },
];

const categoryPopulate = [
  { path: 'category.showOnTopMenu', populate: 'subCategories' },
];

const get = async (type: string) => {
  if (type === 'homepage') {
    const settings = await Settings.findOne()
      .populate(homePopulate1)
      .populate(homePopulate2)
      .select('homepage');

    return settings;
  } else if (type === 'category') {
    const settings = await Settings.findOne()
      .populate(categoryPopulate)
      .select('category');

    return settings;
  } else if (type === 'footer') {
    const settings = await Settings.findOne().select('footer');

    return settings;
  } else {
    const settings = await Settings.findOne()
      .populate([...homePopulate1, ...categoryPopulate])
      .populate(homePopulate2);

    return settings;
  }
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
