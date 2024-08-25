import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';

import config from '../../config';
import { TUser } from './user.type';
import { USER_ROLE, userRoles } from './user.constant';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: userRoles,
      default: USER_ROLE.USER,
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ShippingAddress',
      },
    ],
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';

  next();
});

const User = model<TUser>('User', userSchema);

export default User;
