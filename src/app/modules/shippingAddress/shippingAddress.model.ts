import { model, Schema } from 'mongoose';
import { TShippingAddress } from './shippingAddress.type';

const shippingAddressSchema = new Schema<TShippingAddress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: String,
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const ShippingAddress = model<TShippingAddress>(
  'ShippingAddress',
  shippingAddressSchema,
);

export default ShippingAddress;
