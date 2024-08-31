import Settings from './settings.model';
import { TSettings } from './settings.type';

const get = async () => {
  const settings = await Settings.findOne();

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
