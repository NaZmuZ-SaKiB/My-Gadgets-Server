import calculatePagination from '../../utils/calculatePagination';
import { mediaSearchableFields } from './media.constant';
import Media from './media.model';
import { TMedia } from './media.type';

const create = async (userId: string, payload: TMedia) => {
  await Media.create({ ...payload, updatedBy: userId });

  return null;
};

const update = async (
  userId: string,
  mediaId: string,
  payload: Partial<TMedia>,
) => {
  await Media.findByIdAndUpdate(mediaId, { ...payload, updatedBy: userId });

  return null;
};

const getAll = async (filters: Record<string, any>) => {
  const { page, limit, skip, sort, sortOrder } = calculatePagination(filters);

  // handle search
  const searchConditions = {
    $or: mediaSearchableFields.map((field) => ({
      [field]: { $regex: filters?.searchTerm ?? '', $options: 'i' },
    })),
  };

  const brands = await Media.find(searchConditions)
    .sort({ [sort]: sortOrder } as any)
    .skip(skip)
    .limit(limit);

  const total = await Media.countDocuments(searchConditions);

  return {
    data: brands,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getById = async (id: string) => {
  const brand = await Media.findById(id).populate(['updatedBy']);

  return brand;
};

const remove = async (ids: string[]) => {
  await Media.deleteMany({ _id: { $in: ids } });

  return null;
};

export const MediaService = {
  create,
  update,
  getAll,
  getById,
  remove,
};
