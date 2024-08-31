import mongoose from 'mongoose';

import config from './app/config';
import app from './app';

import User from './app/modules/user/user.model';
import { USER_ROLE } from './app/modules/user/user.constant';
import Settings from './app/modules/settings/settings.model';
import { defaultSettings } from './app/modules/settings/settings.constant';

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);

    // seed super admin
    const isAdmin = await User.findOne({ role: USER_ROLE.SUPER_ADMIN }).select(
      '_id',
    );

    if (!isAdmin) {
      await User.create({
        name: 'Boss',
        email: 'boss@gmail.com',
        role: USER_ROLE.SUPER_ADMIN,
        password: 'superman',
      });
    }

    // seed settings
    const settings = await Settings.findOne();

    if (!settings) {
      await Settings.create(defaultSettings);
    }

    app.listen(config.port, () => {
      console.log(`🚀 Application Running on PORT : ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
