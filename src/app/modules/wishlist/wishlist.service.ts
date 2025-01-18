import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Wishlist from './wishlist.model';

const add = async (userId: string, productId: string) => {
  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    await Wishlist.create({ user: userId, products: [productId] });
  } else {
    await Wishlist.findByIdAndUpdate(
      wishlist._id,
      {
        $addToSet: { products: productId },
      },
      { runValidators: true },
    );
  }

  return null;
};

const remove = async (userId: string, productId: string) => {
  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Wishlist not found');
  }

  await Wishlist.findByIdAndUpdate(wishlist._id, {
    $pull: { products: productId },
  });

  return null;
};

const get = async (userId: string) => {
  const wishlist = await Wishlist.findOne({ user: userId }).populate({
    path: 'products',
    select: ['_id', 'name', 'slug', 'salePrice', 'regularPrice', 'images'],
    populate: ['images'],
  });

  if (!wishlist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Wishlist not found');
  }

  return wishlist;
};

const clear = async (userId: string) => {
  await Wishlist.findOneAndUpdate({ user: userId }, { products: [] });

  return null;
};

export const WishlistService = {
  add,
  remove,
  get,
  clear,
};
