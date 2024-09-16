import { Types } from 'mongoose';

export type TOrderItem = {
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  product: Types.ObjectId;
};

export type TPaymentMethod = 'cash-on-delivery' | 'stripe' | 'bank-transfer';

export type TOrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export type TOrder = {
  user: Types.ObjectId;
  orderItems: TOrderItem[];
  shippingAddress: Types.ObjectId;
  paymentMethod: TPaymentMethod;
  paymentResult?: string;
  transactionId?: string;
  shippingCharge: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  completedAt: Date;
  status: TOrderStatus;

  createdAt: Date;
  updatedAt: Date;
};
