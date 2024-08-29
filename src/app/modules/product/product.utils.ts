import { FilterQuery } from 'mongoose';
import { TProduct } from './product.type';
import Brand from '../brand/brand.model';
import Category from '../category/category.model';

export const generateProductQuery = async (query: Record<string, unknown>) => {
  const mainQuery: FilterQuery<TProduct> = {};

  // If set to all then show all products
  if (query?.os && query.os !== 'all') mainQuery.operatingSystem = query.os;

  // handling price
  if (query?.minPrice && !query?.maxPrice) {
    mainQuery.salePrice = { $gte: query?.minPrice };
  } else if (!query?.minPrice && query?.maxPrice) {
    mainQuery.salePrice = { $lte: query?.maxPrice };
  } else if (query?.minPrice && query?.maxPrice) {
    mainQuery.salePrice = { $gte: query?.minPrice, $lte: query?.maxPrice };
  }

  // handling quantity
  if (query?.minQuantity && !query?.maxQuantity) {
    mainQuery.quantity = { $gte: query?.minQuantity };
  } else if (!query?.minQuantity && query?.maxQuantity) {
    mainQuery.quantity = { $lte: query?.maxQuantity };
  } else if (query?.minQuantity && query?.maxQuantity) {
    mainQuery.quantity = { $gte: query?.minQuantity, $lte: query?.maxQuantity };
  } else {
    mainQuery.quantity = { $gt: 0 };
  }

  // handling camera
  if (query?.minCamera && !query?.maxCamera) {
    mainQuery.camera = { $gte: query?.minCamera };
  } else if (!query?.minCamera && query?.maxCamera) {
    mainQuery.camera = { $lte: query?.maxCamera };
  } else if (query?.minCamera && query?.maxCamera) {
    mainQuery.camera = { $gte: query?.minCamera, $lte: query?.maxCamera };
  }

  // handling weight
  if (query?.minWeight && !query?.maxWeight) {
    mainQuery.weight = { $gte: query?.minWeight };
  } else if (!query?.minWeight && query?.maxWeight) {
    mainQuery.weight = { $lte: query?.maxWeight };
  } else if (query?.minWeight && query?.maxWeight) {
    mainQuery.weight = { $gte: query?.minWeight, $lte: query?.maxWeight };
  }

  // handling displaySize
  if (query?.minDisplaySize && !query?.maxDisplaySize) {
    mainQuery.displaySize = { $gte: query?.minDisplaySize };
  } else if (!query?.minDisplaySize && query?.maxDisplaySize) {
    mainQuery.displaySize = { $lte: query?.maxDisplaySize };
  } else if (query?.minDisplaySize && query?.maxDisplaySize) {
    mainQuery.displaySize = {
      $gte: query?.minDisplaySize,
      $lte: query?.maxDisplaySize,
    };
  }

  // handling brand
  if (query?.brand) {
    const brands = await Brand.find({
      name: { $in: (query.brand as string).split(',') },
    });

    if (brands.length > 0) {
      mainQuery.brand = { $in: brands.map((brand) => brand._id) };
    }
  }

  // handling category
  if (query?.category) {
    const category = await Category.findOne({ name: query.category });
    if (category) {
      mainQuery.categories = category._id;
    }
  }

  // handling powerSource
  if (query?.powerSource) {
    mainQuery.powerSource = { $in: (query.powerSource as string).split(',') };
  }

  // handling connectivity
  if (query?.connectivity) {
    mainQuery.connectivity = { $in: (query.connectivity as string).split(',') };
  }

  // handling compatibility
  if (query?.compatibility) {
    mainQuery.compatibility = {
      $in: (query.compatibility as string).split(','),
    };
  }

  // handling chargingPort
  if (query?.chargingPort) {
    mainQuery.chargingPort = {
      $in: (query.chargingPort as string).split(','),
    };
  }

  return mainQuery;
};
