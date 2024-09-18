import { TDeliveryOption, TOrderStatus, TPaymentMethod } from './order.type';

export const paymentMethods: TPaymentMethod[] = [
  'cash-on-delivery',
  'stripe',
  'bank-transfer',
];

export const orderStatuses: TOrderStatus[] = [
  'pending',
  'processing',
  'shipped',
  'completed',
  'cancelled',
];

export const orderDeliveryOptions: TDeliveryOption[] = ['pickup', 'delivery'];

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;
