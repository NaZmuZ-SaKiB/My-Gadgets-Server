import { model, Schema } from 'mongoose';
import { TOrder, TOrderItem } from './order.type';
import {
  ORDER_STATUS,
  orderDeliveryOptions,
  orderStatuses,
  paymentMethods,
} from './order.constant';

const orderItemSchema = new Schema<TOrderItem>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: 'ShippingAddress',
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: paymentMethods,
      required: true,
    },
    paymentResult: String,
    transactionId: String,
    shippingCharge: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: Date,
    completedAt: Date,
    status: {
      type: String,
      enum: orderStatuses,
      required: true,
      default: ORDER_STATUS.PENDING,
    },
    cancelRequested: {
      type: Boolean,
      default: false,
    },
    deliveryOption: {
      type: String,
      enum: orderDeliveryOptions,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

const Order = model<TOrder>('Order', orderSchema);

export default Order;
